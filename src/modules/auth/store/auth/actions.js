import authApi from "../.../../../../../api/authApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken } = data;

    await authApi.post(":update", {
      displayName: name,
      idToken,
      refreshToken,
    });

    delete user.password;

    commit("loginUser", {
      idToken,
      refreshToken,
      user,
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error.response.data.error.message,
    };
  }
};
export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;

  try {
    const { data } = await authApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, displayName } = data;
    user.name = displayName;
    delete user.password;

    commit("loginUser", {
      idToken,
      refreshToken,
      user,
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response.data.error.message,
    };
  }
};
export const checkAuth = async ({ commit }) => {
  const idToken = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!idToken || !refreshToken) {
    commit("logout");
    return {
      ok: false,
      message: "No token found",
    };
  }

  try {
    const { data } = await authApi.post(":lookup", { idToken });
    const { email, displayName } = data.users[0];
    const user = {
      email,
      name: displayName,
    };
    commit("loginUser", {
      idToken,
      refreshToken,
      user,
    });
    return {
      ok: true,
    };
  } catch (error) {
    commit("logout");
    return {
      ok: false,
      message: error.response.data.error.message,
    };
  }
};
