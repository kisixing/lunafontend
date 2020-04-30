import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Suit } from "@lianmed/lmg/lib/Ctg/Suit";
import request from "@lianmed/request";
import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import Analyse from "./Analyse/index";
import Ctg from './Ctg';
import CtgPanel from './CtgPanel';
import Ecg from './Ecg';
import Page from './Page';
import Partogram from './Partogram';






Suit.option = {
  "fhrcolor1": "#8080ff",
  "fhrcolor2": "#008040",
  "fhrcolor3": "#0080ff",
  "normalarea": "#ff0080",
  "primarygrid": "#400080",
  "print_interval": "20",
  "rule": "#408080",
  "scale": "#ff8000",
  "secondarygrid": "#ff00ff",
  "selectarea": "#8000ff",
  "theme": "#0d47a1",
  "tococolor": "#0000ff"
}

const setting = {
  ws_url: "192.168.123.10:8084",
  xhr_url: "transfer.lian-med.com:9989",
  // xhr_url: "192.168.123.56:9987",
  alarm_high: "160",
  alarm_low: "110",
  alarm_on_window: "1",
  alarm_on_sound: "1"
}

request.config({
  prefix: `http://${setting.xhr_url}/api`,
  Authorization: request.configure.Authorization,
  errHandler(a) {
    if ([401].includes(a.status)) {
      request.unAuthenticate().then(() => window.history.go())
    }
  },
  timeout:99999
})
export default function () {
  const [form] = Form.useForm()
  // const w = new WsService(setting)
  const [ok, setOk] = useState(!!request.configure.Authorization)
  const [loading, setLoading] = useState(false)
  // w.dispatch=()=>{}
  // w.connect()

  const submit = () => {
    form.validateFields().then(v => {
      setLoading(true)
      request.authenticate(v, { prefix: `http://${setting.xhr_url}/api`, hideErr: false }).then(() => {
        setOk(true)
      })
        .catch(() => {
          message.error('密码不正确')
        })
        .finally(() => setLoading(false))
    })
  }
  return (
    <>
      {
        ok && <Button size="small" type="danger" onClick={() => {
          request.unAuthenticate().then(() => setOk(false))
        }} style={{ position: 'absolute', right: 20, top: 2 }}>退出登陆</Button>
      }

      {
        ok &&
        <Switch>
          <Route path="/">
            <Analyse />
          </Route>
          <Route path="/CtgPanel">
            <CtgPanel />
          </Route>
          <Route path="/Ctg">
            <Ctg />
          </Route>
          <Route path="/Ecg">
            <Ecg />
          </Route>
          <Route path="/Partogram">
            <Partogram />
          </Route>

          <Route path="/Pages">
            <Page />
          </Route>

        </Switch>

      }
      <Modal footer={null} visible={!ok} closable={false} title="欢迎登陆 CTG 数据库📟！" centered width={360}>
        <Form form={form} layout="horizontal">
          <Form.Item name="username" rules={[{ required: true, message: "用户名不能为空" }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "密码不能为空" }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" />
          </Form.Item>
          <Button type="primary" block onClick={submit} loading={loading}>
            登录
          </Button>
        </Form>
      </Modal>
    </>

  );
}