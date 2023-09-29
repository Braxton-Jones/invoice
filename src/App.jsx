import React from 'react';
import AppLayout from './layout/views/AppLayout';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import InvoiceView, {
  loader as viewLoader,
} from './layout/views/InvoiceView.jsx';
import InvoiceDetailedView, {
  loader as viewDetailedLoader,
} from './layout/views/InvoiceDetailed.jsx';
import './sass/styles.scss';
import ErrorPage from './layout/views/ErrorPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route
        index
        element={<InvoiceView />}
        loader={viewLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path='/view/:id'
        element={<InvoiceDetailedView />}
        loader={viewDetailedLoader}
        errorElement={<ErrorPage />}
      ></Route>
      <Route path='*' element={<ErrorPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
