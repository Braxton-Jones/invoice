import React from 'react';
import AppLayout from './layout/componets/AppLayout.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Routes,
  Route,
} from 'react-router-dom';
import InvoiceView, {
  loader as viewLoader,
} from './layout/views/InvoiceView.jsx';
import InvoiceDetailedView, {
  loader as viewDetailedLoader,
} from './layout/views/InvoiceDetailedView.jsx';
import './sass/styles.scss';
import ErrorPage from './layout/views/ErrorPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<InvoiceView />} loader={viewLoader} />
      <Route
        path='view/:id'
        element={<InvoiceDetailedView />}
        loader={viewDetailedLoader}
      >
        {/* <Route path='edit' element={<InvoiceEdit/>}/> */}
      </Route>
      {/* <Route path='add' element={<InvoiceCreate/>}/> */}
      <Route path='*' element={<ErrorPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
