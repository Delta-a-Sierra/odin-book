import { useState } from "react";
import { Input } from "../components";

type GetStartedContainerProps = {
  children: any
  title: any
}





export const GetStartedContainer: React.FC<GetStartedContainerProps> = ({ children, title }) => {

  return (
    <div className="bg-white dark:bg-dark-500 rounded w-full p-5 space-y-5 shadow-lg">
      <h2 className="text-center text-primary dark:text-secondary text-2xl font-open font-bold">
        {title}
      </h2>
      <div>
        {children}
      </div>
    </div>
  )
}
