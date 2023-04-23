import blob from "../../assets/shapes/blob.svg";

function HeroSection() {
  return (
    <section className="hero-section overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-white sm:py-40">
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center font-hero-font sm:flex-row sm:space-x-12">
          <div className="z-10 text-left">
            <h1 className="mb-4 text-6xl font-bold sm:text-7xl">
              Welcome To My Todo App!
            </h1>
            <p className="px-4 text-base sm:text-lg">
              A simple todo app, with unique user space for every user.
            </p>
          </div>
          <img
            className="-mt-24 ml-60 h-32 w-32 sm:mt-0 sm:h-96 sm:w-96"
            src={blob}
            alt="blob"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
