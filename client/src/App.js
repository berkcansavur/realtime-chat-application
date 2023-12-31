import React from 'react';
import Navbar from './components/Features/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Chats from './components/pages/Chats';
import SignUp from './components/pages/SignUp';
import LogIn from './components/pages/LogIn';
import Chat from './components/pages/Chat';
import UserProfile from './components/pages/UserProfile';
import CreateChatGroupPage from './components/pages/CreatechatGroup';
import Network from './components/pages/Network';
import ChatGroupSettings from './components/pages/ChatGroupSettings';
import { NotificationProvider } from './components/Contexts/notification.context';
function App() {
  return(
    <>
    <Router>
        <NotificationProvider>
      <Navbar/>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/chats' Component={Chats}/>
          <Route path='/network' Component={Network}/>
          <Route path='/sign-up' Component={SignUp}/>
          <Route path='/log-in' Component={LogIn}/>
          <Route path='/chat/:chatGroupId' Component={Chat}/>
          <Route path='/profile' Component={UserProfile}/>
          <Route path='/create-chat-group' Component={CreateChatGroupPage}/>
          <Route path='/chat-group/:chatGroupId' Component={ChatGroupSettings}/>
        </Routes>
        </NotificationProvider>
    </Router>
    </>
      
  );
}

export default App;
