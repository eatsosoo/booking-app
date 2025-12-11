<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Video } from "~/types";
import Label from "~/components/ui/label/Label.vue";
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
const { data } = await useAsyncData(`video-${id}`, () =>
  request<Video>(`/videos/${id}`)
);
const video = ref<Video>(data.value?.data.items || ({} as Video));
const loading = ref<boolean>(false);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveVideo = async () => {
  loading.value = true;

  try {
    await request<Video>(`/videos/${id}`, {
      method: "PUT",
      body: video.value,
    });

    toast.success("Tạo FAQ mới", {
      description: "FAQ đã được cập nhật.",
    });

    navigateTo("/admin/quan-ly-video");
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
        <Label for="title" class="mb-2 ml-1">Tiêu đề</Label>
        <Input id="title" v-model="video.name" placeholder="Nhập câu hỏi..." />
      </div>

      <!-- Answer -->
      <div>
        <Label for="url" class="mb-2 ml-1">URL</Label>
        <Input id="url" v-model="video.url" placeholder="Nhập url..." />
      </div>
    </div>

    <!-- Save button -->
    <div class="mt-6">
      <Button variant="default" @click="saveVideo"> Lưu thay đổi </Button>
    </div>
  </section>
</template>
