import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import Users from './Container/Users'
import Places from './Container/Places'
import Authenticate, {action as authenticateAction} from './Container/Authenticate'
import SignUp, {action as signUpAction} from './Components/Authenticate/SignUp'
import NewPlace, {action as newPlaceAction} from './Container/NewPlace'
import DetailPlace from './Container/DetailPlace'
import Layout from './Container/Layout'
import NotFound from './Components/NotFound/NotFound'
import Error from './Components/Error/Error'
import EditPlace from './Container/EditPlace'

import './App.css';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >

      <Route index 
        element={<Users />}
      />
      
      <Route 
        path=':uid/Places' 
        element={<Places />} 
        errorElement={<Error />} 
      />
      
      <Route 
        path='Authenticate' 
        element={<Authenticate />} 
        errorElement={<Error />}
        action={authenticateAction}
      />

      <Route 
        path='SignUp' 
        element={<SignUp />} 
        errorElement={<Error />}
        action={signUpAction}
      />
      
      <Route 
        path='Places/NewPlace' 
        element={<NewPlace />} 
        errorElement={<Error />}
        action={newPlaceAction}
      />
      
      <Route 
        path='Places/:pid' 
        element={<DetailPlace />} 
        errorElement={<Error />} 
      />

      <Route 
        path='Places/:pid/edit'
        element={<EditPlace />}
        errorElement={<Error />}
      />

      <Route path='*' element={<NotFound />} />

    </Route>
  ))

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
