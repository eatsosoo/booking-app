<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
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
import { PROPERTY_TYPES } from "~/constants";
import MultiSelect from "~/components/common/MultiSelect.vue";
import type { ProvinceForm } from "~/types/booking";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

// form
const province = ref<ProvinceForm>({
  name: "",
  region: "",
  property_types: [],
  slug: "",
  district: ""
});

const { request } = useApi();
const pending = ref(false);

const saveProvince = async () => {
  pending.value = true;

  try {
    await request("/provinces", {
      method: "POST",
      body: {
        ...province.value,
        slug: genSlug(province.value.name),
      },
    });

    toast.success("Tạo địa danh thành công!", {
      description: "Địa danh mới đã được thêm.",
    });

    navigateTo("/admin/quan-ly-tinh-thanh");
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
    <h1 class="text-2xl font-semibold mb-8">Tạo địa danh mới</h1>

    <div class="grid grid-cols-1 gap-6">
      <!-- Loại hình -->
      <div>
        <Label for="property_types" class="mb-2 ml-1">Loại hình</Label>
        <MultiSelect
          v-model="province.property_types"
          :options="PROPERTY_TYPES"
          placeholder="Chọn loại hình..."
          class="w-64"
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

      <!-- Question -->
      <div>
        <Label for="title" class="mb-2 ml-1">Địa danh</Label>
        <Input id="title" v-model="province.name" placeholder="Nhập tên..." />
      </div>

      <!-- Quận/Huyện -->
      <div>
        <Label for="title" class="mb-2 ml-1">Quận/Huyện</Label>
        <Input
          id="title"
          v-model="province.district"
          placeholder="Nhập tên..."
        />
      </div>
    </div>

    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="saveProvince">
        Tạo mới
      </Button>
    </div>
  </section>
</template>
