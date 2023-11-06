import { BarLoader } from "react-spinners";
import Image from "next/image";
import logo from "/public/logo.svg";

export const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex gap-4 flex-col justify-center items-center bg-gradient-to-b from-pink-300 to bg-pink-50">
      <Image src={logo} width={72} height={20} alt="logo" />
      <BarLoader color="#5C97FF" width={120} />
      <div className="font-medium">Cargando...</div>
    </div>
  );
};
