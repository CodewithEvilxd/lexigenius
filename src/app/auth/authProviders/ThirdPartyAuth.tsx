"use client";
import {
  browserLocalPersistence,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { FieldValues, UseFormReset } from "react-hook-form";
import { useAuth } from "@/lib/useAuth";


interface ThirdPartyAuth<T extends FieldValues> {
  setThirdPartyAuthLoading: (value: boolean) => void;
  reset: UseFormReset<T>;
  isSubmitting: boolean;
  anonymousLoading: boolean;
  isThirdPartyAuthLoading: boolean;
  Icon: React.ElementType;
  social: "google" | "github";
}

const ThirdPartyAuth = <T extends FieldValues> ({ 
  setThirdPartyAuthLoading,
  reset,
  isSubmitting,
  isThirdPartyAuthLoading,
  Icon,
  social,
  anonymousLoading
}: ThirdPartyAuth<T>) => {
  const router = useRouter();
  const currentUser = useAuth()
  const handleSocialSignIn = async (providerName: "google" | "github") => {
    reset(); // clear form if needed
    setThirdPartyAuthLoading(true);


    let provider;

    if (providerName === "google") {
      provider = new GoogleAuthProvider();
    } else if (providerName === "github") {
      provider = new GithubAuthProvider();
    } else {
      console.error("Unsupported provider");
      return;
    }

    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setThirdPartyAuthLoading(false);
      console.log(`✅ Signed in with ${providerName}:`, user.email);

      router.push("/dashboard/generate");
    } catch (error) {
      setThirdPartyAuthLoading(false);
      if (error instanceof Error) {
        console.error(`❌ ${providerName} sign-in error:`, error.message);
      } else {
        console.error(`❌ ${providerName} sign-in error:`, error);
      }
    }
  };

  return (
    <div
      onClick={() => handleSocialSignIn(social)}
      className={`hover:dark:border-orange-900 hover:border-orange-300 border-transparent border-[1px]  py-2 px-2 dark:bg-[#262626a7] bg-zinc-300 text-zinc-600 dark:text-[#b1b1b1] font-semibold rounded-md shadow transition-[border-color] duration-200
 flex items-center gap-2   ${
        isSubmitting || isThirdPartyAuthLoading || anonymousLoading || currentUser
          ? "pointer-events-none  bg-zinc-300 dark:bg-[#242424] dark:text-zinc-700 text-zinc-500"
          : "cursor-pointer"
      }`}
    >
      <p>Sign in</p>
      <Icon/>
    </div>
  );
};

export default ThirdPartyAuth;
