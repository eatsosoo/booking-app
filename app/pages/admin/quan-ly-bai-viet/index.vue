<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { createReusableTemplate } from "@vueuse/core";
import { PlusSquareIcon } from "lucide-vue-next";
import { h, ref } from "vue";

import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/common/data-table/DataTable.vue";
import ActionDropdown from "@/components/common/data-table/ActionDropdown.vue";
import type { Post, Response } from "~/types";
import { toast } from "vue-sonner";
import { PUBLISHED_STATUSES } from "~/constants";
import Button from "~/components/ui/button/Button.vue";

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

// --- GET LIST POSTS ---
const { data, refresh, pending } = await useAsyncData(
  "posts-list",
  () => request<Post[]>(`/posts?page=${page.value}&search=${search.value}`),
  {
    watch: [page, search],
  }
);

// computed
const posts = computed(() => data.value?.data.items ?? []);
const pagination = computed(
  () => data.value?.result?.pagination ?? { current_page: 1, last_page: 1 }
);

// --- DELETE ---
async function deleteItem(itemId: number) {
  const titleNotify = "Xoá bài viết";

  try {
    await request<Response<Post>>(`/posts/${itemId}`, {
      method: "DELETE",
    });

    toast.success(titleNotify, {
      description: "Bài viết đã được xoá thành công!",
    });

    refresh();
  } catch (err: any) {
    toast.error(titleNotify, { description: err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau!" });
  }
}

// --- COLUMNS ---
const columns: ColumnDef<Post>[] = [
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
    header: "Tiêu đề",
    cell: ({ row }) => h("div", { class: "capitalize w-50 text-wrap" }, row.getValue("title")),
    enableSorting: false,
  },
  {
    accessorKey: "keywords",
    header: "Từ khoá",
    cell: ({ row }) =>
      h("div", { class: "capitalize w-50 text-wrap" }, row.getValue("keywords")),
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
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, convertUTC(row.getValue("created_at"))),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return h(ActionDropdown, {
        itemId: post.id,
        editLink: `/admin/quan-ly-bai-viet/${post.id}`,
        onDelete: () => deleteItem(post.id),
        onCopy: () => {
          navigator.clipboard.writeText(post.id.toString());
          toast.success("Đã sao chép ID");
        },
      });
    },
  },
];

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};

watch(
  () => search.value,
  () => {
    page.value = 1;
  }
);
</script>

<template>
  <section>
    <h1 class="font-semibold text-2xl mb-6">Quản lý danh sách bài viết</h1>

    <DataTable
      :data="posts"
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
        <NuxtLink to="/admin/quan-ly-bai-viet/them-moi">
          <Button>
            <PlusSquareIcon class="mr-2 h-4 w-4" />
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
          <div class="text-muted-foreground mb-2">Không có bài viết nào</div>
          <NuxtLink to="/admin/quan-ly-bai-viet/them-moi">
            <Button variant="outline">
              <PlusSquareIcon class="mr-2 h-4 w-4" />
              Tạo bài viết đầu tiên
            </Button>
          </NuxtLink>
        </div>
      </template>

      <!-- Pagination Slot -->
      <template #pagination>
        <PaginationPage
          :page="pagination.current_page"
          :total-pages="pagination.last_page"
          @change="handlePageChange"
        />
      </template>
    </DataTable>
  </section>
</template>