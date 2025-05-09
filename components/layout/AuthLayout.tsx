"use client";

import type { ReactNode } from "react";

// Feature list for reusability and cleanliness
const FEATURES = [
  {
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Value-Aligned Community",
    description: "Connect with professionals who share your principles",
  },
  {
    iconPath:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Ethical Career Growth",
    description: "Find jobs that respect your values and principles",
  },
  {
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    title: "Continuous Learning",
    description: "Access resources to develop personally and professionally",
  },
];

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Left Side */}
        <aside className="hidden lg:flex lg:w-1/2 islamic-pattern bg-linear-to-r from-darkBlue-500/20 to-teal-500/20 p-12 items-center justify-center">
          <div className="max-w-lg space-y-6">
            <h1 className="text-4xl font-heading font-bold text-darkBlue-900">Welcome to Iqrahire</h1>
            <p className="text-lg text-gray-700">
              Connect with professionals who share your values and find career opportunities aligned with your principles.
            </p>
            <div className="space-y-4">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={feature.iconPath}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-darkBlue-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Side */}
        <main className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-600 bg-gray-50">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Iqrahire. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
