/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable global-require */
/* eslint-disable import/extensions */

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'animate.css';
import '../styles/global.css';

if (typeof window !== 'undefined') {
  require('flowbite/dist/flowbite.js');
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <div>
      <Component {...pageProps} key={router.route} />
    </div>
  );
};

export default MyApp;
