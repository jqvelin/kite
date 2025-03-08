import { ComponentPropsWithRef } from "react";

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
        className={[
            "font-semibold transition-colors cursor-pointer",
            getButtonVariantClasses(props.variant),
            props.className
        ].join(" ")}
    >
        {props.children}
    </button>
);
