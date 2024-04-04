import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const NavLink = ({ href, children, onClick }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`mr-1 px-1 -mx-1 ${
        isActive
          ? "text-[#832C31] underline font-bold"
          : "text-gray-700 hover:text-[#832C31] font-bold"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navigation() {
  const { data: session } = useSession();

  const handleAuth = (e) => {
    e.preventDefault();
    if (!session) {
      signIn();
    } else {
      signOut();
    }
  };

  return (
    <nav className="flex items-center justify-between bg-[#dbd2c4] p-2">
      <div className="flex items-center">
        <Image
          src="/TheHartfordIcon.svg"
          alt="logo"
          className="w-auto h-12 pr-10"
          width={50}
          height={50}
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
            <NavLink href="/login" onClick={handleAuth}>
              Login / Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
