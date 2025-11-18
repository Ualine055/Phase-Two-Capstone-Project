/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border, rgb(229 231 235))',
        input: 'var(--input, rgb(209 213 219))',
        ring: 'var(--ring, rgb(59 130 246))',
        primary: {
          DEFAULT: 'var(--primary, rgb(59 130 246))',
          foreground: 'var(--primary-foreground, #ffffff)',
        },
        secondary: {
          DEFAULT: 'var(--secondary, rgb(243 244 246))',
          foreground: 'var(--secondary-foreground, #111827)',
        },
        destructive: {
          DEFAULT: 'var(--destructive, #ef4444)',
          foreground: 'var(--destructive-foreground, #ffffff)',
        },
        muted: {
          DEFAULT: 'var(--muted, #f9fafb)',
          foreground: 'var(--muted-foreground, #6b7280)',
        },
        accent: {
          DEFAULT: 'var(--accent, #f3f4f6)',
          foreground: 'var(--accent-foreground, #111827)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter, system-ui, -apple-system, sans-serif)'],
        mono: ['var(--font-roboto-mono, monospace)'],
      },
      borderRadius: {
        lg: 'var(--radius, 0.5rem)',
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--radius, 0.5rem) - 4px)',
      },
    },
  },
  plugins: [],
}
