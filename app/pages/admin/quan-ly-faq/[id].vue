<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Faq, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";

const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.id;

const apiUrl = `${config.public.apiBase}/faqs/${id}`;
const { data } = useFetch<Response<Faq>>(apiUrl);

const faq = ref<Faq>(data.value?.data.items || ({} as Faq));
const message = ref<string>("");

const { execute, pending, error } = useFetch<Response<Faq>>(apiUrl, {
  method: "PUT",
  body: faq.value,
  immediate: false,
});

watch(data, (val) => {
  if (val?.data.items) {
    faq.value = val.data.items;
  }
});

const savefaq = async () => {
  await execute();
  if (error.value) {
    message.value =
      error.value?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error("Cập nhật câu hỏi thường gặp", {
      description: message.value,
    });
  } else {
    toast.success("Cập nhật câu hỏi thường gặp", {
      description: "câu hỏi thường gặp đã được cập nhật thành công!",
    });
  }
};
</script>

<template>
  <section class="w-full px-6 py-10 max-w-7xl mx-auto mt-4">
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa FAQ</h1>

    <div class="grid grid-cols-1 gap-6">
      <!-- Title -->
      <div>
        <Label for="title" class="mb-2 ml-1">Câu hỏi</Label>
        <Input
          id="title"
          v-model="faq.question"
          placeholder="Nhập câu hỏi..."
        />
      </div>

      <!-- Description -->
      <div>
        <Label for="answer" class="mb-2 ml-1">Mô tả</Label>
        <Textarea
          id="answer"
          v-model="faq.answer"
          placeholder="Nhập mô tả..."
        />
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="savefaq"
        >Lưu thay đổi</Button
      >
    </div>
  </section>
</template>
