<script setup lang="ts">
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
import Button from "~/components/ui/button/Button.vue";
import { RefreshCcwDot } from "lucide-vue-next";
import TooltipProvider from "~/components/ui/tooltip/TooltipProvider.vue";
import Tooltip from "~/components/ui/tooltip/Tooltip.vue";
import TooltipTrigger from "~/components/ui/tooltip/TooltipTrigger.vue";
import TooltipContent from "~/components/ui/tooltip/TooltipContent.vue";

const { getProvinces, getDistricts } = useProvinces();
const emits = defineEmits(["search"]);

/* -----------------------
    STATE
------------------------- */
const params = reactive({
  property_types: null,
  region: "",
  province: "",
  district: "",
});

/* -----------------------
       GET DATA
------------------------- */
const provinceOptions = computed(() => {
  if (!params.property_types) return [];
  return getProvinces(params.property_types, params.region);
});
const districtOptions = computed(() => {
  if (!params.property_types) return [];
  return getDistricts(params.property_types, params.region, params.province);
});

const search = () => {
  emits("search", params);
};

const reset = () => {
  params.property_types = null;
  params.region = "";
  params.province = "";
  params.district = "";
  search();
};
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 items-center"
  >
    <!-- Loại hình -->
    <div>
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

    <div class="flex space-x-2">
      <Button @click="search">Tìm kiếm</Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" @click="reset">
              <RefreshCcwDot />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xoá các lựa chọn lọc</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
