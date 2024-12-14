import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/react/20/solid";

const ProjectView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, title, problemStatement, proposedSolution, extra, submittedBy } = location.state || {};

  if (!id) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold text-red-600">Project data not found!</h1>
        <button onClick={() => navigate(-1)} className="mt-6 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
          Go Back
        </button>
      </div>
    );
  }

  const handleCollaborate = () => {
    // Navigate to collaboration page or trigger collaboration logic
    navigate(`/project/${id}/collaborate`);
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>
              <p className="mt-6 text-xl text-gray-700">
                <strong>Problem Statement:</strong> {problemStatement}
              </p>
              <p className="mt-4 text-xl text-gray-700">
                <strong>Proposed Solution:</strong> {proposedSolution}
              </p>
              <p className="mt-4 text-xl text-gray-700">
                <strong>Impact:</strong> {extra}
              </p>
              <p className="mt-6 text-base text-gray-800">
                <strong>Submitted By:</strong> {submittedBy}
              </p>
              <div className="mt-8 flex gap-4">
                <button onClick={() => navigate(-1)} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
                  Go Back
                </button>
                <button onClick={handleCollaborate} className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                  Collaborate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img alt="Environment" src="/Images/sample.webp" className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10" />
        </div>

        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <p className="mt-4 text-xl text-gray-700">
                <strong>Impact:</strong> {extra}
              </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
