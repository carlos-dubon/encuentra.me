/* eslint-disable @next/next/no-img-element */
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";

export interface User {
  bgColor: string;
  bgImage: string;
  imageUrl: string;
  name: string;
  socialLinks: {
    slug: string;
    socialNetwork: string;
  }[];
  iconPack: string;
}

export default async function Page({ params }: { params: { id: string } }) {
  const getUser = async () => {
    const docRef = doc(db, "users", params.id);
    return (await getDoc(docRef)).data() as User | undefined;
  };

  const user = await getUser();

  return (
    <div
      style={{
        backgroundColor: user?.bgColor,
      }}
      className="text-white h-screen flex flex-col items-center p-6 gap-2"
    >
      <img
        src={user?.imageUrl}
        alt={user?.name}
        width={96}
        className="rounded-full"
      />

      <p className="text-xl font-medium">{user?.name}</p>
      <div className="flex gap-2">
        {user?.socialLinks.map((socialLink, index) => {
          return (
            <Link href={"#"} key={index}>
              {socialLink.slug}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
