import addNextTask from "../../../assets/images/Add-Next-task.svg";
import completeTask from "../../../assets/images/Complete-task.svg";
import tasks from "../../../assets/images/Tasks.svg";
import yourSpace from "../../../assets/images/successful-task-completion.svg";

function FeatureSection() {
  return (
    <section className="feature-section overflow-hidden py-20 text-black md:col-span-full">
      <h1 className="text-center text-5xl font-extralight tracking-wide md:text-7xl md:font-thin">
        Features
      </h1>
      <div className="features grid grid-cols-1 md:grid-cols-9 md:grid-rows-4 md:pt-20">
        <div className="feature-item grid text-center text-3xl font-extralight shadow-lg shadow-gray-200 md:col-start-2 md:col-end-5 md:grid-cols-2 md:px-10 md:text-4xl">
          <h3 className="my-10 md:mt-16">Have Your Own Space</h3>
          <img src={tasks} alt="Have-Your-Own-Space" />
        </div>
        <div className="feature-item grid text-center text-3xl font-extralight shadow-lg shadow-gray-200 md:col-start-6 md:col-end-9 md:row-start-2 md:row-end-2 md:grid-cols-2 md:px-10 md:text-4xl">
          <img
            className="order-2 md:order-1"
            src={addNextTask}
            alt="Have-Your-Own-Space"
          />
          <h3 className="order-1 my-10 md:order-2 md:mt-16">
            Create Your Tasks
          </h3>
        </div>
        <div className="feature-item grid text-center text-3xl font-extralight shadow-lg shadow-gray-200 md:col-start-2 md:col-end-5 md:row-start-3 md:row-end-3 md:grid-cols-2 md:px-10 md:text-4xl">
          <h3 className="my-10 md:mt-16">Complete Your Tasks</h3>
          <img src={completeTask} alt="Have-Your-Own-Space" />
        </div>
        <div className="feature-item grid text-center text-3xl font-extralight shadow-lg shadow-gray-200 md:col-start-6 md:col-end-9 md:row-start-4 md:row-end-4 md:grid-cols-2 md:px-10 md:text-4xl">
          <img
            className="order-2 md:order-1"
            src={yourSpace}
            alt="Have-Your-Own-Space"
          />
          <h3 className="order-1 my-10 md:order-2 md:mt-16">Show It Off!</h3>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
