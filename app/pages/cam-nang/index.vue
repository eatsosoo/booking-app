<template>
  <div>
    <section
      class="bg-[url('/banner.avif')] bg-center bg-cover h-96 opacity-85 relative flex justify-center"
    >
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50"
      ></div>
      <div
        class="absolute -bottom-4 bg-primary z-10 py-6 px-10 top rounded-tl-4xl rounded-br-4xl shadow-xl max-w-7xl w-full"
      >
        <h1 class="uppercase text-white text-2xl semibold">
          Cẩm nang<span class="text-blue-900 font-bold"> căn hộ</span>
        </h1>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 py-6 gap-4">
        <div class="md:col-span-2">
          <div
            v-for="(item, index) in handbookList"
            :key="index"
            class="flex-row md:flex border-b border-gray-300 py-6"
          >
            <NuxtImg
              :src="item.image_url"
              :alt="item.title"
              class="w-full md:max-w-70 md:max-h-64  rounded-md transition-transform duration-300 hover:scale-105 shadow-2xs"
            />
            <div class="ml-4">
              <h2 class="text-2xl font-semibold mb-2">{{ item.title }}</h2>
              <p class="text-sm text-gray-500 mb-1">{{ item.date }}</p>
              <h3 class="text-lg font-medium mb-1 text-primary">
                {{ item.subtitle }}
              </h3>
              <p class="text-gray-700">{{ item.subcontent }}</p>
              <Button
                variant="link"
                class="p-0 mt-2 relative inline-block underline underline-offset-2 transition-all duration-200 hover:no-underline after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:after:delay-100"
                >Xem chi tiết</Button
              >
            </div>
          </div>

          <div class="mt-6">
            <PaginateWrap />
          </div>
        </div>

        <div>
          <div class="bg-gray-100 rounded-md shadow-xs p-4 mt-2">
            <h2 class="text-2xl font-semibold">Tìm kiếm</h2>
            <InputGroup class="bg-white mt-4 h-12">
              <InputGroupInput placeholder="Nhập từ khoá..." />
              <InputGroupAddon>
                <ClientOnly>
                  <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" />
                </ClientOnly>
              </InputGroupAddon>
              <InputGroupAddon align="line-end" class="mr-2">
                12 results
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div class="p-4">
            <h2 class="text-2xl font-semibold">Danh mục cẩm nang</h2>
            <ul class="mt-4 space-y-2">
              <li v-for="(category, index) in handleCategorise" :key="index">
                <NuxtLink
                  :to="`/cam-nang/${category.slug}`"
                  class="inline-block hover:text-primary hover:underline font-semibold transition-transform duration-200 hover:-translate-y-1"
                >
                  {{ category.title }}
                </NuxtLink>
                <Separator class="my-4" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "~/components/ui/button/Button.vue";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import Separator from "~/components/ui/separator/Separator.vue";

useSeoMeta({
  title: "Cẩm nang căn hộ",
  description:
    "Trang đặt phòng khách sạn, resort, homestay dễ sử dụng và tối ưu SEO.",
});

