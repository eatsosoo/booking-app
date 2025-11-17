<template>
  <div>
    <div class="grid md:grid-cols-4 gap-4 p-8 mt-4 shadow-md rounded-md">
      <Select>
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Chọn địa điểm..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="group in groups" :key="group.label">
            <SelectLabel>{{ group.label }}</SelectLabel>
            <SelectItem v-for="item in group.value" :key="item" :value="item">
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <RangeDatePicker />

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" class="text-left">{{ selectRoomText }}</Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Lựa chọn loại phòng</h4>
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
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="infantsNum">Trẻ sơ sinh</Label>
                <div class="flex justify-between col-span-2">
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    :disabled="roomTypes.infants < 1"
                    @click="roomTypes.infants--"
                  >
                    <FontAwesomeIcon :icon="['fas', 'minus']" />
                  </Button>
                  <Input
                    id="infantsNum"
                    v-model="roomTypes.infants"
                    class="col-span-2 h-8 w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    @click="roomTypes.infants++"
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
      <div class="grid grid-cols-2">
        <Button>Tìm kiếm</Button>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="md:w-3/4 p-8 mt-4 shadow-md rounded-md font-semibold"
      >
        <p class="mb-2">
          Giá từ: {{ formatCurrency(minCash) }} - {{ formatCurrency(maxCash) }}
        </p>
        <RangeSlider />
        <Separator class="mt-4 mb-8" />
        <p>DỊCH VỤ ĐI KÈM</p>
        <div class="grid grid-cols-3 mt-2 gap-4">
          <label
            v-for="service in services"
            :key="service.value"
            class="flex space-x-2 text-[0.8rem]"
          >
            <Checkbox />
            <span>{{ service.label }}</span>
          </label>
        </div>
      </div>
    </transition>
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
import Separator from "@/components/ui/separator/Separator.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const groups = [
  {
    label: "Khu vực Miền Bắc",
    value: [
      "Hà Nội",
      "Hoà Bình",
      "Ba Vì",
      "Sóc Sơn",
      "Tam Đảo",
      "Đại Lải",
      "Hạ Long",
      "Tuần Châu",
      "Ninh Bình",
      "Mộc Châu",
      "Sa Pa"
    ],
  },
  {
    label: "Khu vực Miền Trung",
    value: [
      "FLC Sầm Sơn",
      "Hải Tiến",
      "Huế",
      "Đà Nẵng",
      "Hội An",
      "Quy Nhơn",
      "Nha Trang",
      "Mũi Né",
      "Phú Yên",
      "Đà Lạt"
    ],
  },
  {
    label: "Khu vực Miền Nam",
    value: [
      "Vũng Tàu",
      "Hồ Tràm",
      "Sài Gòn",
      "Phú Quốc"
    ],
  },
];

const services = [
  {
    value: "1",
    label: "Vé vịnh biển 4 mùa Paradise Ocean Park 3",
  },
  {
    value: "2",
    label: "Vé Công viên nước Royal Wave Park ( Biển tạo sóng ) - Ocean Park 2",
  },
  {
    value: "3",
    label: "Vé thuyền Gondola - Mega grand wolrd Hà Nội",
  },
];

// const dateRange = ref<string>('');
const minCash = ref(0);
const maxCash = ref(100000000);
const isOpen = ref(false);
const roomTypes = ref({
  adults: 0,
  children: 0,
  infants: 0,
});

const selectRoomText = computed(() => {
  const { adults, children, infants } = roomTypes.value;
  if (!adults && !children && !infants) return 'Chọn phòng';

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
</script>
