import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        foreground: "#0f172a",
        card: "#ffffff",
        "card-foreground": "#0f172a",
        primary: "#0073cc",
        "primary-foreground": "#ffffff",
        secondary: "#0056a4",
        "secondary-foreground": "#ffffff",
        muted: "#e2e8f0",
        "muted-foreground": "#64748b",
        accent: "#0073cc",
        "accent-foreground": "#ffffff",
        destructive: "#dc2626",
        "destructive-foreground": "#ffffff",
        border: "#e2e8f0",
        input: "#ffffff",
        ring: "#0073cc",
        "chart-1": "#0073cc",
        "chart-2": "#0056a4",
        "chart-3": "#003d7a",
        "chart-4": "#002a54",
        "chart-5": "#001a35",
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
    },
  },
  plugins: [],
}

export default config
