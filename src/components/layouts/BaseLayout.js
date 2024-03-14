import React from "react";
import Navigation from "../ui/Navigation";

function BaseLayout({ children }) {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      {children}
    </div>
  );
}

export default BaseLayout;
