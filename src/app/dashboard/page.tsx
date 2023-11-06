"use client";
import { USE_GET_USER_ERROR, useGetUser } from "@/hooks/useGetUser";
import { DotLoader } from "react-spinners";

export default function Dashboard() {
  const { loading, error, user } = useGetUser();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-pink-300 to bg-pink-50">
        <DotLoader color="#5C97FF" size={70} />
        <div className="mt-4 text-lg font-medium">Cargando tu dashboard</div>
      </div>
    );
  }

  if (error == USE_GET_USER_ERROR.USER_NOT_FOUND) {
    return "Usuario no encontrado";
  }

  if (error) {
    return "Error desconocido";
  }

  if (user?.name) {
    return (
      <div className="text-xs">
        Bienvenido {user.name}
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    );
  }
}
