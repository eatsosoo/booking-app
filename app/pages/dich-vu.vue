<template>
  <div>
    <section
      class="bg-[url('/banner1.jpg')] bg-center bg-cover h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Các loại hình <span class="text-blue-900 font-bold">dịch vụ</span>
        </h1>
      </div>
    </section>

    <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-gray-900 uppercase">Danh sách</h1>
      <p class="text-gray-600 mt-1">
        Kết quả hiển thị cho <span class="font-semibold">9 dịch vụ</span>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.slug"
          class="border border-gray-200 shadow-md rounded-2xl p-4 flex flex-col justify-between"
        >
          <div>
            <div
            :style="{ backgroundImage: `url('${service.image_url}')` }"
            class="h-60 w-full rounded-lg mb-4 bg-cover bg-center"
          ></div>
          <h2 class="text-blue-950 font-bold text-lg leading-6 px-2">
            {{ service.title }}
          </h2>
          <h3 class="text-gray-400 font-semibold text-[14px] px-2">
            {{ service.subtitle }}
          </h3>
          </div>
          <div class="flex justify-between items-center text-primary font-semibold text-md mx-2 border-t border-gray-200 mt-4 pt-2">
            <p class="">
              {{ formatCurrency(service.price) }}
            </p>
            <NuxtLink to="/dich-vu" class="hover:underline">Xem thêm</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const services = ref([
  {
    title: "Vé thuyền Gondola - Mega Grand World Hà Nội",
    subtitle: "Vé thuyền Gondola tại Mega Grand World Hà Nội",
    price: 150000,
    image_url:
      "https://images.pexels.com/photos/261429/pexels-photo-261429.jpeg",
    slug: "ve-thuyen-gondola-mega-grand-world-ha-noi",
  },
  {
    title: "Vé Công viên nước Royal Wave Park ( Biển tạo sóng ) - Ocean Park 2",
    subtitle: "“Nhảy sóng” hết mình tại VinWonders Wave Park",
    price: 150000,
    image_url:
      "https://images.pexels.com/photos/1291448/pexels-photo-1291448.jpeg",
    slug: "ve-cong-vien-nuoc-royal-wave-park-ocean-park-2",
  },
  {
    title: "Vé vịnh biển 4 mùa Paradise - Ocean Park 3",
    subtitle: "Vé vịnh biển 4 mùa Paradise OCP3 (người lớn)",
    price: 150000,
    image_url:
      "https://images.pexels.com/photos/5131194/pexels-photo-5131194.jpeg",
    slug: "ve-vinh-bien-4-mua-paradise-ocean-park-3",
  },
  {
    title: "Vé tham quan Vườn thú Safari - Vinpearl",
    subtitle: "Khám phá thế giới động vật hoang dã đầy thú vị",
    price: 120000,
    image_url:
      "https://images.pexels.com/photos/584184/pexels-photo-584184.jpeg",
    slug: "ve-tham-quan-vuon-thu-safari-vinpearl",
  },
  {
    title: "Vé công viên giải trí Sun World - Đà Nẵng",
    subtitle: "Trải nghiệm các trò chơi cảm giác mạnh và giải trí",
    price: 180000,
    image_url:
      "https://images.pexels.com/photos/185933/pexels-photo-185933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "ve-cong-vien-giai-tri-sun-world-da-nang",
  },
  {
    title: "Vé cáp treo Fansipan - Sapa",
    subtitle: "Chinh phục nóc nhà Đông Dương với cáp treo hiện đại",
    price: 250000,
    image_url:
      "https://images.pexels.com/photos/33908286/pexels-photo-33908286.jpeg",
    slug: "ve-cap-treo-fansipan-sapa",
  },
  {
    title: "Vé tham quan Bảo tàng Hà Nội",
    subtitle: "Tìm hiểu lịch sử và văn hóa Thủ đô ngàn năm văn hiến",
    price: 80000,
    image_url:
      "https://images.pexels.com/photos/236557/pexels-photo-236557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "ve-tham-quan-bao-tang-ha-noi",
  },
  {
    title: "Vé xem biểu diễn nhạc nước - Đầm Sen",
    subtitle: "Show nhạc nước đặc sắc với công nghệ hiện đại",
    price: 100000,
    image_url:
      "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "ve-xem-bieu-dien-nhac-nuoc-dam-sen",
  },
  {
    title: "Vé tham quan Làng Văn hóa các Dân tộc",
    subtitle: "Trải nghiệm văn hóa đa dạng của 54 dân tộc Việt Nam",
    price: 90000,
    image_url:
      "https://images.pexels.com/photos/2422251/pexels-photo-2422251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "ve-tham-quan-lang-van-hoa-cac-dan-toc",
  },
  {
    title: "Vé khu vui chơi trẻ em Kizworld",
    subtitle: "Thế giới thu nhỏ cho bé vui chơi và học tập",
    price: 110000,
    image_url:
      "https://images.pexels.com/photos/724500/pexels-photo-724500.jpeg",
    slug: "ve-khu-vui-choi-tre-em-kizworld",
  },
]);
</script>
