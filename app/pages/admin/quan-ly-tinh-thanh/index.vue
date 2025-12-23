<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { Network, PlusSquareIcon } from "lucide-vue-next";
import { h, ref } from "vue";
import { Button } from "@/components/ui/button";
import type { Province } from "~/types";
import { toast } from "vue-sonner";
import DataTable from "~/components/common/data-table/DataTable.vue";
import ActionDropdown from "~/components/common/data-table/ActionDropdown.vue";
import MenuSearch from "~/components/common/form/MenuSearch.vue";
import TooltipProvider from "~/components/ui/tooltip/TooltipProvider.vue";
import Tooltip from "~/components/ui/tooltip/Tooltip.vue";
import TooltipTrigger from "~/components/ui/tooltip/TooltipTrigger.vue";
import TooltipContent from "~/components/ui/tooltip/TooltipContent.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const { request } = useApi();

// STATE
const page = ref<number>(1);
const search = ref<string>("");
const propertiesType = ref<string>("");
const region = ref<string>("");
const province = ref<string>("");
const district = ref<string>("");

// Table states
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

// --- GET LIST CATEGORY ---
const { data, refresh, pending } = await useAsyncData(
  "menu-list",
  () =>
    request<Province[]>(
      `/provinces?page=${page.value}&search=${search.value}&&property_types=${
        propertiesType.value || ""
      }&region=${region.value}&province=${province.value}&district=${
        district.value
      }`
    ),
  {
    watch: [page, search, propertiesType, region, province, district],
  }
);

// computed
const faqs = computed(() => data.value?.data.items ?? []);
const pagination = computed(
  () => data.value?.result?.pagination ?? { current_page: 1, last_page: 1 }
);

// COLUMNS DEFINITION
const columns: ColumnDef<Province>[] = [
  {
    accessorKey: "order_no",
    header: "STT",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "property_types",
    header: "Loại hình",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        (row.getValue("property_types") as Array<{ id: number; name: string }>)
          .sort((a, b) => a.id - b.id)
          .map((type) => type.name)
          .join(" | ")
      ),
    enableSorting: false,
  },
  {
    accessorKey: "region",
    header: "Khu vực",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("region")),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Địa danh",
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("name")),
    enableSorting: false,
  },
  {
    accessorKey: "district",
    header: "Quận/Huyện",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("district")),
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h(
          "div",
          { class: "capitalize" },
          convertUTC(row.getValue("created_at"))
        )
      ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return h(ActionDropdown, {
        itemId: post.id,
        editLink: `/admin/quan-ly-tinh-thanh/${post.id}`,
        showView: true,
        viewLink: `/admin/quan-ly-tinh-thanh/view/${post.id}`,
        onDelete: () => deleteItem(post.id),
        onCopy: () => {
          navigator.clipboard.writeText(post.id.toString());
          toast.success("Đã sao chép ID");
        },
      });
    },
  },
];

async function deleteItem(id: number) {
  try {
    await request(`/provinces/${id}`, {
      method: "DELETE",
    });

    await refresh();

    toast.success("Thành công", {
      description: "Menu đã được xoá thành công!",
    });
  } catch (error) {
    toast.error("Lỗi!", {
      description: `Có lỗi xảy ra, vui lòng thử lại sau: ${error} !`,
    });
  }
}

function handleSearch(event: any) {
  search.value = event.title;
  propertiesType.value = event.property_types;
  region.value = event.region;
  province.value = event.province;
  district.value = event.district;
}
</script>

<template>
  <section>
    <h1 class="font-semibold text-2xl">Danh sách Menu</h1>

    <DataTable
      :data="faqs"
      :columns="columns"
      :sorting="sorting"
      :column-filters="columnFilters"
      :column-visibility="columnVisibility"
      :row-selection="rowSelection"
      :expanded="expanded"
      :search-value="search"
      :loading="pending"
      :show-search="false"
      search-placeholder="Tìm kiếm theo tiêu đề..."
      @update:sorting="sorting = $event"
      @update:column-filters="columnFilters = $event"
      @update:column-visibility="columnVisibility = $event"
      @update:row-selection="rowSelection = $event"
      @update:expanded="expanded = $event"
      @update:search="search = $event"
    >
      <!-- Left Actions Slot -->
      <template #left-actions>
        <MenuSearch @search="handleSearch" />
      </template>

      <!-- Left Actions Slot -->
      <template #actions>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink to="/admin/quan-ly-tinh-thanh/them-moi">
                <Button variant="outline">
                  <PlusSquareIcon class="h-4 w-4" />
                </Button>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tạo menu mới</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink to="/admin/quan-ly-tinh-thanh/view">
                <Button variant="outline">
                  <Network class="h-4 w-4" />
                </Button>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cây menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
          <div class="text-muted-foreground mb-2">Không có Menu nào</div>
          <NuxtLink to="/admin/quan-ly-tinh-thanh/them-moi">
            <Button variant="outline">
              <PlusSquareIcon class="h-4 w-4" />
              Tạo Menu đầu tiên
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
