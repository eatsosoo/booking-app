<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// shadcn-vue
import { Button } from "@/components/ui/button";

// Icons
import {
  Bold,
  Italic,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  ImageIcon,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  ListOrdered,
} from "lucide-vue-next";
import type { Response } from "~/types";

const config = useRuntimeConfig();

const modelValue = defineModel<string>({ default: "" });
const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const imageInput = ref<HTMLInputElement | null>(null);
const editor = ref<Editor | null>(null);

onMounted(() => {
  editor.value = new Editor({
    content: modelValue.value,
    extensions: [
      StarterKit.configure({
        bold: {},
        italic: {},
      }),
      TextAlign.configure({
        types: ["paragraph", "heading", "image"],
      }),
      Image,
    ],
    onUpdate({ editor }) {
      modelValue.value = editor.getHTML();
      emits("update:modelValue", modelValue.value);
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("media", file);

    const { data, error } = await useFetch<Response<string>>(
      `${config.public.apiBase}/home/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (error.value) {
      console.error("Upload failed:", error.value);
      return;
    }

    const imageUrl = data.value?.data.items ?? "";

    editor.value
      ?.chain()
      .focus()
      .setImage({ src: imageUrl as string })
      .run();
  } catch (error) {
    console.error("Upload image error:", error);
  } finally {
    target.value = "";
  }
};

const setLink = () => {
  const previousUrl = editor.value?.getAttributes("link").href;
  const url = window.prompt("Nhập URL", previousUrl);

  if (url === null) {
    return;
  } else if (url === "") {
    editor.value?.chain().focus().unsetLink().run();
    return;
  }

  editor.value
    ?.chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};
</script>

<template>
  <div class="border rounded-lg">
    <!-- Toolbar -->
    <div class="flex items-center gap-2 border-b px-2 py-2 bg-muted/40">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="w-[90px] justify-between">
            {{
              editor?.isActive("heading", { level: 1 })
                ? "H1"
                : editor?.isActive("heading", { level: 2 })
                  ? "H2"
                  : editor?.isActive("heading", { level: 3 })
                    ? "H3"
                    : "Heading"
            }}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            @click="editor?.chain().focus().setHeading({ level: 1 }).run()"
          >
            H1
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor?.chain().focus().setHeading({ level: 2 }).run()"
          >
            H2
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor?.chain().focus().setHeading({ level: 3 }).run()"
          >
            H3
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor?.chain().focus().setHeading({ level: 4 }).run()"
          >
            H4
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor?.chain().focus().setHeading({ level: 5 }).run()"
          >
            H5
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="editor?.chain().focus().setHeading({ level: 6 }).run()"
          >
            H6
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- Ordered List -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive('orderedList'),
        }"
        @click="editor?.chain().focus().toggleOrderedList().run()"
      >
        <ListOrdered class="w-4 h-4" />
      </Button>

      <!-- Bold -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive('bold'),
        }"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Bold class="w-4 h-4" />
      </Button>

      <!-- Italic -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive('italic'),
        }"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <Italic class="w-4 h-4" />
      </Button>

      <!-- Underline -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive('underline'),
        }"
        @click="editor?.chain().focus().toggleUnderline().run()"
      >
        <UnderlineIcon class="w-4 h-4" />
      </Button>

      <!-- Link -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive('link'),
        }"
        @click="setLink"
      >
        <LinkIcon class="w-4 h-4" />
      </Button>

      <!-- Align Left -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive({
            textAlign: 'left',
          }),
        }"
        @click="editor?.chain().focus().setTextAlign('left').run()"
      >
        <AlignLeft class="w-4 h-4" />
      </Button>

      <!-- Align Center -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive({
            textAlign: 'center',
          }),
        }"
        @click="editor?.chain().focus().setTextAlign('center').run()"
      >
        <AlignCenter class="w-4 h-4" />
      </Button>

      <!-- Align Right -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive({
            textAlign: 'right',
          }),
        }"
        @click="editor?.chain().focus().setTextAlign('right').run()"
      >
        <AlignRight class="w-4 h-4" />
      </Button>

      <!-- Justify -->
      <Button
        size="icon"
        variant="ghost"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive({
            textAlign: 'justify',
          }),
        }"
        @click="editor?.chain().focus().setTextAlign('justify').run()"
      >
        <AlignJustify class="w-4 h-4" />
      </Button>

      <!-- Add Image -->
      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleImageUpload"
      />

      <Button size="icon" variant="secondary" @click="imageInput?.click()">
        <ImageIcon class="w-4 h-4" />
      </Button>
    </div>

    <!-- Editor -->
    <div class="flex flex-col flex-1 items-center overflow-y-scroll">
      <EditorContent
        v-if="editor"
        :editor="editor"
        class="w-7xl my-2 max-h-[800px] focus:outline-none ProseMirror format format-sm sm:format-base lg:format-lg format-blue dark:format-invert border border-dashed rounded-md"
      />
    </div>
  </div>
</template>

<style scoped>
.ProseMirror:focus {
  outline: none;
}
</style>
