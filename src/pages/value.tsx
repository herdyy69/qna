/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import { useState, useEffect } from 'react';

import * as firebase from "firebase/app";
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
      message,
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
  
  return (
    <Main>
      <Meta
        title={`${AppConfig.title} - Value`}
        description={AppConfig.description}
      />
      <div>
        <div
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <div className="flex flex-row flex-wrap w-full justify-center items-center uppercase">
              {comments?.map((comment) => (
              <a 
              key={comment.id}
              href="#" className="m-2 block max-w-sm p-6 bg-slate-400 border border-slate-800 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {comment.message}
                  </h5>
                  <p className="text-xs font-normal text-gray-700 dark:text-gray-400">
                    {comment.date}
                  </p>
              </a>
              ))}
           </div>
           </div>
      </div>
    </Main>
  );
};

export default Index;
