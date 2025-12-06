<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { PlusSquareIcon } from "lucide-vue-next";
import { h, ref } from "vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Service } from "~/types";
import { toast } from "vue-sonner";
import { PUBLISHED_STATUSES } from "~/constants";
import { formatCurrency } from "~/utils/string-helper";
import DataTable from "~/components/common/data-table/DataTable.vue";
import ActionDropdown from "~/components/common/data-table/ActionDropdown.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { request } = useApi();

// STATE
const page = ref<number>(1);
const search = ref<string>("");

// Table states
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

// --- GET LIST CATEGORY ---
const { data, refresh, pending } = await useAsyncData(
  "services-list",
  () =>
    request<Service[]>(
      `/services?page=${page.value}&search=${search.value}`
    ),
  {
    watch: [page, search],
  }
);

// computed
const categories = computed(() => data.value?.data.items ?? []);
const pagination = computed(
  () => data.value?.result?.pagination ?? { current_page: 1, last_page: 1 }
);

// COLUMNS DEFINITION
const columns: ColumnDef<Service>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:modelValue": (value) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("id")),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Tên dịch vụ",
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("title")),
    enableSorting: false,
  },
  {
    accessorKey: "menu",
    header: "Cấp độ",
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("menu")),
    enableSorting: false,
  },
  {
    accessorKey: "is_published",
    header: "Trạng thái",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        PUBLISHED_STATUSES[
          row.getValue("is_published") as keyof typeof PUBLISHED_STATUSES
        ]
      ),
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, formatCurrency(row.getValue("price"))),
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, convertUTC(row.getValue("created_at"))),
  },
  {
    accessorKey: "updated_at",
    header: "Ngày cập nhất",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, convertUTC(row.getValue("updated_at"))),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return h(ActionDropdown, {
        itemId: post.id,
        editLink: `/admin/quan-ly-dich-vu/${post.id}`,
        onDelete: () => deleteItem(post.id),
        onCopy: () => {
          navigator.clipboard.writeText(post.id.toString());
          toast.success("Đã sao chép ID");
        },
      });
    },
  }
];

async function deleteItem(id: number) {
  const { request } = useApi();
  try {
    await request(`/services/${id}`, {
      method: "DELETE",
    });

    await refresh();
    
    toast.success("Thành công", {
      description: "Dịch vụ đã được xoá thành công!",
    });
  } catch (error) {
    toast.error("Lỗi!", {
      description: `Có lỗi xảy ra, vui lòng thử lại sau: ${error} !`,
    });
  }
}

watch(
  () => search.value,
  () => {
    page.value = 1;
  }
);
</script>

<template>
  <section>
    <h1 class="font-semibold text-2xl">Quản lý danh sách dịch vụ</h1>

    <DataTable
      :data="categories"
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
      @update:row-selection="rowSelection = $event"
      @update:expanded="expanded = $event"
      @update:search="search = $event"
    >
      <!-- Left Actions Slot -->
      <template #left-actions>
        <NuxtLink to="/admin/quan-ly-dich-vu/them-moi">
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
          <div class="text-muted-foreground mb-2">Không có dịch vụ nào</div>
          <NuxtLink to="/admin/quan-ly-dich-vu/them-moi">
            <Button variant="outline">
              <PlusSquareIcon class="h-4 w-4" />
              Tạo dịch vụ đầu tiên
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