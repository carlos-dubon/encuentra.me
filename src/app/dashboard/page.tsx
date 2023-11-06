"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard({ params }: { params: { uid: string } }) {
  const [firebaseUser, loadingAuthState, error] = useAuthState(auth);

  const [userHasAccount, setUserHasAccount] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userHasAccount = async () => {
      setLoading(true);
      if (!firebaseUser || loadingAuthState || error) return;
      const docRef = doc(db, "accounts", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserHasAccount(true);
        console.log("Document data:", docSnap.data());

        const getUser = async () => {
          const docRef = doc(db, "users", docSnap.data()?.slug);
          return (await getDoc(docRef)).data();
        };

        const user = await getUser();

        console.log(user);
      } else {
        setUserHasAccount(false);
      }

      setLoading(false);
    };

    userHasAccount();
  }, [firebaseUser, loadingAuthState, error]);

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    return "Algo salió mal...";
  }

  if (userHasAccount) {
    return (
      <div>
        <div>Bienvenido</div>
      </div>
    );
  } else {
    return (
      <div>
        <div>Al parecer no tienes una cuenta</div>
      </div>
    );
  }
}
