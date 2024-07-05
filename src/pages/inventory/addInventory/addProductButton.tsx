import Button from "@/components/common/button";
import { useEffect, useState } from "react";
import { Modal, Form as AntdForm, Row, Col } from "antd";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import { getTranslation } from "@/translation/i18n";
import { useDispatch, useSelector } from "react-redux";
import InventoryActions from "@/redux/inventory/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/common/error/FullAlertError";
import InventorySelectors from "@/redux/inventory/selectors";
import Select from "@/components/ui/select";

const selectError = makeSelectErrorModel();
const AddProductButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const loading = useSelector((state) =>
    requestingSelector(state, [InventoryActions.CREATE_PRODUCT], "")
  );
  const error = useSelector((state) =>
    selectError(state, [InventoryActions.CREATE_PRODUCT_FINISHED], "")
  );
  const categories = useSelector(InventorySelectors.selectSubCategories);
  const [form] = AntdForm.useForm();
  const dispatch  = useDispatch();

  const categoryOptions = categories.map((category: any) => ({
    label: category.name,
    value: category.subCategoryId,
  }));

  const unitOptions = selectedCategory?.units.map((unit: string) => ({
    label: unit,
    value: unit,
  }));

  const onCategoryChange = (value: any) => {
    const selectedCategory = categories.find(
      (category: any) => category.subCategoryId === value
    );
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
    }
    form.setFieldsValue({ unit: undefined });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(InventoryActions.createProduct(values));
      })
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (prevLoading && !loading && !error) {
      handleCancel();
    }
    setPrevLoading(loading);
  }, [loading]);

 
  return (
    <>
      <Button
        label={getTranslation("inventoryManagement.addProduct")}
        style={{ padding: "22px 20px", width: "30%" }}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        data-testid="add-user-modal"
        destroyOnClose={true}
        style={{ padding: "20px 30px" }}
        title={getTranslation("inventoryManagement.addProduct")}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={loading}
        okText={getTranslation("global.add")}
        cancelText={getTranslation("global.cancel")}
        onClose={handleCancel}
      >
        {error && <FullAlertError error={error} />}
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={24}>
              <Input
                label={getTranslation("global.name")}
                name="name"
                rules={[
                  {
                    required: true,
                    message: getTranslation("global.nameError"),
                  },
                ]}
                placeholder={getTranslation("global.namePlaceholder")}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <AntdForm.Item
                label={getTranslation("global.category")}
                name="subCategoryId"
                rules={[
                  {
                    required: true,
                    message: getTranslation("global.categoryError"),
                  },
                ]}
              >
                <Select
                  onChange={onCategoryChange}
                  options={categoryOptions}
                  placeholder={getTranslation(
                    "global.categorySelectPlaceholder"
                  )}
                />
              </AntdForm.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <AntdForm.Item
                label={getTranslation("inventoryManagement.unit")}
                name="unit"
                rules={[
                  {
                    required: true,
                    message: getTranslation("inventoryManagement.unitError"),
                  },
                ]}
              >
                <Select
                  options={unitOptions}
                  placeholder={getTranslation(
                    "inventoryManagement.unitSelectPlaceholder"
                  )}
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductButton;
