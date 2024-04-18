"use client";

import React, { useState } from "react";
import Image from "next/image";

import AuthInput from "./Input";
import { LoginCredentials } from "@/types/authCredentials";

type LoginProps = {
  fields: LoginCredentials;
  onUserSignUp: (value: boolean) => void;
  loginHandler: (
    loginCredentials: LoginCredentials,
    setIsUserLogin: (value: boolean) => void,
    setErrorResponse: (value: string | null) => void
  ) => void;
  errorErrorResponse: string | null;
  setErrorResponse: (value: string | null) => void;
  setIsUserLogin: (value: boolean) => void;
  children: React.ReactNode;
};

const Login = ({
  fields,
  onUserSignUp,
  loginHandler,
  errorErrorResponse,
  setErrorResponse,
  setIsUserLogin,
  children,
}: LoginProps) => {
  return (
    <section className="grid place-items-center h-screen">
      <div className="w-1/6">
        <h3 className="text-center m-3 text-2xl font-semibold">Log In</h3>
        {errorErrorResponse && (
          <p className="text-red-600 text-xs mb-2">{errorErrorResponse}</p>
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          {children}
          <div className="flex justify-center">
            <button
              className="bg-blue-700 my-3 px-4 py-2 text-white text-sm rounded-md"
              onClick={() =>
                loginHandler(fields, setIsUserLogin, setErrorResponse)
              }
            >
              Login to account
            </button>
          </div>
        </form>
        <p className="text-xs text-left">
          {"Don't have an account,"}
          <button
            className="text-blue-500 ml-1"
            onClick={() => onUserSignUp(false)}
          >
            Sign Up
          </button>
        </p>
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
      </div>
    </section>
  );
};

export default Login;
