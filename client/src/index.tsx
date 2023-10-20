import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import MainPage from './components/mainPage';

const router = createBrowserRouter([
  {
    path: "",
    Component : App,
    children: [
      {}
  ]
  },
  {
    path: "/main/:id",
    Component : MainPage,
    children: [
      {}
    ]
  }
]
)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);

