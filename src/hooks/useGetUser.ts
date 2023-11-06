import { auth, db } from "@/app/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { nanoid } from "nanoid";

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
    textColor: string;
    bgImage: string;
    iconPack: string;
    font: string;
    customLinksStyle: string;
  };
}

const newUser = (name: string): User => {
  return {
    name,
    description: "",
    imageUrl: "",
    layoutConfig: {
      bgColor: "#ffffff",
      textColor: "#000000",
      bgImage: "",
      customLinksStyle: "",
      font: "Inter",
      iconPack: "bootstrap",
    },
    customLinks: [],
    socialLinks: [],
  };
};

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
        // TODO: Check for duplicate slugs and throw error

        const slug = prompt("Escoge tu URL personalizada") || nanoid(6);

        await setDoc(doc(db, "accounts", firebaseUser.uid), {
          slug,
        });

        await setDoc(
          doc(db, "users", slug),
          newUser(firebaseUser.displayName || "John Doe")
        );

        setUserSlug(slug);
      }

      setLoading(false);
    };

    getUser();
  }, [firebaseUser, loadingAuthState, authStateError]);

  return {
    loading: loading || loadingUser,
    error,
    user,
    userSlug,
  };
};
