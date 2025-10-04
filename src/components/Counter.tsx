import React from "react";

interface CounterProps {
  initialCount?: number;
}

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  let [count, setCount] = React.useState(initialCount ?? 0);

  return (
    <div className={"card sm:max-w-sm mx-auto my-4"}>
      <div className={"card-body"}>
        <h5 className={"card-title mb-2.5"}>
          Counter starts from {initialCount ?? 0}
        </h5>
        <hr className="border-gray-300" />
        <p className={"mb-4 text-2xl"}>Count: {count}</p>
        <div className={"card-actions"}>
          <button
            className={"btn btn-primary"}
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
          <button
            className={`btn btn-secondary ${count <= 0 ? "btn-disabled" : ""}`}
            onClick={() => setCount(count - 1)}
          >
            Decrement
          </button>
          <button
            className={`btn btn-accent ${count === 0 ? "btn-disabled" : ""}`}
            onClick={() => setCount(initialCount ?? 0)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
