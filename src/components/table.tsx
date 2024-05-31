import React from 'react';
import { IUser } from "../types/users";

interface TableProps {
  users: IUser[];
  authenticatedUserId?: number;
}

export const Table: React.FC<TableProps> = ({ users, authenticatedUserId }) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden md:mx-10">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4  text-center text-gray-600 font-bold ">Nome</th>
            <th className="w-2/5 py-4  text-center text-gray-600 font-bold ">Email</th>
            <th className="w-1/4 py-4  text-center text-gray-600 font-bold ">Validou</th>
            <th className="w-1/4 py-4  text-center text-gray-600 font-bold ">Você</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id} className={`border-b border-gray-200`}>
              <td className="py-4 px-6 text-center text-gray-500">{user.name}</td>
              <td className="py-4 px-6 text-center text-gray-500">{user.email}</td>
              <td className="py-4 px-6 text-center text-gray-500">
                {user.email_verified_at ? 'Sim' : 'Não'}
              </td>
              <td className="py-4 px-6 text-center text-gray-500">
                {user.id === authenticatedUserId ? '✅' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
