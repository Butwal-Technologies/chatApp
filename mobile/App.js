

import React,{Component} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,SafeAreaView,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';



class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      chatMessage:"",
      chatMessages:[],
      passengerMessage:"",
      passengerMessages:[]
    };
  }

  componentDidMount(){
     this.socket = io("http://192.168.1.115:3000");
     this.socket.on("Chat Message",msg =>{
       this.setState({chatMessages:[...this.state.chatMessages, msg]});
     });
     this.socket.on("Chat Passenger",msg =>{
      this.setState({passengerMessages:[...this.state.passengerMessages, msg]});
    });
  }
submitChatMessage(){
this.socket.emit("Chat Message",this.state.chatMessage);
this.setState({chatMessage:""});
this.socket.emit("Chat Passenger",this.state.chatMessage);
}

  render(){
  const chatMessages = this.state.chatMessages.map(chatMessage => (<Text key={chatMessage}>{chatMessage}</Text>));
  const passengerMessages = this.state.passengerMessages.map(chatMessage => (<Text key={chatMessage}>{chatMessage}</Text>));

  return (
        <SafeAreaView>
          <View style={styles.body}>
         <TextInput
         style={{height:40,borderWidth:2}}
         autoCorrect={false}
         value={this.state.chatMessage}
         onSubmitEditing={()=> this.submitChatMessage()}
         onChangeText={chatMessage =>{
           this.setState({chatMessage});
         }}
         />
           {chatMessages}
           {passengerMessages}
          </View>
          </SafeAreaView>
  );
  }
  }
const styles = StyleSheet.create({
  
  
  body: {
    backgroundColor: Colors.white,
  },
  

});

export default App;
