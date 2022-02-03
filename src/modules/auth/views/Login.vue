<template>
  <section class="form-container">
    <h1 class="form__title">Login</h1>
    <form class="form" @submit.prevent="onSubmit">
      <input
        type="email"
        class="form__input"
        placeholder="Email..."
        v-model="userForm.email"
      />
      <input
        type="password"
        class="form__input"
        placeholder="Password..."
        v-model="userForm.password"
      />
      <button type="submit" class="form__button">Login</button>
    </form>
    <p class="form__link">
      You don't have an account?
      <router-link :to="{ name: 'register' }">Register</router-link>
    </p>
  </section>
</template>

<script>
import { ref } from "vue";
import useAuth from "../composables/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const userForm = ref({
      email: "",
      password: "",
    });

    const { loginUser } = useAuth();

    const onSubmit = async () => {
      const { ok, message } = await loginUser(userForm.value);

      if (ok) {
        router.push({ name: "no-entry-selected" });
      } else {
        Swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    return {
      userForm,
      onSubmit,
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
    background-color: #fff;
    padding: 1rem 2rem;
    position: relative;
    z-index: 5;
  }
  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  &__input {
    border: 1px solid #8b8b8b;
    border-radius: 5px;
    padding: 0.8rem;
    width: 100%;
  }
  &__button {
    background-color: #8b8b8b;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.8rem;
    width: 100%;
  }
  &__link {
    color: #8b8b8b;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 1rem auto;
    text-align: center;
  }
}
</style>
