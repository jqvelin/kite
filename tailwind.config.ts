import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                body: "var(--color-background-body)",
                background: "var(--color-background)",
                primary: "var(--color-primary)",
                accent: "var(--color-accent)",
                border: "var(--color-border)"
            },
            margin: {
                sm: "var(--margin-sm)",
                md: "var(--margin-md)",
                lg: "var(--margin-lg)"
            },
            padding: {
                sm: "var(--padding-sm)",
                md: "var(--padding-md)",
                lg: "var(--padding-lg)"
            },
            gap: {
                sm: "var(--gap-sm)",
                md: "var(--gap-md)",
                lg: "var(--gap-lg)"
            }
        }
    }
} satisfies Config;
