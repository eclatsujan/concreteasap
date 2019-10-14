import * as React from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity,Platform,StatusBar } from 'react-native';
import { 
	Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title,
	Form,Item as FormItem,Input,Toast,Label,Picker,Grid,Col, DatePicker,

 } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

import TimePicker from "react-native-24h-timepicker";

import { Constants, Svg } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ModalSelector from 'react-native-modal-selector';
import { validationService } from "../../Validation/Service";

import * as moment from 'moment';

import {styles} from '../../styles.js';
import {appStyles} from "../../../assets/app_styles";

var size = 30;
export default class PlaceOrder extends React.Component {
  	constructor(props) {
	    super(props);
	        
	    this.state={
	    	inputs:{
	    		suburb:"",
	    		type:"standard-mix",
	    		mpa:"20",	
	    		agg:"10",
	    		slu:"80",
	    		acc:"1% Bronze",
	    		placement_types:"Chute",
	    		quantity:"",
	    		chosenDate: new Date(this.addDays(5)),
	    		time1:"12:22",
	    		time2:"00:00",
	    		time3:"00:00",
	    		time_difference_deliveries:"8am-10am",
	    		urgency:"Immediate",
	    		message_required:"false",
	    		site_call:"On Site",
	    	},
	    	form_data:{
	    		types:[
	    			{
	    				label:"Standard Mix",
	    				key:"standard-mix"
	    			},
	    			{
	    				label:"Block Fill Mix",
	    				key:"block-fill"
	    			},
	    			{
	    				label:"Long Line",
	    				key:"long-line"
	    			},
	    			{
	    				label:"Temmi Mix",
	    				key:"temmi-fill"
	    			},
	    			{
	    				label:"Spray Crete/Shot Crete",
	    				key:"crete"
	    			},
	    			{
	    				label:"Kerb abd",
	    				key:"kerb-abd"
	    			},
	    		],
	    		mpa:[
	    			{
	    				label:"20",
	    				key:20
	    			},
	    			{
	    				label:"25",
	    				key:25
	    			},
	    			{
	    				label:"32",
	    				key:32
	    			},
	    			{
	    				label:"40",
	    				key:40
	    			},
	    			{
	    				label:"50",
	    				key:25
	    			},
	    			{
	    				label:"Special Request",
	    				key:"special-request"
	    			},
	    		],
	    		agg:[
	    			{
	    				label:"10",
	    				key:10
	    			},
	    			{
	    				label:"20",
	    				key:20
	    			},
	    			{
	    				label:"SL",
	    				key:"sl"
	    			},
	    		],
	    		slu:[{label:"80",key:80},{label:"90",key:90},{label:"100",key:100},{label:"150",key:150}],
	    		acc:[{label:"1% Bronze",key:"1%"},{label:"2% Sliver",key:"2%"},{label:"3% Gold",key:"3%"}],
	    		placement_types:[{label:"Chute",key:"Chute",value:"Chute"},{label:"Line Pump",key:"Line Pump",value:"Line Pump"},
	    		{label:"Boom Pump",key:"Boom Pump",value:"Boom Pump"}],
	    		time_difference_deliveries:[{label:"8am-10am",key:"8am-10am"},{label:"10am-12pm",key:"10am-12pm"},{label:"12pm-2pm",key:"12pm-2pm"},{label:"2pm-4pm",key:"2pm-4pm"},{label:"4pm-6pm",key:"4pm-6pm"}, ],
				urgency:[{label:"Immediate",key:"Immediate"},{label:"With-in 5 days",key:"With-in 5 days"},],
				message_required:[{label:"Yes",key:"true"}, {label:"No",key:"false"}],
				site_call:[{label:"On Site",key:"On Site"}, {label:"On Call",key:"On Call"}],
			}
	    };
	    this.setDate = this.setDate.bind(this); //date picker
	    this.currentTimeSelector="";
		//client side validation
	    this.onInputChange = validationService.onInputChange.bind(this);
    	this.getFormValidation = validationService.getFormValidation.bind(this);
    	this._specialRequests = this._specialRequests.bind(this);

  	}

