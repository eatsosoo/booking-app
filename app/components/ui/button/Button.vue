<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  disabled: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class, props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none')"
    :disabled="props.disabled"
    aria-disabled="props.disabled"
  >
    <slot />
  </Primitive>
</template>
