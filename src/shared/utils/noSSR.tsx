import dynamic from "next/dynamic";
import { JSX } from "react";

export const noSSR = (component: () => JSX.Element) =>
    dynamic(() => Promise.resolve(component), { ssr: false });