  	setFormState(formState){
  		this.setState({inputs:formState});
  	}

  	//date picker
	setDate(newDate) {
		var t = new Date(newDate);
		// t.setDate(); 
		//console.log("SetData function",newDate+1);
		// console.log(newDate);
  		let inputs = {...this.state.inputs};
  		// newDate=newDate+1;
  		inputs.chosenDate=t.getFullYear()+"/"+t.getMonth()+"/"+t.getDate();
  		console.log(inputs.chosenDate);
  		this.setState({inputs});
  	}
  //date picker close

	addDays(n){ // adding the few more days in the current days
	    var t = new Date();
	    //console.log(t);
	    t.setDate(t.getDate() + n); 
	    var month = "0"+(t.getMonth()+1);
	    var date = "0"+t.getDate();
	    month = month.slice(-2);
	    date = date.slice(-2);
	    var date = t.getFullYear()+'-'+month+'-'+date;
	     //console.log(date);
	    return(date);
	}



  //time picker

  onCancel() {
    this.TimePicker.close();
  }
 
  onConfirm(hour, minute) {
  	// console.log();
  	let obj_name=this.currentTimeSelector; // 
  	// console.log(obj_name);
  	let duplicate_state={...this.state}; //create the duplicate of the state

  	duplicate_state.inputs[obj_name]=`${hour}:${minute}`; // updating the specific value of duplicate state

  	this.setState(duplicate_state); // update the current state with the duplicate state

    this.TimePicker.close();
  }

  //time picker close
  _specialRequests(){
  	// this.getFormValidation();
  	// console.log("PlaceOrder state values",this.state.inputs);
  	// if(this.state.inputs.suburb.value !== "" && this.state.inputs.quantity.value !== "" && this.state.inputs.time1.value !== "" ){
	  	if(this.state.inputs.message_required =="true"){
	  			this.props.navigation.navigate("SpecialRequests",
	  				{formData:this.state.inputs,updateState:this.setFormState});
	  	}
	  	else{
	  			this.props.navigation.navigate("ReviewOrder",{formData:this.state.inputs});
	  	}
  	
  }

