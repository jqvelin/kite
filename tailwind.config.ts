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
            padding: {
                sm: "var(--padding-sm)",
                md: "var(--padding-md)"
            },
            gap: {
                sm: "var(--gap-sm)",
                md: "var(--gap-md)"
            }
        }
    }
} satisfies Config;
