import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariants = "primary" | "link" | "ghost" | "destructive";

const getButtonVariantClasses = (variant: ButtonVariants | undefined) => {
    switch (variant) {
        case "link": {
            return "text-accent";
        }

        case "ghost": {
            return "bg-transparent text-primary transition-colors rounded-md hover:bg-accent/20";
        }

        case "destructive": {
            return "bg-destructive text-background rounded-md py-sm px-md";
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
        className={twMerge(
            "font-semibold transition-[opacity,colors] cursor-pointer disabled:pointer-events-none disabled:opacity-70",
            getButtonVariantClasses(props.variant),
            props.className
        )}
    >
        {props.children}
    </button>
);
