/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface Result_PageInfo_UserInfo {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface UserInfo {
    id: string;
    name: string;
    email: string;
    verified_email: boolean;
    password: string;
    created_at: Date;
    updated_at: Date;
  }

  interface UserInfoVO {
    name: string;
    email: string;
    password: string;
  }

  interface SessionInfoVO {
    email: string;
    password: string;
  }

  type definitions_0 = null;
}
