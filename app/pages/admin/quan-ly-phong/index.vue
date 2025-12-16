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
import type { Properties } from "~/types";
import { toast } from "vue-sonner";
import type { SelectOption } from "~/types/booking";
import DataTable from "~/components/common/data-table/DataTable.vue";
import ActionDropdown from "~/components/common/data-table/ActionDropdown.vue";
import { ROOM_STATUSES } from "~/constants";

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
  "properties-list",
  () =>
    request<Properties[]>(
      `/properties?page=${page.value}&search=${search.value}`
    ),
  {
    watch: [page, search],
  }
);

// computed
const rooms = computed(() => data.value?.data.items ?? []);
const pagination = computed(
  () => data.value?.result?.pagination ?? { current_page: 1, last_page: 1 }
);

// COLUMNS DEFINITION
const columns: ColumnDef<Properties>[] = [
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
  {
    accessorKey: "bedrooms",
    header: "Phòng ngủ",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h("div", { class: "capitalize" }, row.getValue("bedrooms"))
      ),
  },
  {
    accessorKey: "bathrooms",
    header: "Phòng tắm",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h("div", { class: "capitalize" }, row.getValue("bathrooms"))
      ),
  },
  {
    accessorKey: "bed",
    header: "Giường",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h("div", { class: "capitalize" }, row.getValue("bed"))
      ),
  },
  {
    accessorKey: "guest",
    header: "Sức chứa",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h("div", { class: "capitalize" }, row.getValue("bed") + " khách")
      ),
  },
  {
    accessorKey: "is_published",
    header: "Trạng thái",
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h(
          "div",
          { class: "capitalize" },
          ROOM_STATUSES[
            row.getValue("is_published") as keyof typeof ROOM_STATUSES
          ]
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
        showDuplicate: true,
        editLink: `/admin/quan-ly-phong/${post.id}`,
        onDelete: () => deleteItem(post.id),
        onDuplicate: () => duplicateItem(),
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
    await request(`/properties/${id}`, {
      method: "DELETE",
    });

    await refresh();

    toast.success("Thành công", {
      description: "Sao chép phòng thành công!",
    });
  } catch (error) {
    toast.error("Lỗi!", {
      description: `Có lỗi xảy ra, vui lòng thử lại sau: ${error} !`,
    });
  }
}

async function duplicateItem() {
  const indexSelected = Object.keys(rowSelection.value);
  if (indexSelected.length < 1) {
    toast.warning("Cảnh báo!", {
      description: `Bạn chưa chọn mục để sao chép.`,
    });
    return;
  }

  const ids: number[] = [];
  rooms.value.forEach((item, index) => {
    if (indexSelected.includes(index.toString())) {
      ids.push(item.id);
    }
  });

  try {
    await request(`/properties/copy`, {
      method: "POST",
      body: {
        id: ids,
      },
    });

    await refresh();

    toast.success("Thành công", {
      description: "Phòng đã được sao chép thành công!",
    });
  } catch (error) {
    toast.error("Lỗi!", {
      description: `Có lỗi xảy ra, vui lòng thử lại sau: ${error} !`,
    });
  }
}
</script>

<template>
  <section>
    <h1 class="font-semibold text-2xl">Danh sách phòng</h1>

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
