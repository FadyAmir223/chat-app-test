// import { lazy, Suspense } from 'react';
// import { Routes, Route } from 'react-router-dom';

// const {} = lazy(() => import(''));

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {
  const [time, setTime] = useState('fetching');

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);

    socket.on('connect', () => {
      console.log('server connected: ', socket.id);
    });

    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on('time', (data) => setTime(data));

    socket.on('disconnect', () => setTime('server disconnected'));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="mb-0">{time}</div>
    // <Suspense fallback={<div>loading...</div>}>
    //   <Routes>
    //       <Route path="" element={< />}></Route>
    //   </Routes>
    // </Suspense>
  );
};

export default App;
