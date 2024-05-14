import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import appcss from './components/app.module.css';
import Form from './components/form';
import Viewform from './components/viewform';
import Addform from './components/addform';
import Editform from './components/editform';

function App() {
  return (
    <div className='container'>
      <h2 className='App'>Crud Operation using Local Storage</h2>
    
      <div className={appcss.formdiv}>
      <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/form" element={<Form />} />
            <Route path="/Viewform" element={<Viewform />} />
            <Route path="/addform" element={<Addform />} />
            <Route path="/editform" element={<Editform />} />
          </Routes>
      </Router>
      </div>

      

    </div>
  );
}

export default App;
