"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

import backIcon from "@/assets/icons/back.png";
import saveIcon from "@/assets/icons/save.png";
import withAuthenticated from "@/components/withAuthenticated";
import URL from "@/app/constants/URL";
import customRequestInit from "@/utils/customRequestInit";

type ProfileDetails = {
  profileImg: string | StaticImageData;
  name: string;
  address: string;
  onlineAppointmentThreshold: string;
  dailyAppointmentThreshold: string;
};

function ProfilePage() {
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    profileImg: "",
    address: "",
    name: "",
    dailyAppointmentThreshold: "",
    onlineAppointmentThreshold: "",
  });
  const [isTOkenOk, setIsTokenOk] = useState(false);

  const imageFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsTokenOk(true);
    } else {
      location.href = "/auth";
    }
    const options: RequestInit = customRequestInit(
      token,
      ProfileDetails,
      "GET"
    );
    // Get user profile details
    fetch(`${URL}/profile`, options)
      .then((res) => res.json())
      .then((data: ProfileDetails) => {
        setProfileDetails(data);
      });
  }, []);

  return (
    <main>
      <ProfileHeader backIcon={backIcon} />
      <section className="grid place-items-center">
        <div className="w-96">
          <div className="flex justify-between mb-6">
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-20 mb-2">
                <Image
                  src={profileDetails.profileImg}
                  alt="healthcare logo"
                  fill
                  className="rounded-full border border-gray-400 object-cover"
                />
              </div>
              <input
                type="file"
                name="imageFile"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                ref={imageFileRef}
                onChange={(file) => {
                  const reader = new FileReader();
                  // handle file read
                  reader.onload = (image) => {
                    // handle image change
                    setProfileDetails((state) => ({
                      ...state,
                      profileImg: image.target
                        ?.result as unknown as StaticImageData,
                    }));
                  };
                  // read the fil>
                  reader.readAsDataURL(
                    file.target.files ? file.target.files[0] : new Blob()
                  );
                }}
              />
              <button
                className="px-4 py-1 rounded-full border text-xs border-gray-400"
                onClick={
                  // open file dialog
                  () => imageFileRef?.current?.click()
                }
              >
                Upload Image
              </button>
            </div>
            <ProfileDetails
              setProfileDetails={setProfileDetails}
              profileDetails={profileDetails}
            />
          </div>
          <SaveProfileDetails saveIcon={saveIcon} />
        </div>
      </section>
    </main>
  );
}

export default withAuthenticated(ProfilePage);

function ProfileHeader({ backIcon }: { backIcon: string | StaticImageData }) {
  return (
    <header className="flex items-center justify-between w-3/6 mb-40 mt-12 m-auto">
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
      <h1 className="text-2xl font-semibold">Profile</h1>
    </header>
  );
}

function ProfileDetails({
  profileDetails,
  setProfileDetails,
}: {
  profileDetails: ProfileDetails;
  setProfileDetails: React.Dispatch<React.SetStateAction<ProfileDetails>>;
}) {
  return (
    <div className="ml-4 p-2 w-60">
      <form onSubmit={(e) => e.preventDefault()}>
        <ProfileInput
          value={profileDetails.name}
          placeholder="hospital name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileDetails((state) => ({ ...state, name: e.target.value }))
          }
          id="1"
          inputLabel="Hospital name"
        />
        <ProfileInput
          value={profileDetails.address}
          placeholder="hospital address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileDetails((state) => ({
              ...state,
              address: e.target.value,
            }))
          }
          id="2"
          inputLabel="Hospital address"
        />
        <ProfileInput
          value={profileDetails.onlineAppointmentThreshold}
          placeholder="Online appointment threshold"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileDetails((state) => ({
              ...state,
              onlineAppointmentThreshold: e.target.value,
            }))
          }
          id="3"
          inputLabel=" Online appointment threshold"
        />
        <ProfileInput
          value={profileDetails.dailyAppointmentThreshold}
          placeholder="Daily appointment threshold"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileDetails((state) => ({
              ...state,
              dailyAppointmentThreshold: e.target.value,
            }))
          }
          id="4"
          inputLabel="Daily appointment threshold"
        />
      </form>
    </div>
  );
}

function ProfileInput({
  value,
  placeholder,
  onChange,
  inputLabel,
  id,
}: {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputLabel: string;
  id: string;
}) {
  return (
    <>
      <div className="inline-block mb-1">
        <label htmlFor={id}>{inputLabel}</label>
      </div>

      <input
        className="block border w-full border-gray-400 text-xs py-3 px-2 rounded-md mb-4"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}

function SaveProfileDetails({
  saveIcon,
}: {
  saveIcon: string | StaticImageData;
}) {
  return (
    <div className="flex justify-end">
      <button className="border rounded-2xl border-black px-4 py-1 text-sm flex items-center">
        <Image src={saveIcon} alt="save fields" width={15} height={15} />
        <span className="text-sm ml-1">Save</span>
      </button>
    </div>
  );
}
