"use client";

import { ComponentPropsWithRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { LuEye, LuEyeClosed } from "react-icons/lu";

type InputProps = ComponentPropsWithRef<"input">;

export const Input = ({ type, className, ...props }: InputProps) => {
    switch (type) {
        case "password": {
            return (
                <PasswordInput
                    className={className}
                    {...props}
                />
            );
        }

        case "search": {
            return (
                <div className={["relative w-full", className].join(" ")}>
                    <BiSearch
                        size="1.5rem"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                    />
                    <BaseInput
                        className="pl-8"
                        {...props}
                    />
                </div>
            );
        }

        default: {
            return <BaseInput {...props} />;
        }
    }
};

const PasswordInput = (props: InputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="relative">
            <BaseInput
                {...props}
                type={isPasswordVisible ? "text" : "password"}
            />
            <button
                type="button"
                tabIndex={-1}
                onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-primary"
            >
                {isPasswordVisible ? <LuEyeClosed /> : <LuEye />}
            </button>
        </div>
    );
};

const BaseInput = ({ className, ...props }: InputProps) => (
    <input
        className={[
            "p-sm border-2 rounded-md w-full shadow-xs outline-accent",
            className
        ].join(" ")}
        {...props}
    />
);
