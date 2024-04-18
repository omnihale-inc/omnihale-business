"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const withAuthenticated = (Component: () => React.JSX.Element) => {
  return function AuthComponent() {
    const [showPage, setShowPage] = useState(false);
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        redirect("/auth");
      } else {
        setShowPage(true);
      }
    }, [setShowPage]);
    return showPage && <Component />;
  };
};

export default withAuthenticated;
