<script setup lang="ts">
import { ref } from "vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { Video } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import UploadVideo from "~/components/common/UploadVideo.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

// form
const video = ref<Video>({
  name: "",
  url: "",
} as Video);


const { request } = useApi();
const pending = ref(false);

const saveVideo = async () => {
  pending.value = true;

  try {
    // POST VIDEO mới
    await request("/videos", {
      method: "POST",
      body: video.value,
    });

    toast.success("Tạo VIDEO thành công!", {
      description: "VIDEO mới đã được thêm.",
    });

    // Chuyển hướng về danh sách VIDEO
    navigateTo("/admin/videos");
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
    <h1 class="text-2xl font-semibold mb-8">Tạo Video mới</h1>

    <div class="grid grid-cols-1 gap-6">
      <!-- Question -->
      <div>
        <Label for="title" class="mb-2 ml-1">Tiêu đề</Label>
        <Input id="title" v-model="video.name" placeholder="Nhập tiêu đề..." />
      </div>

      <!-- Answer -->
      <div>
        <Label for="url" class="mb-2 ml-1">URL</Label>
        <UploadVideo @uploaded="video.url = $event" />
      </div>
    </div>

    <div class="mt-6">
      <Button variant="default" :loading="pending" @click="saveVideo">
        Tạo mới
      </Button>
    </div>
  </section>
</template>
