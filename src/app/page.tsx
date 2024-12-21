import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background flex-col gap-5">
      <h1 className="text-2xl">Welcome Wizard [FIRST_NAME] [LAST_NAME]</h1>

      <Link href="/books">
        <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-slate-200 duration-300 ease-in-out">
          Log-in 🪄
        </button>
      </Link>
    </main>
  );
}
