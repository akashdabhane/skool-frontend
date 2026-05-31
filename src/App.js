import { BrowserRouter, Route, Routes } from "react-router-dom";
import Joinedclassrooms from "./pages/JoinedClassrooms";
import Classroom from "./pages/Classroom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Lecture from "./pages/Lecture";
import Settings from "./pages/Settings";
import JoinLecture from "./pages/JoinLecture";
import AssignmentDetails from "./pages/AssignmentDetails";
import MaterialDetails from "./pages/MaterialDetails";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Classwork from "./pages/Classwork";
import Lectures from "./pages/Lectures";
import Chats from "./pages/Chats";
import People from "./pages/People";
import Exams from "./pages/Exams";
import ExamDetails from "./pages/ExamDetails";
import Analytics from "./pages/Analytics";
import Resources from "./pages/Resources";
import JoinClassByLink from "./pages/JoinClassByLink";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import { StateProvider } from "./contexts/StateContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <div className="App ">
      <AuthProvider>
        <StateProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/" element={<Home />} />

                {/* classroom */}
                <Route path="/c/" element={
                  <ProtectedRoute>
                    <Joinedclassrooms />
                  </ProtectedRoute>
                } />
                <Route path="/c/stream/:classid" element={
                  <ProtectedRoute>
                    <Classroom />
                  </ProtectedRoute>
                } />
                <Route path="/c/a/:assignmentid" element={
                  <ProtectedRoute>
                    <AssignmentDetails />
                  </ProtectedRoute>
                } />
                <Route path="/c/m/:materialid" element={
                  <ProtectedRoute>
                    <MaterialDetails />
                  </ProtectedRoute>
                } />
                <Route path="/c/people/:classid" element={
                  <ProtectedRoute>
                    <People />
                  </ProtectedRoute>
                } />
                <Route path="/c/work/:classid" element={
                  <ProtectedRoute>
                    <Classwork />
                  </ProtectedRoute>
                } />
                <Route path="/c/resources/:classid" element={
                  <ProtectedRoute>
                    <Resources />
                  </ProtectedRoute>
                } />

                {/* chat  */}
                <Route path="/c/chat/:classid" element={
                  <ProtectedRoute>
                    <Chats />
                  </ProtectedRoute>
                } />

                {/* lecture */}
                <Route path="/c/lec/:classid" element={
                  <ProtectedRoute>
                    <Lectures />
                  </ProtectedRoute>
                } />
                <Route path="/lec/join/:lectureid" element={
                  <ProtectedRoute>
                    <JoinLecture />
                  </ProtectedRoute>
                } />
                <Route path="/c/join/:token" element={
                  <ProtectedRoute>
                    <JoinClassByLink />
                  </ProtectedRoute>
                } />
                <Route path="/lec/:lectureid" element={
                  <ProtectedRoute>
                    <Lecture />
                  </ProtectedRoute>
                } />

                {/* exam  */}
                <Route path="/c/exam/:classid" element={
                  <ProtectedRoute>
                    <Exams />
                  </ProtectedRoute>
                } />
                <Route path="/c/exam/details/:examid" element={
                  <ProtectedRoute>
                    <ExamDetails />
                  </ProtectedRoute>
                } />
                <Route path="/c/analytics/:classid" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } />

                {/* user */}
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/change-password" element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                } />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </StateProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
