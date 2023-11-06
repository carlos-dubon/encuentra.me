"use client";
import { LoadingScreen } from "@/components/LoadingScreen";
import { USE_GET_USER_ERROR, useGetUser } from "@/hooks/useGetUser";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button } from "antd";
import Image from "next/image";
import logo from "/public/logo.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Separator } from "@/components/Separator";

export default function Dashboard() {
  const router = useRouter();
  const { loading, error, user } = useGetUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    await signOut(auth);
    router.push("/");
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Este campo es obligatorio"),
  });

  const form = useFormik({
    initialValues: {
      name: user?.name,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  if (loading) return <LoadingScreen />;

  if (error == USE_GET_USER_ERROR.USER_NOT_FOUND) {
    return "Usuario no encontrado";
  }

  if (error) {
    return "Error desconocido";
  }

  if (user?.name) {
    return (
      <div className="flex flex-col w-full h-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 mb-2 items-center">
            <Image src={logo} width={32} height={20} alt="logo" />
            <p className="font-medium">encuentra.me (admin)</p>
          </div>
          <Button loading={isLoggingOut} danger onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
        <Separator className="my-4" />
        Bienvenido {form.values.name}
        <Input
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          name="name"
        />
        <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
      </div>
    );
  }
}
