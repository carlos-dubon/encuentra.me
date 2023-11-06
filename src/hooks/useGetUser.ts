import { auth, db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

export const USE_GET_USER_ERROR = {
  USER_NOT_FOUND: "User not found",
};

export interface User {
  imageUrl: string;
  name: string;
  description: string;
  socialLinks: {
    url: string;
    socialNetwork: string;
  }[];
  customLinks: {
    label: string;
    url: string;
    thumbnail?: string;
  }[];
  layoutConfig: {
    bgColor: string;
    bgImage: string;
    iconPack: string;
    font: string;
    customLinksStyle: string;
  };
}

export const useGetUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userSlug, setUserSlug] = useState<string | null>(null);

  const [firebaseUser, loadingAuthState, authStateError] = useAuthState(auth);

  const [userValue, loadingUser] = useDocument(
    doc(db, `users/${userSlug || "carlos"}`)
  );

  useEffect(() => {
    if (!loadingUser) {
      setUser(userValue?.data() as User);
    }
  }, [userValue, loadingUser]);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      if (!firebaseUser || loadingAuthState || authStateError) return;
      const docRef = doc(db, "accounts", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserSlug(docSnap.data()?.slug);
      } else {
        setError(USE_GET_USER_ERROR.USER_NOT_FOUND);
      }

      setLoading(false);
    };

    getUser();
  }, [firebaseUser, loadingAuthState, authStateError]);

  return {
    loading: loading || loadingUser,
    error,
    user,
  };
};
