export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token")
  // console.log("Token", token.value);
  if (!token.value && to.path !== "/login") {
    return navigateTo("/login")
  }

  if (token.value && to.path === "/login") {
    return navigateTo("/admin")
  }
})
