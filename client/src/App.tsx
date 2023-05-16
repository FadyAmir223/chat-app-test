import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('./routes/login/login.component'));
const Signup = lazy(() => import('./routes/signup/signup.component'));
const Chat = lazy(() => import('./routes/chat/chat.component'));

const App = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
