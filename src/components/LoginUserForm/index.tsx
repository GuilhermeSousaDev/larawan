import user from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';

const { UserController } = user;

interface IForm {
  email: string;
  password: string;
}

const LoginUserForm = () => {
  const { setUser } = useModel('auth');

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [status, setStatus] = useState<number | null>(null);
  const [emailSended, setEmailSended] = useState(false);

  useEffect(() => {
    if (status) {
      form.validateFields(['email', 'password']);
    }
  }, [form, status]);

  const onFinish = async ({ email, password }: IForm) => {
    try {
      const { data } = await UserController.loginUser({
        email,
        password,
      });

      if (typeof data === 'object') {
        setUser(data);

        messageApi.open({
          type: 'success',
          content: `Bem Vindo ${data?.name}`,
        });

        setTimeout(() => history.push('/'), 1000)
      } else {
        setEmailSended(!!data);
      }
    } catch (e: any) {
      const { response } = e;

      setStatus(response.status);

      setTimeout(() => setStatus(null), 1000);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {contextHolder}
      {!emailSended ? (
        <>
          <h1>Create User</h1>
          <Form
            form={form}
            name="loginUserForm"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Invalid email format' },
                {
                  validator: (_, value) => {
                    if (value && status === 404) {
                      return Promise.reject('This User not Exists');
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
              rules={[
                { required: true, message: 'Please enter password' },
                {
                  validator: (_, value) => {
                    if (value && status === 401) {
                      return Promise.reject('Incorrect Password');
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div>Email Enviado - Verifique seu Email</div>
      )}
    </div>
  );
};

export default LoginUserForm;
