/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable new-cap */
import React, { useEffect } from 'react';

import Footer from './footer';
import Navbar from './navbar';

type MainProps = {
  children: ReactNode;
};

const Main = (props: MainProps) => {
  return (
    <div className="antialiased text-gray-800">
      {/* <Navbar /> */}
      <div className="mx-auto ">{props.children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export { Main };
