import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const withAuthenticated = (Component: () => React.JSX.Element) => {
  return () => {
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        redirect("/auth");
      }
    });
    return localStorage.getItem("token") && <Component />;
  };
};

export default withAuthenticated;
