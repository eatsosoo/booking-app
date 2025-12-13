<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { SettingItem } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

// form
const settings = ref<SettingItem>({
  setting_key: "",
  setting_value: "",
} as SettingItem);

const { request } = useApi();
const pending = ref(false);

const saveFaq = async () => {
  pending.value = true;

  try {
    // POST Setting mới
    await request("/settings", {
      method: "POST",
      body: settings.value,
    });

    toast.success("Tạo Setting thành công!", {
      description: "Setting mới đã được thêm.",
    });

    // Chuyển hướng về danh sách Setting
    navigateTo("/admin/cau-hinh-he-thong");
  } catch (err: any) {
    toast.error("Lỗi!", {
      description:
        err?.data?.message ||
        err?.message ||
        "Có lỗi xảy ra, vui lòng thử lại!",
    });
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Tạo Setting mới</h1>

    <div class="grid grid-cols-1 gap-6">
      <!-- Question -->
      <div>
        <Label for="setting_key" class="mb-2 ml-1">Key</Label>
        <Input
          id="setting_key"
          v-model="settings.setting_key"
          placeholder="Nhập..."
        />
      </div>

      <!-- Answer -->
      <div>
        <Label for="setting_value" class="mb-2 ml-1">Value</Label>
        <Textarea
          id="setting_value"
          v-model="settings.setting_value"
          placeholder="Nhập..."
        />
      </div>
    </div>

    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="saveFaq">
        Tạo mới
      </Button>
    </div>
  </section>
</template>
