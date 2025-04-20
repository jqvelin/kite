import Image from "next/image";
import { ComponentPropsWithRef } from "react";
import { BiUser } from "react-icons/bi";

type UserAvatarProps = ComponentPropsWithRef<"image" | "svg"> & {
    avatarSrc: string | null | undefined;
};

export const UserAvatar = ({
    avatarSrc,
    className,
    ...props
}: UserAvatarProps) => {
    if (avatarSrc) {
        return (
            <Image
                src={avatarSrc}
                alt="Аватар"
                width={50}
                height={50}
                className={["shrink-0", "rounded-full", className].join(" ")}
            />
        );
    } else {
        return (
            <BiUser
                size="3rem"
                className={["shrink-0", className].join(" ")}
                {...props}
            />
        );
    }
};
