import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ErrorAlertProps = PropsWithChildren<ComponentPropsWithRef<"p">>;

export const ErrorAlert = ({
    children,
    className,
    ...props
}: ErrorAlertProps) => {
    // Высота должна соответствовать размеру шрифта,
    // чтобы не допустить скачков интерфейса при ошибке
    return (
        <p
            role="alert"
            className={twMerge(
                "text-[0.8rem] h-[0.8rem] text-destructive",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
};
