import React, {Component} from 'react';

class Message extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="message">
      <span className="message-username" style={{color:'#00aef9'}}>{this.props.username}</span>
      <span className="message-content">{this.props.message}</span>
      </div>
    );
  }
}
export default Message;
