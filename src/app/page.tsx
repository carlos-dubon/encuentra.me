"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.svg";
import { ReactNode } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

interface ButtonProps {
  children: ReactNode;
  href: string;
  onClick?: () => void;
}

const Button = ({ children, href, onClick }: ButtonProps) => {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="bg-white rounded-md p-5 min-w-[200px] justify-center flex items-center shadow-md cursor-pointer hover:-translate-y-2 transition-all">
        {children}
      </div>
    </Link>
  );
};

export default function Home() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="bg-[#5C97FF] pt-[30px] h-screen">
      <div className="flex flex-col w-full h-full items-center justify-center bg-gradient-to-b from-pink-300 to bg-pink-50 shadow-2xl">
        <Image src={logo} width={120} height={20} alt="owl" />
        <div className="text-6xl font-extrabold mt-2">Encuentra.me</div>
        <div className="text-lg mt-2">
          Todo lo que eres. En un simple enlace & bio.
        </div>
        <div className="flex items-center gap-6 mt-10">
          <Button href="/carlos">Explorar</Button>
          <Button
            href="/login"
            onClick={() => {
              signInWithGoogle();
            }}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