const handbookList = [
  {
    title: "Bí kíp săn Homestay View Biển Phú Quốc - Trải Nghiệm 'Thiên Đường' Nghỉ Dưỡng",
    date: "2024-12-20",
    subtitle: `Khu nghỉ dưỡng Sunset Sanctuary - Bãi Dài, Phú Quốc`,
    subcontent: "Tổng hợp những homestay view biển đẹp nhất Phú Quốc, từ bình dân đến sang trọng. Cùng SunHomestay khám phá bí quyết đặt phòng giá tốt và trải nghiệm trọn vẹn thiên đường biển đảo.",
    image_url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Homestay Đà Lạt Có View Rừng Thông - Góc 'Sống Ảo' Cực Phẩm Cho Team Mê Xê Dịch",
    date: "2024-11-05",
    subtitle: `The Pine Hill Homestay - Đường Hồ Xuân Hương, Đà Lạt`,
    subcontent: "Đắm chìm trong không gian se lạnh và view rừng thông bạt ngàn tại những homestay Đà Lạt độc đáo. Gợi ý các góc check-in 'cực phẩm' và lịch trình khám phá thành phố sương mù 3 ngày 2 đêm.",
    image_url: "https://images.pexels.com/photos/34514019/pexels-photo-34514019.jpeg",
  },
  {
    title: "Trải Nghiệm Homestay Phố Cổ Hội An - Lưu Trú Gần Sông Hoài, Cổ Kính & Bình Yên",
    date: "2025-02-10",
    subtitle: `RiverSide Homestay Hội An - 45 Nguyễn Phúc Chu`,
    subcontent: "Sống chậm giữa lòng phố cổ với những homestay Hội An mang đậm nét kiến trúc truyền thống. Cẩm nang từ A-Z: chọn vị trí, giá cả, các hoạt động văn hóa và ẩm thực không thể bỏ lỡ.",
    image_url: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Homestay Sapa View Ruộng Bậc Thang - 'Check-in' Mùa Lúa Chín Vàng Óng Ả",
    date: "2024-09-28",
    subtitle: `Mountain Lodge Sapa - Thôn Cát Cát, Sa Pa`,
    subcontent: "Bỏ túi danh sách những homestay Sapa có view ruộng bậc thang đẹp nhất, đặc biệt vào mùa lúa chín. Hướng dẫn trekking, tìm hiểu văn hóa các dân tộc và thưởng thức ẩm thực địa phương.",
    image_url: "https://images.unsplash.com/photo-1543413884-807d73cb32d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Lẩn Trốn Ở Homestay Vịnh Hạ Long - Ngắm Bình Minh Trên Vịnh Di Sản",
    date: "2025-01-08",
    subtitle: `Bayview Homestay Hạ Long - Đường Bãi Cháy`,
    subcontent: "Khám phá những homestay Hạ Long có view vịnh tuyệt đẹp, lý tưởng để ngắm hoàng hôn và bình minh. Kinh nghiệm đặt tour du thuyền, khám phá hang động và thưởng thức hải sản tươi sống.",
    image_url: "https://images.pexels.com/photos/34472001/pexels-photo-34472001.jpeg",
  },
  {
    title: "Homestay Ninh Bình 'View Tam Cốc' - Du Thuyền & Khám Phá Tràng An Cổ Kính",
    date: "2024-10-15",
    subtitle: `Tam Coc Garden Homestay - Xã Ninh Hải, Hoa Lư`,
    subcontent: "Lựa chọn homestay Ninh Bình có hồ bơi vô cực và view núi non hữu tình. Hướng dẫn chi tiết lịch trình 2 ngày 1 đêm: chèo thuyền Tam Cốc, viếng chùa Bái Đính và leo núi Mua.",
    image_url: "https://images.pexels.com/photos/34714129/pexels-photo-34714129.jpeg",
  },
  {
    title: "Homestay Mộc Châu View Đồi Chè - Săn Mây & Trải Nghiệm Văn Hóa Bản Địa",
    date: "2024-08-22",
    subtitle: `Cloudy Hill Homestay - Mộc Châu, Sơn La`,
    subcontent: "Tận hưởng không khí trong lành và ngắm những đồi chè xanh mướt tại Mộc Châu. Gợi ý các homestay độc đáo, hoạt động hái chè, tham quan bản làng và thưởng thức sữa bò tươi.",
    image_url: "https://images.pexels.com/photos/34728867/pexels-photo-34728867.jpeg",
  },
  {
    title: "Homestay Phú Quốc 'Villa Riêng Tư' - Kỳ Nghỉ Đẳng Cấp Cho Gia Đình & Nhóm Bạn",
    date: "2025-03-01",
    subtitle: `Seaside Villa Phú Quốc - Khu Grand World`,
    subcontent: "Trải nghiệm không gian nghỉ dưỡng riêng tư với đầy đủ tiện nghi tại các villa homestay Phú Quốc. Bí quyết tổ chức tiệc BBQ, thư giãn bên hồ bơi và khám phá các điểm vui chơi giải trí.",
    image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  }
];

const handleCategorise = [
  {
    slug: "homestay-vinhomes-smart-city-nam-tu-liem",
    title: "Homestay Vinhomes Smart City - Nam Từ Liêm",
  },
  {
    slug: "homestay-vinhomes-ocean-park-1-gia-lam",
    title: "Homestay Vinhomes Ocean Park 1 - Gia Lâm",
  },
  {
    slug: "homestay-vinhomes-skalake-my-dinh",
    title: "Homestay Vinhomes SkyLake - Mỹ Đình",
  },
  {
    slug: "homestay-vinhomes-ocean-park-23",
    title: "Homestay Vinhomes Ocean Park 2,3",
  },
  {
    slug: "homestay-vinhomes-green-bay-dai-lo-thang-long-nam-tu-liem",
    title: "Homestay Vinhomes Green Bay - Đại Lộ Thăng Long - Nam Từ Liêm",
  },
  {
    slug: "homestay-vinhomes-dcapital-tran-duy-hung",
    title: "Homestay Vinhomes D'capital Trần Duy Hưng",
  },
  {
    slug: "homestay-vinhomes-metropolis-lieu-giai",
    title: "Homestay Vinhomes Metropolis Liễu Giai",
  },
  {
    slug: "vinhomes-co-loa-vinhomes-global-gate-dong-anh",
    title: "Vinhomes Cổ Loa - Vinhomes Global Gate Đông Anh",
  },
  {
    slug: "homestay-times-city",
    title: "Homestay Times City",
  },
  {
    slug: "homestay-flamingo-hai-tien-thanh-hoa",
    title: "Homestay Flamingo Hải Tiến - Thanh Hóa",
  },
  {
    slug: "homestay-quy-nhon",
    title: "Homestay Quy Nhơn",
  },
  {
    slug: "homestay-d-eldorado-tay-ho-tan-hoang-minh-tay-ho",
    title: "Homestay D' Eldorado Tây Hồ - Tân Hoàng Minh Tây Hồ",
  },
];
</script>

<!-- <style lang="css">
li a::after {
    content: "\f178";
    font-family: "Font Awesome 5 Pro";
    font-size: 16px;
    font-weight: 100;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s
}
</style> -->
