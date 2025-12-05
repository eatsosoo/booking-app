<script setup lang="ts">
import { ref } from "vue";
import { useForm } from 'vee-validate';
import { z } from "zod";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { SystemSetting } from "~/types";
import Label from "~/components/ui/label/Label.vue";
import { toast } from "vue-sonner";
import { toTypedSchema } from '@vee-validate/zod';

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const config = useRuntimeConfig()
const route = useRoute();
const { request } = useApi();
const id = route.params.id;

// 1. Define validation schema
const validationSchema = z.object({
  phone_number: z.string()
    .regex(/^(0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/, {
      message: "Số điện thoại không hợp lệ"
    })
    .optional(),

  email: z.string()
    .email("Email không hợp lệ")
    .max(100, "Email quá dài")
    .optional(),

  facebook_url: z.string()
    .url("URL Facebook không hợp lệ")
    .max(500, "URL quá dài")
    .optional(),

  tiktok_url: z.string()
    .url("URL Tiktok không hợp lệ")
    .max(500, "URL quá dài")
    .optional(),

  zalo_url: z.string()
    .url("URL Zalo không hợp lệ")
    .max(500, "URL quá dài")
    .optional(),

  home_page: z.string().optional(),
});


// 2. Setup form with vee-validate
const { handleSubmit, errors, resetForm, meta, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues: {
    phone_number: '',
    email: '',
    facebook_url: '',
    tiktok_url: '',
    zalo_url: '',
    home_page: ''
  }
});

/* -----------------------
   GET DATA
------------------------- */
const { data } = await useAsyncData(`faq-${id}`, () =>
  request<SystemSetting>(`/settings`)
);

// 3. Set initial values when data loads
watch(() => data.value, (newData) => {
  if (newData?.data?.items) {
    resetForm({
      values: {
        phone_number: newData.data.items.phone_number || '',
        email: newData.data.items.email || '',
        facebook_url: newData.data.items.facebook_url || '',
        tiktok_url: newData.data.items.tiktok_url || '',
        zalo_url: newData.data.items.zalo_url || '',
        home_page: newData.data.items.home_page || ''
      }
    });
  }
}, { immediate: true });

const loading = ref<boolean>(false);

