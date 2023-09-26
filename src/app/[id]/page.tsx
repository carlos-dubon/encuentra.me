/* eslint-disable @next/next/no-img-element */
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const BootstrapIcons = {
  linkedin: <BsLinkedin size={32} />,
  github: <BsGithub size={32} />,
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
      className="text-white h-screen flex flex-col items-center py-6 px-4 sm:p-6"
    >
      <img
        src={user?.imageUrl}
        alt={user?.name}
        width={96}
        height={96}
        className="rounded-full mb-4"
      />

      <p className="text-xl font-medium">{user?.name}</p>
      <p className="text-sm mt-1">{user?.description}</p>

      <div className="flex gap-4 mt-6">
        {user?.socialLinks.map((socialLink, idx) => {
          return (
            <Link
              target="_blank"
              referrerPolicy="no-referrer"
              href={socialLink.url}
              key={idx}
            >
              {BootstrapIcons[socialLink.socialNetwork]}
            </Link>
          );
        })}
      </div>

      {/* Custom links section */}
      <div className="mt-8 flex flex-col gap-4 w-full max-w-xl">
        {user?.customLinks.map((link, idx) => {
          return (
            <Link
              target="_blank"
              referrerPolicy="no-referrer"
              className="hover:scale-105 transition bg-white text-black rounded-md flex items-center justify-center w-full shadow-sm px-2"
              href={link.url || ""}
              key={idx}
            >
              {link.thumbnail && (
                <img
                  src={link.thumbnail}
                  alt="thumbnail"
                  width={46}
                  height={46}
                  className="object-cover"
                />
              )}
              <div className="w-full flex items-center justify-center py-4">
                {link.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
