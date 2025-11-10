<template>
  <section>
    <h1 class="text-3xl font-bold mb-6 text-primary">Danh sách phòng</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard
        v-for="room in rooms"
        :key="room.id"
        class="overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <NuxtImg
          :src="room.image"
          :alt="room.name"
          width="400"
          height="250"
          class="w-full h-52 object-cover"
          format="webp"
        />

        <div class="p-4">
          <h2 class="text-xl font-semibold mb-1">{{ room.name }}</h2>
          <p class="text-gray-600 mb-2">{{ room.description }}</p>
          <p class="text-lg font-bold text-green-600 mb-3">
            {{ formatPrice(room.price) }} / đêm
          </p>

          <UButton color="primary" variant="solid" block @click="bookRoom(room)">
            Đặt ngay
          </UButton>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
const rooms = ref([
  {
    id: 1,
    name: 'Phòng Deluxe Hướng Biển',
    description: 'Tầm nhìn tuyệt đẹp, ban công riêng, miễn phí bữa sáng.',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  },
  {
    id: 2,
    name: 'Phòng Superior',
    description: 'Phòng thoáng mát, nội thất sang trọng, tiện nghi đầy đủ.',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  },
  {
    id: 3,
    name: 'Phòng Gia Đình',
    description: 'Phù hợp cho nhóm hoặc gia đình 4 người, view thành phố.',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  },
]);

const formatPrice = (value: number) =>
  value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const bookRoom = (room: { id: number, name: string }) => {
  alert(`Bạn đã chọn đặt: ${room.name}`);
};

useSeoMeta({
  title: 'Danh sách phòng',
  description: 'Danh sách các phòng khách sạn đẹp, giá tốt, đặt ngay tại Booking App.',
});
</script>
