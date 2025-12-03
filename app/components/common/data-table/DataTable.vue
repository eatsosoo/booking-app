<template>
  <div class="w-full space-y-4">
    <!-- Header với search và actions -->
    <div class="flex items-center justify-between py-4 gap-2">
      <!-- Search Input -->
      <slot name="search">
        <InputGroup v-if="showSearch" class="max-w-sm">
          <InputGroupInput
            :placeholder="searchPlaceholder"
            :model-value="searchValue"
            @update:model-value="debouncedUpdateSearch"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="clear"
              title="clear"
              size="icon-xs"
              @click="updateSearch('')"
            >
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </slot>

      <!-- Left Actions Slot -->
      <div class="flex items-center gap-2">
        <slot name="left-actions" />
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-2 ml-auto">
        <!-- Custom Actions Slot -->
        <slot name="actions" />

        <!-- Column Visibility -->
        <DropdownMenu v-if="showColumnVisibility">
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
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
              @update:model-value="(value) => column.toggleVisibility(!!value)"
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Table -->
    <div class="relative rounded-md border" :class="tableClass">
      <!-- Loading Overlay -->
      <div
        v-if="loading"
        class="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center"
      >
        <div class="text-center space-y-2">
          <Loader2 class="h-8 w-8 animate-spin mx-auto text-primary" />
          <p class="text-sm text-muted-foreground">{{ loadingText }}</p>
        </div>
      </div>

      <!-- Skeleton Loading (optional) -->
      <div v-else-if="showSkeleton && skeletonLoading" class="p-4 space-y-3">
        <div class="space-y-2">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-3/4" />
        </div>
        <div v-for="i in skeletonRows" :key="i" class="space-y-2">
          <Skeleton class="h-12 w-full" />
        </div>
      </div>

      <Table v-if="!skeletonLoading">
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
              <!-- Main Row -->
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>

              <!-- Expanded Row -->
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  <slot name="expanded" :row="row" :original="row.original" />
                </TableCell>
              </TableRow>
            </template>
          </template>

          <!-- Empty State -->
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <slot name="empty">
                <div class="text-center text-muted-foreground py-8">
                  Không có dữ liệu.
                </div>
              </slot>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between space-x-2 py-4">
      <!-- Selected Rows Info -->
      <div
        v-if="showSelectionInfo"
        class="flex-1 text-sm text-muted-foreground"
      >
        {{ table.getFilteredSelectedRowModel().rows.length }} trong số
        {{ table.getFilteredRowModel().rows.length }} hàng được chọn.
      </div>

      <!-- Pagination Slot -->
      <div class="ml-auto">
        <slot name="pagination" />
      </div>
    </div>
  </div>
</template>

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
import { ChevronDown, Loader2, X } from "lucide-vue-next";

import { valueUpdater } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounceFn } from "@vueuse/core";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import InputGroup from "~/components/ui/input-group/InputGroup.vue";
import InputGroupInput from "~/components/ui/input-group/InputGroupInput.vue";
import InputGroupAddon from "~/components/ui/input-group/InputGroupAddon.vue";
import InputGroupButton from "~/components/ui/input-group/InputGroupButton.vue";

// Props
interface Props<TData> {
  data?: TData[];
  columns?: ColumnDef<TData>[];
  // Table state
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  columnVisibility?: VisibilityState;
  rowSelection?: Record<string, boolean>;
  expanded?: ExpandedState;
  // Search
  showSearch?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  // Features
  showColumnVisibility?: boolean;
  showSelectionInfo?: boolean;
  tableClass?: string;
  // Loading state
  loading?: boolean;
  loadingText?: string;
  showSkeleton?: boolean;
  skeletonRows?: number;
}

