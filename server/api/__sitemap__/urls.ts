import { defineSitemapEventHandler } from "#imports";

export default defineSitemapEventHandler(async () => {
  // URLs from your API are already encoded
  const res = await $fetch<any>(
    "https://api-gateway.dyhome.vn/api/home/posts?page=1&per_page=100"
  );
  // e.g. [{ path: '/products/%24pecial-offer' }, { path: '/blog/%F0%9F%98%85' }]
  const urls = res.data.items;
  return urls.map((item) => ({
    loc: `https://dyhome.vn/cam-nang/${item.slug}`,
    _encoded: true,
  }));
});
