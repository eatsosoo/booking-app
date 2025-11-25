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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-vue-next";
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

export interface Room {
  id: number;
  name: string;
  amount: number;
  status: "pending" | "active" | "inactive" | "maintenance";
  project: string;
  type: string;
}

const data: Room[] = [
  {
    id: 1,
    name: "Vinhomes Smart City Studio",
    status: "active",
    project: "Vinhomes Smart City",
    type: "chung cư mini",
    amount: 2500000
  },
  {
    id: 2,
    name: "Sunshine Riverside Villa Premium",
    status: "pending",
    project: "Sunshine Riverside",
    type: "villa",
    amount: 8500000
  },
  {
    id: 3,
    name: "Ecopark Grand Hotel & Resort",
    status: "inactive",
    project: "Ecopark Grand",
    type: "khách sạn",
    amount: 4200000
  },
  {
    id: 4,
    name: "The Zei Mỹ Đình Mini Apartment",
    status: "active",
    project: "The Zei Mỹ Đình",
    type: "chung cư mini",
    amount: 1800000
  },
  {
    id: 5,
    name: "Masteri Centre Point Homestay",
    status: "maintenance",
    project: "Masteri Centre Point",
    type: "homestay",
    amount: 3200000
  },
  {
    id: 6,
    name: "FLC Sầm Sơn Luxury Hotel",
    status: "active",
    project: "FLC Sầm Sơn",
    type: "khách sạn",
    amount: 5500000
  },
  {
    id: 7,
    name: "Hado Centrosa Garden Villa",
    status: "pending",
    project: "Hado Centrosa Garden",
    type: "villa",
    amount: 7200000
  },
  {
    id: 8,
    name: "Times City Park Hill Homestay",
    status: "active",
    project: "Times City Park Hill",
    type: "homestay",
    amount: 2900000
  },
  {
    id: 9,
    name: "Vinpearl Discovery Coastal Hotel",
    status: "inactive",
    project: "Vinpearl Discovery",
    type: "khách sạn",
    amount: 6800000
  },
  {
    id: 10,
    name: "Vinhomes Ocean Park Mini Studio",
    status: "maintenance",
    project: "Vinhomes Ocean Park",
    type: "chung cư mini",
    amount: 2100000
  },
  {
    id: 11,
    name: "Sunshine City Premium Villa",
    status: "active",
    project: "Sunshine City",
    type: "villa",
    amount: 9200000
  },
  {
    id: 12,
    name: "Royal City Center Homestay",
    status: "pending",
    project: "Royal City",
    type: "homestay",
    amount: 3800000
  },
  {
    id: 13,
    name: "Gemek Premium Business Hotel",
    status: "active",
    project: "Gemek Premium",
    type: "khách sạn",
    amount: 4700000
  },
  {
    id: 14,
    name: "Lotte Residence Mini Apartment",
    status: "maintenance",
    project: "Lotte Residence",
    type: "chung cư mini",
    amount: 1950000
  },
  {
    id: 15,
    name: "InterContinental Phú Quốc Beach Villa",
    status: "active",
    project: "InterContinental Phú Quốc",
    type: "villa",
    amount: 12500000
  },
  {
    id: 16,
    name: "Mường Thanh Grand Hotel",
    status: "inactive",
    project: "Mường Thanh",
    type: "khách sạn",
    amount: 3600000
  },
  {
    id: 17,
    name: "D'.El Dorado Homestay",
    status: "active",
    project: "D'.El Dorado",
    type: "homestay",
    amount: 2750000
  },
  {
    id: 18,
    name: "Harbor City Mini Studio",
    status: "pending",
    project: "Harbor City",
    type: "chung cư mini",
    amount: 2200000
  },
  {
    id: 19,
    name: "Astra Garden Luxury Villa",
    status: "active",
    project: "Astra Garden",
    type: "villa",
    amount: 7800000
  },
  {
    id: 20,
    name: "Somerset Chancellor Court Hotel",
    status: "maintenance",
    project: "Somerset",
    type: "khách sạn",
    amount: 5100000
  }
];

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{
  room: {
    id: number;
  };
  onExpand: () => void;
}>();

const columns: ColumnDef<Room>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Tên địa điểm", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("name")),
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Dự án", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("project")),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Danh mục", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("type")),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("status")),
  },
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-right" }, "Giá tiền"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const room = row.original;

      return h(ReuseTemplate, {
        room,
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
  data,
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
  <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4 min-h-[90%]">
    <h1 class="font-semibold text-2xl">Quản lý danh sách phòng</h1>

    <DefineTemplate v-slot="{ room }">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="h-8 w-8 p-0">
            <span class="sr-only">Open menu</span>
            <MoreHorizontal class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem @click="copy(room.id)">
            Sao chép ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Xoá</DropdownMenuItem>
          <DropdownMenuItem>
            <NuxtLink :to="`/admin/quan-ly-phong/${room.id}`">Chi tiết</NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DefineTemplate>
    <div class="w-full">
      <div class="flex items-center py-4">
        <Input
          class="max-w-sm"
          placeholder="Lọc theo tên phòng..."
          :model-value="table.getColumn('name')?.getFilterValue() as string"
          @update:model-value="table.getColumn('name')?.setFilterValue($event)"
        />
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
        <div class="space-x-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
