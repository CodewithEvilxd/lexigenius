// lib/logoutHelper.ts
import { deleteUser, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { deleteUserHistory } from "@/lib/fireStoreHelpers";

export const handleLogout = async (): Promise<void> => {
  const user = auth.currentUser;

  if (user?.isAnonymous && user.uid) {
    await deleteUserHistory(user.uid); // Clean up anonymous user data
    await deleteUser(user);
  } else {
    await signOut(auth);
  }
};
