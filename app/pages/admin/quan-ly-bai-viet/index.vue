<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { createReusableTemplate } from "@vueuse/core";
import { ChevronDown, MoreHorizontal, PlusSquareIcon } from "lucide-vue-next";
import { h, ref } from "vue";

import { valueUpdater } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Post, Response } from "~/types";
import { toast } from "vue-sonner";
import { PUBLISHED_STATUSES } from "~/constants";

definePageMeta({
    layout: 'admin'
})

const config = useRuntimeConfig();

// STATE
const page = ref<number>(1);
const search = ref<string | number>("");
const message = ref<string>("");

// API URL
const apiUrl = computed(
  () =>
    `${config.public.apiBase}/posts?page=${page.value}&search=${search.value}`
);

// --- GET LIST POSTS ---
const { data, refresh } = await useAsyncData(
  "posts-list",
  () => $fetch<Response<Post[]>>(apiUrl.value),
  {
    watch: [apiUrl],
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
    await $fetch(`${config.public.apiBase}/posts/${itemId}`, {
      method: "DELETE",
    });

    toast.success(titleNotify, {
      description: "Bài viết đã được xoá thành công!",
    });

    refresh(); // load lại danh sách
  } catch (err: any) {
    message.value =
      err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error(titleNotify, { description: message.value });
  }
}

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{
  post: {
    id: number;
  };
  onExpand: () => void;
}>();

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
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("title")),
    enableSorting: false,
  },
  {
    accessorKey: "keywords",
    header: "Từ khoá",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("keywords")),
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

      return h(ReuseTemplate, {
        post,
        onExpand: row.toggleExpanded,
      });
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data: posts,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});

function copy(id: number) {
  navigator.clipboard.writeText(id.toString());
}
</script>

<template>
  <section>
    <h1 class="font-semibold text-2xl">Quản lý danh sách bài viết</h1>

    <DefineTemplate v-slot="{ post }">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="h-8 w-8 p-0">
            <span class="sr-only">Open menu</span>
            <MoreHorizontal class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem @click="copy(post.id)">
            Sao chép ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="deleteItem(post.id)">
            Xoá
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NuxtLink :to="`/admin/quan-ly-bai-viet/${post.id}`" class="w-full"
              >Chi tiết</NuxtLink
            >
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DefineTemplate>
    <div class="w-full">
      <div class="flex items-center py-4 gap-2">
        <Input
          class="max-w-sm"
          placeholder="Tìm kiếm theo tiêu đề..."
          :model-value="search"
          @update:model-value="search = $event"
        />
        <NuxtLink
          to="/admin/quan-ly-bai-viet/them-moi"
        >
          <Button><PlusSquareIcon />Tạo mới</Button>
        </NuxtLink>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="ml-auto">
              Cột <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              v-for="column in table
                .getAllColumns()
                .filter((column) => column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :model-value="column.getIsVisible()"
              @update:model-value="
                (value) => {
                  column.toggleVisibility(!!value);
                }
              "
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="rounded-md border min-h-[532px]">
        <Table>
          <TableHeader>
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <template v-for="row in table.getRowModel().rows" :key="row.id">
                <TableRow :data-state="row.getIsSelected() && 'selected'">
                  <TableCell
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </TableCell>
                </TableRow>
                <TableRow v-if="row.getIsExpanded()">
                  <TableCell :colspan="row.getAllCells().length">
                    {{ JSON.stringify(row.original) }}
                  </TableCell>
                </TableRow>
              </template>
            </template>

            <TableRow v-else>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Không có kết quả.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
          {{ table.getFilteredSelectedRowModel().rows.length }} trong số
          {{ table.getFilteredRowModel().rows.length }} hàng được chọn.
        </div>
        <PaginationPage
          class="mt-6"
          :page="pagination.current_page"
          :total-pages="pagination.last_page"
          @change="page = $event"
        />
      </div>
    </div>
  </section>
</template>
