import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Sign from './components/Sign';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';
import PlaySet from './components/PlaySet';
import SpellFill from './components/SpellFill';
import Spell from './components/Spell';
import Mean from './components/Mean';
import SpellInsert from './components/SpellInsert';
import Profile from './components/Profile';
import ProfileCheck from './components/ProfileCheck';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Login></Login>}></Route>
          <Route exact path='/sign' element={<Sign></Sign>}></Route>
          <Route exact path='/list' element={<List></List>}></Route>
          <Route exact path='/addPage' element={<Add></Add>}></Route>
          <Route exact path='/edit' element={<Edit></Edit>}></Route>
          <Route exact path='/playSet' element={<PlaySet></PlaySet>}></Route>
          <Route exact path='/spellFill' element={<SpellFill></SpellFill>}></Route>
          <Route exact path='/spell' element={<Spell></Spell>}></Route>
          <Route exact path='/mean' element={<Mean></Mean>}></Route>
          <Route exact path='/spellInsert' element={<SpellInsert></SpellInsert>}></Route>
          <Route exact path='/profile' element={<Profile></Profile>}></Route>
          <Route exact path='/profileCheck' element={<ProfileCheck></ProfileCheck>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
