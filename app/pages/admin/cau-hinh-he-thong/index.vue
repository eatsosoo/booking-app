<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { SettingItem, SystemSetting } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import {
  Bolt,
  CheckCheck,
  House,
  PlusSquareIcon,
  Trash,
} from "lucide-vue-next";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { request } = useApi();

/* -----------------------
   GET DATA
------------------------- */
const { data } = await useAsyncData(`system-settings`, () =>
  request<SettingItem[]>(`/settings?per_page=1000`)
);
const systemSettings = data.value?.data.items || [];
const loading = ref<boolean>(false);

const homePageSetting = systemSettings.find(
  (item) => item.setting_key === "HOME_PAGE"
);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveSettings = async (item: SettingItem) => {
  loading.value = true;

  try {
    await request<SettingItem>(`/settings/${item.id}`, {
      method: "PUT",
      body: {
        ...item,
      },
    });

    toast.success("Cấu hình hệ thống", {
      description: `Đã được cập nhật thiết lập ID: ${item.id} - ${item.setting_key}`,
    });
  } catch (err: any) {
    toast.error("Lỗi!", {
      description: err?.data?.message ?? err?.message ?? "Có lỗi xảy ra!",
    });
  } finally {
    loading.value = false;
  }
};

const deleteSetting = async (item: SettingItem) => {
  loading.value = true;

  try {
    await request<SettingItem>(`/settings/${item.id}`, {
      method: "DELETE",
    });

    toast.success("Cấu hình hệ thống", {
      description: `Đã xoá thiết lập ID: ${item.id} - ${item.setting_key}`,
    });
  } catch (err: any) {
    toast.error("Lỗi!", {
      description: err?.data?.message ?? err?.message ?? "Có lỗi xảy ra!",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Cấu hình hệ thống</h1>

    <NuxtLink to="/admin/cau-hinh-he-thong/them-moi">
      <Button>
        <PlusSquareIcon class="h-4 w-4" />
        Tạo mới
      </Button>
    </NuxtLink>

    <h2 class="mb-2 ml-1 text-xl font-semibold mt-4 flex items-center">
      <Bolt class="mr-2" :size="22" /> Các thiết lập cơ bản
    </h2>
    <div class="grid grid-cols-2 mt-4 gap-4">
      <template v-for="(item, index) in systemSettings" :key="item.id">
        <div
          v-if="item.setting_key !== 'HOME_PAGE'"
          class="border border-gray-100 p-4 shadow-md rounded-md"
        >
          <Label :for="item.setting_key" class="mb-2 ml-1">{{
            item.setting_key
          }}</Label>
          <div class="flex space-x-2">
            <Input
              :id="item.setting_key"
              v-model="item.setting_value"
              placeholder="Nhập..."
            />
            <Button
              variant="outline"
              :disabled="loading"
              @click="saveSettings(item)"
            >
              <CheckCheck color="green" />
            </Button>
            <Button
              variant="outline"
              :disabled="loading"
              @click="deleteSetting(item)"
            >
              <Trash color="red" />
            </Button>
          </div>
        </div>
      </template>
    </div>

    <!-- Home Page Content -->
    <h2 class="mb-2 ml-1 text-xl font-semibold mt-8 flex items-center">
      <House class="mr-2" :size="22" /> Nội dung trang chủ
    </h2>
    <div v-if="homePageSetting" class="col-span-2 mt-4">
      <ClientOnly>
        <CommonEditorCustom
          :model-value="homePageSetting.setting_value"
          @update:model-value="homePageSetting.setting_value = $event"
        />
      </ClientOnly>
      <Button
        class="mt-2"
        :loading="loading"
        @click="saveSettings(homePageSetting)"
        >Lưu nội dung trang chủ</Button
      >
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add custom styles for validation */
input:invalid,
input.border-red-500 {
  border-color: #ef4444;
}

input:focus.border-red-500 {
  --tw-ring-color: #ef4444;
}
</style>
