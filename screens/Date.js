import React, { Component } from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { styles } from '../component/Styles';
import Dates from 'react-native-dates';
import moment from 'moment';
import { Modal } from 'react-native';
import firebase from 'firebase';
import db from '../config';


 
export default class Date extends Component {
  constructor(props){
    super(props)
    this.state = {data:null,focus:'startDate',startDate:null,enddDate:null,isModalVisible:'false',userid:firebase.auth().currentUser.email}
  }
  showModal = ()=>{
      const isDateBlocked = (date) =>
      date.isBefore(moment(), 'day');
 
    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );
 
    const onDateChange = ({ date }) =>
      this.setState({ ...this.state, date });
    return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      >
        <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',width:300,height:400,backgroundColor:'white',marginTop:200}}>
          <View style={{width:300}}>
        <Dates
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          range
        />
        </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{
          db.collection("Dates").add({
            "Start_Date":this.state.startDate && this.state.startDate.format('LL'),
            "End_Date":this.state.endDate && this.state.endDate.format('LL'),
            "User_Id":this.state.userid
          })
         this.setState({isModalVisible:false}) 
        }} style={[styles.smallbutton,{marginTop:20}]}>
          <Text style={styles.buttonText}> OK </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.setState({isModalVisible:false})}} style={[styles.smallbutton,{marginTop:20,marginLeft:20}]}>
          <Text style={styles.buttonText}> Cancel </Text>
        </TouchableOpacity>
        </View>
        </View>
      </Modal>
      )
    }
  render(){
    return (
      <View style={styles.container}>
        {
          this.showModal()
        }
        <TouchableOpacity
           onPress={()=>this.setState({ isModalVisible:true})}
           style={[styles.button]}
           >
           <Text style={styles.buttonText}>Date Picker</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Catalogue')}} style={[styles.button,{marginTop:20}]}>
           <Text style={styles.buttonText}> Next </Text>
         </TouchableOpacity>
      </View>
    )
  }
}