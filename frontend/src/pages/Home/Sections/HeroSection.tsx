function getTimeOfDay(): string | number {
  const today = new Date();
  const currentHour = today.getHours();
  if (currentHour > 5 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour > 12 && currentHour < 17) {
    return "Good Afternoon";
  } else if (currentHour > 17 && currentHour < 20) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}

function HeroSection() {
  return (
    <section className="hero-section overflow-hidden text-zinc-700 sm:py-40 md:col-span-full">
      <div className="container grid grid-cols-1 space-y-4 py-8 text-center font-thin md:grid-cols-4 md:grid-rows-2 md:py-2">
        <h1 className="text-5xl font-extralight tracking-wide md:col-span-3 md:text-7xl md:font-thin">
          {getTimeOfDay()}
        </h1>
        <p className="text-lg font-light md:col-span-3 md:row-span-1 md:pl-80">
          I am THYNKSO. A simple todo app.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
