"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

const withAuthenticated = (Component: () => React.JSX.Element) => {
  return () => {
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        redirect("/auth");
      }
    });
    if (typeof window !== "undefined")
      return localStorage.getItem("token") && <Component />;
  };
};

export default withAuthenticated;
