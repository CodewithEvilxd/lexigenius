// lib/firestoreHelpers.ts
import { db } from "./firebase";
import { deleteDoc, doc, collection, getDocs, where, query } from "firebase/firestore";

// 🗑️ Delete single document
export async function deleteHistoryItem(id: string) {
  await deleteDoc(doc(db, "generations", id));
}


export async function clearAllHistory(uid: string) {
  if (!uid) return;

  const q = query(collection(db, "generations"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  const deletions = querySnapshot.docs.map((docSnap) =>
    deleteDoc(doc(db, "generations", docSnap.id))
  );

  await Promise.all(deletions);
}



export async function deleteUserHistory(uid: string) {
  const q = query(collection(db, "generations"), where("uid", "==", uid));
  const snapshot = await getDocs(q);

  const deletions = snapshot.docs.map((docSnap) =>
    deleteDoc(doc(db, "generations", docSnap.id))
  );

  await Promise.all(deletions);
  console.log("All anonymous user history deleted.");
}
