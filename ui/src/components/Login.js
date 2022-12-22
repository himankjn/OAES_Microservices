import React, { Component } from "react";
import Register from "./Register";
import {
  Form,
  Input,
  Cascader,
  Row,
  Button,
  Divider,
  Layout,
  message,
  Modal,
  Typography,
} from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const designation = [
  {
    value: "professor",
    label: "Professor",
  },
  {
    value: "student",
    label: "Student",
  },
];

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register_student: false,
    };
    this.onCancelRegisterStudent = this.onCancelRegisterStudent.bind(this);
  }

  onCancelRegisterStudent = () => {
    this.setState({ register_student: false });
  };

  login = (r, e) => {
    console.log(r);
    let body = {
      phone: r.phone,
      email: r.email,
      passwd: r.password,
    };
    console.log(JSON.stringify(body));
    let url = sessionStorage.getItem("proxy") + `:8061/student/login`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "Success") {
          console.log(response);
          sessionStorage.setItem("logged_in", "true");
          message.success(response.message, 1);
          window.location.replace("/tests");
        } else {
          console.log("error", response);
          sessionStorage.setItem("logged_in", "false");
          message.error(response.message, 5);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <div>
            <Row justify="center" align="bottom">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.login}
              >
                <Title level={3} style={{ alignContent: "center" }}>
                  OAES Lite
                </Title>
                <Divider plain>Login form</Divider>
                <Form.Item
                  name="email"
                  rules={[
                    { required: false, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: false, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Phone"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    className="login-form-button"
                    onClick={() => {
                      this.setState({ register_student: true });
                    }}
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          </div>
        </Content>
        <Modal
          visible={this.state.register_student}
          title="Student Registration"
          footer={null}
        >
          <Register {...this} {...this.state} />
        </Modal>
        <Footer style={{ textAlign: "center" }}>
          {" "}
          Created by Ashutosh soni(MT2021026) Himank Jain(MT2021054) Sarika
          Vadodariya(MT2021118) Shivani Sheth(MT2021126) ©2022
        </Footer>
      </Layout>
    );
  }
}
