import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`mr-1 px-1 -mx-1 ${
        isActive
          ? "text-[#832C31] underline font-bold"
          : "text-gray-700 font-bold"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between bg-[#dbd2c4] p-2">
      <div className="flex items-center">
        <img
          src="/TheHartfordIcon.svg"
          alt="logo"
          className="w-auto h-12 pr-10"
        />
        <NavLink href="/">Home</NavLink>
        {session && (
          <NavLink href="/fetch_vehicle_data">Fetch Vehicle Data</NavLink>
        )}
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <NavLink href="/account" className="pr-2 text-black text-bold">
              {session.user.name}
            </NavLink>
            <NavLink href="/api/auth/signout">Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <span className="pr-2 text-black text-bold">/</span>
            <NavLink href="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
