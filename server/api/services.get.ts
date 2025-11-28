export default defineCachedFunction(
  async () => {
    const config = useRuntimeConfig();
    const data = await $fetch(`http://api-gateway.dyhome.vn/api/services`);
    return data;
  },
  {
    maxAge: 60, // cache 3600s
  }
);
