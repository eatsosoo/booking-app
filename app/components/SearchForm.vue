<template>
  <div class="shadow-md rounded-md bg-white p-8">
    <h2 class="font-semibold">Bạn muốn đi đâu?</h2>
    <div class="grid md:grid-cols-4 gap-4 ">
      <Select>
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Chọn địa điểm..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="(group, key) in groups" :key="key">
            <SelectLabel>{{ key }}</SelectLabel>
            <SelectItem v-for="item in group" :key="item" :value="item">
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <RangeDatePicker v-model="range" @change="handleChange"/>

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" class="text-left">{{ selectRoomText }}</Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Số khách</h4>
              <p class="text-sm text-muted-foreground">
                Chọn số lượng mong muốn bằng các nút.
              </p>
            </div>
            <div class="grid gap-2">
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="adultNum">Người lớn</Label>
                <div class="flex justify-between col-span-2">
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    :disabled="roomTypes.adults < 1"
                    @click="roomTypes.adults--"
                  >
                    <FontAwesomeIcon :icon="['fas', 'minus']" />
                  </Button>
                  <Input
                    id="adultNum"
                    v-model="roomTypes.adults"
                    readonly
                    class="col-span-2 h-8 w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    @click="roomTypes.adults++"
                  >
                    <FontAwesomeIcon :icon="['fas', 'plus']" />
                  </Button>
                </div>
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="childrenNum">Trẻ em</Label>
                <div class="flex justify-between col-span-2">
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    :disabled="roomTypes.children < 1"
                    @click="roomTypes.children--"
                  >
                    <FontAwesomeIcon :icon="['fas', 'minus']" />
                  </Button>
                  <Input
                    id="childrenNum"
                    v-model="roomTypes.children"
                    class="col-span-2 h-8 w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    @click="roomTypes.children++"
                  >
                    <FontAwesomeIcon :icon="['fas', 'plus']" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <!-- Action -->
      <div class="">
        <Button class="w-full">Tìm kiếm</Button>
      </div>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "reka-ui";

const props = defineProps({
  groups: { type: Object as PropType<{ [key: string]: string[]}>, default: () => {} },
});

const range = ref<DateRange | null>(null);
const roomTypes = ref({
  adults: 0,
  children: 0,
  infants: 0,
});

const selectRoomText = computed(() => {
  const { adults, children, infants } = roomTypes.value;
  if (!adults && !children && !infants) return 'Chọn số khách...';

  let string = '';
  if (adults > 0) {
    string += `${adults} người lớn`;
  }
  if (children > 0) {
    string += ` - ${children} trẻ em`;
  } 
  if (infants > 0) {
    string += ` - ${infants} em bé`;
  }

  return string;
})

const handleChange = (value: DateRange) => {
  console.log("Selected range:", value);
};
watch(
  range,
  () => {
    console.log(range);
  }
)
</script>
