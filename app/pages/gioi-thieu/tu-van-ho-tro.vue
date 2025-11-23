<template>
  <section>
    <div class="relative h-[250px] md:h-[400px] w-full">
      <NuxtImg
        src="https://images.pexels.com/photos/2965773/pexels-photo-2965773.jpeg"
        alt="Booking team"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 bg-black/40 flex items-center justify-center"
      >
        <h1 class="text-4xl md:text-5xl font-bold text-white">Tư vấn & Hỗ trợ</h1>
      </div>
    </div>
    <div class="max-w-5xl mx-auto py-10 px-4">
      <p class="text-gray-600 mb-8">
        Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình đặt phòng.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form liên hệ -->
        <div class="lg:col-span-2 space-y-6">
          <Card>
            <CardContent class="space-y-4 p-6">
              <h2 class="text-xl font-semibold mb-4">Gửi yêu cầu hỗ trợ</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label class="mb-1 block">Họ và tên</Label>
                  <Input placeholder="Nhập họ tên" />
                </div>
                <div>
                  <Label class="mb-1 block">Số điện thoại</Label>
                  <Input placeholder="Số điện thoại" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label class="mb-1 block">Email</Label>
                  <Input placeholder="Email" />
                </div>
                <div>
                  <Label class="mb-1 block">Chủ đề</Label>
                  <Input placeholder="Chủ đề hỗ trợ" />
                </div>
              </div>

              <div>
                <Label class="mb-1 block">Nội dung</Label>
                <Textarea
                  rows="5"
                  placeholder="Mô tả vấn đề bạn cần hỗ trợ..."
                />
              </div>

              <Button class="mt-2 w-full md:w-auto">Gửi yêu cầu</Button>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar thông tin hỗ trợ -->
        <div class="space-y-6">
          <Card>
            <CardContent class="p-6 space-y-3">
              <h2 class="text-lg font-semibold">Thông tin liên hệ</h2>
              <p class="text-gray-600">
                Nếu bạn cần hỗ trợ nhanh, hãy liên hệ trực tiếp:
              </p>
              <ul class="space-y-2 text-gray-700">
                <li>📞 Hotline: <strong>0987 654 321</strong></li>
                <li>📧 Email: <strong>support@booking.com</strong></li>
                <li>⏰ Thời gian: 08:00 - 22:00 mỗi ngày</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="p-6 space-y-3">
              <h2 class="text-lg font-semibold">Câu hỏi thường gặp</h2>
              <ul class="space-y-2 list-disc pl-5 text-gray-700">
                <li>Thay đổi ngày nhận/trả phòng?</li>
                <li>Hủy đặt phòng và hoàn tiền?</li>
                <li>Hướng dẫn thanh toán?</li>
                <li>Hỗ trợ sự cố trong quá trình đặt phòng</li>
              </ul>
              <NuxtLink to="/gioi-thieu/cau-hoi-thuong-gap">
                <Button variant="outline" class="w-full mt-3"
                  >Xem chi tiết</Button
                >
              </NuxtLink>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
</script>

<style scoped></style>
