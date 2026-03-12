"use client";
import { useRouter } from "next/navigation";
import useAuth from "hooks/useAuth";
import { useTranslations } from "use-intl";
import Language from "./language";
import ThemeChanger from "./theme";

export default function Header() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const t = useTranslations("header");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className="flex max-h-min border-b bg-primary">
      <div className="Wrapper Padding justify-between overflow-visible">
        <div className="Center">
          <h4>{user ? `Logged in as ${user.username}` : t("welcome")}</h4>
        </div>
        <div className="flex Padding">
          <button onClick={user ? handleLogout : handleLogin} aria-label={user ? "Log out" : "Log in"} className="btn">
            <span className="material-symbols-outlined" aria-hidden="true">
              {user ? "logout" : "login"}
            </span>
            <span>{user ? t("nav.logout") : t("nav.login")}</span>
          </button>
          <ThemeChanger />
          <Language />
        </div>
      </div>
    </header>
  );
}
