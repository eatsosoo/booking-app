<template>
  <Editor
    v-if="isMounted"
    :api-key="apiKey"
    :init="editorConfig"
    :model-value="modelValue"
    :disabled="disabled"
    @update:model-value="handleUpdate"
  />
  <div v-else class="h-40 bg-gray-100 animate-pulse rounded-lg"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";
import { CONTENT_STYLE } from "~/constants";

interface Props {
  modelValue?: string;
  height?: number;
  placeholder?: string;
  disabled?: boolean;
  apiKey?: string;
}

const config = useRuntimeConfig();

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  height: 1000,
  placeholder: "Nhập nội dung...",
  disabled: false,
  apiKey: "no-api-key",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isMounted = ref(false);

// Config editor
const editorConfig = ref({
  height: props.height,
  menubar: false,
  placeholder: props.placeholder,
  readonly: props.disabled,
  // Cập nhật plugins - thêm pagebreak
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
    "emoticons",
    "quickbars",
    "codesample",
    "pagebreak", // Thêm pagebreak plugin
  ],

  // Toolbar đầy đủ với horizontal line và page break
  toolbar: [
    "undo redo | formatselect | fontsize fontfamily | blocks",
    "bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | lineheight",
    "bullist numlist outdent indent | link image media table | blockquote codesample",
    "subscript superscript | hr pagebreak | removeformat | help",
  ].join(" | "),
  // Formatselect options (headings)
  formats: {
    h1: { block: "h1", classes: "text-3xl font-bold my-4" },
    h2: { block: "h2", classes: "text-2xl font-bold my-3" },
    h3: { block: "h3", classes: "text-xl font-bold my-2" },
    h4: { block: "h4", classes: "text-lg font-bold my-2" },
    h5: { block: "h5", classes: "text-base font-bold my-1" },
    h6: { block: "h6", classes: "text-sm font-bold my-1" },
    p: { block: "p", classes: "my-2" },
  },
  // Font size options
  font_size_formats:
    "8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 24pt 28pt 32pt 36pt 48pt",
  // Blockquote style
  block_formats:
    "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Blockquote=blockquote",
  // Cấu hình màu sắc cho highlight
  textcolor_map: [
    "000000",
    "Black",
    "FF0000",
    "Red",
    "00FF00",
    "Green",
    "0000FF",
    "Blue",
    "FFFF00",
    "Yellow",
    "00FFFF",
    "Cyan",
    "FF00FF",
    "Magenta",
    "FFA500",
    "Orange",
    "800080",
    "Purple",
    "008000",
    "Dark Green",
    "FF69B4",
    "Hot Pink",
    "FFD700",
    "Gold",
    "F0F8FF",
    "Alice Blue",
    "FFFACD",
    "Lemon Chiffon",
  ],
  content_style: CONTENT_STYLE,
  branding: false, // Ẩn branding
  promotion: false, // Ẩn quảng cáo nâng cấp
  // Cấu hình image upload
  image_title: true,
  automatic_uploads: true,
  file_picker_types: "image",
  images_upload_url: config.public.mediaUrl,
  images_upload_handler: async (blobInfo: any) => {
    // Xử lý upload image (tùy chọn)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject("Upload failed");
      };
      reader.readAsDataURL(blobInfo.blob());
    });
  },
  //   image_class_list: [
  //     { title: "Không", value: "" },
  //     { title: "Responsive", value: "img-responsive" },
  //     { title: "Ảnh tròn", value: "img-rounded" },
  //     { title: "Ảnh có viền", value: "img-thumbnail" },
  //   ],
  // Quickbars (context menu)
  quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote",
  quickbars_insert_toolbar: false,

  // Custom image dialog với tab URL
  image_caption: true,

  // Thêm line-height
  line_height_formats: "1 1.2 1.4 1.6 1.8 2",

  // Subscript và superscript
  subscript: {
    inline: "sub",
    styles: { "vertical-align": "sub" },
    exact: true,
  },
  superscript: {
    inline: "sup",
    styles: { "vertical-align": "super" },
    exact: true,
  },

  // Cấu hình Horizontal Line (hr)
  hr: {
    // Các kiểu đường kẻ ngang
    styles: {
      height: "2px",
      border: "none",
      backgroundColor: "#e0e0e0",
    },

    // Các class có thể chọn
    class_list: [
      { title: "Mặc định", value: "" },
      { title: "Đậm", value: "hr-bold" },
      { title: "Chấm", value: "hr-dotted" },
      { title: "Nét đứt", value: "hr-dashed" },
      { title: "Kép", value: "hr-double" },
      { title: "Có bóng", value: "hr-shadow" },
    ],
  },

  // Cấu hình Page Break
  pagebreak_separator: "<!-- pagebreak -->",
  pagebreak_split_block: true,

  // Menu bar cấu hình
  menu: {
    insert: {
      title: "Insert",
      items:
        "image link media table hr pagebreak codesample emoticons anchor | charmap",
    },
    format: {
      title: "Format",
      items:
        "bold italic underline strikethrough superscript subscript | formats | alignleft aligncenter alignright alignjustify | lineheight | removeformat",
    },
    tools: {
      title: "Tools",
      items: "spellchecker spellcheckerlanguage | code wordcount",
    },
  },

  // Thêm vào config editorConfig
  image_align: true, // Bật chức năng căn lề ảnh
  image_wrap: true, // Bật chức năng wrap text quanh ảnh

  // Cấu hình class cho image alignment
  image_class_list: [
    { title: "Không", value: "" },
    { title: "Căn trái - Text bao quanh", value: "align-left" },
    { title: "Căn phải - Text bao quanh", value: "align-right" },
    { title: "Căn giữa", value: "align-center" },
    { title: "Inline", value: "align-inline" },
    // { title: "Responsive", value: "img-responsive" },
    // { title: "Ảnh tròn", value: "img-rounded" },
    // { title: "Ảnh có viền", value: "img-thumbnail" },
  ],

  // Context menu cho ảnh
  contextmenu: "link image table",
});

