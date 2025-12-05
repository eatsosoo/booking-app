<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Province } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const { request } = useApi();
const id = route.params.id;

/* -----------------------
   GET DATA
------------------------- */
const { data } = await useAsyncData(`province-${id}`, () =>
  request<Province>(`/provinces/${id}`)
);
const province = ref<Province>(data.value?.data.items || ({} as Province));
const loading = ref<boolean>(false);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveProvince = async () => {
  loading.value = true;

  try {
    await request<Province>(`/provinces/${id}`, {
      method: "PUT",
      body: province.value,
    });

    toast.success("Cập nhật tỉnh thành", {
      description: "Tỉnh thành đã được cập nhật.",
    });

    navigateTo("/admin/quan-ly-tinh-thanh");
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
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa tỉnh thành</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Question -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tên</Label>
        <Input
          id="title"
          v-model="province.name"
          placeholder="Nhập tên..."
        />
      </div>

      <!-- Answer -->
      <div>
        <Label for="answer" class="mb-2 ml-1">Khu vực</Label>
        <Select v-model="province.region">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Chọn khu vực..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem value="Miền Bắc"> Miền Bắc </SelectItem>
              <SelectItem value="Miền Trung"> Miền Trung </SelectItem>
              <SelectItem value="Miền Nam"> Miền Nam </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" :loading="loading" @click="saveProvince"> Lưu thay đổi </Button>
    </div>
  </section>
</template>
