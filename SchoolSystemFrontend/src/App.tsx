import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import StudentsTab from './components/StudentsTab'
import TeachersTab from './components/TeachersTab'
import UserProfile from './components/UserProfile'
import CatalogueTab from './components/CatalogueTab'
import CoursesTab from './components/CoursesTab'
import CourseDetails from './components/CourseDetails'
import Homepage from './components/Homepage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<Login />}></Route>
          <Route path='/students-tab' element={<StudentsTab />}></Route>
          <Route path='/teachers-tab' element={<TeachersTab />}></Route>
          <Route path='/user-profile' element={<UserProfile />}></Route>
          <Route path='/catalogue' element={<CatalogueTab />}></Route>
          <Route path="/courses" element={<CoursesTab />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/' element={<Homepage/>}/>
          {/* <Route path='/sign-up/teacher' element={<Register />}></Route>
          <Route path='/sign-up/student' element={<RegisterStudent />}></Route>
          <Route path='/problem' element={<ProblemView />}></Route>
          <Route path='/courses-tab/:courseCode' element={<ProblemView />}></Route>
          <Route path='/courses-tab/:courseCode/lecture/:header' element={<ProblemView />}></Route>
          <Route path='/courses-tab/:courseCode//lecture/:header' element={<ProblemView />}></Route>
          <Route path='/user-profile' element={<UserProfile />}></Route>
          <Route path='/students-tab' element={<StudentsTab />}></Route>
          <Route path='/courses-tab' element={<CoursesTab />}></Route>
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/create-quiz' element={<CreateQuiz />}></Route>
          <Route path='/quiz-page' element={<QuizPage />}></Route>
          <Route path='/change-email' element={<ChangeEmail />}></Route>
          <Route path='/change-password' element={<ChangePassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='/courses-tab/enroll' element={<Enroll />}></Route>
          <Route path='/courses-tab/add' element={<AddCourse />}></Route>
          <Route path='/courses-tab/addLecture' element={<AddLecture />}></Route>
          <Route path='/quiz/fallback' element={<QuizFallback />}></Route> */}
        </Routes>
      </BrowserRouter>


      {/* <p className='hover:underline hover:decoration-cyan-700 hover:decoration-2 hover:underline-offset-[6px] hover:font-semibold'>Test tailwindcss</p> */}
    </>
  )
}

export default App
