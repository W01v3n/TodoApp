function Footer() {
  const year = new Date().getFullYear();
  const copyright = String.fromCodePoint(0x00a9);

  return (
    <section className="footer col-span-full">
      <div className="text-center">
        <p>
          Cooked with some <span className="text-red-600">❤️️</span> by Tal
          Sabadia
        </p>
        <p>
          {copyright} {year} Tal Sabadia
        </p>
      </div>
    </section>
  );
}

export default Footer;
