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
const id = route.params.id;
const { request } = useApi();

const { data, pending, error, refresh } = useAsyncData<Response<Faq>>(
  `faq-${id}`,          // key
  () => request(`/faqs/${id}`),  // GET /faqs/{id} với token
);

const faq = ref<Faq>({} as Faq);

// Khi GET thành công, gán vào form
watch(data, (val) => {
  if (val?.data) {
    faq.value = val.data.items;
  }
});

const saveFaq = async () => {
  try {
    const res = await request(`/faqs/${id}`, {
      method: "PUT",
      body: faq.value,
    });

    toast.success("Cập nhật câu hỏi thường gặp", {
      description: "Câu hỏi thường gặp đã được cập nhật thành công!",
    });

    return res;
  } catch (error: any) {
    const msg = error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau!";
    toast.error("Cập nhật câu hỏi thường gặp", { description: msg });
    return null;
  }
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Chi tiết & Chỉnh sửa FAQ</h1>

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
      <Button variant="default" @click="saveFaq"> Lưu thay đổi </Button>
    </div>
  </section>
</template>
