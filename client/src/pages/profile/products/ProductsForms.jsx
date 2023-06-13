import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { SetLoader } from '../../../redux/loadersSlice'
import { AddProduct } from '../../../apicalls/products'


const additionalThings = [
  {
    label: 'Bill Available',
    name: "billAvailable",
  },
  {
    label: 'Warranty Available',
    name: "warrantyAvailable",
  },
  {
    label: 'Accessories Available',
    name: "accessoriesAvailable",
  },
  {
    label: 'Box Available',
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  }
]


const ProductsForms = ({
  showProductForm,
  setShowProductForm,
  selectedProduct
}) => {

  const formRef = React.useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.users);


  const onFinish = async (values) => {
    try {
      values.seller = user._id;
      values.status = 'pending';
      dispatch(SetLoader(true));
      const response = await AddProduct(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setShowProductForm(false);
      }
      else {
        message.error(response.message);
      }

    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message)
    }
  }

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct)
    }
  }, [selectedProduct])

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Add Product"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <text-xl className="text-primary">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </text-xl>  
        <Tabs defaultActiveKey='1'>

          <Tabs.TabPane tab="General" key="1">
            <Form
              layout='vertical'
              ref={formRef}
              onFinish={onFinish}
            >
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type='text' />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type='text' />
              </Form.Item>

              <Row gutter={[16, 16]}>  {/* in antd row is of 24unit size and so we can create 3 columns of 8 unit size*/}
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type='number' />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value=" ">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sport</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Product Age" name="age" rules={rules}>
                    <Input type='number' />
                  </Form.Item>
                </Col>
              </Row>

              {/* Mapping the additional things */}
              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item label={item.label} name={item.name}>
                      <Input
                        type='checkbox'
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  )
                })}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Image" key="2">
            <h1>Image</h1>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  )
}

export default ProductsForms
