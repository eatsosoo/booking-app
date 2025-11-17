<template>
  <div>
    <section class="cus-container">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div class="md:my-auto">
          <h1 class="text-6xl font-semibold mb-8">
            Sun Homestay - Căn hộ dịch vụ Vinhomes Hà Nội
          </h1>
          <p class="font-semibold">
            Chuỗi căn hộ dịch vụ Vinhomes Smart City - Vinhomes Ocean Park. Cho
            thuê theo giờ/ngày/tuần/tháng. Check in-out tự động 24/7 riêng tư,
            bảo mật như khách sạn với vô vạn tiện ích 5*: Pool, Gym, Biển Hồ,
            Vườn Nhật, Shopping
          </p>
        </div>
        <div class="flex justify-center md:justify-end">
          <NuxtImg
            src="https://sunhomestay.vn/uploads/2023/12/setting/y966i17028867531606749051vuon nhat vinhomes smart city.jpg"
            class="rounded-t-[50%] max-h-96"
            alt="banner"
          />
        </div>
      </div>

      <div class="md:flex md:justify-center w-full m">
        <SearchForm />
      </div>
    </section>

    <section class="bg-primary">
      <div class="cus-container">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-24">
          <div class="bg-white p-8 rounded-tl-4xl rounded-br-4xl">
            <NuxtImg src="/svg/gt_dv_2.svg" class="h-24 mx-auto mb-6" />
            <h2 class="font-bold text-2xl mb-6 uppercase">LO TỪ A-Z</h2>
            <p>
              Đội ngũ Lala Team đồng hành hỗ trợ mọi vấn đề của khách hàng từ
              trước, trong và sau chuyến đi.
            </p>
          </div>
          <div class="bg-white p-8 rounded-tl-4xl rounded-br-4xl">
            <NuxtImg src="/svg/gt_dv_1.svg" class="h-24 mx-auto mb-6" />
            <h2 class="font-bold text-2xl mb-6 uppercase">Chính xác</h2>
            <p>
              Tất cả các thông tin về dịch vụ đều được cung cấp một cách rõ ràng
              và minh bạch để khách hàng dễ dàng đưa ra lựa chọn phù hợp nhất.
            </p>
          </div>
          <div class="bg-white p-8 rounded-tl-4xl rounded-br-4xl">
            <NuxtImg src="/svg/gt_dv_3.svg" class="h-24 mx-auto mb-6" />
            <h2 class="font-bold text-2xl mb-6 uppercase">Nhiệt tình</h2>
            <p>
              Luôn sẵn sàng giải đáp thắc mắc và hỗ trợ khách hàng xuyên suốt
              hành trình.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Trang chủ",
  description:
    "Trang đặt phòng khách sạn, resort, homestay dễ sử dụng và tối ưu SEO.",
});
</script>
