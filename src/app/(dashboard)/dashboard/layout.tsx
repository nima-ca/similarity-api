import { FunctionComponent, ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
}) => {
  return <section className="pt-20">{children}</section>;
};

export default DashboardLayout;
