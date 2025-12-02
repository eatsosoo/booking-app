export default defineCachedFunction(
  async () => {
    const config = useRuntimeConfig();
    const data = await $fetch(`http://api-gateway.dyhome.vn/api/home/services`);
    return data;
  },
  {
    maxAge: 60, // cache 3600s
  }
);
