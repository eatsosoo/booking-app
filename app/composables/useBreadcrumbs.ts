export const useBreadcrumbs = () => {
  const route = useRoute();

  const titleMap: Record<string, string> = {
    "admin": "Quản trị",
    "quan-ly-bai-viet": "Quản lý bài viết",
    "quan-ly-phong": "Quản lý phòng",
    "quan-ly-faq": "Quản lý FAQs",
    "quan-ly-dich-vu": "Quản lý dịch vụ",
    "quan-ly-danh-muc": "Quản lý dự án",
    "them-moi": "Tạo mới",
  };

  const mapTitle = (segment: string) => {
    if (titleMap[segment]) return titleMap[segment];

    if (!isNaN(Number(segment))) return `Chi tiết & chỉnh sửa`;

    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const breadcrumbs = computed(() => {
    const pathSegments = route.path
      .split("/")
      .filter(Boolean); 

    const items = pathSegments.map((segment, index) => {
      const to = "/" + pathSegments.slice(0, index + 1).join("/");

      return {
        label: mapTitle(segment),
        to
      };
    });

    return items;
  });

  return { breadcrumbs };
};
