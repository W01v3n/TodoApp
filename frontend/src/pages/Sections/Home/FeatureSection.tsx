import todo1 from "../../assets/images/todo_1.svg";
import todo2 from "../../assets/images/todo_2.svg";
import todoUser from "../../assets/images/todo_user.svg";

function FeatureSection() {
  return (
    <section className="feature-section overflow-hidden bg-gray-200 py-20 text-black">
      <div className="container mx-auto">
        <h1 className="mb-20 text-center text-3xl font-bold sm:text-7xl">
          Features
        </h1>
        <div className="mb-20 flex flex-col items-center sm:flex-row sm:space-x-28">
          {/* Feature 1 */}
          <div className="max-w-sm text-center">
            <h1 className="mb-4 text-2xl font-bold sm:text-5xl">
              Never Forget your tasks
            </h1>
            <p className="text-base sm:text-lg">
              This app is for you to make sure never to forget a thing.
            </p>
          </div>
          <img
            className="mt-8 h-32 w-32 sm:mt-0 sm:h-48 sm:w-48"
            src={todo1}
            alt="todo1"
          />
        </div>
        <div className="mb-20 mr-10 flex flex-col items-center sm:flex-row-reverse sm:space-x-32">
          {/* Feature 2 */}
          <div className="max-w-sm text-center">
            <h1 className="mb-4 text-2xl font-bold sm:text-5xl">
              Organize your life
            </h1>
            <p className="text-base sm:text-lg">
              Keep everything organized and structured with this todo app.
            </p>
          </div>
          <img
            className="mt-8 h-32 w-32 sm:mt-0 sm:h-48 sm:w-48"
            src={todo2}
            alt="todo2"
          />
        </div>
        <div className="flex flex-col items-center sm:flex-row sm:space-x-28">
          {/* Feature 3 */}
          <div className="max-w-sm text-center">
            <h1 className="mb-4 text-2xl font-bold sm:text-5xl">
              Have your own space
            </h1>
            <p className="text-base sm:text-lg">
              All you have to do is register and you will have your own space!
            </p>
          </div>
          <img
            className="mt-8 h-32 w-32 sm:mt-0 sm:h-48 sm:w-48"
            src={todoUser}
            alt="todoUser"
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
