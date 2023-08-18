import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const RecommendationsAnalytics = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("analytics")) {
      setCurrentPage("analytics");
    } else {
      setCurrentPage("recommendations");
    }
  }, [isChanged]);

  return (
    <div>
      <nav className="flex text-[#C75D2C] text-lg font-semibold mt-[-45px] sm:mt-0">
        <NavLink
          className={`border border-[#C75D2C] px-5 py-2 bg-[#DDD] ${
            currentPage == "recommendations" ? "font-bold" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="."
        >
          Preporučene knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] px-5 py-2 bg-[#DDD] ${
            currentPage == "analytics" ? "font-bold" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="analytics"
        >
          Analitika knjiga
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default RecommendationsAnalytics;
