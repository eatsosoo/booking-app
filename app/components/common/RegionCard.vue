<template>
  <div class="relative h-[260px] rounded-t-xl overflow-hidden">
    <!-- tất cả ảnh render 1 lần -->
    <NuxtImg
      v-for="(img, i) in images"
      :key="img"
      :src="img"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
      :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"
      loading="eager"
      decoding="async"
      format="webp"
      :alt="`Tìm kiếm phong loại ${property.label} khu vực ${region}`"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  images: Array,
  region: String,
  property: String,
});

const activeIndex = ref(0);
let timer;

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.images.length;
  }, 3000);
});

onUnmounted(() => clearInterval(timer));
</script>
