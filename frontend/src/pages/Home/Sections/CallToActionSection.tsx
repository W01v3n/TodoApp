import { useNavigate } from "react-router-dom";

function CallToActionSection() {
  const navigate = useNavigate();

  function navigateToRegister() {
    navigate("/register");
  }

  return (
    <section className="call-to-action py-20 text-center md:col-span-full">
      <div className="flex-col">
        <h1 className="text-3xl font-extralight md:text-5xl md:font-thin">
          What are you waiting for?
        </h1>
        <button
          onClick={navigateToRegister}
          className="my-7 rounded-lg bg-gray-700 p-1 px-4 py-2 text-lg text-white shadow shadow-black transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-md hover:shadow-black active:bg-black  active:shadow-lg active:shadow-black md:text-2xl"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
}

export default CallToActionSection;
