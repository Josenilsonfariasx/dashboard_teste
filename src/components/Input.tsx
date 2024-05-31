import { forwardRef, HTMLProps } from "react";
import { twMerge } from "tailwind-merge";
interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "alt"> {
  labe?: string;
  id?: string;
  type: "text" | "email" | "password";
  className?: string;
  error?: { message: string };
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, error, id,type, className, ...rest }, ref) => {
  return (
    <>
    {label ? (
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
    ) : null}
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={type === "password" ? "current-password" : "email"}
        required
        className={twMerge('block w-full my-4 px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring', className)}
        {...rest}
        ref={ref}
      />
      {error ? (
          <span className="mt-10 text-center font-light text-xs text-opacity-80 text-gray-950">{error.message}</span>
        ) : null}
      </>
  )
});