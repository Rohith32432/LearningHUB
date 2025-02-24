import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Validate from "@/useful/Validate"
import MyCourses from "./MyCourses"
import CoursePage from "./Coursepage"
import ArticlePage from "./ArticlePage"
import { useAuth } from "@/Context/userContext"
import Form from "@/components/Form"
import Ihome from "@/components/instructor/Ihome"
import AddCourse from "@/components/instructor/AddCourse"
import YourCourses from "@/components/instructor/YourCourses"
import ICoursePage from "@/components/instructor/ICoursePage"
import IArticlePage from "@/components/instructor/IArticlePage"
import ArticleHome from "./ArticleHome"
import Quiz from "@/components/Quiz"
import IQuizPage from "@/components/instructor/IQuizPage"
import Search from "@/components/Search"
import PieChart from "@/components/PieChart"
import CourseContext from '../Context/CourseContext'
import StatsPage from "./StatsPage"


function Layout() {
  const { user } = useAuth()
  return (
    <>
      {
        user?.role == 'user' ?

          <Routes>
            <Route element={<Validate />}>

              <Route element={<Home />} path='/home'></Route>
              <Route element={<MyCourses />} path='/mycourses'></Route>
              <Route element={<CoursePage />} path='/course/:id' />
              <Route element={<StatsPage />} path="/stats" />
              <>
                <Route element={
                  <CourseContext>
                    <ArticleHome />
                  </CourseContext>
                } path="course/:cid/article">
                  <Route element={<ArticlePage />} path='/course/:cid/article/:aid' />
                </Route>
                <Route element={<Quiz />} path='/course/:cid/quiz/:aid' />
                <Route element={<Search />} path='/search' />

              </>
            </Route>

          </Routes>
          :
          <>

            <Routes>
              <Route element={<Validate />}>
                <Route element={<Ihome />} path='/home'></Route>
                <Route element={<AddCourse />} path="/addcourse" />
                <Route element={<ICoursePage />} path='/course/:id' />
                <Route element={<YourCourses />} path="/mycourses" />
                <Route element={<IArticlePage />} path='/course/:cid/article/:x' />
                <Route element={<IQuizPage />} path='/course/:cid/quiz/:aid' />

              </Route>

              <Route element={<h1>not found</h1>} path="/*" />
            </Routes>

          </>
      }

    </>
  )
}

export default Layout