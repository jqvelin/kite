import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

type KiteAnimationProps = ComponentPropsWithoutRef<"img"> & {
    width?: number;
};

export const KiteAnimation = (props: KiteAnimationProps) => (
    <Image
        src="/kite.gif"
        {...props}
        width={props.width ?? 200}
        height={props.width ?? 200}
        alt="Воздушный змей"
        className={["hidden md:inline", props.className].join(" ")}
        unoptimized
    />
);
