import { DotLoader } from "react-spinners";

export const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-pink-300 to bg-pink-50">
      <DotLoader color="#5C97FF" size={70} />
      <div className="mt-4 text-lg font-medium">Cargando tu dashboard</div>
    </div>
  );
};
