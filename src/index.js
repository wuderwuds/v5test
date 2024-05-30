import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Table } from './pages/Table/table';
import { SignIn } from './pages/SignIn/signIn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreateTab } from './pages/CreatTab/createTab';
import { Edit } from './pages/Edit/edit';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/v5test',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Table/>
      },
      {
        path: '/v5test/signin',
        element: <SignIn/>
      },
      {
        path: '/v5test/create',
        element: <CreateTab/>
      },
      {
        path: '/v5test/edit/:editId',
        element: <Edit/>
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

