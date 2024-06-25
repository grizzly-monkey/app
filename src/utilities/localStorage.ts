export const setAuthStatusInLocalStorage = (authStatus: boolean) => {
  localStorage.setItem(
    "growloc.isAuthed",
    authStatus ? "authenticated" : "unauthenticated"
  );
};

export const getIsAuthenticated = () => {
  const authStatus = localStorage.getItem("growloc.isAuthed");
  return authStatus === "authenticated";
};
