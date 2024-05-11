"use client";

import { useEffect, useState } from "react";

import HomeContents from "@/components/HomeContents";
import Header from "@/components/Header";
import AddAppointmentModal from "@/components/AddAppointmentModal";
import AddAppointmentModalChildren from "@/components/AddAppointmentModalChildren";
import withAuthenticated from "@/components/withAuthenticated";
import { checkToken } from "@/utils/checkToken";
import { isUserComingFromAddAppointmentPage } from "@/utils/isUserComingFromAddAppointmentPage";

function HomePage() {
  const [modal, setModal] = useState(false);
  const [isTokenOk, setIsTokenOk] = useState(false);

  useEffect(() => {
    isUserComingFromAddAppointmentPage(
      setModal,
      history,
      localStorage,
      "add-appointment"
    );
  }, []);

  useEffect(() => {
    checkToken(setIsTokenOk, localStorage);
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
