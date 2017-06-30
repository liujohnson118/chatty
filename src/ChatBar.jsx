import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state={user:'Anonymous',message:''};
    this.updateUser=this.updateUser.bind(this);
    this.updateMessage=this.updateMessage.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  updateUser(event){
    this.setState({user:event.target.value});
  }

  updateMessage(event){
    this.setState({message: ReactDOM.findDOMNode(this.refs.form).value});
  }

  handleSubmit(event,template){
  let status=ReactDOM.findDOMNode(this.refs.form).value;
  ReactDOM.findDOMNode(this.refs.form).value = "";
    event.preventDefault();
    this.props.messageDetail(this.state.user,status);
  }

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
