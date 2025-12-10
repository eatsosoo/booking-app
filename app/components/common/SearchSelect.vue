<script setup lang="ts">
import { Check, ChevronsUpDown, Search } from "lucide-vue-next";
import { ref, watch, computed } from "vue";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";

const props = defineProps<{
  modelValue: string | null;
  frameworks?: { value: string; label: string }[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

// --- Controlled state synced from modelValue ---
const internalValue = ref<{ value: string; label: string } | null>(null);

// Convert frameworks to safe array (tránh undefined)
const items = computed(() => props.frameworks ?? []);

// Sync modelValue -> internalValue
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = items.value.find((f) => f.value === val) || null;
  },
  { immediate: true }
);

// Sync internalValue -> emit
watch(internalValue, (val) => {
  emit("update:modelValue", val?.value ?? null);
});
</script>

<template>
  <Combobox v-model="internalValue" by="value">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline"
          class="justify-between font-normal bg-gray-50 w-full"
        >
          <span v-if="internalValue" v-text="internalValue.label"></span>
          <span v-else class="text-gray-600">Lựa chọn...</span>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <!-- search input -->
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
          placeholder="Tìm kiếm..."
        />
        <span
          class="absolute left-0 inset-y-0 flex items-center justify-center px-3"
        >
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <ComboboxEmpty>Không có dữ liệu.</ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="item in items" :key="item.value" :value="item">
          {{ item.label }}

          <ComboboxItemIndicator>
            <Check class="ml-auto h-4 w-4" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
