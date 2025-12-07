import {
  Navbar,
  Hero,
  KeyDates,
  Prizes,
  Rules,
  Contact,
  Footer,
} from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <KeyDates />
        <Prizes />
        <Rules />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
