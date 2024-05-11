"use client";

export function isUserComingFromAddAppointmentPage(
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
  history: History,
  localStorage: Storage,
  Url: string
) {
  if (localStorage.getItem(Url) === "true") {
    // Open the modal if the user is coming from the add-appointment page
    setModal(true);
    history.pushState({}, "", `/${Url}`);
    localStorage.setItem(Url, "false");
  }
}
