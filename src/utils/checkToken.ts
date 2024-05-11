"use client";

export function checkToken(
  setIsTokenOk: React.Dispatch<React.SetStateAction<boolean>>,
  localStorage: Storage
) {
  const token = localStorage.getItem("token");
  if (token) {
    setIsTokenOk(true);
  }
}
