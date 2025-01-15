import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const AmLichCalendar = () => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      });
    };

    const initializeCalendar = async () => {
      try {
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
        await loadScript('/js/jquery.amlich.js');

        if (window.jQuery) {
          const $ = window.jQuery;
          $('#amlich-calendar').amLich({
            type: 'calendar',
          });
        }
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    initializeCalendar();

    return () => {
      const scripts = document.querySelectorAll(
        'script[src="https://code.jquery.com/jquery-3.6.0.min.js"], script[src="/js/jquery.amlich.js"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return <div id="amlich-calendar" className="calendar" />;
};

const Calendar = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen text-white text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/lny2025.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Head>
        <link rel="stylesheet" href="/css/jquery.amlich.css" />
      </Head>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
      <div className="z-10 flex items-center justify-center w-full h-full px-4">
        <AmLichCalendar />
      </div>
      <Link
        href="/"
        className="absolute top-4 right-4 font-bold text-xl px-6 py-3 bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 transition duration-200 z-30"
      >
        Countdown
      </Link>
    </div>
  );
};

export default Calendar;
