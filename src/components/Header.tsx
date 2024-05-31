import { ReactNode } from "react";
import logo from "../assets/icons8-code-26.png"

interface IHeaderProps {
  children?: ReactNode;
}

export const Header = ({children}:IHeaderProps) => {
    return (
      <>
      <header className="">
        <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
            <a href="/home" target="_blank">
                <img className="w-auto h-6 sm:h-7" src={logo} alt="Logo" />
            </a>
            <div className="flex items-center mt-2 -mx-2 sm:mt-0">
              {children}
            </div>
        </nav>
      </header>
      </>
    );
};

export default Header;
