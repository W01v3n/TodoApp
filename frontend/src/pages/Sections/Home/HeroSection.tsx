// import blob from "../../assets/shapes/blob.svg";

function HeroSection() {
  return (
    <section className="hero-section overflow-hidden bg-stone-100 bg-hero-pattern py-20 text-zinc-700 sm:py-40">
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center font-hero-font sm:flex-row sm:space-x-12">
          <div className="z-10 text-left">
            <h1 className="mb-4 text-3xl sm:text-5xl">
              Welcome To My Todo App!
            </h1>
            <p className="px-4 text-base sm:text-lg">
              A simple todo app, with unique user space for every user.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
