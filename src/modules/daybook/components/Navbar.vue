<template>
  <nav class="nav">
    <router-link class="nav__link" to="/">
      <i class="far fa-address-book" /> Journal
    </router-link>

    <button class="nav__button" @click="onLogout">
      <i class="fa fa-sign-out-alt"></i>
    </button>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import useAuth from "@/modules/auth/composables/useAuth";

export default {
  name: "Navbar",
  setup() {
    const router = useRouter();
    const { logout, username } = useAuth();

    return {
      onLogout: () => {
        logout();
        router.push({ name: "login" });
      },
      username,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #252525;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  width: 100%;

  &__link {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
  }
  &__button {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    padding: 0;
    outline: none;
    margin: 0;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      color: #c0c0c0;
      transform: scale(1.1);
    }
    &:active {
      color: #ffffff;
      transform: none;
    }
  }
}
</style>
