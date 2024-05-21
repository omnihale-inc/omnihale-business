`use client`;

import React, { useEffect, useState } from "react";
import Image from "next/image";

import addIcon from "@/assets/icons/add.png";
import closeIcon from "@/assets/icons/close.png";
import { socket } from "@/utils/socket";

type stringObject = { [index: string]: string };

const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.omnihale.com";

/**
 * Represents the component for adding appointments in a modal.
 * @param onModal - A function that handles the modal state.
 */
const AddAppointmentModalChildren = React.memo(
  function AddAppointmentModalChildren({
    onModal,
  }: {
    onModal: (value: boolean) => void;
  }) {
    const [addAppointment, setAddAppointment] = useState<stringObject>({});
    const [fields, setFields] = useState([]);
    const [loadingFields, setLoadingFields] = useState(true);
    const [success, setSuccess] = useState(false);
    const [threshold, setThreshold] = useState({
      dailyAppointmentsThreshold: false,
    });

    /**
     * Handles sending the appointment data to the server.
     * @param addAppointment - The appointment object to be sent.
     */
    const sendAppointmentHandler = (addAppointment: object) => {
      const user = localStorage.getItem("user_id");
      socket.emit("appointments", [addAppointment, user, "businessUser"]);
    };

    useEffect(() => {
      socket.on("threshold", (data) => {
        setThreshold(data);
      });
      socket.on("schedule", () => {
        setSuccess(true);
      });
    });

    useEffect(() => {
      fieldsHandler(setFields, setLoadingFields);
    }, []);

    return (
      <div className="fixed w-screen h-screen backdrop-blur-sm grid place-items-center">
        <div className="w-10/12 max-w-lg border border-gray-200 rounded-md bg-gray-50">
          <div className="flex items-center justify-between border-b border-gray-100 p-4 mb-2">
            <h3 className="font-semibold">Add Appointment</h3>
            <button
              className="border rounded-2xl border-black px-4 py-1 text-sm flex items-center"
              onClick={() => {
                // Closes modal
                onModal(false);
                // Changes url back to health care provider home
                history.pushState({}, "", "/");
                // Enables scrolling
                const body = document.querySelector("body");
                body?.setAttribute("style", "overflow:scroll-y");
              }}
            >
              <Image src={closeIcon} alt="save fields" width={12} height={12} />
              <span className="text-sm ml-1">Close</span>
            </button>
          </div>
          {loadingFields && <p className="text-sm ml-4 my-2">Loading ...</p>}
          {!threshold.dailyAppointmentsThreshold ? (
            <>
              {success && (
                <p className="text-md ml-4 my-2 text-green-600">success</p>
              )}
              <form
                className="p-4"
                onSubmit={
                  // Prevents form from submitting
                  (e) => e.preventDefault()
                }
              >
                {
                  // Maps through fields and creates input fields
                  fields.map((field, index) => (
                    <input
                      type="text"
                      className="mb-2 w-full text-xs px-4 py-2 border rounded-md"
                      key={index}
                      name={field}
                      value={addAppointment[field] || ""}
                      placeholder={field}
                      onChange={(e) => {
                        setSuccess(false);
                        // Adds appointment input fields to addAppointment state
                        const name = e.target.name;
                        const value = e.target.value;
                        setAddAppointment((state: stringObject) => ({
                          ...state,
                          [name]: value,
                        }));
                      }}
                    />
                  ))
                }
                <div className="flex justify-end mt-2">
                  <button
                    className="border rounded-2xl border-black px-4 py-1 text-sm flex items-center"
                    onClick={() => {
                      sendAppointmentHandler(addAppointment);
                    }}
                  >
                    <Image
                      src={addIcon}
                      alt="save fields"
                      width={13}
                      height={13}
                    />
                    <span className="text-sm ml-1">Add</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <p className="text-sm text-red-600 p-4">
              Maximum appointments for today has been reached
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default AddAppointmentModalChildren;

const fieldsHandler = (
  setFields: (value: never[]) => void,
  setLoadingField: (value: boolean) => void
) => {
  // Fetch the fields
  const token = localStorage.getItem("token");
  // Get the fields from the local storage
  const fields = localStorage.getItem("fields");
  const options = {
    // Set the headers
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Fetch the fields
  fetch(`${URL}/appointment-fields`, options)
    .then((data) => {
      // Check if the token is valid
      if (data.status === 422 || data.status === 401) {
        localStorage.removeItem("token");
        location.href = "/auth";
      }
      // Return the data
      return data.json();
    })
    .then((data) => {
      if (
        data.msg === "Token has expired" ||
        (fields && JSON.parse(fields)?.msg === "Token has expired")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("fields");
      } else {
        console.log(data);
        // Set the fields
        setFields(data);
        setLoadingField(false);
      }
    });
};
