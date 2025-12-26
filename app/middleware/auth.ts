import { PERMISSION } from "~/constants";

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>("token");
  const role = useCookie<string | null>("role");

  // 1️⃣ Chưa login → ép về login
  if (!token.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  // 2️⃣ Đã login mà vào login → ép về admin
  if (token.value && to.path === "/login") {
    return navigateTo("/admin");
  }

  // 3️⃣ Check quyền truy cập
  const isAllow = PERMISSION.some(
    (item) => item.url === to.path && item.permission.includes(role.value ?? "")
  );

  // 4️⃣ Không có quyền → 403 hoặc redirect
  if (!isAllow && to.path.startsWith("/admin")) {
    return navigateTo("/admin/403"); // hoặc "/admin"
  }
});
