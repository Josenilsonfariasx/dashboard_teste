import React from 'react';
import { IUser } from "../types/users";

interface TableProps {
  users: IUser[];
  authenticatedUserId?: number;
}

export const Table: React.FC<TableProps> = ({ users, authenticatedUserId }) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Nome</th>
            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Email</th>
            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Email Verificado</th>
            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Você</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id} className={`border-b border-gray-200`}>
              <td className="py-4 px-6 text-center text-gray-500">{user.name}</td>
              <td className="py-4 px-6 text-center text-gray-500 truncate">{user.email}</td>
              <td className="py-4 px-6 text-center text-gray-500">
                {user.email_verified_at ? 'Verified' : 'Not Verified'}
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
