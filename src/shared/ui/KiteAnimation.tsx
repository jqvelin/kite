import Image from "next/image";
import { ComponentPropsWithoutRef, memo } from "react";

type KiteAnimationProps = ComponentPropsWithoutRef<"img"> & {
    width?: number;
};

// Компонент передан отдельно в memo из-за ошибки
// Component definition is missing display name | react/display-name
const KiteAnimationUnoptimized = (props: KiteAnimationProps) => (
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

export const KiteAnimation = memo(KiteAnimationUnoptimized);
