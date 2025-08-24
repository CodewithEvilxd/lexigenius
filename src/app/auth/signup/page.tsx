"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { signupSchema } from "../../../lib/validation/Auth-schema";
import { auth } from "../../../lib/firebase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaGithub } from "react-icons/fa";
import NotificationModal from "@/components/NotificationModal";
import Link from "next/link";
import GuestSignin from "../authProviders/GuestSignin";
import z from "zod";
import { useAuthContext } from "@/components/AuthProvider";
import ThirdPartyAuth from "../authProviders/ThirdPartyAuth";
import { useAuth } from "@/lib/useAuth";

type Inputs = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const currentUser = useAuth()
  const {
    anonymousLoading,
    setNeedsEmailVerification,
    setThirdPartyAuthLoading,
    isThirdPartyAuthLoading
  } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setNeedsEmailVerification(true);
      }

      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random`;

      await updateProfile(user, {
        displayName: name,
        photoURL: avatarUrl,
      });

      await auth.signOut();

      setMessage("✅ Verification email sent! Please check your inbox.");
      setEmailSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setMessage("❌ Signup failed: " + error.message);
      } else {
        setMessage("❌ Signup failed: Unknown error");
      }
    }
  };


const formRef = useRef<HTMLFormElement | null>(null);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      reset(); // ✅ directly call reset from useForm
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [reset]);



  return (
    <div className="flex w-full items-center justify-center flex-col   gap-4 min-h-screen sm:flex-row px-4 py-4 ">
      <div className=" w-full sm:w-[60%] lg:w-[45%] flex items-center justify-center  mt-16 ">
        <div className={`w-full max-w-md rounded-lg  px-5 sm:px-8 py-6 lg:py-2  bg-[#ffffffa4] shadow-[#83ffec96]  md:shadow-[#6cb0a675] dark:shadow-yellow-900 dark:shadow-sm dark:bg-[#000000d6] shadow-md md:shadow-lg`}>
          <h2
            className={`text-2xl font-bold mb-4 sm:mb-6 text-center dark:text-[#b1b1b1] text-zinc-600 `}
          >
            Sign Up
          </h2>
          {!emailSent && (

            <div>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <div className="relative">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-500 dark:text-[#b1b1b1]"
                  >
                    Name
                  </Label>
                  <Input
                    disabled={
                      isSubmitting ||
                      isThirdPartyAuthLoading ||
                      anonymousLoading ||
                      !!currentUser
                    }
                    id="name"
                    type="text"
                    autoComplete="name"
                    //   required
                    className={`dark:text-zinc-300 text-zinc-600  placeholder:dark:text-zinc-600 placeholder:text-zinc-400  mt-1 block w-full rounded-md  shadow-sm  disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name && errors.name.message
                        ? "border-red-700"
                        : "focus:dark:border-orange-900 border-zinc-300 dark:border-zinc-800 focus:border-orange-400"
                    }`}
                    placeholder="John doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-700 text-[0.7rem] mb-3 absolute">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-500 dark:text-[#b1b1b1]"
                  >
                    Email
                  </Label>
                  <Input
                    disabled={
                      isSubmitting ||
                      isThirdPartyAuthLoading ||
                      anonymousLoading ||
                      !!currentUser
                    }
                    id="email"
                    type="email"
                    autoComplete="email"
                    //   required
                    className={`dark:text-zinc-300 text-zinc-600  placeholder:dark:text-zinc-600 placeholder:text-zinc-400 mt-1 block w-full rounded-md  shadow-sm disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name && errors.name.message
                        ? "border-red-700"
                        : "focus:dark:border-orange-900 border-zinc-300 dark:border-zinc-800 focus:border-orange-400"
                    }`}
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-700 text-[0.7rem] mb-3 absolute">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-500 dark:text-[#b1b1b1]"
                  >
                    Password
                  </Label>
                  <Input
                    disabled={
                      isSubmitting ||
                      isThirdPartyAuthLoading ||
                      anonymousLoading ||
                      !!currentUser
                    }
                    {...register("password")}
                    id="password"
                    type="password"
                    //   required
                    className={`dark:text-zinc-300 text-zinc-600  placeholder:dark:text-zinc-600 placeholder:text-zinc-400   mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name && errors.name.message
                        ? "border-red-700"
                        : "focus:dark:border-orange-900 border-zinc-300 dark:border-zinc-800 focus:border-orange-400"
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-700 absolute text-[0.7rem] mb-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="relative pb-3">
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-zinc-500 dark:text-[#b1b1b1]"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    disabled={
                      isSubmitting ||
                      isThirdPartyAuthLoading ||
                      anonymousLoading ||
                      !!currentUser
                    }
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    //   required
                    className={`dark:text-zinc-300 text-zinc-600  placeholder:dark:text-zinc-600 placeholder:text-zinc-400  mt-1 block w-full rounded-md border-gray-300 shadow-sm   disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name && errors.name.message
                        ? "border-red-700"
                        : "focus:dark:border-orange-900 border-zinc-300 dark:border-zinc-800 focus:border-orange-400"
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-700 text-[0.7rem] mb-1 absolute">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  disabled={
                    isSubmitting ||
                    isThirdPartyAuthLoading ||
                    anonymousLoading ||
                    !!currentUser
                  }
                  type="submit"
                  className={`w-full py-2 px-4 cursor-pointer  text-white font-semibold rounded-md shadow hover:bg-orange-700 transition duration-200 hover:dark:bg-orange-900  disabled:opacity-50 disabled:cursor-not-allowed  ${
                    isSubmitting ||
                    isThirdPartyAuthLoading ||
                    anonymousLoading ||
                    currentUser
                      ? "pointer-events-none dark:bg-orange-900 bg-orange-300 text-zinc-400"
                      : "bg-orange-600 dark:bg-orange-800"
                  }`}
                >
                  {isSubmitting ? "Submitting.." : "Submit"}
                </button>
              </form>
              <div className="flex items-center justify-between gap-5 my-5">
                <ThirdPartyAuth<Inputs>
                  Icon={FaGoogle}
                  setThirdPartyAuthLoading={setThirdPartyAuthLoading}
                  reset={reset}
                  isSubmitting={isSubmitting}
                  isThirdPartyAuthLoading={isThirdPartyAuthLoading}
                  social={"google"}
                  anonymousLoading={anonymousLoading}
                />
                <ThirdPartyAuth<Inputs>
                  Icon={FaGithub}
                  setThirdPartyAuthLoading={setThirdPartyAuthLoading}
                  reset={reset}
                  isSubmitting={isSubmitting}
                  isThirdPartyAuthLoading={isThirdPartyAuthLoading}
                  social={"github"}
                  anonymousLoading={anonymousLoading}
                />
              </div>
              <p className="mt-6 text-center text-sm text-zinc-500 dark:text-[#b1b1b1]">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className={`text-orange-600 font-medium hover:underline ${
                    isSubmitting ||
                    isThirdPartyAuthLoading ||
                    anonymousLoading ||
                    currentUser
                      ? "pointer-events-none opacity-[0.6]"
                      : "opacity-1"
                  }`}
                >
                  Sign in
                </Link>
              </p>

              {message && (
               <NotificationModal
                         title="Submission failed"
                         message={message}
                         onClose={() => setMessage("")}
                         onConfirm={() => setMessage("")}
                         buttonText="ok"
                       />
              )}
            </div>
          )}

          {emailSent && (
            <div className="flex items-center justify-center flex-col gap-2 ">
              <h1 className="dark:text-[#b1b1b1] font-semibold text-center">
                Email Sent!
              </h1>
              <h1 className="text-[#b1b1b1]  text-center font-normal">
                Please Verify your Email by the clicking on the Link sent to
                your email
              </h1>
            </div>
          )}
        </div>
      </div>
      <GuestSignin
        currentUser={currentUser}
        signOut={signOut}
        auth={auth}
        signInAnonymously={signInAnonymously}
        isSubmitting={isSubmitting}
        isThirdPartyAuthLoading={isThirdPartyAuthLoading}
        className={'sm:w-[30%] md:w-[15%]'}
      />
    </div>
  );
}
