"use client";

import Image from "next/image";
import { useState } from "react";

import trashIcon from "@/assets/icons/trash.png";
import saveIcon from "@/assets/icons/save.png";
import addIcon from "@/assets/icons/add.png";
import backIcon from "@/assets/icons/back.png";
import withAuthenticated from "@/components/withAuthenticated";

function ConfigureAppointmentPage() {
  const previousFields = ["name", "address", "test"];
  const [fields, setFields] = useState<Array<string>>([...previousFields]);
  const [inputField, setInputField] = useState<string>("");
  return (
    <main className="lg:px-20 pt-10">
      <header className="flex items-center justify-between">
        {/* go back home */}
        <a href="/">
          <Image
            src={backIcon}
            alt="back home"
            width={25}
            height={25}
            className="mr-2"
          />
        </a>
        <h1 className="text-2xl font-semibold">Configure Appointment</h1>
      </header>
      <section className="w-2/5 bg-slate-50 mx-auto mt-14 p-10 box-border border border-gray-400 rounded-md">
        <h3 className="mb-1 font-semibold text-xl">Add appointment fields</h3>
        <p className="text-gray-600 text-xs mb-5">
          Appointments fields are the fields you want to available when adding a
          patient appointment to the appointments list
        </p>
        <div className="mb-10">
          <h3 className="underline font-semibold">Fields</h3>
          {
            // display the fields array
            fields.map((field, index) => (
              <div
                className="mb-2 flex justify-between list-none items-center"
                key={index}
              >
                <div>
                  <p>{field}</p>
                </div>
                <button
                  className="flex items-center"
                  onClick={() => {
                    // remove the field from the fields array
                    const newFields = fields.filter((_, i) => i !== index);
                    setFields(newFields);
                  }}
                >
                  <Image
                    src={trashIcon}
                    alt="remove icon"
                    width={15}
                    height={15}
                  />
                  <span className="text-sm ml-1">Remove</span>
                </button>
              </div>
            ))
          }
        </div>
        <input
          className="text-xs py-2 px-4 w-full rounded-lg mb-2 border border-gray-400"
          type="text"
          placeholder="Type in the appointment field you want to create"
          onChange={(e) => setInputField(e.target.value)}
          value={inputField}
        />
        <div className="flex justify-end mt-2">
          <button
            className="mr-2 border rounded-2xl border-black px-4 py-1 text-sm flex items-center"
            onClick={() => {
              // add the input field to the fields array
              if (inputField !== "")
                setFields([...fields, inputField.trim().toLowerCase()]);
              // clear the input field
              setInputField("");
            }}
          >
            <Image src={addIcon} alt="add fields" width={13} height={13} />
            <span className="text-sm ml-1"> Add field</span>
          </button>
          <button className="border rounded-2xl border-black px-4 py-1 text-sm flex items-center">
            <Image src={saveIcon} alt="save fields" width={15} height={15} />
            <span className="text-sm ml-1">Save</span>
          </button>
        </div>
      </section>
      {/*logo and app name*/}
      <div className="flex justify-center items-center mt-10 mb-6">
        <Image
          src="/logo.svg"
          alt="Omnihale logo"
          width={30}
          height={30}
          className="mr-3 rounded-md"
        />
        <p className="font-semibold">Omnihale</p>
      </div>
    </main>
  );
}

const AuthenticatedConfigureAppointmentPage = withAuthenticated(
  ConfigureAppointmentPage
);

export default AuthenticatedConfigureAppointmentPage;
