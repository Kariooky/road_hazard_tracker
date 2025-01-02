import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 p-2 rounded-full bg-black/[.05] dark:bg-white/[.06]"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Custom Logo */}
        <Image
          className="dark:invert"
          src="/my-logo.svg" // Replace with your logo file in the /public directory
          alt="My App Logo"
          width={180}
          height={38}
          priority
        />

        {/* Updated Instructions */}
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Start by exploring the{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>{" "}
            file.
          </li>
          <li>Save and see your changes instantly.</li>
          <li>Deploy your app to Vercel with one click.</li>
        </ol>

        {/* Customized Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://my-app.com/docs" // Replace with your docs link
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/my-icon.svg" // Replace with your icon file in the /public directory
              alt="My App Icon"
              width={20}
              height={20}
            />
            View Docs
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://my-app.com/templates" // Replace with your templates link
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Templates
          </a>
        </div>
      </main>

      {/* Updated Footer Links */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://my-app.com/learn" // Replace with your tutorials link
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/learn-icon.svg" // Replace with your icon file in the /public directory
            alt="Learn icon"
            width={16}
            height={16}
          />
          Tutorials
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://my-app.com/examples" // Replace with your examples link
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/examples-icon.svg" // Replace with your icon file in the /public directory
            alt="Examples icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://my-app.com" // Replace with your homepage link
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/home-icon.svg" // Replace with your icon file in the /public directory
            alt="Home icon"
            width={16}
            height={16}
          />
          Go to my-app.com →
        </a>
      </footer>
    </div>
  );
}