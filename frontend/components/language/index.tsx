"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function Language() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params?.locale ? (Array.isArray(params.locale) ? params.locale[0] : params.locale) : "en";

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;

    const path = pathname.split("/");

    path[1] = newLocale;

    const newPath = path.join("/");

    router.push(newPath);
  };

  return (
    <select id="language" className="btn" value={currentLocale} onChange={handleLanguageChange} disabled={isPending}>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
    </select>
  );
}
