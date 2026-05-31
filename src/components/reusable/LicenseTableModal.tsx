"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Modal component that shows the EU/UK license eligibility table.
const LicenseTableModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => setOpen(false);

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-3xl lg:max-w-5xl max-h-[85vh] overflow-auto">
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-4 border-b">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-black">
              Riding a 125cc Motorcycle with a Category B License in Europe
            </h3>
            <h5 className="text-gray-600 font-semibold text-xs sm:text-base leading-snug">
              Overview of national rules and requirements for riding a 125cc motorcycle using a standard{" "}
            </h5>
          </div>
          <button type="button" onClick={close} className="p-2 text-gray-600 hover:text-black" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="p-2">Country</th>
                  <th className="p-2">Allowed with B License?</th>
                  <th className="p-2">Minimum B License Holding Period</th>
                  <th className="p-2">Additional Training / Test Required</th>
                  <th className="p-2">Age Requirement</th>
                  <th className="p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Austria", "Yes (training required)", "5 years", "6h training", "20+", "≤125cc, ≤11 kW"],
                  ["Belgium", "No", "-", "-", "-", "Requires A1"],
                  ["Bulgaria", "No", "-", "-", "-", "Requires A1"],
                  ["Croatia", "No", "-", "-", "-", "Requires A1"],
                  ["Cyprus", "No", "-", "-", "-", "Requires A1"],
                  ["Czech Republic", "No", "-", "-", "-", "Requires A1"],
                  ["Denmark", "No", "-", "-", "-", "Requires A1"],
                  ["Estonia", "No", "-", "-", "-", "Requires A1"],
                  ["Finland", "No", "-", "-", "-", "Requires A1"],
                  ["France", "Yes (7h training)", "2 years", "7h training", "18+", "≤125cc, ≤11 kW"],
                  ["Germany", "Yes (B196, training)", "5 years", "4h theory + 5h practice (no exam)", "25+", "≤125cc, ≤11 kW"],
                  ["Greece", "No", "-", "-", "-", "Requires A1"],
                  ["Hungary", "No", "-", "-", "-", "Requires A1"],
                  ["Iceland", "No", "-", "-", "-", "Requires A1"],
                  ["Ireland", "No", "-", "-", "-", "Requires A1"],
                  ["Italy", "Yes (after 2 years)", "2 years", "No", "18+", "≤125cc, ≤11 kW"],
                  ["Latvia", "No", "-", "-", "-", "Requires A1"],
                  ["Lithuania", "No", "-", "-", "-", "Requires A1"],
                  ["Luxembourg", "No", "-", "-", "-", "Requires A1"],
                  ["Malta", "No", "-", "-", "-", "Requires A1"],
                  ["Netherlands", "No", "-", "-", "-", "Requires A1"],
                  ["Norway", "No", "-", "-", "-", "Requires A1"],
                  ["Poland", "No", "-", "-", "-", "Requires A1"],
                  ["Portugal", "No", "-", "-", "-", "Requires A1"],
                  ["Romania", "No", "-", "-", "-", "Requires A1"],
                  ["Slovakia", "No", "-", "-", "-", "Requires A1"],
                  ["Slovenia", "No", "-", "-", "-", "Requires A1"],
                  ["Spain", "Yes (after 3 years)", "3 years", "No", "18+", "≤125cc, ≤11 kW"],
                  ["Sweden", "No", "-", "-", "-", "Requires A1"],
                  ["Switzerland", "No", "-", "-", "-", "Requires A1"],
                  ["United Kingdom", "No", "-", "-", "-", "Requires A1"],
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-gray-600 text-xs sm:text-sm">
            This table is provided for convenience only. Always consult local laws and/or local authorities.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="underline text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm"
      >
        See country table
      </button>
      {open && mounted ? createPortal(overlay, document.body) : null}
    </>
  );
};

export default LicenseTableModal;