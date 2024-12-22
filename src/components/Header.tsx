import React from "react";

const Header: React.FC = () => (
  <header className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">
      Harry Potter Library{" "}
      <span role="img" aria-label="wizard">
       🧙‍♂️
      </span>
    </h1>
  </header>
);

export default Header;
