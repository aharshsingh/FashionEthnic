import React from 'react';
import { Link } from 'react-router-dom';

export default function ProgressBar({ path }) {
  const steps = [
    { id: "01", name: "Phone number", link: "/UpdatePhone" },
    { id: "02", name: "Gender", link: "/UpdateGender" },
    { id: "03", name: "Date of birth", link: "/UpdateDOB" },
  ];

  return (
    <div className="w-[1100px] h-[70px] border-gray-300 border-1 rounded-md">
      <div className="flex justify-around">
        {steps.map((step) => {
          const isActive = path === step.link;
          return (
            <div key={step.id} className="flex gap-3 mt-1">
              <div className="relative mt-[8px]">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 ${
                    isActive ? "border-orange-500 bg-orange-500" : "border-gray-300 border-1 bg-white"
                  }`}
                >
                  <p className={`text-lg font-semibold transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}>
                    {step.id}
                  </p>
                </div>
              </div>
              <Link to={step.link}>
                <p className={`mt-3 text-lg font-medium transition-all duration-300 ${
                  isActive ? "text-orange-500" : "text-gray-500"
                }`}>
                  {step.name}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
