"use client"

import css from "./SignInPage.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import {LoginRequest} from "@/types/auth"
import { ApiError } from "@/app/api/api";

import { useAuthStore } from "@/lib/store/authStore";

export default function SignIn(){
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("1. Форма відправлена. Починається обробка.");
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      console.log("2. Дані форми підготовлені:", formValues);
      
      const res = await login(formValues);
      console.log("3. Відповідь від API отримана:", res);
      
      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (error) {
      console.error("5. Сталася помилка. Перевірка помилки...", error);
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
      console.log("6. Текст помилки встановлено:", error);
    }
  };

  return(
      <main className={css.mainContent}>
 <form className={css.form} onSubmit={handleSubmit}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

    <p className={css.error}>{error}</p>
  </form>
</main>
    )
}
