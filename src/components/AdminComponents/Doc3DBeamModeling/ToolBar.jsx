import React from "react";

const Toolbar = ({ setTool }) => {
  return (
    <div className="absolute top-10 left-10 z-50 flex flex-col gap-2">
      <button
        onClick={() => setTool("select")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Select
      </button>
      <button
        onClick={() => setTool("measure")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Measure
      </button>
      <button
        onClick={() => setTool("section")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        section
      </button>
      <button
        onClick={() => setTool("annotate")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Annotate
      </button>
      <button
        onClick={() => setTool("screenshot")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Screenshot
      </button>
      <button
        onClick={() => setTool("layers")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Layers
      </button>
      <button
        onClick={() => setTool("hide")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Hide
      </button>
    </div>
  );
};

export default Toolbar;