/* -----------------------
   UPDATE DATA
------------------------- */
const saveSettings = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await request<SystemSetting>(`/settings/update`, {
      method: "PUT",
      body: {
        phone_number: values.phone_number,
        email: values.email,
        facebook_url: values.facebook_url,
        tiktok_url: values.tiktok_url,
        zalo_url: values.zalo_url,
        home_page: values.home_page
      },
    });

    toast.success("Cấu hình hệ thống", {
      description: "Đã được cập nhật.",
    });
  } catch (err: any) {
    toast.error("Lỗi!", {
      description: err?.data?.message ?? err?.message ?? "Có lỗi xảy ra!",
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-8">Cấu hình hệ thống</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Phone Number -->
      <div>
        <Label for="phone_number" class="mb-2 ml-1">Số điện thoại</Label>
        <VeeField
          v-slot="{ field, errorMessage }"
          name="phone_number"
          :validate-on-input="true"
        >
          <div>
            <Input
              id="phone_number"
              v-bind="field"
              :model-value="field.value"
              placeholder="Nhập số điện thoại..."
              :class="{ 'border-red-500 focus:ring-red-500': errorMessage }"
              @update:model-value="field.onChange"
            />
            <span 
              v-if="errorMessage" 
              class="text-red-500 text-xs mt-1 ml-1 block"
            >
              {{ errorMessage }}
            </span>
          </div>
        </VeeField>
      </div>

      <!-- Facebook URL -->
      <div>
        <Label for="facebook_url" class="mb-2 ml-1">Facebook</Label>
        <VeeField
          v-slot="{ field, errorMessage }"
          name="facebook_url"
          :validate-on-input="true"
        >
          <div>
            <Input
              id="facebook_url"
              v-bind="field"
              :model-value="field.value"
              placeholder="Facebook..."
              :class="{ 'border-red-500 focus:ring-red-500': errorMessage }"
              @update:model-value="field.onChange"
            />
            <span 
              v-if="errorMessage" 
              class="text-red-500 text-xs mt-1 ml-1 block"
            >
              {{ errorMessage }}
            </span>
          </div>
        </VeeField>
      </div>

      <!-- Tiktok URL -->
      <div>
        <Label for="tiktok_url" class="mb-2 ml-1">Tiktok</Label>
        <VeeField
          v-slot="{ field, errorMessage }"
          name="tiktok_url"
          :validate-on-input="true"
        >
          <div>
            <Input
              id="tiktok_url"
              v-bind="field"
              :model-value="field.value"
              placeholder="Tiktok..."
              :class="{ 'border-red-500 focus:ring-red-500': errorMessage }"
              @update:model-value="field.onChange"
            />
            <span 
              v-if="errorMessage" 
              class="text-red-500 text-xs mt-1 ml-1 block"
            >
              {{ errorMessage }}
            </span>
          </div>
        </VeeField>
      </div>

      <!-- Zalo URL -->
      <div>
        <Label for="zalo_url" class="mb-2 ml-1">Zalo</Label>
        <VeeField
          v-slot="{ field, errorMessage }"
          name="zalo_url"
          :validate-on-input="true"
        >
          <div>
            <Input
              id="zalo_url"
              v-bind="field"
              :model-value="field.value"
              placeholder="Zalo..."
              :class="{ 'border-red-500 focus:ring-red-500': errorMessage }"
              @update:model-value="field.onChange"
            />
            <span 
              v-if="errorMessage" 
              class="text-red-500 text-xs mt-1 ml-1 block"
            >
              {{ errorMessage }}
            </span>
          </div>
        </VeeField>
      </div>

      <!-- Email -->
      <div>
        <Label for="email" class="mb-2 ml-1">Email</Label>
        <VeeField
          v-slot="{ field, errorMessage }"
          name="email"
          type="email"
          :validate-on-input="true"
        >
          <div>
            <Input
              id="email"
              v-bind="field"
              :model-value="field.value"
              placeholder="email..."
              :class="{ 'border-red-500 focus:ring-red-500': errorMessage }"
              @update:model-value="field.onChange"
            />
            <span 
              v-if="errorMessage" 
              class="text-red-500 text-xs mt-1 ml-1 block"
            >
              {{ errorMessage }}
            </span>
          </div>
        </VeeField>
      </div>

      <!-- Home Page Content -->
      <div class="col-span-2">
        <Label for="home_page" class="mb-2 ml-1">Nội dung trang chủ</Label>
        <VeeField
          v-slot="{ field }"
          name="home_page"
        >
          <ClientOnly>
            <!-- <TinyEditor
              :model-value="field.value"
              @update:model-value="field.onChange"
            /> -->
            <CommonEditorCustom :api-key="config.public.tinymceKey" />
          </ClientOnly>
        </VeeField>
        <span 
          v-if="errors.home_page" 
          class="text-red-500 text-xs mt-1 ml-1 block"
        >
          {{ errors.home_page }}
        </span>
      </div>
    </div>

    <!-- Form Status -->
    <div class="mt-4 text-sm text-gray-600">
      <p v-if="meta.dirty" class="text-amber-600">
        ⚠️ Có thay đổi chưa được lưu
      </p>
      <p v-else class="text-green-600">
        ✓ Tất cả thay đổi đã được lưu
      </p>
    </div>

    <!-- Save button -->
    <div class="mt-6 flex items-center gap-4">
      <Button 
        variant="default" 
        :disabled="loading || !meta.dirty"
        :class="{ 'opacity-50 cursor-not-allowed': !meta.dirty }"
        @click="saveSettings"
      >
        <span v-if="loading" class="animate-spin mr-2">↻</span>
        {{ loading ? 'Đang lưu...' : 'Lưu thay đổi' }}
      </Button>

      <Button 
        v-if="meta.dirty" 
        variant="outline" 
        :disabled="loading"
        @click="resetForm()"
      >
        Hủy thay đổi
      </Button>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add custom styles for validation */
input:invalid, 
input.border-red-500 {
  border-color: #ef4444;
}

input:focus.border-red-500 {
  --tw-ring-color: #ef4444;
}
</style>