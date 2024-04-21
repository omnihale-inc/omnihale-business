"use client";

import { useEffect, useState } from "react";

import HomeContents from "@/components/HomeContents";
import Header from "@/components/Header";
import AddAppointmentModal from "@/components/AddAppointmentModal";
import AddAppointmentModalChildren from "@/components/AddAppointmentModalChildren";
import withAuthenticated from "@/components/withAuthenticated";

function HomePage() {
  const [modal, setModal] = useState(false);
  const [isTokenOk, setIsTokenOk] = useState(false);

  useEffect(() => {
    // Check if the user is coming from the add-appointment page
    if (localStorage.getItem("add-appointment") === "true") {
      // Open the modal if the user is coming from the add-appointment page
      setModal(true);
      history.pushState({}, "", "/add-appointment");
      localStorage.setItem("add-appointment", "false");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsTokenOk(true);
    }
  }, []);

  return isTokenOk ? (
    <main className="pt-10 w-11/12  mx-auto">
      <Header />
      <HomeContents onModal={setModal} />
      {modal && (
        <AddAppointmentModal>
          <AddAppointmentModalChildren onModal={setModal} />
        </AddAppointmentModal>
      )}
    </main>
  ) : (
    <div></div>
  );
}

export default withAuthenticated(HomePage);
