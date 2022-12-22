import react, { Component } from "react";

import {
  List,
  Avatar,
  Space,
  Divider,
  Typography,
  Descriptions,
  Tag,
  Button,
  message,
} from "antd";
import { Radio } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Layout, { Content, Header } from "antd/lib/layout/layout";
const { Title } = Typography;

export default class QA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  onSubmit = () => {
    message.success("Test submitted successfully", 1)
    window.location.replace("/tests");
  };

  componentDidMount = () => {
    let url = sessionStorage.getItem("proxy")+`:8062/exam/get_questions/`+sessionStorage.getItem("test_id");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        this.setState({data: response})
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { data } = this.state;

    return (
      <Layout>
        <Header style={{ backgroundColor: "lightgray", textAlign: "center" }}>
          <h2>QUESTIONS</h2>
        </Header>
        <Content>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <Descriptions title={item.statement}>
                  <Radio.Group>
                    <Radio value={item.opt_a}>{item.opt_a}</Radio>
                    <Radio value={item.opt_b}>{item.opt_b}</Radio>
                    <Radio value={item.opt_c}>{item.opt_c}</Radio>
                    <Radio value={item.opt_d}>{item.opt_d}</Radio>
                  </Radio.Group>
                </Descriptions>
                <Divider></Divider>
              </List.Item>
            )}
          />
          <Divider></Divider>
          <Button
            className="login-form-button" type="primary" style={{textAlign: "center"}}
            onClick={() => this.onSubmit()}
          >
            Submit
          </Button>
        </Content>
      </Layout>
    );
  }
}
