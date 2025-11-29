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
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  loading: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :disabled="props.disabled || props.loading"
    :class="cn(
      buttonVariants({ variant, size }),
      props.class,
      props.loading ? 'cursor-not-allowed opacity-70' : ''
    )"
  >
    <!-- Spinner -->
    <span
      v-if="props.loading"
      class="inline-block animate-spin border-2 border-current border-t-transparent rounded-full w-4 h-4 mr-2"
    ></span>

    <!-- slot content -->
    <slot />
  </Primitive>
</template>
