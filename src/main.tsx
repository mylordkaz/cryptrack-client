import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import App from './pages/App.tsx';
import AddTransaction from './pages/AddTransaction.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/register',
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/app',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/app/add',
        element: <AddTransaction />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
