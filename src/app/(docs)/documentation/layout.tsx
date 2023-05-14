import { ReactNode } from "react";

const DocumentationLayout = ({ children }: { children: ReactNode }) => {
  return <section className="pt-20">{children}</section>;
};

export default DocumentationLayout;
