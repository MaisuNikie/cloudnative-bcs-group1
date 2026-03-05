"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "hooks/useAuth";
import { useTranslations } from "use-intl";
import Language from "./language";

const Header: React.FC = () => {
  const router = useRouter();

  const { user, logout } = useAuth();

  const t = useTranslations();

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await logout();
    router.push("/");
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex  mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">{t("app.title")}</a>
      <nav className="items-center flex md:flex-row flex-col">
        <Link href="/" className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg">
          {t("header.nav.home")}
        </Link>
        <Link href="/lecturers" className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
          {t("header.nav.lecturers")}
        </Link>
        {!user && (
          <Link href="/login" className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
            {t("header.nav.login")}
          </Link>
        )}
        {user && (
          <a href="#" onClick={handleLogout} className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
            {t("header.nav.logout")}
          </a>
        )}
        {user && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t("header.welcome")}, {user.fullname}!
          </div>
        )}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
