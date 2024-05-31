import React, { useContext, useState } from "react";
import { ILoginRequest, IUser } from "../types/users";
import { Api } from "../Services/Api";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

interface IUserContext {
  registerUser: (user: IUser) => Promise<void>;
  login: (user: ILoginRequest) => Promise<void>;
  logout: (email: string) => Promise<void>;
  getUsers: () => Promise<void>;
  currentPage: number;
  totalPages: number;
  listUsers: IUser[];
  changePage: (page: number) => void;
}

export const UserContext = React.createContext<IUserContext>({
  registerUser: async () => { },
  login: async () => { },
  logout: async () => { },
  getUsers: async () => { },
  currentPage: 1,
  totalPages: 0,
  listUsers: [],
  changePage: () => { }
});

export const UserProvider: React.FC<Props> = ({ children }) => {
  const navi = useNavigate();
  const [allUsers, setAllUsers] = useState<IUser[] | []>([]);
  const [listUsers, setListUsers] = useState<IUser[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const token = Cookies.get('token');

  const registerUser = async (user: IUser) => {
    try {
      const { data } = await Api.post('/register', user);
      Cookies.set('token', data.access_token, { secure: true, sameSite: 'strict' });
      Cookies.set('user', user.email, { secure: true, sameSite: 'strict' });
      toast.success('Cadastro Efetuado ✅');
      navi('/home');
    } catch (error: any) {
      if (error.response.data.email[0] === 'The email has already been taken.') {
        toast.error('Este Email já está cadastrado');
      } else {
        toast.error('Problemas Internos, volte mais tarde.');
      }
    }
  };

  const login = async (user: ILoginRequest) => {
    try {
      const { data } = await Api.post('/login', user);
      Cookies.set('token', data.access_token, { secure: true, sameSite: 'strict' });
      Cookies.set('user', user.email, { secure: true, sameSite: 'strict' });
      toast.success('Login Efetuado ✅');
      navi('/home');
    } catch (error: any) {
      if (error.response.data.message === 'Invalid login details') {
        toast.error('Email ou senha incorretos.');
      }else{
        toast.error('Problemas Internos, volte mais tarde.');
      }
    }
  };

  const logout = async (email: string) => {
    try {
      const { data } = await Api.post('/logout', { email }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      data
      Cookies.remove('token');
      Cookies.remove('user');
      navi('/');
      toast.success('Volte mais tarde');
    } catch (error) {
      toast.error('Usuário não é válido');
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await Api.get('/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const combinedUsers = [data.logged_user, ...data.users];
      Cookies.set('id', data.logged_user.id, { secure: true, sameSite: 'strict' });
      setAllUsers(combinedUsers);
      setListUsers(combinedUsers.slice(0, 5)); // 5 users per page
      setTotalPages(Math.ceil(combinedUsers.length / 5));
      setCurrentPage(1);
    } catch (error) {
      toast.error('Problemas Internos, volte mais tarde.');
    }
  };

  const changePage = (page: number) => {
    const start = (page - 1) * 5;
    const end = start + 5;
    setListUsers(allUsers.slice(start, end));
    setCurrentPage(page);
  };

  return (
    <UserContext.Provider value={{ registerUser, login, logout, getUsers, currentPage, totalPages, listUsers, changePage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
