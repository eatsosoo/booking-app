<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { lowlight } from "lowlight";

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
  Underline as UnderlineIcon,
  Link as LinkIcon,
  ListOrdered,
  PencilLine,
  SuperscriptIcon,
  SubscriptIcon,
  TypeIcon,
  RemoveFormattingIcon,
  PencilOffIcon,
  ImagePlusIcon,
  MessageSquareCodeIcon,
  TextQuoteIcon,
  Undo,
  Redo,
  ImageIcon,
} from "lucide-vue-next";
import type { Response } from "~/types";
import Popover from "./ui/popover/Popover.vue";
import PopoverTrigger from "./ui/popover/PopoverTrigger.vue";
import PopoverContent from "./ui/popover/PopoverContent.vue";
import Input from "./ui/input/Input.vue";

const config = useRuntimeConfig();

// Use explicit props/emits instead of mixed defineModel/defineEmits to avoid confusion
const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const imageInput = ref<HTMLInputElement | null>(null);
const imageInsertUrl = ref<string>("");
const editor = ref<Editor | null>(null);

// Local color state bound to color inputs
const textColor = ref("#000000");
const highlightColor = ref("#fff59d"); // some default highlight yellow

// Code block language selection
const codeLanguage = ref("javascript");

// Undo/Redo availability
const canUndo = ref(false);
const canRedo = ref(false);

onMounted(() => {
  // Initialize with the incoming prop value (or empty string)
  editor.value = new Editor({
    content: props.modelValue ?? "",
    extensions: [
      StarterKit.configure({
        bold: {},
        italic: {},
      }),
      TextAlign.configure({
        types: ["paragraph", "heading", "image"],
      }),
      Image,
      TextStyle,
      Color, // provides setColor/unsetColor
      Highlight.configure({ multicolor: true }), // allow colored highlights
      Superscript,
      Subscript,
      Blockquote,
      // CodeBlockLowlight.configure({
      //   lowlight,
      // }),
    ],
    onUpdate({ editor }) {
      // Only emit; do NOT assign to props/modelValue directly
      const html = editor.getHTML();
      emit("update:modelValue", html);

      // update undo/redo availability on each change
      canUndo.value = editor.can().undo ? editor.can().undo() : false;
      canRedo.value = editor.can().redo ? editor.can().redo() : false;
    },
  });

  // initial undo/redo state
  canUndo.value = editor.value?.can().undo ? editor.value.can().undo() : false;
  canRedo.value = editor.value?.can().redo ? editor.value.can().redo() : false;
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

watch(
  () => props.modelValue,
  (newVal) => {
    // Sync external changes from parent into the editor, but avoid overwriting
    if (!editor.value) return;
    const current = editor.value.getHTML();
    if ((newVal ?? "") !== current) {
      // Use setContent to replace only when different
      editor.value.commands.setContent(newVal ?? "");
    }
  }
);

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

    if (error?.value) {
      console.error("Upload failed:", error.value);
      return;
    }

    const imageUrl = data.value?.data.items ?? "";

    editor.value
      ?.chain()
      .focus()
      .setImage({ src: imageUrl as string })
      .run();
  } catch (err) {
    console.error("Upload image error:", err);
  } finally {
    // reset file input
    if (target) target.value = "";
  }
};

const handleInsertUrl = () => {
  editor.value
      ?.chain()
      .focus()
      .setImage({ src: imageInsertUrl.value })
      .run();

  imageInsertUrl.value = ""
}

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

// Actions for colors / highlight
function applyTextColor() {
  if (!editor.value) return;
  editor.value.chain().focus().setColor(textColor.value).run();
}
function unsetTextColor() {
  if (!editor.value) return;
  // Color extension exposes unsetColor()
  editor.value.chain().focus().unsetColor().run();
}

