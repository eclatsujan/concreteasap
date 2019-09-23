import * as React from 'react';
import {
			Container, 
			Header,
			Button,
			Text,
			Body,
			Form,
			Item as FormItem,
			Input,
			Label,
			Title,
			Content,
			Right,
			Footer,
			FooterTab,
			Spinner,
			Toast,
			Left,
			Icon,

		} from "native-base";
import {ActivityIndicator,View, TouchableOpacity} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import { styles } from './styles';

import { actions, States } from '../../store';

class RegisterRep extends React.Component {
	static navigationOptions = {
	    // header: null,
	    title: 'Concrete ASAP',
	    headerStyle: {
	      backgroundColor: '#f4511e',
	    }
  	};

	constructor(props){
		super(props);
		this.state={
			"company":"xyz",
			"browse":"12554",
			"title":"Mr.",
			"first_name":"dfdf23",
			"last_name":"dfd5856",
			'email':"dedxe@gmail.com",
			'phone':"565852",
			"city":"sydney",
			"state":"nsw",
			'password':"S1234566",
			"confirmPassword":"S1234566",
			'roles':"rep",
			'abn':"000",
		};
	}

	formSubmit(){
		let data={};
	    data.company=this.state.company;
	    data.browse=this.state.browse;
	    data.title=this.state.title;
	    data.first_name=this.state.first_name;
	    data.last_name=this.state.last_name;
	    data.email=this.state.email;
	    data.phone_number=this.state.phone;
	    data.state=this.state.state;
	    data.city=this.state.city;
	    data.password=this.state.password;
	    data.confirmPassword=this.state.confirmPassword;
	    data.roles=this.state.roles;
	    data.abn=this.state.abn;
	    this.props.register(data);
	}

	render(){
		return (
		 	<Container>
			 	<Header>  
			            <Left>
			              <Button transparent onPress={()=>this.props.navigation.goBack()}>
			                <Icon name="arrow-back" />
			              </Button>
			            </Left>
			            <Body>
			              <Title>Concrete ASAP</Title>
			            </Body>
			          </Header> 	          
	          	<Content>     
	          	<Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Register Rep</Text>       
		            <Form>
		              <FormItem floatingLabel>
		                <Label>Company</Label>
		                <Input value={this.state.company} onChangeText={(text) => this.setState({ company: text })} />
		              </FormItem>
		               <FormItem floatingLabel>
		                <Label>Browse</Label>
		                <Input value={this.state.browse} onChangeText={(text) => this.setState({ browse: text })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>Title</Label>
		                <Input value={this.state.title} onChangeText={(text) => this.setState({ title: text })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>First Name</Label>
		                <Input value={this.state.first_name} onChangeText={(text) => this.setState({ first_name: text })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>Last Name</Label>
		                <Input value={this.state.last_name} onChangeText={(text) => this.setState({ last_name: text })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>Email</Label>
		                <Input value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>Phone</Label>
		                <Input value={this.state.phone} onChangeText={(text) => this.setState({ phone: text })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>City</Label>
		                <Input value={this.state.city} onChangeText={(text) => this.setState({ city: text })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>State</Label>
		                <Input value={this.state.state} onChangeText={(text) => this.setState({ city: state })} />
		              </FormItem>
		              <FormItem floatingLabel last>
		                <Label>Password</Label>
		                <Input value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
		              </FormItem>
		              <FormItem floatingLabel last>
		                <Label>Confirm Password</Label>
		                <Input value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
		              </FormItem>
		              	<View style={styles.registerButton}>
			              	<TouchableOpacity onPress={()=>this.formSubmit()}>
			                	<Text style = {styles.buttonText}>Register</Text>
			            	</TouchableOpacity>
			          	</View>    
		            </Form>
	          	</Content>
	        </Container>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => {
    	// console.log("Register page",data);
      return dispatch(actions.rep.register(data));
    },
  };
}

export default connect(null,mapDispatchToProps)(RegisterRep);