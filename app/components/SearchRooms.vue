<template>
  <div class="p-6 bg-gray-100 rounded-tl-3xl rounded-br-3xl shadow-md">
    <div class="grid md:grid-cols-4 gap-4 mb-4">
      <Input v-model="formData.title" placeholder="Nhập tên lưu trú..." class="bg-white" />

      <Select v-model="formData.place">
        <SelectTrigger class="w-full bg-white">
          <SelectValue placeholder="Chọn địa điểm..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="group in PLACE_GROUPS" :key="group.label">
            <SelectLabel>{{ group.label }}</SelectLabel>
            <SelectItem v-for="item in group.value" :key="item" :value="item">
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select v-model="formData.bedroom">
        <SelectTrigger class="w-full bg-white">
          <SelectValue placeholder="Số phòng ngủ..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Số phòng ngủ</SelectLabel>
            <SelectItem v-for="room in bedRoomNum" :key="room.label" :value="room.value">
              {{ room.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select v-model="formData.bathroom">
        <SelectTrigger class="w-full bg-white">
          <SelectValue placeholder="Số phòng tắm..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Số phòng tắm</SelectLabel>
            <SelectItem v-for="bath in bathRoomNum" :key="bath.label" :value="bath.value">
              {{ bath.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="px-2">
      <div class="cursor-pointer flex" @click="isOpen = !isOpen">
        <ChevronDown v-if="!isOpen"></ChevronDown>
        <ChevronUp v-else></ChevronUp>
        <span class="ml-2">Nâng cao</span>
      </div>
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="md:w-3/4 px-8 py-4 mt-2 rounded-md font-semibold bg-white border border-gray-200">
        <p>DỊCH VỤ ĐI KÈM</p>
        <div class="grid grid-cols-3 mt-2 gap-4">
          <div v-for="service in servicesData?.data.items" :key="service.id" class="flex space-x-2 text-[0.8rem]">
            <Checkbox :id="`service-${service.id}`" :model-value="formData.services.includes(service.id.toString())"
              @update:model-value="handleChange(service.id.toString(), $event as boolean)" />
            <Label :for="`service-${service.id}`">{{ service.title }}</Label>
          </div>
        </div>
      </div>
    </transition>

    <!-- Action -->
    <div class="flex justify-end">
      <Button @click="submit">Tìm kiếm</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Button from "./ui/button/Button.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import { Input } from "@/components/ui/input";
import type { Response, Service } from "~/types";
import { PLACE_GROUPS } from "~/constants";
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import Label from "./ui/label/Label.vue";

const props = defineProps({
  title: { type: String, default: ""},
  place: { type: String, default: ""},
  bedRoomNum: { type: String, default: ""},
  bathRoomNum: { type: String, default: ""},
  services: { type: String, default: "" },
})

const emits = defineEmits(['submit'])

const { data: servicesData } = await useFetch<Response<Service[]>>("/api/services")

const formData = reactive({
  title: props.title,
  place: props.place,
  bedroom: props.bedRoomNum,
  bathroom: props.bathRoomNum,
  services: props.services.split(","),
})

const bedRoomNum = [
  {
    value: "1,3",
    label: "Từ 1 đến 3 phòng ngủ",
  },
  {
    value: "3,5",
    label: "Từ 3 đến 5 phòng ngủ",
  },
  {
    value: "5,7",
    label: "Từ 5 đến 7 phòng ngủ",
  },
  {
    value: "7,9",
    label: "Từ 7 đến 9 phòng ngủ",
  },
  {
    value: "10",
    label: "Từ 10 phòng ngủ",
  },
];

const bathRoomNum = [
  {
    value: "1",
    label: "1 phòng tắm",
  },
  {
    value: "2",
    label: "2 phòng tắm",
  },
  {
    value: "3",
    label: "3 phòng tắm",
  },
  {
    value: "4",
    label: "4 phòng tắm",
  },
  {
    value: "5",
    label: "Từ 5 phòng tắm",
  },
];

const isOpen = ref(false);

const handleChange = (id: string, event: boolean) => {
  if (event) formData.services.push(id)
  else formData.services = formData.services.filter(item => item != id)
}

const submit = () => {
  console.log(formData);
  emits("submit", formData)
}
</script>
