import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import Users, {loader as usersLoader} from './Container/Users'
import Places, {loader as placesLoader} from './Container/Places'
import Authenticate from './Container/Authenticate'
import SignUp, {action as signUpAction} from './Components/Authenticate/SignUp'
import NewPlace, {action as newPlaceAction, loader as newPlaceLoader} from './Container/NewPlace'
import DetailPlace from './Container/DetailPlace'
import Layout from './Container/Layout'
import NotFound from './Components/NotFound/NotFound'
import Error from './Components/Error/Error'
import EditPlace from './Container/EditPlace'

import { AuthProvider } from './Components/utils/AuthContext'

import './App.css';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >

      <Route index 
        element={<Users />}
        loader={usersLoader}
        errorElement={<Error />} 
      />
      
      <Route 
        path=':uid/Places' 
        element={<Places />} 
        errorElement={<Error />}
        loader={placesLoader} 
      />
      
      <Route 
        path='Authenticate' 
        element={<Authenticate />} 
        errorElement={<Error />}
        // action={authenticateAction}
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
        loader={newPlaceLoader}
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
