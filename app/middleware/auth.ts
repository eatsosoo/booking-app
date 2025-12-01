export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token")
  console.log(token);
  if (!token.value && to.path !== "/login") {
    return navigateTo("/login")
  }

  if (token.value && to.path === "/login") {
    return navigateTo("/admin")
  }
})
