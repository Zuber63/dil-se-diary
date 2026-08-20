import './App.css'
import Nav from './Components/Nav'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Deshboard from './Components/Deshboard'
import ProtectedRoute from './Components/ProtectedRoute'
import Profile from './Components/Profile'
import DeshboardHome from './Components/DeshboardHome'
import EditProfile from './Components/EditProfile'
import CreatePost from './Components/CreatePost'
import MyPosts from './Pages/Myposts'
import ViewPost from './Pages/Viewpost'
import EditPost from './Components/EditPost'
import FullStory from './Components/FullStory'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/FullStory/:id' element={<FullStory />} />

        <Route path="/Deshboard" element={ <ProtectedRoute><Deshboard /></ProtectedRoute> }>
          <Route path='/Deshboard/' element={<DeshboardHome />} />
          <Route path='/Deshboard/profile' element={<Profile />} />
          <Route path='/Deshboard/Editprofile' element={<EditProfile />} />
          <Route path='/Deshboard/CreatePost' element={<CreatePost />} />
          <Route path='/Deshboard/Myposts' element={<MyPosts />} />
          <Route path='/Deshboard/ViewPost/:postid' element={<ViewPost />} />
          <Route path='/Deshboard/EditPost/:postid' element={<EditPost />} />
        </Route>

        {/* 🌟 Yeh wala route baki saare unknown/invalid URLs ko Home par bhej dega */}
        <Route path='*' element={<Home />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App