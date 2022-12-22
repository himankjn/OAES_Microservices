import react, { Component } from "react";
import { Form, Input, Row, Button, Divider, Layout, message } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

export default class Register extends Component {
  register = (values, e) => {
    console.log(values);
    let body = {
      uname: values.username,  
      email: values.email,
      name: values.name,
      passwd: values.password,
      roll_number: values.roll_no,
      phone: values.phone,
    };
    console.log(JSON.stringify(body));
    let url = sessionStorage.getItem("proxy") + ":8061/student/register";
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        if (response.status === "Success") {
          console.log("Registration success!");
          message.success(response.message, 1);
          this.props.onCancelRegisterStudent();
        } else {
          console.log("Registration failure!");
          message.success(response.message, 5);
        }
      });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <div>
            <Row justify="center" align="middle">
              <Form
                {...formItemLayout}
                name="register"
                scrollToFirstError
                onFinish={this.register}
              >
                <Divider plain>Registration form</Divider>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item name="roll_no" label="Roll No.">
                  <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button onClick={this.props.onCancelRegisterStudent}>
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}
