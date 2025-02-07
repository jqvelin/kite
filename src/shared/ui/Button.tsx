import { ComponentPropsWithRef } from "react";

type ButtonVariants = "primary" | "link";

const getButtonVariantClasses = (variant: ButtonVariants | undefined) => {
    switch (variant) {
        case "link": {
            return "text-accent";
        }

        default: {
            return "bg-accent text-background rounded-md py-sm px-md";
        }
    }
};

type ButtonProps = ComponentPropsWithRef<"button"> & {
    variant?: ButtonVariants;
};

export const Button = (props: ButtonProps) => (
    <button
        {...props}
        className={[
            "font-semibold",
            getButtonVariantClasses(props.variant),
            props.className
        ].join(" ")}
    >
        {props.children}
    </button>
);
