<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

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

    <!-- Intro -->
    <div class="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h2 class="text-3xl font-semibold">BookingApp là ai?</h2>
      <p class="text-lg leading-relaxed text-muted-foreground">
        <strong>BookingApp</strong> là nền tảng đặt phòng du lịch hiện đại, mang
        đến trải nghiệm tìm kiếm – so sánh – đặt chỗ nhanh chóng, minh bạch và
        tiện lợi. Chúng tôi xây dựng hệ thống với mục tiêu giúp người dùng tìm
        được địa điểm lưu trú phù hợp nhất, với mức giá tối ưu và thông tin rõ
        ràng.
      </p>
    </div>

    <!-- Mission section -->
    <div class="bg-muted py-12">
      <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div class="space-y-4">
          <h3 class="text-2xl font-semibold">Sứ mệnh của chúng tôi</h3>
          <p class="text-muted-foreground">
            BookingApp muốn mang đến sự an tâm cho mỗi chuyến đi bằng cách đảm
            bảo thông tin chính xác, giao diện dễ dùng và tốc độ xử lý nhanh.
            Chúng tôi tin rằng trải nghiệm tốt là yếu tố quan trọng nhất khi
            người dùng lựa chọn dịch vụ.
          </p>
        </div>

        <img
          src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg"
          alt="Mission"
          class="rounded-xl shadow-lg object-cover w-full h-[280px]"
        />
      </div>
    </div>

    <!-- Our values -->
    <div class="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <h3 class="text-2xl font-semibold text-center">Giá trị cốt lõi</h3>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-6 border rounded-xl shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Minh bạch</h4>
          <p class="text-muted-foreground">
            Mọi thông tin phòng, giá và đánh giá đều được hiển thị đầy đủ.
          </p>
        </div>

        <div class="p-6 border rounded-xl shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Nhanh chóng</h4>
          <p class="text-muted-foreground">
            Tối ưu tốc độ tải và tương tác để người dùng đặt phòng chỉ trong vài
            giây.
          </p>
        </div>

        <div class="p-6 border rounded-xl shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Tin cậy</h4>
          <p class="text-muted-foreground">
            Dữ liệu được xác thực từ đối tác và hệ thống đánh giá thực tế.
          </p>
        </div>
      </div>
    </div>

    <!-- Products & Services -->
    <div class="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <h3 class="text-2xl font-semibold text-center">Sản phẩm & Dịch vụ</h3>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="p-6 border rounded-xl bg-white shadow-sm">
          <h4 class="text-xl font-semibold mb-2">Đặt phòng lưu trú</h4>
          <p class="text-muted-foreground">
            Cung cấp hàng nghìn lựa chọn từ khách sạn, resort, homestay đến
            villa cao cấp trên toàn quốc. Người dùng có thể xem chi tiết, so
            sánh giá và đặt phòng trong vài bước.
          </p>
        </div>

        <div class="p-6 border rounded-xl bg-white shadow-sm">
          <h4 class="text-xl font-semibold mb-2">Tư vấn chọn phòng</h4>
          <p class="text-muted-foreground">
            Hỗ trợ gợi ý phòng dựa trên ngân sách, vị trí mong muốn và tiện nghi
            cần có, giúp người dùng dễ dàng tìm lựa chọn phù hợp nhất.
          </p>
        </div>

        <div class="p-6 border rounded-xl bg-white shadow-sm">
          <h4 class="text-xl font-semibold mb-2">Ưu đãi & khuyến mãi</h4>
          <p class="text-muted-foreground">
            Tích hợp ưu đãi độc quyền theo mùa, voucher giảm giá, khuyến mãi
            flash sale giúp tiết kiệm tối đa cho mỗi chuyến đi.
          </p>
        </div>

        <div class="p-6 border rounded-xl bg-white shadow-sm">
          <h4 class="text-xl font-semibold mb-2">
            Đánh giá & xếp hạng thực tế
          </h4>
          <p class="text-muted-foreground">
            Tổng hợp đánh giá chân thực từ khách hàng đã sử dụng dịch vụ giúp
            thông tin minh bạch và đáng tin cậy hơn.
          </p>
        </div>
      </div>
    </div>

    <!-- Unique Selling Points -->
    <div class="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <h3 class="text-2xl font-semibold text-center">
        Điểm khác biệt của BookingApp
      </h3>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-6 rounded-xl border shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Tốc độ vượt trội</h4>
          <p class="text-muted-foreground">
            Hệ thống được tối ưu với SSR và CDN giúp tải trang nhanh, kể cả trên
            mạng yếu.
          </p>
        </div>

        <div class="p-6 rounded-xl border shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Giao diện hiện đại</h4>
          <p class="text-muted-foreground">
            Thiết kế trực quan, thân thiện, kết hợp TailwindCSS và shadcn để
            mang lại trải nghiệm mượt mà.
          </p>
        </div>

        <div class="p-6 rounded-xl border shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Thông tin minh bạch</h4>
          <p class="text-muted-foreground">
            Giá phòng, hình ảnh và đánh giá được cập nhật liên tục, đảm bảo tính
            chính xác và minh bạch.
          </p>
        </div>

        <div class="p-6 rounded-xl border shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Công nghệ thông minh</h4>
          <p class="text-muted-foreground">
            Gợi ý thông minh dựa trên hành vi tìm kiếm, tăng khả năng tìm đúng
            phòng phù hợp.
          </p>
        </div>

        <div class="p-6 rounded-xl border shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Hỗ trợ khách hàng 24/7</h4>
          <p class="text-muted-foreground">
            Đội ngũ tư vấn luôn sẵn sàng hỗ trợ khi người dùng cần trong suốt
            quá trình đặt phòng.
          </p>
        </div>

        <div class="p-6 rounded-xl border shadow-sm bg-white">
          <h4 class="text-xl font-semibold mb-2">Đối tác tin cậy</h4>
          <p class="text-muted-foreground">
            BookingApp hợp tác với hàng trăm đơn vị lớn nhỏ để đem đến sự đa
            dạng và uy tín.
          </p>
        </div>
      </div>
    </div>

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
