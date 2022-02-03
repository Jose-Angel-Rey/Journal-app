export const loginUser = (state, { user, idToken, refreshToken }) => {
  if (idToken) {
    state.idToken = idToken;
    localStorage.setItem("idToken", idToken);
  }
  if (refreshToken) {
    state.refreshToken = refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
  }

  state.user = user;
  state.status = "authenticated"; 
};

export const logout = (state) => {
  state.idToken = null;
  state.refreshToken = null;
  state.user = null;
  state.status = "no-authenticated";
  
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
}