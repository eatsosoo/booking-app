<template>
  <div class="p-6 bg-gray-100 rounded-tl-3xl rounded-br-3xl shadow-md">
    <div class="grid md:grid-cols-4 gap-4 mb-4">
      <Input
        v-model="formData.title"
        placeholder="Nhập tên lưu trú..."
        class="bg-white"
      />

      <!-- <Select v-model="formData.place">
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
      </Select> -->

      <Select v-model="formData.bedroom">
        <SelectTrigger class="w-full bg-white">
          <SelectValue placeholder="Số phòng ngủ..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Số phòng ngủ</SelectLabel>
            <SelectItem
              v-for="room in BEDROOM_OPTIONS"
              :key="room.label"
              :value="room.value"
            >
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
            <SelectItem
              v-for="bath in BATHROOM_OPTIONS"
              :key="bath.label"
              :value="bath.value"
            >
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
      <div
        v-if="isOpen"
        class="md:w-3/4 px-8 py-4 mt-2 rounded-md font-semibold bg-white border border-gray-200"
      >
        <p>DỊCH VỤ ĐI KÈM</p>
        <div class="grid grid-cols-3 mt-2 gap-4">
          <div
            v-for="service in servicesData?.data.items"
            :key="service.id"
            class="flex space-x-2 text-[0.8rem]"
          >
            <Checkbox
              :id="`service-${service.id}`"
              :model-value="formData.services.includes(service.id.toString())"
              @update:model-value="
                handleChange(service.id.toString(), $event as boolean)
              "
            />
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
import Button from "~/components/ui/button/Button.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import { Input } from "@/components/ui/input";
import type { Response, Service } from "~/types";
import { BATHROOM_OPTIONS, BEDROOM_OPTIONS } from "~/constants";
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import Label from "~/components/ui/label/Label.vue";

const props = defineProps({
  title: { type: String, default: "" },
  place: { type: String, default: "" },
  bedRoomNum: { type: String, default: "" },
  bathRoomNum: { type: String, default: "" },
  services: { type: String, default: "" },
});

const emits = defineEmits(["submit"]);

const { data: servicesData } = await useFetch<Response<Service[]>>(
  "/api/services"
);

const formData = reactive({
  title: props.title,
  place: props.place,
  bedroom: props.bedRoomNum,
  bathroom: props.bathRoomNum,
  services: props.services.split(","),
});

const isOpen = ref(false);

const handleChange = (id: string, event: boolean) => {
  if (event) formData.services.push(id);
  else formData.services = formData.services.filter((item) => item != id);
};

const submit = () => {
  emits("submit", formData);
};
</script>
