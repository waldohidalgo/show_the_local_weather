import Weather from "./components/Weather.js";
import Footer from "./components/Footer.jsx";

export default function Home() {
  return (
    <>
      <header className="bg-slate-200 py-6">
        <h1 className="text-3xl font-bold underline text-center  ">
          Show Local Weather
        </h1>
      </header>
      <main className="py-8">
        <Weather />
      </main>

      <Footer />
    </>
  );
}
