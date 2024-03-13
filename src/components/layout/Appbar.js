import * as React from "react";

export default function Appbar() {
  return (
    <nav className="flex items-center flex-wrap bg-[#dbd2c4] p-6  justify-between">
      <img src="/TheHartfordIcon.png" alt="logo" className="px-2 h-12 w-auto" />
      {/* Put a div tag here, and inside of the div tag, put a tags */}
      <div>
        <a href = "/">
          The Home Page
        </a>
      </div>
    </nav>
  );
}
