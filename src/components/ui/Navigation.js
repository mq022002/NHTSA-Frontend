/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SessionContext } from "../../context/SessionContext";

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
  const { session, signOut } = React.useContext(SessionContext);

  return (
    <nav className="flex items-center justify-between bg-[#dbd2c4] p-2">
      <div className="flex items-center">
        <img
          src="/TheHartfordIcon.svg"
          alt="logo"
          className="object-cover object-center w-auto h-12 pr-10"
        />
        <NavLink href="/index.html">Home</NavLink>
        {session && (
          <NavLink href="/fetch_vehicle_data.html">Fetch Vehicle Data</NavLink>
        )}
        <NavLink href="/about.html">About</NavLink>
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <NavLink href="/account.html" className="pr-2 text-black text-bold">
              {session.user.name}
            </NavLink>
            <NavLink href="/index.html" onClick={signOut}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink href="https://maha-user-pool.auth.us-east-1.amazoncognito.com/login?client_id=2uanm16gnugk14hr8un5ohk1q5&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmaha-hosting-bucket.s3.amazonaws.com%2Fcallback.html">
              Login / Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
