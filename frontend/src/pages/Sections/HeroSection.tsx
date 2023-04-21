import blob from "../../assets/shapes/blob.svg";

function HeroSection() {
  return (
    <section className="hero-section overflow-hidden  bg-gradient-to-r from-blue-500 to-purple-600 py-40 text-white">
      <div className="container relative mx-auto px-4 text-left font-hero-font">
        <h1 className="relative left-2 mb-4 text-3xl font-bold sm:text-7xl">
          Welcome To My Todo App!
        </h1>
        <img
          className="sm:top-3/5 absolute right-0 top-1/2 h-auto w-32 -translate-y-1/2 transform object-contain sm:h-auto sm:w-48 sm:-translate-y-1/4 md:h-auto md:w-96"
          src={blob}
          alt="blob"
        />
        <p className="relative left-6 text-base sm:text-lg">
          A simple todo app, with unique user space.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
