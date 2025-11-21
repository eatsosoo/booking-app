<template>
  <div>
    <section
      class="bg-[url('/banner3.avif')] bg-center bg-cover h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Xác nhận "<span class="text-blue-900 font-bold">đặt phòng</span>"
        </h1>
      </div>
    </section>

    <section class="cus-container grid grid-cols-1 lg:grid-cols-3 gap-6 py-10">
      <!-- Left: Contact Info -->
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <Input placeholder="Họ và tên*" class="h-12" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Số điện thoại*" class="h-12" />
              <Input placeholder="Email*" class="h-12" />
            </div>
            <Textarea placeholder="Ghi chú" />
            <p class="text-xs text-red-400">
              Xin lưu ý yêu cầu đặc biệt không được bảo đảm trước và có thể bị
              thu phí.
            </p>
          </CardContent>
        </Card>

        <!-- Payment Method -->
        <Card>
          <CardHeader>
            <CardTitle>Chọn cách thanh toán</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label class="font-semibold">Giữ chỗ trước, thanh toán sau</Label>
              <p class="text-gray-600">
                Giải pháp hoàn hảo khi bạn chưa sẵn sàng thanh toán nhưng muốn
                đảm bảo phòng không bị tăng giá...
              </p>
              <RadioGroup>
                <div class="flex items-start gap-3">
                  <RadioGroupItem value="option1" />
                  <Label class=""
                    >Chỉ cần đặt phòng, chúng tôi sẽ liên hệ để hỗ trợ...</Label
                  >
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div class="space-y-2 pt-3">
              <Label class="font-semibold">Trả trước một phần tiền phòng</Label>
              <p class="text-gray-600">
                Bạn sẽ thanh toán trước một phần tiền phòng hôm nay...
              </p>
              <RadioGroup>
                <div class="flex items-start gap-3">
                  <RadioGroupItem value="option2" />
                  <Label class="">Phần còn lại thanh toán khi nhận phòng</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div class="space-y-2 pt-3">
              <Label class="font-semibold">Trả toàn bộ tiền phòng</Label>
              <p class="text-gray-600">
                Bạn sẽ thanh toán toàn bộ tiền phòng hôm nay...
              </p>
              <RadioGroup>
                <div class="flex items-start gap-3">
                  <RadioGroupItem value="option3" />
                  <Label class="">Thanh toán toàn phần</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Right: Booking Summary -->
      <div class="lg:col-span-1">
        <Card class="sticky top-0">
          <CardContent class="space-y-4">
            <div class="flex gap-3">
              <NuxtImg
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                class="w-40 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 class="font-semibold">Dương xì mini, Nhà bên rừng</h3>
                <a class="text-blue-600 underline">Xem chi tiết căn</a>
              </div>
            </div>

            <Separator />

            <div class="flex justify-between">
              <span class="font-semibold">Thời gian lưu trú</span>
              <a class="text-blue-600 underline">Thay đổi</a>
            </div>
            <div class="flex justify-between">
              <div>
                <p>Thứ 6</p>
                <p>2025/11/14</p>
                <p>Nhận phòng: 14:00</p>
              </div>
              <div class="text-right">
                <p>Thứ 7</p>
                <p>2025/11/15</p>
                <p>Trả phòng: 12:00</p>
              </div>
            </div>

            <Separator />

            <div class="flex justify-between">
              <span class="font-semibold">Số lượng khách (1 khách)</span>
              <a class="text-blue-600 underline">Thay đổi</a>
            </div>
            <p class="text-gray-700">1 người lớn</p>

            <Separator />

            <div class="flex justify-between font-semibold">
              <span>Tổng giá phòng</span>
              <span>1.199.000 đ</span>
            </div>

            <Button class="w-full h-12 mt-4">Đặt chỗ</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "~/components/ui/input/Input.vue";
import Label from "~/components/ui/label/Label.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Button from "~/components/ui/button/Button.vue";
</script>
