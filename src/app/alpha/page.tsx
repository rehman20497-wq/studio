
import Header from "@/components/layout/header";
import AbstractCircles from "@/components/alpha/abstract-circles";
import AnimatedT from "@/components/alpha/animated-t";

export default function AlphaPage() {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      <Header />
      <main className="grid md:grid-cols-2 min-h-[calc(100vh-120px)]">
        <div className="bg-white flex items-center justify-center p-8">
            <AbstractCircles />
        </div>
        <div className="flex items-center justify-center p-8">
            <AnimatedT />
        </div>
      </main>
    </div>
  );
}
