<script setup lang="ts">
import { ref } from "vue";
import Select from "~/components/ui/select/Select.vue";
import SelectItem from "~/components/ui/select/SelectItem.vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

// Mock dữ liệu phòng
const room = ref({
  title: "Phòng Deluxe",
  description: "<p>Mô tả chi tiết phòng...</p>",
  price: 2000000,
  project: "Dự án Sun Beach",
  category: "Villa",
  status: "active",
});

// Options
const projects = ["Dự án Sun Beach", "Dự án Ocean View", "Dự án Mountain"];
const categories = ["Khách sạn", "Villa", "Homestay"];
const statuses = [
  { label: "Đang hoạt động", value: "active" },
  { label: "Sửa chữa", value: "maintenance" },
  { label: "Không hoạt động", value: "inactive" },
];

const saveRoom = () => {
  console.log("Room data:", room.value);
  // Gọi API update phòng
};

const editor = useEditor({
  extensions: [StarterKit],
  content: room.value.description,
});

watch(editor, (e) => {
  if (e) {
    e.on("update", () => {
      room.value.description = e.getHTML();
      console.log(room.value.description);
    });
  }
});
</script>

<template>
  <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
    <h1 class="text-2xl font-semibold">Chi tiết & Chỉnh sửa Phòng</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Title -->
      <div>
        <label class="block mb-2 font-medium">Tiêu đề phòng</label>
        <Input v-model="room.title" placeholder="Nhập tiêu đề phòng" />
      </div>

      <!-- Price -->
      <div>
        <label class="block mb-2 font-medium">Giá thành (VND)</label>
        <Input v-model="room.price" type="number" placeholder="Nhập giá" />
      </div>

      <!-- Description -->
      <div class="col-span-1 md:col-span-2">
        <label class="block mb-2 font-medium">Mô tả phòng</label>
        <ClientOnly>
          <TinyEditor />
        </ClientOnly>
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" @click="saveRoom">Lưu thay đổi</Button>
    </div>
  </section>
</template>
