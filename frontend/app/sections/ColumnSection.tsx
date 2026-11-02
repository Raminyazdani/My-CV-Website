import React from "react";
import type { ReactNode } from "react";

interface ColumnSectionProps {
  children: [ReactNode, ReactNode]; // Exactly two children expected!
  className?: string;
  leftRatio?: number;  // e.g. 2 for 2:1, 1 for equal, 3 for 3:1
  rightRatio?: number;
}

const ColumnSection: React.FC<ColumnSectionProps> = ({
  children,
  className = "",
  leftRatio = 1,
  rightRatio = 1,
}) => (
 <section
 className={`w-full max-w-10xl mx-auto flex flex-col md:flex-row gap-px  p-6 ${className}`}>

    <div
      className="w-full md:w-auto"
      style={{
        flexBasis: 0,
        flexGrow: leftRatio,
        flexShrink: 1,
        minWidth: 0,
      }}
    >
      {children[0]}
    </div>
    <div
      className="w-full md:w-auto"
      style={{
        flexBasis: 0,
        flexGrow: rightRatio,
        flexShrink: 1,
        minWidth: 0,
      }}
    >
      {children[1]}
    </div>
  </section>
);

export default ColumnSection;
