import React, {Component} from 'react';

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
    this.setState({message:event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.messageDetail(this.state.user,this.state.message);
  }

  render() {
    return (
    <span>
    <form onSubmit={this.handleSubmit}>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER"
      value={this.state.message} onChange={this.updateMessage}/>
      <input className="chatbar-username" placeholder="Your Name (Optional)"
      defaultValue={this.props.currentUser} onChange={this.updateUser}/>
      <input type="submit" value="submit"/>
    </form>
    </span>
    );
  }
}
export default ChatBar;
