import logo from './logo.svg';
import './App.css';
import StudentList from './studentList';
import StudentForm from './studentForm';
import StudentForm1 from './studentForm1';
import StudentForm2 from './studentForm2';
import StudentList1 from './studentList1';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    <>
     <Navbar/>
     <Routes>
     <Route path="/add" element = {<StudentForm2/>}/>
     <Route path="/" element = {<StudentList1/>}/>
    </Routes>
    </>

);
};
// Previous Route(Not used Present)
// Previous Route(Not used Present)
/* <Route path="/" element={<StudentList/>} />
     <Route path="/addstudent" element={<StudentForm />} />
     <Route path="/addstudents" element = {<StudentForm1/>}/> */

export default App;