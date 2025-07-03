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
import TeacherDetail from './components/TeacherDetail'
import Register from './components/Register'
import { Toaster } from './@/components/ui/sonner'
import NotFound from './components/NotFound'
import ClassroomTab from './components/ClassroomTab'
import ClassroomDetails from './components/ClassroomDetails'
import HomeworkSubmissionsPage from './components/HomeworkSubmissionsPage'
import AssignHomework from './components/AssignHomework'
import HomeworkGradingPage from './components/HomeworkGradingPage'
import ClassLeaderboardPage from './components/ClassLeaderboardPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<Login />}></Route>
          <Route path='/sign-up' element={<Register />}></Route>
          <Route path='/students-tab' element={<StudentsTab />}></Route>
          <Route path='/teachers-tab' element={<TeachersTab />}></Route>
          <Route path='/user-profile' element={<UserProfile />}></Route>
          <Route path='/catalogue' element={<CatalogueTab />}></Route>
          <Route path="/courses" element={<CoursesTab />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/' element={<Homepage />} />
          <Route path="/teacher/:id" element={<TeacherDetail />} />
          <Route path="/classrooms" element={<ClassroomTab />} />
          <Route path="/classrooms/:id" element={<ClassroomDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/courses/:courseId/assign-homework" element={<AssignHomework />} />
          {/* <Route path="/homeworks/:homeworkId/grade" element={<HomeworkGradingPage />} /> */}
          <Route path="/leaderboard/class" element={<ClassLeaderboardPage />} />
          <Route path="/homeworks/:homeworkId/submissions" element={<HomeworkSubmissionsPage />} />
          <Route path="/homeworks/:homeworkId/submissions/grade" element={<HomeworkSubmissionsPage/>} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  )
}

export default App
