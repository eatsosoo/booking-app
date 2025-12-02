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
import { PropType } from "vue";

// ===========================
// 📌 Props
// ===========================
const props = defineProps({
  modelValue: {
    type: Object as PropType<DateRange | null>,
    default: null,
  },
  defaultStart: {
    type: Object,
    // default: () => today(getLocalTimeZone()),
  },
  defaultEnd: {
    type: Object,
    // default: () =>
    //   today(getLocalTimeZone()).add({ days: 7 }),
  },
});


// ===========================
// 📌 Emits
// ===========================
const emit = defineEmits<{
  (e: "update:modelValue" | "change", value: DateRange | null): void;
}>();


// ===========================
// 📌 Internal reactive state
// ===========================
const dateRange = ref<DateRange>(
  props.modelValue ?? {
    start: props.defaultStart,
    end: props.defaultEnd,
  }
);

function formatISO(dateValue: any) {
  if (!dateValue) return null;
  const jsDate = dateValue.toDate(getLocalTimeZone());
  return format(jsDate, "yyyy-MM-dd");
}

// ===========================
// 📌 Watch: Đồng bộ props vào nội bộ
// ===========================
watch(
  () => props.modelValue,
  (value) => {
    if (value) dateRange.value = value;
  }
);


// ===========================
// 📌 Watch: Emit khi thay đổi range
// ===========================
watch(
  dateRange,
  (value) => {
    if (value) {
      const formatted = {
        start: formatISO(value.start),
        end: formatISO(value.end),
      };

      emit("update:modelValue", value);
      emit("change", formatted);
    }
  },
  { deep: true }
);

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
      />
    </PopoverContent>
  </Popover>
</template>
