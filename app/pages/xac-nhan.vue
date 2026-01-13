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
            <Input
              v-model="guestInfo.name"
              placeholder="Họ và tên*"
              class="h-12"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                v-model="guestInfo.phone"
                placeholder="Số điện thoại*"
                class="h-12"
              />
              <Input
                v-model="guestInfo.email"
                placeholder="Email*"
                class="h-12"
              />
            </div>
            <Textarea v-model="guestInfo.note" placeholder="Ghi chú" />
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
            <RadioGroup v-model="guestInfo.method_payment">
              <div class="space-y-2">
                <Label class="font-semibold"
                  >Giữ chỗ trước, thanh toán sau</Label
                >
                <p class="text-gray-600">
                  Giải pháp hoàn hảo khi bạn chưa sẵn sàng thanh toán nhưng muốn
                  đảm bảo phòng không bị tăng giá...
                </p>
                <div class="flex items-start gap-3">
                  <RadioGroupItem value="option1" />
                  <Label class=""
                    >Chỉ cần đặt phòng, chúng tôi sẽ liên hệ để hỗ trợ...</Label
                  >
                </div>
              </div>

              <Separator />

              <div class="space-y-2 pt-3">
                <Label class="font-semibold"
                  >Trả trước một phần tiền phòng</Label
                >
                <p class="text-gray-600">
                  Bạn sẽ thanh toán trước một phần tiền phòng hôm nay...
                </p>

                <div class="flex items-start gap-3">
                  <RadioGroupItem value="option2" />
                  <Label class="">Phần còn lại thanh toán khi nhận phòng</Label>
                </div>
              </div>

              <Separator />

              <div class="space-y-2 pt-3">
                <Label class="font-semibold">Trả toàn bộ tiền phòng</Label>
                <p class="text-gray-600">
                  Bạn sẽ thanh toán toàn bộ tiền phòng hôm nay...
                </p>

                <div class="flex items-start gap-3">
                  <RadioGroupItem value="option3" />
                  <Label class="">Thanh toán toàn phần</Label>
                </div>
              </div>
            </RadioGroup>
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
              <a
                class="text-blue-600 underline cursor-pointer"
                @click="router.back()"
                >Thay đổi</a
              >
            </div>
            <div class="flex justify-between">
              <div>
                <!-- <p>Thứ 6</p> -->
                <p>{{ orderData.times.start_date }}</p>
                <p>Nhận phòng: {{ orderData.times.start_time }}</p>
              </div>
              <div class="text-right">
                <!-- <p>Thứ 7</p> -->
                <p>{{ orderData.times.end_date }}</p>
                <p>Trả phòng: {{ orderData.times.end_time }}</p>
              </div>
            </div>

            <Separator />

            <div class="flex justify-between">
              <span class="font-semibold">Số lượng khách</span>
              <a
                class="text-blue-600 underline cursor-pointer"
                @click="router.back()"
                >Thay đổi</a
              >
            </div>
            <p class="text-gray-700">{{ orderData.amount_guest }} người</p>

            <Separator />

            <div class="flex justify-between font-semibold">
              <span>Giá tiền dự kiến</span>
              <span>{{ formatCurrency(orderData.total) }}</span>
            </div>

            <Button
              class="w-full h-12 mt-4"
              :loading="loading"
              @click="submitOrder"
              >Đặt chỗ</Button
            >
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
import { toast } from "vue-sonner";
import { formatCurrency } from "~/utils/string-helper";
import type { Booking, Response } from "~/types";

const storageData = sessionStorage.getItem("order");
const router = useRouter();
const config = useRuntimeConfig();

if (!storageData) {
  router.back();
}
const orderData = ref(JSON.parse(storageData ?? ""));
const loading = ref<boolean>(false);
const guestInfo = reactive({
  name: "",
  phone: "",
  email: "",
  note: "",
  method_payment: "option1",
});

const submitOrder = async () => {
  const toastTitle = "Xác nhận đặt phòng";
  const { name, phone, email } = guestInfo;
  if (!name || !phone || !email) {
    toast.warning(toastTitle, {
      description: "Vui lòng điền đủ thông tin liên hệ",
    });
    return;
  }

  try {
    const data = await $fetch<Response<Booking>>(
      `${config.public.apiBase}/home/booking`,
      {
        method: "POST",
        body: {
          ...guestInfo,
          property_id: orderData.value.room_id,
          booking_info: orderData.value,
        },
      }
    );

    toast.success(toastTitle, {
      description: "Đặt phòng thành công!",
    });
    navigateTo(`/cam-on?code=${data.data.items.id}`);
  } catch (err: any) {
    toast.error(toastTitle, {
      description:
        err?.data?.message ?? "Có lỗi xảy ra khi đặt chỗ, vui lòng thử lại!",
    });
  } finally {
    loading.value = false;
  }
};
</script>
