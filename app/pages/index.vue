<template>
  <section class="mx-auto my-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div class="md:my-auto">
        <h1 class="text-6xl font-semibold mb-8">Sun Homestay - Căn hộ dịch vụ Vinhomes Hà Nội</h1>
        <p class="font-semibold">Chuỗi căn hộ dịch vụ Vinhomes Smart City - Vinhomes Ocean Park. Cho thuê theo giờ/ngày/tuần/tháng. Check in-out tự động 24/7 riêng tư, bảo mật như khách sạn với vô vạn tiện ích 5*: Pool, Gym, Biển Hồ, Vườn Nhật, Shopping</p>
      </div>
      <div class="flex justify-center md:justify-end">
        <NuxtImg src="https://sunhomestay.vn/uploads/2023/12/setting/y966i17028867531606749051vuon nhat vinhomes smart city.jpg" 
        class="rounded-t-[50%] max-h-96" alt="banner" />
      </div>
    </div>

    <div>
      <SearchForm />
    </div>
    
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Trang chủ",
  description:
    "Trang đặt phòng khách sạn, resort, homestay dễ sử dụng và tối ưu SEO.",
});
</script>
