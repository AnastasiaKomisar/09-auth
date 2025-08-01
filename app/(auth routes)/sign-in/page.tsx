'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/clientApi';
import { useAuthStore } from "@/lib/store/authStore";
import { RegisterUserData } from '@/types/user';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
   const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
   const formValues = Object.fromEntries(formData);
    const loginData: RegisterUserData = {
      email: formValues.email.toString(),
      password: formValues.password.toString(),
    };
    try {
      const res = await loginUser(loginData);
      if (res) {
        setUser(res);
        router.push("/profile");
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
      <form className={css.form} onSubmit={(e) => {
                                  e.preventDefault();
                                  const formData = new FormData(e.currentTarget);
                                  handleSubmit(formData);
                                }}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
