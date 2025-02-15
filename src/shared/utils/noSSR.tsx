import dynamic from "next/dynamic";
import { JSX } from "react";

export const noSSR = <T,>(component: (props: T) => JSX.Element) =>
    dynamic(() => Promise.resolve(component), { ssr: false });
