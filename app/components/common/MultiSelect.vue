<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { Check, ChevronsUpDown, X } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import type { Option } from "~/types";

const props = defineProps<{
  options: Option[];
  modelValue: (string | number)[];
  placeholder?: string;
  class?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const search = ref("");

const selectedValues = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const filteredOptions = computed(() => {
  return props.options.filter((opt) =>
    opt.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

function toggleValue(val: string | number) {
  const exists = selectedValues.value.includes(val);
  if (exists) {
    selectedValues.value = selectedValues.value.filter((v) => v !== val);
  } else {
    selectedValues.value = [...selectedValues.value, val];
  }
}

function removeValue(val: string | number) {
  selectedValues.value = selectedValues.value.filter((v) => v !== val);
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <button
        class="w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm h-10"
        :class="props.class"
      >
        <div class="flex gap-1 flex-wrap text-left">
          <span
            v-if="selectedValues.length === 0"
            class="text-muted-foreground"
            >{{ placeholder || "Select options" }}</span
          >

          <div
            v-for="val in selectedValues"
            :key="val"
            class="flex items-center bg-muted text-muted-foreground px-2 py-0.5 rounded-md text-xs"
          >
            {{ props.options.find((x) => x.value === val)?.label }}
            <X
              class="w-3 h-3 ml-1 cursor-pointer"
              @click.stop="removeValue(val)"
            />
          </div>
        </div>
        <ChevronsUpDown class="w-4 h-4 opacity-50" />
      </button>
    </PopoverTrigger>

    <PopoverContent class="p-0 w-[260px]">
      <Command>
        <CommandInput v-model="search" placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="opt in filteredOptions"
              :key="opt.value"
              :value="opt.value"
              @select="toggleValue(opt.value)"
            >
              <Check
                class="mr-2 h-4 w-4"
                :class="
                  selectedValues.includes(opt.value)
                    ? 'opacity-100'
                    : 'opacity-0'
                "
              />
              {{ opt.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
