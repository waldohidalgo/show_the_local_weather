import Weather from "./components/Weather.js";
import Footer from "./components/Footer.jsx";

export default function Home() {
  return (
    <>
      <header className="bg-slate-200 py-6">
        <h1 className="text-3xl font-bold underline text-center  ">
          Show Local Weather
        </h1>
        <p className="text-center mt-10 max-w-[600px] mx-auto">
          Activate GPS or give the browser permission to access your location
          and the temperature will be displayed. If any error occurs it will be
          displayed on the screen.
        </p>
      </header>
      <main className="py-8">
        <Weather />
      </main>

      <Footer />
    </>
  );
}
