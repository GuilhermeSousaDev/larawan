import { useState } from 'react';

export default function Page() {
  const [user, setUser] = useState<API.UserInfo | null>(null);

  return {
    user,
    setUser,
  };
};
