import Header from "../../components/Header";
import { useUserContext } from "../../Providers/UserContext";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import { Table } from "../../components/table";

export const Home = () => {
  const { logout, getUsers, listUsers, currentPage, totalPages, changePage } = useUserContext();
  const userCookies = Cookies.get('user');
  const userId = Cookies.get('id');

  useEffect(() => {
    getUsers();
  }, []);

  const handleLogout = () => {
    if (userCookies) {
      logout(userCookies);
    } else {
    }
  };

  return (
    <>
      <div className="bg-gray-900 pattern">
        <div className="container px-6 mx-auto">
          <Header>
            <a
              className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700"
              onClick={handleLogout}
            >
              Sair
            </a>
          </Header>
          <div className="flex flex-col items-center py-6 ">
            <div className="flex-col mt-8">
              <h2 className="font-mono my-4 text-white">Lista de Usuarios no sistema</h2>
              <Table users={listUsers} authenticatedUserId={Number(userId)} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changePage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
