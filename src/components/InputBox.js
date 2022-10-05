import React from "react";
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

import { REDIS_URL } from "../constants";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 8,
        },
    },
};

function InputBox(props) {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const { password, command } = values;
        const opt = {
            method: 'POST',
            url: `${REDIS_URL}`,
            data: {
                hashcode: password,
                command: command
            },
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then( response => {
                console.log(response)
                if(response.status === 200) {
                    message.success('Message Send Succeed');
                }
            })
            .catch( error => {
                console.log('message send failed: ', error.message);
                message.success('Message Send Error');
            })
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="InputBox"
            onFinish={onFinish}
            className="InputBox"
        >
            <Form.Item
                name="salt"
                label="Salt"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Salt',
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
                        message: 'Please input your password',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="command"
                label="Command"
                rules={[
                    {
                        required: true,
                        message: 'Please input your command',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="send-btn">
                    Send Message
                </Button>
            </Form.Item>
        </Form>
    );
}

export default InputBox;