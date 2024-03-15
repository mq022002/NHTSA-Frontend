import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex items-center bg-[#dbd2c4] p-6">
      <img src="/TheHartfordIcon.png" alt="logo" className="w-auto h-12 px-2" />
      <Link
        href="/"
        className={`mr-1 px-1 -mx-1 ${
          router.pathname === "/"
            ? "bg-[#832C31] p-1 rounded"
            : "text-gray-700 font-normal"
        }`}
      >
        Home
      </Link>
      <Link
        href="/fetch_vehicle_data"
        className={`mr-1 px-1 -mx-1 ${
          router.pathname === "/fetch_vehicle_data"
            ? "bg-[#832C31] p-1 rounded"
            : "text-gray-700 font-normal"
        }`}
      >
        Fetch Vehicle Data
      </Link>
    </nav>
  );
}
