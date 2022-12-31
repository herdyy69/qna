/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import { useState, useEffect } from 'react';



import { initializeApp } from "firebase/app";
import { getDatabase , ref , get , set , onValue } from "firebase/database";
import type { NextPage } from 'next';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/main';
import { AppConfig } from '../utils/AppConfig';

const Index: NextPage = () => {
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [toast, setToast] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyD4fh7kKbO394ZWGmzl2t-gNph_hVU6lH4",
    authDomain: "myqanda-f55be.firebaseapp.com",
    databaseURL: "https://myqanda-f55be-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "myqanda-f55be",
    storageBucket: "myqanda-f55be.appspot.com",
    messagingSenderId: "62521548012",
    appId: "1:62521548012:web:011f3bf6220ba9905559c9",
    measurementId: "G-BBTB6G0NYZ"
  
  };

  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);

  const addComment = (e) => {
    e.preventDefault();
    set(ref(db, `comments/${  Date.now()}`), {
      id: Math.random(),
      message,
      date: Date.now(),
    });
    setToast(true);
    setMessage('');
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  useEffect(() => {
    onValue(ref(db, 'comments'), (snapshot) => {
      const data = snapshot.val();
      const comments = [];
      for (const id in data) {
        comments.push({ id, ...data[id] });
      }
      setComments(comments);
    });
  }, []);

  const toastM = (message) => {
    return (
      <div id="toast-success" className="animate__animated animate__fadeInRight z-[999] absolute right-2 top-5 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">
              Pesan berhasil dikirim!
          </div>
          <button 
          type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
      </div>
    )
  };

  return (
    <Main>
      <Meta
        title={`${AppConfig.title} - Home`}
        description={AppConfig.description}
      />

    
      <div>
        {toast && toastM('test')}
        <div
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <div className="flex flex-row flex-wrap justify-center items-center min-h-screen px-8 uppercase">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-4xl font-bold text-white">selamat datang</h1>
              <span className="text-lg font-bold text-slate-200">
                di website catatan herdy
              </span>
              <span className="text-sm font-medium text-slate-200 border-t-[1px] mt-3 p-1 max-w-sm">
                Kamu dapat menuliskan komentar tentang saya secara anonim
              </span>
            </div>
            <span className="md:mx-5 mx-0"></span>
            <form onSubmit={addComment} className="flex flex-col justify-start items-start">
              <div className="w-full mb-4 border bg-white border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                <div className="min-w-[20rem] bg-slate-100 px-4 py-2 rounded-t-lg dark:bg-gray-800">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="comment"
                    rows="4"
                    className="w-full px-0 text-sm text-gray-900 bg-slate-100 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="So what do you think about this man? Leave a comment..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  >
                    Kirim Pesan...
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Index;
