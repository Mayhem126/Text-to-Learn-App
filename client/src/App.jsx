import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Lesson from "./pages/Lesson"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
