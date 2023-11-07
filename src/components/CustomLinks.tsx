import { User } from "@/hooks/useGetUser";
import { Button, Select, Input, Form, FormInstance, Card } from "antd";
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

const CustomLinks: FC<{
  customLinks: User["customLinks"];
  isSubmittingForm: boolean;
  form: FormInstance<any>;
}> = (props) => {
  return (
    <div>
      <h1 className="font-semibold mb-5">Enlaces</h1>
      <div className="flex flex-col gap-2">
        <Form
          layout="vertical"
          name="social-network-links"
          initialValues={{ links: props.customLinks }}
          form={props.form}
        >
          <Form.List name="links">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card key={key} className="relative">
                    <div className="grid gird-cols-2 gap-2">
                      <Form.Item
                        label="Nombre"
                        {...restField}
                        name={[name, "label"]}
                        rules={[
                          {
                            required: true,
                            message: "Este campo es obligatorio",
                          },
                        ]}
                      >
                        <Input disabled={props.isSubmittingForm} />
                      </Form.Item>
                      <Form.Item
                        label="Enlace"
                        {...restField}
                        name={[name, "url"]}
                        rules={[
                          {
                            required: true,
                            message: "Este campo es obligatorio",
                          },
                        ]}
                      >
                        <Input disabled={props.isSubmittingForm} />
                      </Form.Item>
                      <Form.Item
                        label="Thumbnail"
                        className="col-span-2"
                        {...restField}
                        name={[name, "thumbnail"]}
                        rules={[
                          {
                            required: true,
                            message: "Este campo es obligatorio",
                          },
                        ]}
                      >
                        <Input disabled={props.isSubmittingForm} />
                      </Form.Item>
                      <CloseOutlined
                        disabled={props.isSubmittingForm}
                        onClick={() => remove(index)}
                        className="absolute top-3 right-3 cursor-pointer"
                      />
                    </div>
                  </Card>
                ))}
                <Button
                  className="my-5 w-full"
                  onClick={() => add({ label: "", url: "", thumbnail: "" })}
                  disabled={props.isSubmittingForm}
                >
                  Agregar link personal
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </div>
  );
};

export default CustomLinks;
