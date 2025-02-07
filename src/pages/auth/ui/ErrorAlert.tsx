import { ReactNode } from "react";

type ErrorAlertProps = {
    children?: ReactNode;
};

export const ErrorAlert = ({ children }: ErrorAlertProps) => {
    // Высота должна соответствовать размеру шрифта,
    // чтобы не допустить скачков интерфейса при ошибке
    return <p className="text-[0.8rem] h-[0.8rem] text-error">{children}</p>;
};
