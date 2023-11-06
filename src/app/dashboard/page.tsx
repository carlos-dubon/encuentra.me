"use client";
import { USE_GET_USER_ERROR, useGetUser } from "@/hooks/useGetUser";

export default function Dashboard({ params }: { params: { uid: string } }) {
  const { loading, error, user } = useGetUser();

  if (loading) {
    return "Cargando...";
  }

  if (error == USE_GET_USER_ERROR.USER_NOT_FOUND) {
    return "Usuario no encontrado";
  }

  if (error) {
    return "Error desconocido";
  }

  if (user?.name) {
    return <div>Bienvenido {user.name}</div>;
  }
}
