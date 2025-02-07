import { ComponentPropsWithRef } from "react";

type InputProps = ComponentPropsWithRef<"input">;

export const Input = (props: InputProps) => (
    <input
        {...props}
        type="text"
        className={["p-sm border-2 rounded-md shadow-sm", props.className].join(
            " "
        )}
    />
);
