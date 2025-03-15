import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import UncontrolledForm from './pages/UncontrolledForm';
import HookForm from './pages/HookForm';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/uncontrolled-form', element: <UncontrolledForm /> },
      { path: '/hook-form', element: <HookForm /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
