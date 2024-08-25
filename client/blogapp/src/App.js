import './App.css';
import { Routes ,Route } from 'react-router-dom';
import Home from "./components/Home"
import Header from './components/Header'
import Postadd from './components/Postadd'
import PostEdit from './components/PostEdit'
import ListItemDetailsView from './components/ListItemDetailsView'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Postadd/>}/>
        <Route path="/edit" element={<PostEdit/>}/>
        <Route path="/list/:id" element={<ListItemDetailsView/>}/>
      </Routes>
     </div>
     
  );
}

export default App;
