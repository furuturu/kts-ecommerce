import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "../User.module.scss";

interface LoginProps {
  loading: boolean;
  error: string | undefined;
  onLogin: (identifier: string, password: string) => Promise<void> | void;
}

export const Login: React.FC<LoginProps> = ({ error, loading, onLogin }) => {
  return (
    <Formik
      key={"login"}
      initialValues={{ identifier: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onLogin(values.identifier, values.password);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div>
            <label>Username</label>
            <Field name="identifier" required />
            <ErrorMessage name="identifier" component="div" />
          </div>

          <div>
            <label>Password</label>
            <Field name="password" type="password" required />
            <ErrorMessage name="password" component="div" />
          </div>

          {error && <div className="error">{error}</div>}

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className={styles.profileButton}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
