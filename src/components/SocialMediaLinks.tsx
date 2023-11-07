import { User } from "@/hooks/useGetUser";
import { Button, Select, Input, Form, FormInstance } from "antd";
import { FC, useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

const selectOptions = [
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "github",
    label: "GitHub",
  },
];

const SocialMediaLinks: FC<{
  socialLinks: User["socialLinks"];
  isSubmittingForm: boolean;
  form: FormInstance<any>;
}> = (props) => {
  return (
    <div>
      <h1 className="font-semibold mb-5">
        Agrega links para tus redes sociales
      </h1>
      <div className="flex flex-col gap-2">
        <Form
          name="social-network-links"
          initialValues={{ links: props.socialLinks }}
          form={props.form}
        >
          <Form.List name="links">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} className="flex items-center gap-2">
                    <Form.Item
                      {...restField}
                      name={[name, "socialNetwork"]}
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio",
                        },
                      ]}
                    >
                      <Select
                        className="w-36 min-w-[144px]"
                        options={selectOptions}
                        disabled={props.isSubmittingForm}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio",
                        },
                      ]}
                      className="flex-1"
                    >
                      <Input disabled={props.isSubmittingForm} />
                    </Form.Item>
                    <CloseOutlined
                      disabled={props.isSubmittingForm}
                      className="mb-6"
                      onClick={() => remove(index)}
                    />
                  </div>
                ))}
                <Button
                  className="mb-5 w-full"
                  onClick={() => add({ socialNetwork: "", url: "" })}
                  disabled={props.isSubmittingForm}
                >
                  Agregar red social
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
