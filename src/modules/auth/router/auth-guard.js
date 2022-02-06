import store from "@/store";

const isAuthenticatedGuard = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuth");

  ok ? next() : next("/auth");
};

export default isAuthenticatedGuard;
