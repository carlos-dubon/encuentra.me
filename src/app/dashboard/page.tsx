"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard({ params }: { params: { uid: string } }) {
  const [user, loadingAuthState, error] = useAuthState(auth);

  const [userHasAccount, setUserHasAccount] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userHasAccount = async () => {
      setLoading(true);
      if (!user || loadingAuthState || error) return;
      const docRef = doc(db, "accounts", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserHasAccount(true);
        console.log("Document data:", docSnap.data());
      } else {
        setUserHasAccount(false);
      }

      setLoading(false);
    };

    userHasAccount();
  }, [user, loadingAuthState, error]);

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    return "Algo salió mal...";
  }

  return <div>Dashboard</div>;
}
