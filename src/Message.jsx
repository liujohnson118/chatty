import React, {Component} from 'react';


/*
* Message element JSX
* Contains username and message content of a message
* Has a unique color for each user
*/
class Message extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="message">
      <span className="message-username" style={{color:this.props.fontColor}}>{this.props.username}</span>
      <span className="message-content">{this.props.message}</span>
      </div>
    );
  }
}
export default Message;
