import { observer } from "mobx-react-lite";
import { authStore } from "store/global/AuthStore.ts";
import { Navbar } from "components/Navbar";
import styles from "./User.module.scss";
import { useState } from "react";
import { Greeting } from "./components/Greeting.tsx";
import { Login } from "./components/Login.tsx";
import { Register } from "./components/Register.tsx";
import { PageTransition } from "../../components/PageTransition";

export const User = observer(() => {
  const [userForm, setUserForm] = useState("login");
  const { user, setErrorNull } = authStore;
  const handleToggleAuthForm = () => {
    if (userForm === "login") {
      setUserForm("register");
    } else {
      setUserForm("login");
    }
    setErrorNull();
  };
  const isLoginForm = userForm === "login";

  if (user) {
    return (
      <PageTransition>
        <Greeting username={user.username} onClick={authStore.logout} />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <div className={styles.container}>
        {isLoginForm ? (
          <Login
            loading={authStore.loading}
            error={authStore.error?.message}
            onLogin={authStore.login}
          />
        ) : (
          <Register
            onRegister={authStore.register}
            loading={authStore.loading}
            error={authStore.error?.message}
          />
        )}
        <button
          onClick={handleToggleAuthForm}
          className={styles.switchFormButton}
        >
          {isLoginForm ? "Need to register?" : "Already have an account?"}
        </button>
      </div>
    </PageTransition>
  );
});
