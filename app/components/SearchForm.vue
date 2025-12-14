<template>
  <div class="shadow-md rounded-md bg-white p-8">
    <h2 class="font-semibold">Bạn muốn đi đâu?</h2>
    <div class="grid md:grid-cols-5 gap-4">
      <Select v-model="selectedRoomType" @change="console.log($event)">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Chọn loại hình..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="item in PROPERTY_TYPES"
            :key="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select v-model="selectedLocation">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Chọn địa điểm..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="group in groupOptions" :key="group.region">
            <SelectLabel v-if="group.provinces.length > 0">{{
              group.region
            }}</SelectLabel>
            <SelectItem
              v-for="item in group.provinces"
              :key="item"
              :value="item"
              @click="selectedRegion = group.region"
            >
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <RangeDatePicker @change="handleChange" />

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" class="text-left">{{
            selectRoomText
          }}</Button>
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
                    :disabled="amountGuest.adults < 1"
                    @click="amountGuest.adults--"
                  >
                    <FontAwesomeIcon :icon="['fas', 'minus']" />
                  </Button>
                  <Input
                    id="adultNum"
                    v-model="amountGuest.adults"
                    readonly
                    class="col-span-2 h-8 w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    @click="amountGuest.adults++"
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
                    :disabled="amountGuest.children < 1"
                    @click="amountGuest.children--"
                  >
                    <FontAwesomeIcon :icon="['fas', 'minus']" />
                  </Button>
                  <Input
                    id="childrenNum"
                    v-model="amountGuest.children"
                    class="col-span-2 h-8 w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    class="h-8 w-8"
                    @click="amountGuest.children++"
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
        <Button class="w-full" @click="submit">Tìm kiếm</Button>
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
import { PROPERTY_TYPES } from "~/constants";

const { treeProvinces } = useProvinces();

const selectedRoomType = ref<string>("");
const selectedRegion = ref<string>("");
const selectedLocation = ref<string>("");
const range = ref<{ start: string; end: string } | null>(null);
const amountGuest = ref({
  adults: 0,
  children: 0,
  infants: 0,
});
const groupOptions = ref<any>(null);

const selectRoomText = computed(() => {
  const { adults, children, infants } = amountGuest.value;
  if (!adults && !children && !infants) return "Chọn số khách...";

  let string = "";
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
});

watch(
  () => selectedRoomType.value,
  (newVal) => {
    const data = treeProvinces.value.find(
      (item) => item.value === Number(newVal)
    );
    if (data) {
      groupOptions.value = data.regions;
    }
  }
);

const handleChange = (value: { start: string; end: string } | null) => {
  range.value = value;
};

const submit = () => {
  const { start, end } = range.value || { start: null, end: null };
  navigateTo(
    `/tim-kiem?property_types=${selectedRoomType.value}
    &region=${selectedRegion.value}
    &province=${
      selectedLocation.value
    }&from_date=${start}&start_date=${end}&guest=${
      amountGuest.value.adults + amountGuest.value.children
    }`
  );
};
</script>
