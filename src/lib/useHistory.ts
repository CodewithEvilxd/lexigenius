import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { User } from "firebase/auth";

type Generation = {
  id: string;
  uid: string;
  prompt: string;
  result: string;
  createdAt: Timestamp;
  contentType: string
};

export function useHistory(currentUser: User | null | undefined ) {
  const [items, setItems] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const q = query(
      collection(db, "generations"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Generation[];
      setItems(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser?.uid]);

  return { history: items, loading };
}
