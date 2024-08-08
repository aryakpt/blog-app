import React from 'react';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const {children} = props;

  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
