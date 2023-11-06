"use client";
import { LoadingScreen } from "@/components/LoadingScreen";
import { USE_GET_USER_ERROR, useGetUser } from "@/hooks/useGetUser";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Dashboard() {
  const { loading, error, user } = useGetUser();

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
      <div className="flex flex-col w-full h-full">
        Bienvenido {form.values.name}
        <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
      </div>
    );
  }
}
