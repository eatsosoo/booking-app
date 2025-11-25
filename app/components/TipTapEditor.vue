<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'

// Core extensions
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'

/** Props (nếu bạn muốn bind v-model từ parent) */
const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

/** Editor instance */
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4]
      },
      bulletList: true,
      orderedList: true
    }),
    Underline,
    Highlight,
    Link,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Image,
  ],
  content: props.modelValue || '<p></p>',
})

/** Watch editor content and sync v-model */
watch(editor, (ed) => {
  if (!ed) return
  ed.on('update', () => {
    emit('update:modelValue', ed.getHTML())
  })
})

onBeforeUnmount(() => {
  editor?.destroy()
})

/** Toolbar helper */
const setLink = () => {
  const url = prompt('Enter link URL')
  if (url) editor?.chain().focus().setLink({ href: url }).run()
}

const addImage = () => {
  const url = prompt('Enter image URL')
  if (url) editor?.chain().focus().setImage({ src: url }).run()
}
</script>

<template>
  <div class="border rounded-md p-2 bg-white">
    <!-- Toolbar -->
    <div class="flex flex-wrap gap-2 mb-2">
      <!-- Undo / Redo -->
      <button @click="editor?.chain().focus().undo().run()" :disabled="!editor?.can().undo()">Undo</button>
      <button @click="editor?.chain().focus().redo().run()" :disabled="!editor?.can().redo()">Redo</button>

      <!-- Heading -->
      <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'font-bold': editor?.isActive('heading', { level: 1 }) }">H1</button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'font-bold': editor?.isActive('heading', { level: 2 }) }">H2</button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'font-bold': editor?.isActive('heading', { level: 3 }) }">H3</button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'font-bold': editor?.isActive('heading', { level: 4 }) }">H4</button>

      <!-- List -->
      <button @click="editor?.chain().focus().toggleBulletList().run()" :class="{ 'font-bold': editor?.isActive('bulletList') }">• List</button>
      <button @click="editor?.chain().focus().toggleOrderedList().run()" :class="{ 'font-bold': editor?.isActive('orderedList') }">1. List</button>
      <button @click="editor?.chain().focus().toggleTaskList().run()" :class="{ 'font-bold': editor?.isActive('taskList') }">☑ Task List</button>

      <!-- Text styling -->
      <button @click="editor?.chain().focus().toggleBold().run()" :class="{ 'font-bold': editor?.isActive('bold') }">Bold</button>
      <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ 'italic': editor?.isActive('italic') }">Italic</button>
      <button @click="editor?.chain().focus().toggleUnderline().run()" :class="{ 'underline': editor?.isActive('underline') }">Underline</button>
      <button @click="editor?.chain().focus().toggleHighlight().run()" :class="{ 'bg-yellow-300': editor?.isActive('highlight') }">Highlight</button>
      <button @click="setLink()">Link</button>

      <!-- Text align -->
      <button @click="editor?.chain().focus().setTextAlign('left').run()" :class="{ 'font-bold': editor?.isActive({ textAlign: 'left' }) }">Left</button>
      <button @click="editor?.chain().focus().setTextAlign('center').run()" :class="{ 'font-bold': editor?.isActive({ textAlign: 'center' }) }">Center</button>
      <button @click="editor?.chain().focus().setTextAlign('right').run()" :class="{ 'font-bold': editor?.isActive({ textAlign: 'right' }) }">Right</button>
      <button @click="editor?.chain().focus().setTextAlign('justify').run()" :class="{ 'font-bold': editor?.isActive({ textAlign: 'justify' }) }">Justify</button>

      <!-- Image -->
      <button @click="addImage()">Image</button>
    </div>

    <!-- Editor -->
    <EditorContent :editor="editor" class="border rounded-md p-2 min-h-[200px]" />
  </div>
</template>

<style scoped>
button {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
