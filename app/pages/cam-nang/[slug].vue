<template>
    <div>
      <!-- <h1>{{ homestay.title }}</h1> -->
      <p>Slug: {{ $route.params.slug }}</p>
      <!-- Nội dung chi tiết homestay -->
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const { slug } = route.params
  
  // Fetch data dựa trên slug
  // const { data: homestay } = await useAsyncData(`homestay-${slug}`, () => {
  //   return $fetch(`/api/homestays/${slug}`)
  // })
  
  // SEO
  // useSeoMeta({
  //   title: homestay.value?.title,
  //   description: `Chi tiết homestay ${homestay.value?.title}`
  // })
  </script>