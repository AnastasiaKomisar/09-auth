"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { RegisterUserData } from "@/types/user"
import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData);
      const registerData: RegisterUserData = {
        email: formValues.email.toString(),
        password: formValues.password.toString(),
      };
      const res = await registerUser(registerData);
      if (res) {
        setUser(res);
        router.push("/profile");
        // router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <main className={css.mainContent}> 
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Register</button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
