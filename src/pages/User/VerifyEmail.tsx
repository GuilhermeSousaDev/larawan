import * as UserController from '@/services/user/UserController';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useModel, useParams } from '@umijs/max';
import { Spin } from 'antd';
import { useState } from 'react';

export default function VerifyEmail() {
  const { setUser, user } = useModel('auth');

  const { token } = useParams<{ token: string }>();

  const [error, setError] = useState<string | null>(null);

  if (token) {
    (async () => {
      try {
        const user = await UserController.verifyUserEmail({ token });

        if (user.verified_email) {
          setUser(user);
        }
      } catch (e: any) {
        const { message } = e.response.data;

        setError(message);
      }
    })();
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '540px',
      }}
    >
      {error && <div>{error}</div>}

      {!user && !error && <Spin />}

      {user && (
        <>
          Email Verificado <CheckCircleOutlined style={{ fontSize: 20 }} />
          <a href="/user/login" style={{ marginTop: 10 }}>
            <div>Login</div>
          </a>
        </>
      )}
    </div>
  );
}
