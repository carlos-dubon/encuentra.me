/* eslint-disable @next/next/no-img-element */
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";

export interface User {
  imageUrl: string;
  name: string;
  description: string;
  socialLinks: {
    slug: string;
    socialNetwork: string;
  }[];
  layoutConfig: {
    bgColor: string;
    bgImage: string;
    iconPack: string;
    font: string;
  };
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
        backgroundColor: user?.layoutConfig.bgColor,
      }}
      className="text-white h-screen flex flex-col items-center p-6"
    >
      <img
        src={user?.imageUrl}
        alt={user?.name}
        width={96}
        className="rounded-full mb-4"
      />

      <p className="text-xl font-medium">{user?.name}</p>
      <p className="text-sm mt-1">{user?.description}</p>

      <div className="flex gap-2 mt-6">
        {user?.socialLinks.map((socialLink, index) => {
          return (
            <Link href={"#"} key={index}>
              {socialLink.slug}
            </Link>
          );
        })}
      </div>

      {/* Custom links section */}
      <div className="mt-8"></div>
    </div>
  );
}
