import { useForm } from "react-hook-form"
import Header from "../../components/Header"
import { Input } from "../../components/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ValidationLogin } from "./ValidationLogin"
import { ILoginRequest } from "../../types/users"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useUserContext } from "../../Providers/UserContext"
export const Login = () => {
  const {login} = useUserContext()
  const navi = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm({
    resolver: zodResolver(ValidationLogin),
})
  const submit = async(dataForm: object) => {
    const data = dataForm as ILoginRequest
    setLoading(true)
    await login(data)
    return setLoading(false)
  }
  const mapError = (error: any) => {
    if (typeof error === "string") {
      return { message: error };
    }
    if (error && error.message) {
      return error;
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navi('/home');
    }
  }, [navi]);
  return (
    <>
    <div className="bg-gray-900 pattern">
            <div className="container px-6 mx-auto">
              < Header>
                <a className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700">Entrar</a>
                <a className="px-3 py-2 mx-2 text-sm font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800" onClick={()=>{navi('/register')}}>Criar conta</a>
              </Header>
                <div className="flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row">
                    <div className="lg:w-1/2">
                        <h3 className="mt-2 text-2xl font-semibold text-gray-100">
                            Seja <span className="text-blue-400">Bem vindo</span>
                        </h3>
                        <p className="mt-4 text-gray-100">Este site oferece um sistema de cadastro e login simples, além de uma incrível tela de dashboard. Vamos conhecer!</p>
                    </div>
                    <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
                        <div className="w-full max-w-md bg-white rounded-lg dark:bg-gray-800">
                            <div className="px-6 py-8 text-center">
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">Entre</h2>
                                <form onSubmit={handleSubmit(submit)}>
                                    <div className="mt-4">
                                        <Input type="email" placeholder="Endereço de Email" aria-label="Endereço de Email" {...register('email')} error={mapError(errors.email?.message)}  />
                                        <Input type="password" placeholder="Senha" aria-label="Senha" {...register('password')} error={mapError(errors.password?.message)} />
                                    </div>
                                    <div className="flex items-centr justify-end mt-4">
                                    <button className="px-6 py-2 font-medium text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700">
                                          {loading ? (
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="25"
                                            height="25"
                                            fill="#ffff"
                                            viewBox="0 0 256 256"
                                            className="animate-spin"
                                          >
                                            <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
                                          </svg>
                                          
                                          ) : 'Entrar'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}