import React from 'react';
import { Link } from 'react-router-dom';

export default function ProgressBar({ path }) {
  const steps = [
    { id: "01", name: "Phone number", link: "/UpdatePhone" },
    { id: "02", name: "Gender", link: "/UpdateGender" },
    { id: "03", name: "Date of birth", link: "/UpdateDOB" },
  ];

  return (
    <div className="w-[1100px] lg:h-[70px] h-12 border-gray-300 border-1 rounded-md">
      <div className="flex justify-around">
        {steps.map((step) => {
          const isActive = path === step.link;
          return (
            <div key={step.id} className="flex lg:gap-3 gap-2 lg:mt-1 mt-2">
              <div className="relative lg:mt-[8px] mt-0">
                <div
                  className={`rounded-full lg:h-10 lg:w-10 h-7 w-7 flex items-center justify-center transition-all duration-300 ${
                    isActive ? "border-orange-500 bg-orange-500" : "border-gray-300 border-1 bg-white"
                  }`}
                >
                  <p className={`lg:text-lg text-sm font-semibold transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}>
                    {step.id}
                  </p>
                </div>
              </div>
              <Link to={step.link}>
                <p className={`lg:mt-3 mt-1 lg:text-lg text-base lg:font-medium font-light transition-all duration-300 ${
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
