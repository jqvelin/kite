import Image from "next/image";
import { ComponentPropsWithRef } from "react";
import { FiUsers } from "react-icons/fi";

type ChatImageProps = ComponentPropsWithRef<"image" | "svg"> & {
    imageSrc?: string | null | undefined;
};

export const ChatImage = ({
    imageSrc,
    className,
    ...props
}: ChatImageProps) => {
    if (imageSrc) {
        return (
            <Image
                src={imageSrc}
                alt="Картинка чата"
                width={50}
                height={50}
                className={["shrink-0", "rounded-full", className].join(" ")}
            />
        );
    } else {
        return (
            <FiUsers
                size="3rem"
                className={["shrink-0", className].join(" ")}
                {...props}
            />
        );
    }
};
