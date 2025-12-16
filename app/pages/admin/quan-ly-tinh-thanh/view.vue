<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Properties, Response } from "~/types";
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
import MultiSelect from "~/components/common/MultiSelect.vue";
import DataTable from "~/components/common/data-table/DataTable.vue";
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import type { SelectOption } from "~/types/booking";
import { PlusSquareIcon } from "lucide-vue-next";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { request } = useApi();
const config = useRuntimeConfig();
const { getProvinces, getDistricts } = useProvinces();

/* -----------------------
    STATE
------------------------- */
const pending = ref<boolean>(false);
const params = reactive({
  property_types: 1,
  region: "Miền Bắc",
  province: "",
  district: "",
});
const page = ref<number>(1);
const search = ref<string>("");

/* -----------------------
       GET DATA
------------------------- */
const apiUrl = computed(
  () =>
    `${config.public.apiBase}/home/properties?page=${page.value}
    &per_page=12
    &property_types=${params.property_types}
    &region=${params.region}
    &province=${params.province}
    &district=${params.district}`
);

const { data } = await useAsyncData(
  () => `places-list-${apiUrl.value}`,
  () => $fetch<Response<Properties[]>>(apiUrl.value),
  { watch: [apiUrl] }
);
// computed
const rooms = computed(() => data.value?.data.items ?? []);
const pagination = computed(
  () => data.value?.result?.pagination ?? { current_page: 1, last_page: 1 }
);

const provinceOptions = computed(() => {
  return getProvinces(params.property_types, params.region);
});
const districtOptions = computed(() => {
  return getDistricts(params.property_types, params.region, params.province);
});

// Table states
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

// COLUMNS DEFINITION
const columns: ColumnDef<Properties>[] = [
  {
    accessorKey: "order_no",
    header: "STT",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize max-w-50 text-wrap" },
        row.getValue("name")
      ),
    enableSorting: false,
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize max-w-50 text-wrap" },
        row.getValue("address")
      ),
  },
  {
    accessorKey: "property_types",
    header: "Loại hình",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h(
          "div",
          { class: "capitalize" },
          (row.getValue("property_types") as SelectOption[])
            .map((type) => type.name)
            .join(" | ")
        )
      ),
  },
  {
    accessorKey: "region",
    header: "Khu vực",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h("div", { class: "captilize" }, row.getValue("region"))
      ),
  },
  {
    accessorKey: "province",
    header: "Địa danh",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h("div", { class: "captilize" }, row.getValue("province"))
      ),
  },
  {
    accessorKey: "district",
    header: "Quận/Huyện",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h("div", { class: "captilize" }, row.getValue("district"))
      ),
  },
];
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Địa điểm & Loại hình</h1>

    <div class="grid grid-cols-1 gap-6">
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
    </div>

    <DataTable
      :data="rooms"
      :columns="columns"
      :sorting="sorting"
      :column-filters="columnFilters"
      :column-visibility="columnVisibility"
      :row-selection="rowSelection"
      :expanded="expanded"
      :search-value="search"
      :loading="pending"
      search-placeholder="Tìm kiếm theo tiêu đề..."
      @update:sorting="sorting = $event"
      @update:column-filters="columnFilters = $event"
      @update:column-visibility="columnVisibility = $event"
      @update:row-selection="
        rowSelection = $event;
        console.log($event);
      "
      @update:expanded="expanded = $event"
      @update:search="search = $event"
    >
      <!-- Left Actions Slot -->
      <template #left-actions>
        <NuxtLink to="/admin/quan-ly-phong/them-moi">
          <Button>
            <PlusSquareIcon class="h-4 w-4" />
            Tạo mới
          </Button>
        </NuxtLink>
      </template>

      <!-- Expanded Content Slot -->
      <template #expanded="{ original }">
        <div class="p-4 bg-gray-50 rounded">
          <pre class="text-sm">{{ JSON.stringify(original, null, 2) }}</pre>
        </div>
      </template>

      <!-- Empty State Slot -->
      <template #empty>
        <div class="text-center py-12">
          <div class="text-muted-foreground mb-2">Không có phòng nào</div>
          <NuxtLink to="/admin/quan-ly-bai-viet/them-moi">
            <Button variant="outline">
              <PlusSquareIcon class="h-4 w-4" />
              Tạo phòng đầu tiên
            </Button>
          </NuxtLink>
        </div>
      </template>

      <!-- Pagination Slot -->
      <template #pagination>
        <PaginationPage
          :page="pagination.current_page"
          :total-pages="pagination.last_page"
          @change="page = $event"
        />
      </template>
    </DataTable>
  </section>
</template>
