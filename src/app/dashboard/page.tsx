"use client";
import { LoadingScreen } from "@/components/LoadingScreen";
import { USE_GET_USER_ERROR, User, useGetUser } from "@/hooks/useGetUser";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, ColorPicker } from "antd";
import Image from "next/image";
import logo from "/public/logo.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Separator } from "@/components/Separator";
import { SaveOutlined } from "@ant-design/icons";
import { InputError } from "@/components/InputError";
import { InputContainer } from "@/components/InputContainer";

export default function Dashboard() {
  const router = useRouter();
  const { loading, error, user } = useGetUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    await signOut(auth);
    router.push("/");
  };

  const submitForm = async (values: User) => {
    setIsSubmittingForm(true);
    console.log(values);
    setIsSubmittingForm(false);
  };

  const initialValues: User = {
    name: user?.name || "",
    description: user?.description || "",
    imageUrl: user?.imageUrl || "",
    layoutConfig: {
      bgColor: user?.layoutConfig?.bgColor || "",
      bgImage: user?.layoutConfig?.bgImage || "",
      customLinksStyle: user?.layoutConfig?.customLinksStyle || "",
      font: user?.layoutConfig?.font || "",
      iconPack: user?.layoutConfig?.iconPack || "",
    },
    customLinks: user?.customLinks || [],
    socialLinks: user?.socialLinks || [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Este campo es obligatorio"),
    description: Yup.string().required("Este campo es obligatorio"),
    imageUrl: Yup.string().required("Este campo es obligatorio"),
    layourConfig: Yup.object({
      bgColor: Yup.string().required("Este campo es obligatorio"),
      bgImage: Yup.string(),
      customLinksStyle: Yup.string(),
      font: Yup.string(),
      iconPack: Yup.string(),
    }),
  });

  const form = useFormik({
    initialValues,
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
        <Separator className="my-2" />

        <p className="text-xl font-medium">Bienvenido {form.values.name},</p>
        <p className="text-sm">
          Edita tu perfil aquí, y luego presiona guardar.
        </p>

        <div className="max-w-md flex flex-col mt-6 gap-4">
          <InputContainer label="Nombre">
            <Input
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="name"
              disabled={isSubmittingForm}
            />
            <InputError
              isShown={form.touched.name && !!form.errors.name}
              errorMessage={form.errors.name}
            />
          </InputContainer>

          <InputContainer label="Descripción">
            <Input
              value={form.values.description}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="description"
              disabled={isSubmittingForm}
            />
            <InputError
              isShown={form.touched.description && !!form.errors.description}
              errorMessage={form.errors.description}
            />
          </InputContainer>

          <InputContainer label="Foto de perfil">
            <Input
              value={form.values.imageUrl}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="imageUrl"
              disabled={isSubmittingForm}
            />
            <InputError
              isShown={form.touched.imageUrl && !!form.errors.imageUrl}
              errorMessage={form.errors.imageUrl}
            />
          </InputContainer>

          <InputContainer label="Color de fondo">
            <ColorPicker
              disabled={isSubmittingForm}
              showText
              size="large"
              value={form.values.layoutConfig.bgColor}
              onChange={(color) =>
                form.setFieldValue("layoutConfig.bgColor", `#${color.toHex()}`)
              }
            />
            <InputError
              isShown={!!form.errors.layoutConfig?.bgColor}
              errorMessage={form.errors.layoutConfig?.bgColor}
            />
          </InputContainer>

          <Button
            className="bg-blue-500"
            type="primary"
            icon={<SaveOutlined />}
            loading={isSubmittingForm}
            onClick={() => {
              submitForm(form.values);
            }}
          >
            Guardar
          </Button>
        </div>

        <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
      </div>
    );
  }
}
