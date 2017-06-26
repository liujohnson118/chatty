import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div id="AboutMessages">
      <MessageList />
      <footer className="chatbar"><ChatBar /></footer>
      </div>
    );
  }
}
export default App;
