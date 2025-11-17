<script setup lang="ts">
import { getLocalTimeZone, today } from "@internationalized/date";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "@/components/ui/range-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "reka-ui";

const start = today(getLocalTimeZone());
const end = start.add({ days: 7 });
const dateRange = ref({ start, end }) as Ref<DateRange>;
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-full justify-start text-left font-normal',
            !dateRange.start || !dateRange.end ? 'text-muted-foreground' : ''
          )
        "
      >
        <CalendarIcon />
        {{
          dateRange
            ? `${dateRange.start ? format(dateRange.start, "yyyy/MM/dd") : "Bắt đầu"} - ${
                dateRange.end ? format(dateRange.end, "yyyy/MM/dd") : "Kết thúc"
              }`
            : "Chọn ngày"
        }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <RangeCalendar
        v-model="dateRange"
        layout="month-and-year"
        :number-of-months="2"
        initial-focus
        disable-days-outside-current-view
        @update:model-value="close"
      />
    </PopoverContent>
  </Popover>
</template>
