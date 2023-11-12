import user from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';

interface IForm {
  name: string;
  email: string;
  password: string;
}

const { UserController } = user;

const CreateUserForm = () => {
  const { setUser } = useModel('auth');

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      form.validateFields(['email', 'name']);
    }
  }, [form, error]);

  const onFinish = async ({ name, email, password }: IForm) => {
    const { data, errorMessage, success } = await UserController.addUser({
      name,
      email,
      password,
    });

    if (!success && errorMessage) {
      setError(errorMessage);

      setTimeout(() => setError(null), 1000);
      return;
    }

    if (data) {
      setUser(data);

      messageApi.open({
        type: 'success',
        content: `User Created ${data?.id}`,
      });

      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {contextHolder}
      <h1>Create User</h1>
      <Form
        form={form}
        name="createUserForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter your name' },
            {
              validator: (_, value) => {
                if (value && error === 'name') {
                  return Promise.reject('This Name Already Exists');
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Invalid email format' },
            {
              validator: (_, value) => {
                if (value && error === 'email') {
                  return Promise.reject('This Email Already Exists');
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUserForm;
