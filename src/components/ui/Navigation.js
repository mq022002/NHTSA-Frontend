import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`mr-1 px-1 -mx-1 ${
        isActive ? "bg-[#832C31] p-1 rounded" : "text-gray-700 font-normal"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navigation() {
  return (
    <nav className="flex items-center bg-[#dbd2c4] p-6">
      <img src="/TheHartfordIcon.png" alt="logo" className="w-auto h-12 px-2" />
      <NavLink href="/">Home</NavLink>
      <NavLink href="/fetch_vehicle_data">Fetch Vehicle Data</NavLink>
    </nav>
  );
}
