

"use client";
import AnimatedStats from "@/components/animated-stats";
import MagneticButton from "@/components/magnetic-button";

const SquiggleUnderline = () => (
  <svg
    className="absolute bottom-[-10px] left-0 w-full"
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5.61761C18.6667 1.32832 58.3333 -0.171738 99 5.61761"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UpArrow = () => (
  <svg
    className="absolute bottom-[-35px] left-[35%]"
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.8809 17.3789C18.8809 17.3789 5.48828 20.457 2.11523 26.5469"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M1.33203 18.2305L5.83203 14.543L9.51953 18.2305"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownArrow = () => (
  <svg
    className="absolute top-[-35px] right-[28%]"
    width="21"
    height="28"
    viewBox="0 0 21 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.11914 10.957C1.11914 10.957 14.5117 7.87891 17.8848 1.78906"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18.668 10.1055L14.168 13.793L10.4805 10.1055"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuccessMission = () => {
  return (
    <div className="relative bg-[#FDEEC4] text-zinc-900">
      <div className="absolute top-0 left-0 w-full h-24 bg-[#FEF9F2]">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C40,0 60,0 100,100 Z" fill="#FDEEC4" />
        </svg>
      </div>

      <div className="relative pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <h1 className="text-6xl md:text-7xl font-bold text-center mb-24 font-headline">
          <span className="relative inline-block">
            Your
            <SquiggleUnderline />
            <UpArrow />
          </span>{" "}
          success is{" "}
          <span className="relative inline-block">
            our
            <SquiggleUnderline />
          </span>{" "}
          <span className="relative inline-block">
            mission
            <DownArrow />
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-6 font-headline">
              You deserve better.
            </h2>
            <div className="space-y-4 text-zinc-700 text-lg">
              <p>
                You deserve better outcomes, insights, and conversations. You
                deserve to work with the best proactive teams that embrace
                complexity, adapt to ambiguity, and flex to your needs with
                just 24 hours notice. You should be obsessed over, not
                struggling to scale or sacrificing quality for speed.
              </p>
              <p>
                Whether you're a disruptive startup or an iconic brand, with
                Hugo you get more than outsourcing – you get what you deserve.
              </p>
            </div>
            <div className="mt-8">
              <MagneticButton>
                <span className="text-base font-medium">
                  Take Hugo for a spin
                </span>
              </MagneticButton>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative w-[548px] h-[548px] bg-white rounded-t-xl shadow-lg overflow-hidden">
              <div className="absolute p-8 inset-0 z-10">
                  <div className="relative w-full max-w-sm h-48 mx-auto -mt-4">
                      <div className="absolute inset-0 w-full h-full z-0">
                        <svg className='w-full h-full' viewBox="0 0 400 200">
                            <path
                            d="M10 150 C 100 -20, 300 -20, 390 150"
                            fill="none"
                            stroke="black"
                            strokeWidth="4"
                            strokeDasharray="10 10"
                            strokeLinecap="round"
                            className="animate-marching-ants"
                            />
                        </svg>
                      </div>
                      <div className="absolute z-10" style={{ top: '110px', left: '-30px' }}>
                          <div className="relative w-24 h-24 bg-[#F5D34A] rounded-full flex flex-col items-center justify-center text-center font-bold text-sm">
                          <span>SELECT</span>
                          <span>TEAM</span>
                          </div>
                      </div>
                      <div className="absolute z-10" style={{ top: '10px', left: '138px' }}>
                          <div className="relative w-24 h-24 bg-[#F5D34A] rounded-full flex items-center justify-center font-bold text-sm">
                          LAUNCH
                          </div>
                      </div>
                      <div className="absolute z-10" style={{ top: '110px', right: '-30px' }}>
                          <div className="relative w-24 h-24 bg-[#F5D34A] rounded-full flex flex-col items-center justify-center text-center font-bold text-sm">
                          ITERATE
                          </div>
                      </div>
                  </div>

                  <div className="relative text-center mt-[-5%]">
                      <span className="absolute inset-0 text-9xl font-bold text-[#F5D34A]/40 flex items-center justify-center" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>2</span>
                      <span className="relative text-2xl font-bold tracking-wider">- 2 WEEKS -</span>
                  </div>
                  <AnimatedStats />
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[150px]">
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  <path 
                    d="M0,20 Q50,0 100,25 T200,20 Q250,0 300,30 T400,20 V150 H0 Z" 
                    fill="#E0F5F5"
                  />
                  <path 
                    d="M0,20 Q50,0 100,25 T200,20 Q250,0 300,30 T400,20" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C40,100 60,100 100,0 Z" fill="#FDEEC4" />
        </svg>
      </div>
    </div>
  );
};

export default SuccessMission;
