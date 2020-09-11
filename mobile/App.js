

import React,{Component} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
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
    };
  }

  componentDidMount(){
     this.socket = io("http://192.168.1.103:3000");
     this.socket.on("Chat Message",msg =>{
       this.setState({chatMessages:[...this.state.chatMessages, msg]});
     });
  }
submitChatMessage(){
this.socket.emit("Chat Message",this.state.chatMessage);
this.setState({chatMessage:""});
}

  render(){
  const chatMessages = this.state.chatMessages.map(chatMessage => (<Text key={chatMessage}>{chatMessage}</Text>));
  
  return (
        
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
          </View>
      
  );
  }
  }
const styles = StyleSheet.create({
  
  
  body: {
    backgroundColor: Colors.white,
  },
  

});

export default App;
