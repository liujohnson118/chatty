import React, {Component} from 'react';
import Message from './Message.jsx';


/*
* JSX MessageList element
* When rendering, display messages posted for different users
*/
class MessageList extends Component {

  /*
  * Constructor
  */
  constructor(props){
    super(props);
  }

  /*
  * Function to render the MessageList element
  */
  render() {
    return (
      <main className="messages">
      {this.props.messages}
      </main>
    );
  }
}
export default MessageList;