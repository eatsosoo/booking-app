<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import {
  DateFormatter,
  getLocalTimeZone,
  today,
  parseDate,
} from "@internationalized/date";

import { CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ---------------------
// Props
// ---------------------
const props = defineProps({
  placeholder: {
    type: String,
    default: "Chọn ngày",
  },
  modelValue: {
    type: String,
    default: "", // expect 'yyyy-MM-dd'
  },
  min: {
    type: String,
    default: "",
  },
  max: {
    type: String,
    default: "",
  },
});

// ---------------------
// Emits
// ---------------------
const emits = defineEmits(["update:modelValue"]);

// ---------------------
// Internal state
// ---------------------
const date = ref<DateValue | null>(null);

// Convert string → DateValue khi mount
if (props.modelValue) {
  date.value = parseDate(props.modelValue);
}

// Sync khi props thay đổi
watch(
  () => props.modelValue,
  (v) => {
    if (!v) {
      date.value = null;
    } else {
      date.value = parseDate(v);
    }
  }
);

// ---------------------
// Formatter
// ---------------------
const df = new DateFormatter("vi-VN", {
  dateStyle: "long",
});

// ---------------------
// Emit ra string
// ---------------------
function updateDate(newDate: DateValue) {
  date.value = newDate;

  const yyyy = newDate.year;
  const mm = String(newDate.month).padStart(2, "0");
  const dd = String(newDate.day).padStart(2, "0");

  emits("update:modelValue", `${yyyy}-${mm}-${dd}`);
}
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2" />
        {{
          date ? df.format(date.toDate(getLocalTimeZone())) : props.placeholder
        }}
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        :model-value="date"
        @update:modelValue="
          (v) => {
            updateDate(v);
            close();
          }
        "
        :min-value="props.min ? parseDate(props.min) : null"
        :max-value="props.max ? parseDate(props.max) : null"
        layout="month-and-year"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
