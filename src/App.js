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


function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/c/" element={<Joinedclassrooms />} />
          <Route path="/c/:classid" element={<Classroom />} />
          <Route path="/c/a/:assignmentid" element={<AssignmentDetails />} />
          <Route path="/c/m/:materialid" element={<MaterialDetails />} />

          {/* lecture */}
          <Route path="/lec/join/:lectureid" element={<JoinLecture />} />
          <Route path="/lec/:lectureid" element={<Lecture />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
