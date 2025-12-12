<script setup lang="ts">
const props = defineProps<{
  url: string
}>()

// Lấy video ID từ URL
const videoId = computed(() => {
  try {
    const parts = props.url.split("/video/")
    return parts[1]?.split("?")[0] ?? ""
  } catch {
    return ""
  }
})

// Load script embed TikTok (client side)
onMounted(() => {
  if (!window) return

  const existing = document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
  if (!existing) {
    const s = document.createElement("script")
    s.src = "https://www.tiktok.com/embed.js"
    s.async = true
    document.body.appendChild(s)
  } else {
    // Script đã có → re-render
    // @ts-ignore
    window.tiktokEmbed?.()
  }
})
</script>

<template>
  <div v-if="videoId">
    <blockquote
      class="tiktok-embed"
      :cite="url"
      :data-video-id="videoId"
    ></blockquote>
  </div>
  <p v-else>URL TikTok không hợp lệ.</p>
</template>
