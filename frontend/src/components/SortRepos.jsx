// import React from "react";

const SortRepos = () => {
  return (
    <div>
      <div className="mb-2 flex justify-center lg:justify-end">
        <button
          type="button"
          className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
        >
          Most Recent
        </button>
        <button
          type="button"
          className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
        >
          Most Stars
        </button>
        <button
          type="button"
          className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
        >
          Most Forks
        </button>
      </div>
    </div>
  );
};

export default SortRepos;
