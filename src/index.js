import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Table } from './pages/Table/table';
import { SignIn } from './pages/SignIn/signIn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreateTab } from './pages/CreatTab/createTab';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Table/>
      },
      {
        path: '/signin',
        element: <SignIn/>
      },
      {
        path: '/create',
        element: <CreateTab/>
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);

