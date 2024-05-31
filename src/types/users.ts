export interface IUser{
  id?: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  email_verified_at?: string | null;
  persistent?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICreateUser extends Pick<IUser, 'name' | 'email' | 'password'| 'password_confirmation'> {}
export interface ILoginRequest extends Pick<IUser, 'email' | 'password' | 'persistent'> {}
export interface ILoginResponse extends Omit<IUser, 'password' | 'password_confirmation' >{
  token: string;
}
export interface IListUser extends Omit<IUser, 'password'|'password_confirmation'|'persistent'>{}
