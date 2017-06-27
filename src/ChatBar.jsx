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
    console.log(this.state.user);
    console.log("user updated");
  }

  updateMessage(event){
    this.setState({message:event.target.value});
    console.log(this.state.message);
    console.log("Message content updated");
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("ChatBar state value user "+this.state.user);
    console.log("ChatBar state value message "+this.state.message);
    this.props.messageDetail(this.state.user,this.state.message);
    console.log("Submitted the form");
    //this.props.messageDetail(this.state.user, this.state.message);
    //event.preventDefault();
  }

  render() {
    return (
    <span>
    <form onSubmit={this.handleSubmit}>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER"
      value={this.state.message} onChange={this.updateMessage}/>
      <input className="chatbar-username" placeholder="Your Name (Optional)"
      defaultValue={this.props.currentUser} onChange={this.updateUser}/>
      <input type="submit" value="Submit"/>
    </form>
    </span>
    );
  }
}
export default ChatBar;
