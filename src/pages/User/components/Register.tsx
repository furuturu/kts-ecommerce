import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "../User.module.scss";

interface RegisterProps {
  loading: boolean;
  error: string | undefined;
  onRegister: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void> | void;
}
export const Register: React.FC<RegisterProps> = ({
  loading,
  error,
  onRegister,
}) => {
  return (
    <Formik
      key={"register"}
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onRegister(values.username, values.email, values.password);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div>
            <label>Username</label>
            <Field name="username" required />
            <ErrorMessage name="username" component="div" />
          </div>

          <div>
            <label>Email</label>
            <Field name="email" type="email" required />
            <ErrorMessage name="email" component="div" />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
