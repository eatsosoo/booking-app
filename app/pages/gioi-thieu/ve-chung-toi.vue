<template>
  <section class="w-full">
    <!-- Hero section -->
    <div class="relative h-[250px] md:h-[400px] w-full">
      <NuxtImg
        src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg"
        alt="Booking team"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 bg-black/40 flex items-center justify-center"
      >
        <h1 class="text-4xl md:text-5xl font-bold text-white">Về Chúng Tôi</h1>
      </div>
    </div>

    <div v-html="aboutPageHtml"></div>

    <!-- Call to action -->
    <div class="py-16 bg-primary text-primary-foreground">
      <div class="max-w-4xl mx-auto text-center space-y-6 px-6">
        <h3 class="text-3xl font-semibold">
          Khám phá trải nghiệm đặt phòng tuyệt vời
        </h3>
        <p class="text-lg opacity-90">
          Tìm kiếm dễ dàng – Đặt phòng nhanh chóng – Trải nghiệm hoàn hảo.
        </p>
        <NuxtLink to="/dia-diem">
          <Button size="lg" variant="secondary"> Bắt đầu ngay </Button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Button } from "@/components/ui/button";
  
  useSeoMeta({
    title: "Về Chúng Tôi - Booking",
    description:
      "Tìm hiểu về chúng tôi và cam kết mang đến trải nghiệm đặt phòng tốt nhất cho bạn.",
  });
  
  const { aboutPageSetting } = useSystemSetting();
  const aboutPageHtml = ref<string>(aboutPageSetting.value.setting_value);
  
  watch(
    () => aboutPageSetting.value,
    (newVal) => {
      aboutPageHtml.value = newVal.setting_value;
    }
  );
</script>
