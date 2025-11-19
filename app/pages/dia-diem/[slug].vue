<template>
  <div>
    <section class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <NuxtImg
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          class="h-full"
        />
        <div class="grid grid-cols-2 gap-2">
          <NuxtImg
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          />
          <NuxtImg
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          />
          <NuxtImg
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          />
          <div class="relative">
            <NuxtImg
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            />
            <div
              class="absolute top-0 bottom-0 right-0 left-0 bg-black text-white opacity-50"
            ></div>
            <div
              class="absolute top-0 bottom-0 right-0 left-0 text-white font-semibold flex justify-center items-center text-center"
            >
              Xem tất cả <br> 11 Ảnh
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <!-- Left column -->
        <div class="col-span-2 space-y-6">
          <!-- Thông tin chung -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-4">Thông tin chung</h2>
            <Separator class="mb-4" />
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <span>Loại phòng:</span><strong>Studio</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Diện tích:</span><strong>32m²</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Số khách:</span><strong>1-2 khách</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Phòng ngủ:</span><strong>1 phòng</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Giường ngủ:</span><strong>1 giường</strong>
              </div>
              <div class="flex items-center gap-2">
                <span>Phòng tắm:</span><strong>1 phòng</strong>
              </div>
            </div>
          </div>

          <!-- Thuê theo giờ -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white space-y-4 mb-4">
            <h2 class="font-semibold text-lg">Thuê theo giờ (Tối đa 10 giờ)</h2>
            <Separator class="mb-4" />
            <div>
              <p class="font-medium">2 giờ đầu</p>
              <p class="text-orange-600 font-semibold">350,000đ</p>
              <p class="text-sm text-gray-600">1 giờ tiếp theo + 50,000đ</p>
            </div>

            <div>
              <p class="font-medium">Qua đêm (20:00 - 12:00)</p>
              <p class="text-orange-600 font-semibold">550,000đ</p>
            </div>

            <div>
              <p class="font-medium">Thuê trong ngày (10:00 - 18:00)</p>
              <p class="text-orange-600 font-semibold">550,000đ</p>
            </div>
          </div>

          <!-- Phụ phí thêm người -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h2 class="font-semibold text-lg mb-2">Phụ phí thêm người</h2>
            <Separator class="mb-4" />
            <p class="font-medium">
              <span class="text-orange-600">+ 200,000đ</span> / người (tính từ
              người thứ 3)
            </p>
          </div>

          <!-- Giới thiệu -->
          <div
            class="p-4 border rounded-2xl shadow-sm bg-white leading-relaxed text-sm"
          >
            <h2 class="font-semibold text-lg mb-3">Giới thiệu căn hộ</h2>
            <Separator class="mb-4" />
            <p>
              KÍNH GỬI QUÝ KHÁCH CĂN HỘ DỊCH VỤ SUN HOMESTAY ♥♥♥ Căn hộ
              Homestay được thiết kế nội thất TỐI GIẢN - TINH TẾ - SANG TRỌNG.
              Phù hợp với gia đình, khách công tác, nhóm bạn, cặp đôi... vui
              chơi nghỉ dưỡng và thư giãn, tổ chức sinh nhật, cầu hôn,… Vinhomes
              Smart City - sự kết hợp giữa không gian sống sang trọng cùng với
              các tiện ích đẳng cấp. Là nơi đáng đặt chân đến để tận hưởng trọn
              vẹn sau những ngày tháng bận rộn với công việc. Được xây dựng bởi
              tập đoàn VinGroup đảm bảo An ninh – An toàn. Căn hộ đã được SETUP
              đầy đủ đồ dùng mang đến cảm giác thân thuộc như ở nhà: Phòng
              khách: sofa, tivi kết nối internet có Netflix, bàn ăn,... Khu vực
              bếp: tủ lạnh, xoong, nồi, nồi cơm, bát đũa, gia vị nấu ăn cơ bản,
              bếp từ, hệ thống hút mùi,... Phòng tắm: dầu gội, sữa tắm, khăn
              tắm, máy sấy tóc,... Phòng ngủ: chăn, gối,... Điều hòa 2 chiều,
              wifi miễn phí,... CHECK IN – OUT tự động, linh hoạt, bảo mật thông
              tin. Chuỗi tiện ích đẳng cấp - tiện lợi Công viên trung tâm
              Central Park, Công viên thể thao. Vườn Nhật, Bể bơi ngoài
              trời/trong nhà, khu nướng BBQ ngoài trời, TTTM Vincome Mega
              mall... Siêu thị tiện lợi ngay chân tòa nhà, nhà thuốc, quán cafe,
              quán ăn, Winmart,... Có thể gửi xe máy trong hầm tòa căn hộ với
              mức phí 5.000 đồng/lượt vào; qua đêm 35.000đ/ lượt; ô tô là
              15.000đ/giờ.
            </p>
          </div>
        </div>

        <!-- Right column -->
        <div class="col-span-1 space-y-6">
          <!-- Date & Time selection -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white mb-4">
            <h3 class="font-semibold mb-3">
              <DatePicker placeholder="Chọn ngày nhận phòng" />
            </h3>

            <Tabs default-value="morning">
              <TabsList>
                <TabsTrigger value="morning"> Sáng </TabsTrigger>
                <TabsTrigger value="afternoon"> Chiều </TabsTrigger>
              </TabsList>
              <TabsContent value="morning">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in morningTimes"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="afternoon">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in afternoonTimes"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Separator class="my-4" />

            <h3 class="font-semibold mb-3">
              <DatePicker placeholder="Chọn ngày trả phòng" />
            </h3>

            <Tabs default-value="morning">
              <TabsList>
                <TabsTrigger value="morning"> Sáng </TabsTrigger>
                <TabsTrigger value="afternoon"> Chiều </TabsTrigger>
              </TabsList>
              <TabsContent value="morning">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in morningTimes"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="afternoon">
                <div
                  class="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2"
                >
                  <Button
                    v-for="time in afternoonTimes"
                    :key="time"
                    variant="outline"
                  >
                    {{ time }}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <!-- Số lượng người -->
          <div class="p-4 border rounded-2xl shadow-sm bg-white">
            <p class="font-medium mb-3">Số lượng người</p>
            <div class="flex items-center gap-3">
              <Button variant="outline" class="w-12">-</Button>
              <span class="font-semibold text-lg px-4">2</span>
              <Button variant="outline" class="w-12">+</Button>
            </div>
          </div>

          <!-- Button -->
          <NuxtLink to="/xac-nhan"> 
            <Button class="w-full" size="lg"> Đặt phòng ngay </Button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Button from "~/components/ui/button/Button.vue";
import Separator from "~/components/ui/separator/Separator.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePicker from "~/components/DatePicker.vue";

const morningTimes = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
];
const afternoonTimes = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];
</script>

<style scoped></style>
