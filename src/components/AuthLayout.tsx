import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="w-full h-[calc(100vh-55px)] flex flex-col justify-center px-[32px] py-[32px]">
      <div className="w-full flex justify-center h-fit">
        <div className="w-80 rounded-lg bg-slate-300 p-8 text-gray-100">
          <p className="text-center text-2xl font-bold text-gray-700">
            {title}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
