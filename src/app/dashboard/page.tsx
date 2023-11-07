"use client";
import { LoadingScreen } from "@/components/LoadingScreen";
import { User, useGetUser } from "@/hooks/useGetUser";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, ColorPicker, Select } from "antd";
import Image from "next/image";
import logo from "/public/logo.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { Separator } from "@/components/Separator";
import { SaveOutlined, LinkOutlined } from "@ant-design/icons";
import { InputError } from "@/components/InputError";
import { InputContainer } from "@/components/InputContainer";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const { loading, error, user, userSlug } = useGetUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    await signOut(auth);
    router.push("/");
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
      textColor: user?.layoutConfig?.textColor || "",
    },
    customLinks: user?.customLinks || [],
    socialLinks: user?.socialLinks || [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Este campo es obligatorio"),
    description: Yup.string().required("Este campo es obligatorio"),
    imageUrl: Yup.string().required("Este campo es obligatorio"),
    layoutConfig: Yup.object({
      bgColor: Yup.string().required("Este campo es obligatorio"),
      textColor: Yup.string().required("Este campo es obligatorio"),
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
    onSubmit: async (values) => {
      setIsSubmittingForm(true);
      await setDoc(doc(db, "users", userSlug || ""), values);
      setIsSubmittingForm(false);
    },
  });

  if (loading) return <LoadingScreen />;

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

        <div className="flex gap-6 flex-col sm:flex-row">
          <div className="max-w-md flex flex-col mt-6 gap-4 flex-1">
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
                  form.setFieldValue(
                    "layoutConfig.bgColor",
                    `#${color.toHex()}`
                  )
                }
              />
              <InputError
                isShown={!!form.errors.layoutConfig?.bgColor}
                errorMessage={form.errors.layoutConfig?.bgColor}
              />
            </InputContainer>

            <InputContainer label="Color de texto">
              <ColorPicker
                disabled={isSubmittingForm}
                showText
                size="large"
                value={form.values.layoutConfig.textColor}
                onChange={(color) =>
                  form.setFieldValue(
                    "layoutConfig.textColor",
                    `#${color.toHex()}`
                  )
                }
              />
              <InputError
                isShown={!!form.errors.layoutConfig?.textColor}
                errorMessage={form.errors.layoutConfig?.textColor}
              />
            </InputContainer>

            <InputContainer label="Imagen de fondo" isOptional>
              <Input
                value={form.values.layoutConfig.bgImage}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="layoutConfig.bgImage"
                disabled={isSubmittingForm}
              />
              <InputError
                isShown={
                  form.touched.layoutConfig?.bgImage &&
                  !!form.errors.layoutConfig?.bgImage
                }
                errorMessage={form.errors.layoutConfig?.bgImage}
              />
            </InputContainer>

            <div className="flex gap-2 items-center">
              <Button
                className="bg-blue-500 w-full"
                type="primary"
                icon={<SaveOutlined />}
                loading={isSubmittingForm}
                onClick={() => {
                  form.submitForm();
                }}
              >
                Guardar
              </Button>
              <Link
                href={`/${userSlug}`}
                passHref
                className="w-full"
                target="_blank"
              >
                <Button icon={<LinkOutlined />} className="w-full">
                  Previsualizar
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">hello world</div>
        </div>

        <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
      </div>
    );
  }
}
