import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props){
    super(props);
    let allMessages=[];
    this.state={loading:false,
      allMessages:allMessages,
      currentUser:'Anonymous',
      userCount:1,
      fontColor:'#000FFF'
    };
    this.getMessageDetail=this.getMessageDetail.bind(this);
    this.socket = new WebSocket('ws://localhost:3001//');
    this.broadCastMessage=this.broadCastMessage.bind(this);


    this.socket.addEventListener('message', (msg) => {
      console.log('so dumb', msg)
    })
  }

  broadCastMessage(message){
    this.socket.send(message);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.setState({loading: true});

    // Add a new message to the list of messages in the data store
    //const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    let allMessages=this.state.allMessages;

    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.

    let userCountInfo=String(this.state.userCount)+" user(s) online";
    this.socket.addEventListener('message',(eventFromWSS)=>{

      let tempMessages=this.state.allMessages;
      let newMessage = JSON.parse(eventFromWSS.data);
      console.log("new message type is "+newMessage.type );
      let messageType=newMessage.type;
      switch(messageType){
        case "sendMessage":
          tempMessages=this.state.allMessages;
          tempMessages.push(<Message key={allMessages.length+1} message={newMessage.messageContent} username={newMessage.user}/>);
          this.setState({allMessages:tempMessages});
          break;
        case "postNotification":
          tempMessages.push(<Message key={allMessages.length+1}
            message={newMessage.messageContent}
            username={""}/>);
          this.setState({allMessages:tempMessages});
          break;
        case "clientsCount":
          let userCount="There are "+newMessage.count+" users online";
          this.setState({userCount:newMessage.count});
          let userCountInfo=String(this.state.userCount)+" user(s) online";
          break;
        default:
          console.log("WTF is wrong");
          break;
      }
      console.log("componentDidMount received message type "+newMessage.type+" from WSS");
    });

}

  getMessageDetail(user,messageContent){
    console.log("App "+user+" "+messageContent);
    if(user !== this.state.currentUser){
      const msg = "User "+this.state.currentUser+" has changed name to "+user;
      this.setState({currentUser:user});
      this.broadCastMessage(JSON.stringify({type:"postNotification", user:user,messageContent:msg}));
    }
    this.broadCastMessage(JSON.stringify({type: "sendMessage", user:user,messageContent:messageContent}));
    event.preventDefault();
  }


  render() {
    if(this.state.loading){
      return (
      <div id="AboutMessages">
        <nav className="navbar" id="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span id="userCount">{this.state.userCount} user(s) online</span>
        </nav>
        <MessageList messages={this.state.allMessages}/>
        <footer className="chatbar"><ChatBar currentUser={this.state.currentUser} messageDetail={this.getMessageDetail} /></footer>
      </div>
    )}
    else{
      return (<div>
        <h1>刘先生，您好!</h1>
        <h2>希望您今天吃好喝好</h2>
        </div>)
    }
  }

}
export default App;