  renderError(id) { //display error message
    const { inputs } = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={{fontSize:18, color: 'red'}}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

	onValueChange(value) {
		let inputs = {...this.state.inputs}
		inputs.type=value;
   		this.setState({inputs})
	}

	setMapValue(value){
		let inputs = {...this.state.inputs}
		inputs.mpa=value;
   		this.setState({inputs})
	}

	setAggValue(value){
		let inputs = {...this.state.inputs}
		inputs.agg=value;
   		this.setState({inputs});
	}
	setSluValue(value){
		let inputs = {...this.state.inputs}
		inputs.slu=value;
   		this.setState({inputs});
	}
	setAccValue(value){
		let inputs = {...this.state.inputs}
		inputs.acc=value;
   		this.setState({inputs});
	}
	setPlacementTypesValue(value){
		let inputs = {...this.state.inputs}
		inputs.placement_types=value;
   		this.setState({inputs});
	}
	setTimeDifferenceDeliveriesValue(value){
		let inputs = {...this.state.inputs}
		inputs.time_difference_deliveries=value;
   		this.setState({inputs});
	}
	setUrgencyValue(value){
		let inputs = {...this.state.inputs}
		inputs.urgency=value;
   		this.setState({inputs});
	}
	setMessageRequiredValue(value){
		let inputs = {...this.state.inputs}
		inputs.message_required=value;
   		this.setState({inputs});
	}
	setSiteCallValue(value){
		let inputs = {...this.state.inputs}
		inputs.site_call=value;
   		this.setState({inputs});
	}


	renderList(data){
		let view=[];
		data.forEach(function(element) {
			view.push(
			 	<Picker.Item label={element.label} value={element.key} key={element.key}/>
			);
		});
		return view;
	}

  	render(){
  		// console.log("Placeorder status ",this.state.inputs);

	  	return (
	  		<Container style={[appStyles.bgTransparent,{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}]}>
		        <Header>
		          <Left>
		            <Button
		              transparent
		              onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
		            >
		              <Icon name='menu' />
		            </Button>
		          </Left>
		          <Body>
		            <Title>Concrete ASAP</Title>
		          </Body>
		          <Right>
		            <Button transparent>
		              <Icon name='person' />
		            </Button>
		          </Right>
		        </Header>
		        <Content>
	             	<ScrollView>
	             	<Form>
	             	
		              	<FormItem floatingLabel>   
		              		<Label style={{fontSize:18}}>Suburb/Post Code</Label>		
	                		<Input value={this.state.inputs.suburb} style={{fontSize:20}} onChangeText={(text) => {
	                			let inputs={...this.state.inputs}
	                			inputs.suburb=text;
	                			this.setState({inputs:inputs});
							}} />
		              	</FormItem>
		              	<Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>Type</Text>
		              	<Picker mode="dropdown"  iosHeader="Types" iosIcon={<Icon name="arrow-down" />}
		              		selectedValue={this.state.inputs.type} onValueChange={this.onValueChange.bind(this)}
		              		itemTextStyle={{fontSize: 20}} activeItemTextStyle={{fontSize: 20, fontWeight: 'bold'}}>	
			            	{this.renderList(this.state.form_data.types)}			              
			            </Picker>
			            <Grid>
				          <Col>
				          <Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>MPA</Text>
				          	<Picker mode="dropdown" iosHeader="MPA" iosIcon={<Icon name="arrow-down" />}
			              		selectedValue={this.state.inputs.mpa} onValueChange={this.setMapValue.bind(this)} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            	{this.renderList(this.state.form_data.mpa)}			              
				            </Picker>
				          </Col>
				          <Col>
				          <Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>AGG</Text>
				          	 <Picker mode="dropdown" iosHeader="AGG" iosIcon={<Icon name="arrow-down" />}
			              		selectedValue={this.state.inputs.agg} onValueChange={this.setAggValue.bind(this)} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            	{this.renderList(this.state.form_data.agg)}			              
				            </Picker>		
				          </Col>
				          <Col>
				          <Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>SLU</Text>
			          	 		<Picker mode="dropdown" iosHeader="SLU" iosIcon={<Icon name="arrow-down" />}
			              			selectedValue={this.state.inputs.slu} onValueChange={this.setSluValue.bind(this)} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            			{this.renderList(this.state.form_data.slu)}			              
				            	</Picker>		
				          </Col>				          
				        </Grid>   
				        <Grid>
				        	<Col>
				        	<Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>ACC</Text>
				        		<Picker mode="dropdown" iosHeader="Acc" iosIcon={<Icon name="arrow-down" />}
			              			selectedValue={this.state.inputs.acc} onValueChange={this.setAccValue.bind(this)} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            			{this.renderList(this.state.form_data.acc)}			              
				            	</Picker>
				        	</Col>
				        	<Col>
				        	<Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>Placement Type</Text>
				        		<Picker mode="dropdown" iosHeader="Placement Type" iosIcon={<Icon name="arrow-down" />}
			              			selectedValue={this.state.inputs.placement_types} onValueChange={this.setPlacementTypesValue.bind(this)} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            			{this.renderList(this.state.form_data.placement_types)}			              
				            	</Picker>
				        	</Col>
				        </Grid>
				        <View style={{fontSize:18, marginBottom:15}}>
					        <FormItem floatingLabel>
				              <Label>Quantity</Label>
				              <Input value={this.state.inputs.quantity} style={{fontSize:20}}
									 onChangeText={(text) => { let inputs={...this.state.inputs}
									 inputs.quantity=text;
									 this.setState({inputs:inputs});  }}
									 keyboardType="numeric"/>
				            </FormItem>
			            </View>
			            <Grid>
				        	<Col>
				        	<View style={styles.datePicker}>
				        		<DatePicker
						            defaultDate={new Date(this.addDays(5))}
						            minimumDate={new Date(2019, 1, 1)}
						            maximumDate={new Date(2020, 12, 31)}
						            locale={"en"}
						            timeZoneOffsetInMinutes={"UTC +10:00 / +11:00"}
						            //dateFormat={"yyyy/MM/dd"}
						            modalTransparent={false}
						            animationType={"fade"}
						            androidMode={"default"}
						            placeHolderText="Please Select Date"
						            textStyle={{ color: "green", fontSize: 20, }}
						            placeHolderTextStyle={{ color: "#d3d3d3" }}
						            onDateChange={this.setDate}
						            disabled={false}
						            />
						            </View>
				            </Col>
				            <Col style={{width:50}}>
					            <View style={{ flexDirection: 'row' , marginTop:13}}>
						          <MaterialCommunityIcons
						            name="calendar-blank"
						            size={30}
						            margin
						            color="#000"
						          />
						        </View>
					        </Col>
					    </Grid>

				            <FormItem floatingLabel>
				                <Label style={{fontSize:18}}>Time Preference 1</Label>
				                <Input 
				                 value={this.state.inputs.time1} 
				                 onFocus={() => {this.TimePicker.open();this.currentTimeSelector="time1";}}
				                 onChangeText={this.state.inputs.time1} />
			                </FormItem>
			                <Text>{this.renderError("time1")}</Text> 
			                <FormItem floatingLabel>
				                <Label style={{fontSize:18}}>Time Preference 2</Label>
				                <Input 
				                 value={this.state.inputs.time2} 
				                 onFocus={() => {this.TimePicker.open();this.currentTimeSelector="time2";}}
				                 onChangeText={this.state.inputs.time2} />
			                </FormItem>
			                <FormItem floatingLabel>
				                <Label style={{fontSize:18}}>Time Preference 3</Label>
				                <Input 
				                 value={this.state.inputs.time3} 
				                 onFocus={() => {this.TimePicker.open();this.currentTimeSelector="time3";}}
				                 onChangeText={this.state.inputs.time3} />
			                </FormItem>
			                <TimePicker
					          ref={ref => {
					            this.TimePicker = ref;
					          }}
					          onCancel={() => this.onCancel()}
					          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
					        />
			                
					        <Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>Time Between Deliveries</Text>
					        <Picker mode="dropdown" iosHeader="time_difference_deliveries" iosIcon={<Icon name="arrow-down" />}
			              		selectedValue={this.state.inputs.time_difference_deliveries} onValueChange={(text)=>{this.setTimeDifferenceDeliveriesValue(text)}} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            	{this.renderList(this.state.form_data.time_difference_deliveries)}			              
				            </Picker>
				            <Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>Urgency</Text>
					        <Picker mode="dropdown" iosHeader="urgency" iosIcon={<Icon name="arrow-down" />}
			              		selectedValue={this.state.inputs.urgency} onValueChange={(text) =>{this.setUrgencyValue(text)}} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            	{this.renderList(this.state.form_data.urgency)}			              
				            </Picker>
				            <Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>Message Required Y/N</Text>
					        <Picker mode="dropdown" iosHeader="message_required" iosIcon={<Icon name="arrow-down" />}
			              		selectedValue={this.state.inputs.message_required} onValueChange={(text)=>{this.setMessageRequiredValue(text)}} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            	{this.renderList(this.state.form_data.message_required)}			              
				            </Picker>
				            <Text style={{fontSize:16, margin: 8, fontWeight:'bold',}}>On Site / On Call</Text>
					        <Picker mode="dropdown" iosHeader="site_call" iosIcon={<Icon name="arrow-down" />}
			              		selectedValue={this.state.inputs.site_call} onValueChange={(text)=>{this.setSiteCallValue(text)}} itemTextStyle={{ fontSize:25, color: '#d00' }}>	
				            	{this.renderList(this.state.form_data.site_call)}			              
				            </Picker>
				            <View style={styles.registerButton}>
				              	<TouchableOpacity onPress={()=>this._specialRequests()}>
				                	<Text style = {styles.buttonText}>Next</Text>
				            	</TouchableOpacity>
			          		</View>

	              	</Form>
	              	</ScrollView>
		        </Content>
	      	</Container>
	  	);
  	}
}