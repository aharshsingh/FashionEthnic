import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function ProgressBar({ path }) {
  const steps = [
    { id: 1, name: 'Phone number', link: '/UpdatePhone' },
    { id: 2, name: 'Gender', link: '/UpdateGender' },
    { id: 3, name: 'Date of birth', link: '/UpdateDOB' },
  ];

  const currentIndex = steps.findIndex((step) => step.link === path);

  return (
    <nav aria-label="Profile progress" className="w-full">
      <ol className="flex items-center pb-8">
        {steps.map((step, idx) => {
          const isCompleted = currentIndex > idx;
          const isActive = currentIndex === idx;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <li className="relative flex flex-col items-center">
                <Link to={step.link} className="group" aria-current={isActive ? 'step' : undefined}>
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'border-coral bg-coral text-white shadow-glow'
                        : isCompleted
                          ? 'border-coral bg-coral/10 text-coral'
                          : 'border-navy/15 bg-white text-navy/40 group-hover:border-coral/40 group-hover:text-coral'
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : String(step.id).padStart(2, '0')}
                  </span>
                </Link>
                <span
                  className={`absolute top-12 whitespace-nowrap text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                    isActive ? 'text-coral' : isCompleted ? 'text-navy' : 'text-navy/40'
                  }`}
                >
                  {step.name}
                </span>
              </li>

              {!isLast && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    isCompleted ? 'bg-coral' : 'bg-navy/15'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
