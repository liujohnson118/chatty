import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
    <span>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      <input className="chatbar-username" placeholder="Your Name (Optional)" /></span>
    );
  }
}
export default ChatBar;
