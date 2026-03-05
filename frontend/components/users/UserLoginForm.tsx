"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import useAuth from "hooks/useAuth";
import { useTranslations } from "use-intl";

export default function UserLoginForm() {
  const [form, setForm] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState<{ name?: string; password?: string }>({});
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const router = useRouter();
  const { login } = useAuth();
  const t = useTranslations("UserLoginForm");

  const fields = ["name", "password"] as const;

  const handleChange = (field: "name" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name.trim()) newErrors.name = t("validate.error");
    if (!form.password.trim()) newErrors.password = t("validate.error");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearMessages = () => {
    setErrors({});
    setStatusMessages([]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearMessages();

    if (!validate()) return;

    try {
      const loggedInUser = await UserService.login({
        username: form.name,
        password: form.password,
      });

      setStatusMessages([{ message: t("success"), type: "success" }]);
      login(loggedInUser);

      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setStatusMessages([
        {
          message: (error as Error).message || t("general.error"),
          type: "error",
        },
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex Padding Border flex-col">
      {fields.map((field) => (
        <div key={field} className="Wrapper flex-col">
          <div className="flex gap-1">
            <label htmlFor={`${field}Input`}>{t(`label.${field === "name" ? "username" : "password"}`)}</label>
            <div className="min-h-6 text-code-error">{errors[field] || ""}</div>
          </div>

          <input
            id={`${field}Input`}
            type={field === "password" ? "password" : "text"}
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="input"
          />
        </div>
      ))}

      <div className="Wrapper Gap items-center">
        <button className="btn" type="submit">
          {t("button")}
        </button>

        <ul>
          {statusMessages.map(({ message, type }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </form>
  );
}
