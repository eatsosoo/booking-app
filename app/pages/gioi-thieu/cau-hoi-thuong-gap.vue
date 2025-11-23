<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
</script>

<template>
  <div>
    <section class="w-full">
      <!-- Hero section -->
      <div class="relative h-[250px] md:h-[400px] w-full">
        <img
          src="https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg"
          alt="Booking team"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Câu hỏi thường gặp
          </h1>
        </div>
      </div>
    </section>
    <section class="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <!-- Title -->
      <!-- <div class="text-center space-y-3">
        <h1 class="text-4xl font-bold">Câu hỏi thường gặp</h1>
        <p class="text-muted-foreground text-lg">
          Tìm câu trả lời nhanh cho những thắc mắc phổ biến về BookingApp.
        </p>
      </div> -->

      <!-- FAQ Accordion -->
      <Accordion type="single" collapsible class="w-full space-y-4">
        <!-- 1 -->
        <AccordionItem value="item-1">
          <AccordionTrigger>
            BookingApp có miễn phí khi sử dụng không?
          </AccordionTrigger>
          <AccordionContent>
            Có. Người dùng có thể tìm kiếm, xem chi tiết phòng và đặt phòng hoàn
            toàn miễn phí. Các khoản phí (nếu có) sẽ được hiển thị rõ trong quá
            trình đặt phòng.
          </AccordionContent>
        </AccordionItem>

        <!-- 2 -->
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Tôi có thể hủy phòng sau khi đặt không?
          </AccordionTrigger>
          <AccordionContent>
            Việc hủy phòng phụ thuộc vào chính sách của từng khách sạn hoặc
            homestay. BookingApp sẽ hiển thị rõ thông tin hủy miễn phí hoặc
            không hỗ trợ hoàn tiền trước khi bạn đặt.
          </AccordionContent>
        </AccordionItem>

        <!-- 3 -->
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Giá phòng trên BookingApp đã bao gồm thuế và phí chưa?
          </AccordionTrigger>
          <AccordionContent>
            Một số phòng đã bao gồm thuế và phí, một số khác thì không. Điều này
            sẽ được hiển thị chi tiết ngay dưới mục giá để bạn dễ dàng kiểm tra.
          </AccordionContent>
        </AccordionItem>

        <!-- 4 -->
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Tôi có thể thanh toán bằng những hình thức nào?
          </AccordionTrigger>
          <AccordionContent>
            Chúng tôi hỗ trợ nhiều phương thức thanh toán: chuyển khoản, mã QR,
            thẻ ngân hàng, ví điện tử và thanh toán tại nơi lưu trú (tùy chỗ).
          </AccordionContent>
        </AccordionItem>

        <!-- 5 -->
        <AccordionItem value="item-5">
          <AccordionTrigger>
            BookingApp có hỗ trợ khách hàng 24/7 không?
          </AccordionTrigger>
          <AccordionContent>
            Có. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc
            của bạn 24/7 qua chat hoặc hotline.
          </AccordionContent>
        </AccordionItem>

        <!-- 6 -->
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Tôi có thể xem hình ảnh thật của phòng không?
          </AccordionTrigger>
          <AccordionContent>
            Toàn bộ hình ảnh được cung cấp bởi chủ cơ sở hoặc khách hàng đã trải
            nghiệm thực tế. BookingApp cam kết tối ưu tính minh bạch và chất
            lượng hình ảnh.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  </div>
</template>
