<script setup lang="ts">
import { ref } from "vue";
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
import { PROPERTY_TYPES } from "~/constants";
import Button from "./ui/button/Button.vue";

const { getProvinces, getDistricts } = useProvinces();

/* -----------------------
    STATE
------------------------- */
const params = reactive({
  property_types: null,
  region: "",
  province: "",
  district: "",
});
const page = ref<number>(1);

/* -----------------------
       GET DATA
------------------------- */
const url = computed(
  () =>
    `tim-kiem?page=${page.value}
    &per_page=12
    &property_types=${params.property_types}
    &region=${params.region}
    &province=${params.province}
    &district=${params.district}`
);

const provinceOptions = computed(() => {
  if (!params.property_types) return []
  return getProvinces(params.property_types, params.region);
});
const districtOptions = computed(() => {
  if (!params.property_types) return []
  return getDistricts(params.property_types, params.region, params.province);
});
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center shadow-md p-4 rounded-md"
  >
    <!-- Loại hình -->
    <div>
      <Label for="property_types" class="mb-2 ml-1">Loại hình</Label>
      <Select v-model="params.property_types">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Chọn loại hình..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel></SelectLabel>
            <SelectItem
              v-for="type in PROPERTY_TYPES"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <!-- Region -->
    <div>
      <Label for="answer" class="mb-2 ml-1">Khu vực</Label>
      <Select v-model="params.region">
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

    <!-- Province -->
    <div>
      <Label for="answer" class="mb-2 ml-1">Địa danh</Label>
      <Select v-model="params.province">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Chọn địa danh..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel></SelectLabel>
            <SelectItem
              v-for="province in provinceOptions"
              :key="province"
              :value="province"
            >
              {{ province }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <!-- District -->
    <div>
      <Label for="answer" class="mb-2 ml-1">Quận/Huyện</Label>
      <Select v-model="params.district">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Chọn quận/huyện..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel></SelectLabel>
            <SelectItem
              v-for="district in districtOptions"
              :key="district"
              :value="district"
            >
              {{ district }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="mt-5">
      <Button class="w-full" @click="navigateTo(url)">Tìm kiếm</Button>
    </div>
  </div>
</template>
