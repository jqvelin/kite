"use client";

import { ComponentPropsWithRef, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

type InputProps = ComponentPropsWithRef<"input">;

export const Input = (props: InputProps) => {
    switch (props.type) {
        case "password": {
            return <PasswordInput {...props} />;
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

const BaseInput = (props: InputProps) => (
    <input
        {...props}
        className={[
            "p-sm border-2 rounded-md w-full shadow-xs",
            props.className
        ].join(" ")}
    />
);
