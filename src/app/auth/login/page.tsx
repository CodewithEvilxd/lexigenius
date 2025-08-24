"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { loginSchema } from "../../../lib/validation/Auth-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { auth } from "../../../lib/firebase";
import {
  reload,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import NotificationModal from "@/components/NotificationModal";
import GuestSignin from "../authProviders/GuestSignin";
import z from "zod";
import { useAuthContext } from "@/components/AuthProvider";
import ThirdPartyAuth from "../authProviders/ThirdPartyAuth";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/useAuth";

type Inputs = z.infer<typeof loginSchema>;

const Page = () => {
  const [message, setMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const currentUser = useAuth();

  const router = useRouter();
  const {
    anonymousLoading,
    setThirdPartyAuthLoading,
    isThirdPartyAuthLoading,
  } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });

  const login: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await reload(user); // MUST reload to refresh emailVerified
      router.push("/dashboard");

      if (!user.emailVerified) {
        setMessage("Please verify your email before logging in.");
        reset();
        return;
      }

      setMessage("");
      // Redirect to dashboard or homepage
    } catch (error) {
      reset();

      if (error instanceof Error) {
        setMessage("❌ Login failed: " + error.message);
      } else {
        setMessage("❌ Login failed: Unknown error");
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
    <div className="min-h-screen flex items-center justify-center px-4  flex-col gap-7">
      <div className="w-full max-w-md  rounded-lg shadow-md md:shadow-lg p-8 dark:bg-[#000000d6] bg-[#ffffffa4] md:shadow-[#6cb0a675] dark:shadow-yellow-900 dark:shadow-sm mt-16 shadow-[#83ffec96]">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-[#b1b1b1] text-zinc-600">
          Sign In
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(login)}
          ref={formRef}
        >
          <div className="relative">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-500 dark:text-[#b1b1b1]"
            >
              Email
            </Label>
            <Input
            autoComplete="off"
              disabled={
                isSubmitting ||
                isThirdPartyAuthLoading ||
                anonymousLoading ||
                !!currentUser
              }
              id="email"
              type="email"
              //   required
              className={`dark:text-zinc-300 text-zinc-600  placeholder:dark:text-zinc-600 placeholder:text-zinc-400  mt-1 block w-full rounded-md  shadow-sm  disabled:opacitdy-60 disabled:cursor-not-allowed ${
                errors.email && errors.email.message
                  ? "border-red-700"
                  : "focus:dark:border-orange-800 border-zinc-300 dark:border-zinc-800 focus:border-orange-400"
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
              className={`dark:text-zinc-300 text-zinc-600  placeholder:dark:text-zinc-700 placeholder:text-zinc-400  mt-1 block w-full rounded-md  shadow-sm  disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.password && errors.password.message
                  ? "border-red-700"
                  : "focus:dark:border-orange-800 border-zinc-300 dark:border-zinc-800 focus:border-orange-400"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-700 text-[0.7rem] mb-1 absolute">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <Checkbox
                id="remember"
                disabled={isSubmitting}
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className={cn(
                  "h-4 w-4 rounded cursor-pointer border border-zinc-300 dark:border-zinc-700",
                  "data-[state=checked]:bg-black  dark:data-[state=checked]:bg-zinc-200",
                  "data-[state=checked]:text-white dark:data-[state=checked]:text-zinc-900", // checkmark color
                  "disabled:opacity-50",
                  (isSubmitting ||
                    isThirdPartyAuthLoading ||
                    anonymousLoading ||
                    currentUser) &&
                    "pointer-events-none"
                )}
              />

              <label
                htmlFor="remember"
                className={`ml-2 block text-sm text-zinc-800 dark:text-[#b1b1b1]  ${
                  isSubmitting ||
                  isThirdPartyAuthLoading ||
                  anonymousLoading ||
                  currentUser
                    ? "pointer-events-none"
                    : ""
                }`}
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                onClick={(e) => {
                  if (isSubmitting) {
                    e.preventDefault();
                  }
                }}
                className={`${
                  isSubmitting ||
                  isThirdPartyAuthLoading ||
                  anonymousLoading ||
                  currentUser
                    ? "text-zinc-500 pointer-events-none"
                    : "text-orange-600 "
                } hover:underline`}
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            disabled={isSubmitting}
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
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className={`text-orange-600 font-medium hover:underline ${
              isSubmitting ||
              isThirdPartyAuthLoading ||
              anonymousLoading ||
              currentUser
                ? "pointer-events-none opacity-[0.6]"
                : "opacity-1"
            }`}
          >
            Sign Up
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
      <GuestSignin
        currentUser={currentUser}
        signOut={signOut}
        auth={auth}
        signInAnonymously={signInAnonymously}
        isSubmitting={isSubmitting}
        isThirdPartyAuthLoading={isThirdPartyAuthLoading}
      />
    </div>
  );
};

export default Page;
