<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Faq } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const { request } = useApi();
const id = route.params.id;

/* -----------------------
   GET DATA
------------------------- */
const { data } = await useAsyncData(`faq-${id}`, () =>
  request<Faq>(`/faqs/${id}`)
);
const faq = ref<Faq>(data.value?.data.items || ({} as Faq));
const loading = ref<boolean>(false);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveFaq = async () => {
  loading.value = true;

  try {
    await request<Faq>(`/faqs/${id}`, {
      method: "PUT",
      body: faq.value,
    });

    toast.success("Tạo FAQ mới", {
      description: "FAQ đã được cập nhật.",
    });

    navigateTo("/admin/quan-ly-faq");
  } catch (err: any) {
    toast.error("Lỗi!", {
      description: err?.data?.message ?? err?.message ?? "Có lỗi xảy ra!",
    });
  } finally {
    loading.value = false;
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
