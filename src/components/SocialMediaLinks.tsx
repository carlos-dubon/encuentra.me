import { User } from "@/hooks/useGetUser";
import { Button, Select, Input, Form } from "antd";
import { FC } from "react";
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
          onFinish={(values) => console.log(values)}
        >
          <Form.List name="links">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="flex items-center gap-2">
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio",
                        },
                      ]}
                      name={[field.name, "socialNetwork"]}
                    >
                      <Select
                        className="w-36"
                        defaultValue="linkedin"
                        options={selectOptions}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Este campo es obligatorio",
                        },
                      ]}
                      className="flex-1"
                      name={[field.name, "url"]}
                    >
                      <Input />
                    </Form.Item>
                    <CloseOutlined
                      className="mb-6"
                      onClick={() => remove(index)}
                    />
                  </div>
                ))}
                <Button className="mb-5 w-full" onClick={add}>
                  Agregar red social
                </Button>
              </>
            )}
          </Form.List>
          <div className="flex items-center gap-2">
            <Button
              htmlType="submit"
              className="bg-blue-500 w-full"
              type="primary"
            >
              Guardar
            </Button>
            <Button className="w-full">Cancelar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
