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

function InputBox() {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const { salt, hash, command } = values;
        const opt = {
            method: 'GET',
            url: REDIS_URL + '?salt=' + salt + '&hash=' + hash + '&message=' + command,
            // url: 'https://agile.bu.edu/ec500_scripts/redis.php?salt=asd&hash=568b86f23da7373cd8993aa89c310273&message=SET server:name1 kevin',
            data: {
                salt: salt,
                hash: hash,
                message: command
            },
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then( response => {
                console.log(opt)
                console.log(response.data)
                if(response.status === 200) {
                    message.success('Message Send Succeed');
                }
            })
            .catch( error => {
                console.log('message send failed: ', error.message);
                message.error('Message Send Failed');
            })

    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="InputBox"
            onFinish={onFinish}
            className="inputbox"
        >
            <Form.Item
                name="salt"
                label="salt"
                rules={[
                    {
                        required: true,
                        message: 'Please input your salt',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="hash"
                label="password"
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
                label="command"
                rules={[
                    {
                        required: true,
                        message: 'Please input your message',
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