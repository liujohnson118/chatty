import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


/*
* App element that contains navbar and MessageList
*/
class App extends Component {

  /*
  * Constructor
  */
  constructor(props){
    super(props);
    let allMessages=[];
    this.state={
      allMessages:allMessages, //Array of all messages
      currentUser:'Anonymous', //default currentUser
      userCount:1, //Initialize usercount to 1
      fontColor:'#000FFF' //default font color
    };


    this.socket = new WebSocket('ws://localhost:3001//');// new websocket server
    this.getMessageDetail=this.getMessageDetail.bind(this);
    this.broadCastMessage=this.broadCastMessage.bind(this);
    this.hashCode=this.hashCode.bind(this);
    this.intToRGB=this.intToRGB.bind(this);
  }

  /*
  * Function to broadcast message to websocket server
  */
  broadCastMessage(message){
    this.socket.send(message);
  }

  /*
  * Function to hash a string
  * Reference https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  */
  hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  /*
  * Funtion to convert integer to hexdecimal color code
  * Reference https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  */
  intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  componentDidMount() {

    // Add a new message to the list of messages in the data store
    //const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    let allMessages=this.state.allMessages;

    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.

    let userCountInfo=String(this.state.userCount)+" user(s) online";
    this.socket.addEventListener('message',(eventFromWSS)=>{

      let tempMessages=this.state.allMessages;
      let newMessage = JSON.parse(eventFromWSS.data);
      let messageType=newMessage.type;

      switch(messageType){

        //new message does not involve username change
        case "sendMessage":
          if(newMessage.messageContent.replace(/ /g,"").length>0){
            let color="#"+this.intToRGB(this.hashCode(newMessage.user));
            tempMessages=this.state.allMessages;
            tempMessages.push(<Message key={allMessages.length+1}
            message={newMessage.messageContent}
            fontColor={color}
            username={newMessage.user}/>);
            this.setState({allMessages:tempMessages});
          }
          break;

        //new message invovles username change
        case "postNotification":
          tempMessages.push(<Message key={allMessages.length+1}
            message={newMessage.messageContent}
            username={""}/>);
          this.setState({allMessages:tempMessages});
          break;

        //Boradcast number of clients onlien
        case "clientsCount":
          let userCount="There are "+newMessage.count+" users online";
          this.setState({userCount:newMessage.count});
          let userCountInfo=String(this.state.userCount)+" user(s) online";
          break;
        default:
          console.log("WTF is wrong");
          break;
      }
    });

}

  /*
  * Function to broadcast detail of message
  * Input: user-username of message to be posted in string
  * messageContent-content of message to be posted in string
  * If user is different from currentUser state variable, broadcast message to change username and reset currentUser state
  * Then broadcast new message to websocket server
  */
  getMessageDetail(user,messageContent){
    event.preventDefault();
    if(user !== this.state.currentUser){
      const msg = "User "+this.state.currentUser+" has changed name to "+user;
      this.setState({currentUser:user});
      this.broadCastMessage(JSON.stringify({type:"postNotification", user:user,messageContent:msg}));
    }
    this.broadCastMessage(JSON.stringify({type: "sendMessage", user:user,messageContent:messageContent}));
    event.preventDefault();
  }

  /*
  * Function to ender the App element
  */
  render() {
    return (
      <div id="AboutMessages">
        <nav className="navbar" id="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span id="userCount">{this.state.userCount} user(s) online</span>
        </nav>
        <MessageList messages={this.state.allMessages}/>
        <footer className="chatbar"><ChatBar currentUser={this.state.currentUser} messageDetail={this.getMessageDetail} /></footer>
      </div>
    )
  }

}
export default App;
