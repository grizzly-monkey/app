import Button from "@/components/common/button"
import { useState } from "react";
import { Modal, Form as AntdForm, Row, Col, Select } from "antd";
import Form from "@/components/common/form";
import Input from "@/components/common/input";

const AddProductButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = AntdForm.useForm();

    const handleOk = () => {setIsModalOpen(false)};
    const handleCancel = () => {setIsModalOpen(false)};


    return(<>
    <Button label="Add Product"  style={{padding:"22px 20px", width:'30%'}} onClick={()=>setIsModalOpen(true)} />
    <Modal
        data-testid="add-user-modal"
        destroyOnClose={true}
        style={{ padding: "20px 30px" }}
        title={"Add Product"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={loading}
        okText={"Add"}
        onClose={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={24}>
              <Input
                label={"Product Name"}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
                placeholder={"Enter product name"}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <AntdForm.Item
                label={"Category"}
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select category",
                  },
                ]}
              >
                <Select 
                options={[
                    {
                        label: "Fertilizer",
                        value: "fertilizer",
                    },
                    {
                        label: "Pesticide",
                        value: "pesticide",
                    },
                    {
                        label: "Seed",
                        value: "seed",
                    },
                    
                ]}
                placeholder="Select category"
                />
              </AntdForm.Item>
            </Col>
          </Row>
          
         <Row gutter={24}>
            <Col span={24}>
            <AntdForm.Item
                label={"Unit"}
                name="unit"
                rules={[
                  {
                    required: true,
                    message: "Please select unit",
                  },
                ]}
              >
                <Select 
                options={[
                    {
                        label: "nos",
                        value: "nos",
                    },
                    {
                        label: "kg",
                        value: "kg",
                    },
                    {
                        label: "gm",
                        value: "gm",
                    },
                    
                ]}
                placeholder="Select category"
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>)
}

export default AddProductButton;