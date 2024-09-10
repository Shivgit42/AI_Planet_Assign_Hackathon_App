import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="bg-custom-light">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
