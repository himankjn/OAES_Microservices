import {
  Col,
  Row,
  Table,
  Button,
  Input,
  message,
  Form,
  Typography,
} from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import Column from "antd/lib/table/Column";
import React, { Component, useState } from "react";

export default class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  onLogout = () => {
    window.location.replace("/login");
  };

  onApply = (record) => {
    sessionStorage.setItem("test_id", record.id);
    window.location.replace("/questions");
    // console.log(sessionStorage.getItem("test_id"));
  };

  componentDidMount = () => {
    let url = sessionStorage.getItem("proxy") + `:8062/exam/show_tests`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({ data: response });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { data } = this.state;

    return (
      <Layout>
        <Content>
          <Table dataSource={data}>
            <Column key="id" dataIndex={"id"} title="ID" />
            <Column key="course" dataIndex={"course"} title="Course" />
            <Column key={"date"} dataIndex="date" title="Date" />
            <Column key={"status"} dataIndex="status" title="Status" />
            <Column
              key="action"
              render={(r) => {
                return (
                  <Button type="primary" onClick={() => this.onApply(r)}>
                    Take Test
                  </Button>
                );
              }}
            ></Column>
          </Table>
          <Button type="primary" onClick={() => this.onLogout()}>
            Log out
          </Button>
        </Content>
      </Layout>
    );
  }
}
