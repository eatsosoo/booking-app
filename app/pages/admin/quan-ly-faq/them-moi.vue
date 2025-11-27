<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Faq, Response } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { toast } from "vue-sonner";

definePageMeta({
    layout: 'admin'
})

const router = useRouter();
const config = useRuntimeConfig();

const apiCreate = `${config.public.apiBase}/faqs`;

// form
const faq = ref<Faq>({
  question: "",
  answer: "",
} as Faq);

const pending = ref(false);

const savefaq = async () => {
  pending.value = true;

  try {
    const res: any = await $fetch(apiCreate, {
      method: "POST",
      body: faq.value,
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Tạo FAQ thành công!", {
      description: "FAQ mới đã được thêm.",
    });

    // chuyển về danh sách
    router.push("/admin/quan-ly-faq");
  } catch (err: any) {
    toast.error("Lỗi!", {
      description:
        err?.data?.message ||
        err?.message ||
        "Có lỗi xảy ra, vui lòng thử lại!",
    });
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Tạo mới FAQ</h1>

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

    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="savefaq">
        Tạo mới
      </Button>
    </div>
  </section>
</template>