const handleUpdate = (value: string) => {
  emit("update:modelValue", value);
};

onMounted(() => {
  isMounted.value = true;
  const style = document.createElement("style");
  style.innerHTML = `
    .tox-toolbar__primary { background: #f8f9fa !important; }
    .tox-editor-container { border-radius: 8px; overflow: hidden; }
    .tox-statusbar { border-top: 1px solid #e9ecef !important; }
    
    /* Custom page break preview trong editor */
    .tox .mce-pagebreak {
      border: 1px dashed #dc3545;
      background: linear-gradient(45deg, transparent 49%, rgba(220, 53, 69, 0.1) 49%, rgba(220, 53, 69, 0.1) 51%, transparent 51%);
      background-size: 10px 10px;
      position: relative;
      overflow: hidden;
    }
    
    .tox .mce-pagebreak:hover {
      background: linear-gradient(45deg, transparent 49%, rgba(220, 53, 69, 0.2) 49%, rgba(220, 53, 69, 0.2) 51%, transparent 51%);
      background-size: 10px 10px;
    }
    
    .tox .mce-pagebreak:after {
      content: "⎯⎯⎯ NGẮT TRANG ⎯⎯⎯";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #dc3545;
      color: white;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    
    /* Horizontal line toolbar icon */
    .tox .tox-tbtn[title="Horizontal line"] svg {
      color: #666;
    }
    
    /* Page break toolbar icon */
    .tox .tox-tbtn[title="Page break"] svg {
      color: #dc3545;
    }
  `;
  document.head.appendChild(style);
});

// Optional: Dynamic imports để giảm bundle size
// import('@tinymce/tinymce-vue').then(module => {
//   Editor = module.default
//   isMounted.value = true
// })
</script>
