import React, {Component} from 'react';
import ReactDOM from 'react-dom';

/*
* chat bar element in html page
* Has a textarea for username and textarea for message content
*/
class ChatBar extends Component {

  /*
  * Constructor
  */
  constructor(props){
    super(props);
    this.state={user:'Anonymous',message:''};
    this.updateUser=this.updateUser.bind(this);
    this.updateMessage=this.updateMessage.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  /*
  * Function to update user state when the user has typed a new username into the username text area
  */
  updateUser(event){
    this.setState({user:event.target.value});
  }

  /*
  * Function to update message state when a new message has been typed and enter key is pressed
  */
  updateMessage(event){
    this.setState({message: ReactDOM.findDOMNode(this.refs.form).value});
  }

  /*
  * Function to handle submission of new message
  */
  handleSubmit(event,template){
  let status=ReactDOM.findDOMNode(this.refs.form).value;
  ReactDOM.findDOMNode(this.refs.form).value = "";
    event.preventDefault();
    this.props.messageDetail(this.state.user,status);
  }

  /*
  * function to render the ChatBar element
  */
  render() {
    return (
    <span>
    <form onSubmit={this.handleSubmit} id="chatBar">
      <input className="chatbar-message" placeholder="Type a message and hit ENTER"
      defaultValue={""} onChange={this.updateMessage} ref="form" id="newMessageHolder" />
      <input className="chatbar-username" placeholder="Your Name (Optional)"
      defaultValue={this.props.currentUser} onChange={this.updateUser} />
      <input type="submit" value="submit" id="newMessageSubmitButton"/>
    </form>
    </span>
    );
  }
}
export default ChatBar;