const props = withDefaults(defineProps<Props<any>>(), {
  data: () => [],
  columns: () => [],
  sorting: () => [],
  columnFilters: () => [],
  columnVisibility: () => ({}),
  rowSelection: () => ({}),
  expanded: () => ({}),
  showSearch: true,
  searchValue: "",
  searchPlaceholder: "Tìm kiếm...",
  showColumnVisibility: true,
  showSelectionInfo: true,
  loading: false,
  loadingText: "Đang tải dữ liệu...",
  showSkeleton: false,
  skeletonRows: 5,
  tableClass: "min-h-[532px]",
});

// Emits
const emit = defineEmits<{
  "update:sorting": [SortingState];
  "update:columnFilters": [ColumnFiltersState];
  "update:columnVisibility": [VisibilityState];
  "update:rowSelection": [Record<string, boolean>];
  "update:expanded": [ExpandedState];
  "update:search": [string];
  "row-click": [any];
}>();

// Local state
const localSorting = ref<SortingState>(props.sorting);
const localColumnFilters = ref<ColumnFiltersState>(props.columnFilters);
const localColumnVisibility = ref<VisibilityState>(props.columnVisibility);
const localRowSelection = ref<Record<string, boolean>>(props.rowSelection);
const localExpanded = ref<ExpandedState>(props.expanded);

const localSearch = ref(props.searchValue);
const localLoading = ref(props.loading);
const skeletonLoading = ref(false);

// Watch props and update local state
watch(
  () => props.sorting,
  (val) => {
    localSorting.value = val;
  }
);
watch(
  () => props.columnFilters,
  (val) => {
    localColumnFilters.value = val;
  }
);
watch(
  () => props.columnVisibility,
  (val) => {
    localColumnVisibility.value = val;
  }
);
watch(
  () => props.rowSelection,
  (val) => {
    localRowSelection.value = val;
  }
);
watch(
  () => props.expanded,
  (val) => {
    localExpanded.value = val;
  }
);

// Watch loading prop
watch(
  () => props.loading,
  (newValue) => {
    localLoading.value = newValue;

    // Tự động tắt skeleton sau khi loading xong
    if (props.showSkeleton && !newValue) {
      setTimeout(() => {
        skeletonLoading.value = false;
      }, 300);
    } else if (props.showSkeleton && newValue) {
      skeletonLoading.value = true;
    }
  },
  { immediate: true }
);

// Watch search value from parent
watch(
  () => props.searchValue,
  (newValue) => {
    if (newValue !== localSearch.value) {
      localSearch.value = newValue;
    }
  }
);

// Table instance
const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => {
    const value = valueUpdater(updaterOrValue, localSorting);
    localSorting.value = value;
    emit("update:sorting", value);
  },
  onColumnFiltersChange: (updaterOrValue) => {
    const value = valueUpdater(updaterOrValue, localColumnFilters);
    localColumnFilters.value = value;
    emit("update:columnFilters", value);
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    const value = valueUpdater(updaterOrValue, localColumnVisibility);
    localColumnVisibility.value = value;
    emit("update:columnVisibility", value);
  },
  onRowSelectionChange: (updaterOrValue) => {
    const value = valueUpdater(updaterOrValue, localRowSelection);
    localRowSelection.value = value;
    emit("update:rowSelection", value);
  },
  onExpandedChange: (updaterOrValue) => {
    const value = valueUpdater(updaterOrValue, localExpanded);
    localExpanded.value = value;
    emit("update:expanded", value);
  },
  state: {
    get sorting() {
      return localSorting.value;
    },
    get columnFilters() {
      return localColumnFilters.value;
    },
    get columnVisibility() {
      return localColumnVisibility.value;
    },
    get rowSelection() {
      return localRowSelection.value;
    },
    get expanded() {
      return localExpanded.value;
    },
  },
});

// Search handler
const debouncedUpdateSearch = useDebounceFn((value: string) => {
  emit("update:search", value);
}, 1000);

const updateSearch = (value: string) => {
  emit("update:search", value);
};

// Expose table instance
defineExpose({
  table,
});

watch(
  () => props.data,
  (val) => {
    table.setOptions((old) => {
      return {
        ...old,
        data: val,
      };
    });
  },
  { deep: true }
);
</script>
