<script setup lang="ts">
import { ref, watch } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Faq, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.id;

const apiUrl = `${config.public.apiBase}/faqs/${id}`;

// GET → lấy dữ liệu FAQ
const { data } = useFetch<Response<Faq>>(apiUrl);

const faq = ref<Faq>({} as Faq);
const message = ref("");

// Khi GET thành công, gán vào form
watch(data, (val) => {
  if (val?.data) {
    faq.value = val.data.items;
  }
});

// Hàm lưu
const savefaq = async () => {
  // PUT → cập nhật FAQ
  const { execute, error } = useFetch<Response<Faq>>(apiUrl, {
    method: "PUT",
    body: faq.value,
    immediate: true,
  });

  await execute();
  if (error.value) {
    message.value =
      error.value?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error("Cập nhật câu hỏi thường gặp", {
      description: message.value,
    });
  } else {
    toast.success("Cập nhật câu hỏi thường gặp", {
      description: "Câu hỏi thường gặp đã được cập nhật thành công!",
    });
  }
};
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa FAQ</h1>
      <NuxtLink
        to="/admin/quan-ly-faq"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        ← Quay lại
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <!-- Question -->
      <div>
        <Label for="title" class="mb-2 ml-1">Câu hỏi</Label>
        <Input
          id="title"
          v-model="faq.question"
          placeholder="Nhập câu hỏi..."
        />
      </div>

      <!-- Answer -->
      <div>
        <Label for="answer" class="mb-2 ml-1">Câu trả lời</Label>
        <Textarea
          id="answer"
          v-model="faq.answer"
          placeholder="Nhập câu trả lời..."
        />
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" @click="savefaq"> Lưu thay đổi </Button>
    </div>
  </section>
</template>