function applyHighlight() {
  if (!editor.value) return;
  // toggleHighlight accepts { color } in the official extension
  editor.value
    .chain()
    .focus()
    .toggleHighlight({ color: highlightColor.value })
    .run();
}
function unsetHighlight() {
  if (!editor.value) return;
  // toggleHighlight without color will toggle existing highlight; to remove color we can call toggleHighlight() on selection
  editor.value
    .chain()
    .focus()
    .toggleHighlight({ color: null as any })
    .run();
}
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
        title="Bold"
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
        title="Italic"
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
        title="Underline"
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
        title="Link"
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
        title="Align Left"
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
        title="Align Center"
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
        title="Align Right"
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
        title="Align Justify"
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
      <div class="border-l border-r border-gray-300 space-x-1 px-1">
        <input
          ref="imageInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />

        <Button
          title="Upload Image"
          size="icon"
          variant="secondary"
          @click="imageInput?.click()"
        >
          <ImagePlusIcon class="w-4 h-4" />
        </Button>

        <Popover>
          <PopoverTrigger as-child>
            <Button title="Insert Image via URL" size="icon" variant="secondary">
              <ImageIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="grid gap-4">
              <div class="space-y-2">
                <p class="text-sm text-muted-foreground">
                  Nhập URL hình ảnh
                </p>
              </div>
              <div class="grid gap-2">
                <Input v-model="imageInsertUrl" placeholder="https://example.com" />
                <Button size="sm" variant="ghost" @click="handleInsertUrl">Xác nhận</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <!-- Text color picker -->
      <div
        class="flex items-center gap-1 border border-gray-200 rounded-md px-1"
      >
        <input
          v-model="textColor"
          type="color"
          title="Chọn màu chữ"
          class="w-8 h-8 p-0 border rounded"
        />
        <Button size="icon" variant="ghost" @click="applyTextColor">
          <TypeIcon />
        </Button>
        <Button size="icon" variant="ghost" @click="unsetTextColor">
          <RemoveFormattingIcon />
        </Button>
      </div>

      <!-- Highlight (background) color picker -->
      <div
        class="flex items-center gap-1 border border-gray-200 rounded-md px-1"
      >
        <input
          v-model="highlightColor"
          type="color"
          title="Chọn màu highlight"
          class="w-8 h-8 p-0 border rounded"
        />
        <Button
          title="Apply Hightlight"
          size="icon"
          variant="ghost"
          @click="applyHighlight"
        >
          <PencilLine />
        </Button>
        <Button
          title="Unset Hightlight"
          size="icon"
          variant="ghost"
          @click="unsetHighlight"
        >
          <PencilOffIcon />
        </Button>
      </div>

      <!-- Superscript / Subscript -->
      <Button
        title="Superscript"
        size="icon"
        variant="ghost"
        @click="() => editor?.chain().focus().toggleSuperscript().run()"
      >
        <SuperscriptIcon />
      </Button>
      <Button
        title="Subscript"
        size="icon"
        variant="ghost"
        @click="() => editor?.chain().focus().toggleSubscript().run()"
      >
        <SubscriptIcon />
      </Button>

      <!-- Blockquote -->
      <Button
        size="icon"
        variant="ghost"
        title="Blockquote"
        :class="{
          'bg-primary text-primary-foreground': editor?.isActive('blockquote'),
        }"
        @click="() => editor?.chain().focus().toggleBlockquote().run()"
      >
        <TextQuoteIcon />
      </Button>

      <!-- Code block -->
      <!-- <div class="flex items-center gap-1">
        <select v-model="codeLanguage" class="text-sm p-1 rounded border">
          <option value="plaintext">plaintext</option>
          <option value="javascript">javascript</option>
          <option value="html">html</option>
          <option value="css">css</option>
          <option value="python">python</option>
        </select>
        <Button
          size="icon"
          variant="ghost"
          :class="{ 'bg-primary text-primary-foreground': editor?.isActive('codeBlock') }"
          @click="toggleCodeBlock"
          title="Toggle code block"
        >
          {'</>'}
        </Button>
      </div> -->

      <!-- Undo / Redo -->
      <div class="border-l border-r border-gray-300">
        <Button
          title="Undo (Ctrl+Z)"
          size="icon"
          variant="ghost"
          :disabled="!canUndo"
          :class="{ 'opacity-50 pointer-events-none': !canUndo }"
          @click="() => editor?.chain().focus().undo().run()"
        >
          <Undo class="w-4 h-4" />
        </Button>

        <Button
          title="Redo (Ctrl+Y / Ctrl+Shift+Z)"
          size="icon"
          variant="ghost"
          :disabled="!canRedo"
          :class="{ 'opacity-50 pointer-events-none': !canRedo }"
          @click="() => editor?.chain().focus().redo().run()"
        >
          <Redo class="w-4 h-4" />
        </Button>
      </div>
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
