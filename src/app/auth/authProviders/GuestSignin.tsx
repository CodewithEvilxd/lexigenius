"use client";
import { useAuthContext } from "@/components/AuthProvider";
import { deleteUserHistory } from "@/lib/fireStoreHelpers";
import { Auth, deleteUser, User, UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

interface Props {
  currentUser: User | null | undefined;
  isSubmitting: boolean;
  isThirdPartyAuthLoading: boolean;
  signOut: (auth: Auth) => Promise<void>;
  signInAnonymously: (auth: Auth) => Promise<UserCredential>;
  auth:Auth;
  className?: string;

}

const GuestSignin = ({
  currentUser,
  auth,
  signInAnonymously,
  isSubmitting,
    isThirdPartyAuthLoading,
  className,
}: Props) => {
    const router = useRouter()
    const { anonymousLoading, setAnonymousLoading, needsEmailVerification } = useAuthContext();


  const handleGuestAuth = async () => {
    setAnonymousLoading(true);
    try {
      if (currentUser?.isAnonymous) {
        await deleteUserHistory(currentUser.uid);
              await deleteUser(currentUser);
      } else {
        await signInAnonymously(auth);
         router.push("/dashboard/generate");
      }
    } catch (error) {
      console.error("Guest auth error:", error);
    } finally {
      setAnonymousLoading(false);
    }
  };

  const getGuestButtonText = () => {
    if (anonymousLoading) {
      console.log(currentUser?.isAnonymous);
      
      return currentUser?.isAnonymous ? "Signing out..." : "Signing in...";
    }
    return currentUser?.isAnonymous ? "Sign out as Guest" : "Sign in as Guest";
  };

  return (
    <div
      onClick={handleGuestAuth}
      className={`dark:shadow-yellow-900 shadow-md md:shadow-lg dark:shadow-sm  shadow-[#83ffec96] dark:bg-[#060606] bg-zinc-200 ${className} flex items-center justify-center hover:dark:border-orange-900 hover:border-orange-300   border-transparent border-[1px] w-full sm:w-[20%]  py-2 dark:text-[#b1b1b1]   text-[#737373] font-semibold rounded-md  shadow  transition-[border-color] duration-200
       gap-2    ${
        isSubmitting || anonymousLoading || isThirdPartyAuthLoading || needsEmailVerification || !!currentUser
          ? "pointer-events-none bg-zinc-300 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-700"
          : "cursor-pointer"
      }`}
    >
      <p>{getGuestButtonText()}</p>
      <FaUser className="" />
    </div>
  );
};

export default GuestSignin;
