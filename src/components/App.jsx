import React from 'react';
import Notes, { noteAction } from './Notes';
import RootLayout from './layout/RootLayout';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignUp from './SignUp/SignUp';
import Login, { loginAction, logoutAction } from './Login/Login';
import NoteDetail, { editAction, noteLoader } from './NoteDetail/NoteDetail';
import { checkAuthLoader, tokenLoader } from '../utils/auth';


const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  id: 'root',
  loader: tokenLoader,
  children: [

    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'notes',
      element: <Notes />,
      loader: checkAuthLoader,
      action: noteAction
    },
    {
      path: 'signup',
      element: <SignUp />
    },
    {
      path: 'login',
      element: <Login />,
      action: loginAction
    },
    {
      path: 'note/:id',
      element: <NoteDetail />,
      loader: noteLoader
    },
    {
      path: 'logout',
      action: logoutAction
    },
    {
      path: 'edit',
      action: editAction
    }

  ]

}])

function App() {
  return <RouterProvider router={router} />
}

export default App;

