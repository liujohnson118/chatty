import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props){
    super(props);
    let allMessages=[];
    let dataGiven={
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [{id:1, username: "Bob",content: "Has anyone seen my marbles?"},
                    {id:2, username: "Anonymous",content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."}]
    }
    for(var i=0;i<dataGiven.messages.length;i++){
      let currentMessage=dataGiven.messages[i];
      allMessages.push(<Message key={currentMessage.id} message={currentMessage.content} username={currentMessage.username} />);
    }
    this.state={loading:false,allMessages:allMessages, currentUser:dataGiven.currentUser.name};
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    let allMessages=this.state.allMessages;
    allMessages.push(<Message key={newMessage.id} message={newMessage.content} username={newMessage.username} />);
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({allMessages: allMessages});
    this.setState({loading: true});
  }, 1000);
}

  getMessageDetail(user,messageContent){
    console.log("PPPPPPPP"+user+messageContent);
    //return({user:user,messageContent:messageContent});
    //event.preventDefault();
    //let currentMessages=this.state.allMessages;
    console.log("FUCK "+this.state);
    event.preventDefault();
    //console.log("Thre are "+currentMessages.length+" messages");
  }


  render() {
    if(this.state.loading){
      return (
      <div id="AboutMessages">
      <MessageList messages={this.state.allMessages}/>
      <footer className="chatbar"><ChatBar currentUser={this.state.currentUser} messageDetail={this.getMessageDetail} /></footer>
      </div>
    )}
    else{
      return (<h1>刘先生，您好!</h1>)
    }
  }

}
export default App;
