"use client";
import { useRouter } from "next/navigation";
import useAuth from "hooks/useAuth";
import { useTranslations } from "use-intl";
import Language from "./language";

export default function Header() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const t = useTranslations();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className="flex max-h-min border-b bg-primary">
      <div className="Wrapper Padding justify-between">
        <div className="Center">
          <h4>{user ? `Logged in as ${user.fullname}` : t("header.welcome")}</h4>
        </div>
        <div className="flex Padding">
          <button onClick={user ? handleLogout : handleLogin} aria-label={user ? "Log out" : "Log in"} className="btn">
            <span className="material-symbols-outlined" aria-hidden="true">
              {user ? "logout" : "login"}
            </span>
            <span>{user ? t("header.nav.logout") : t("header.nav.login")}</span>
          </button>
          <Language />
        </div>
      </div>
    </header>
  );
}
