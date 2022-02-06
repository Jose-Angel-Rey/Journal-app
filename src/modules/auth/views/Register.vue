<template>
  <section class="form-container">
    <Logo />
    <h1 class="form__title">Register</h1>
    <form class="form" @submit.prevent="onSubmit">
      <input
        type="text"
        class="form__input"
        placeholder="Name..."
        required
        v-model="userForm.name"
      />
      <input
        type="email"
        class="form__input"
        placeholder="Email..."
        required
        v-model="userForm.email"
      />
      <input
        type="password"
        class="form__input"
        placeholder="Password..."
        required
        v-model="userForm.password"
      />
      <button type="submit" class="form__button">Create Account</button>
    </form>
    <p class="form__link">
      Do you already have an account?
      <router-link :to="{ name: 'login' }">Login</router-link>
    </p>
  </section>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import useAuth from "../composables/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  components: {
    Logo: defineAsyncComponent(() =>
      import(/* webpackChunkName: "Logo" */ "../components/Logo.vue")
    ),
  },
  setup() {
    const router = useRouter();

    const userForm = ref({
      name: "",
      email: "",
      password: "",
    });

    const { createUser } = useAuth();

    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value);
        if (ok) {
          router.push({ name: "no-entry-selected" });
        } else {
          Swal.fire({
            title: "Error",
            text: message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &-container {
    border: 1px solid #ccc;
    width: 90%;
    max-width: 30rem;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 2rem;
    position: relative;
    z-index: 5;
  }
  &__title {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 2rem auto;
  }
  &__input {
    border: 1px solid #8b8b8b;
    border-radius: 5px;
    padding: 0.8rem;
    width: 100%;
  }
  &__button {
    background-color: #0a5dc9;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.8rem;
    transition: all 0.4s;
    width: 100%;

    &:hover {
      background-color: lighten($color: #0a5dc9, $amount: 10);
    }
    &:active {
      background-color: #0a5dc9;
    }
  }
  &__link {
    color: #8b8b8b;
    font-size: 1.2rem;
    margin: 3rem auto 1rem;
    text-align: center;

    a {
      color: #0a5dc9;
    }
  }
}
</style>
