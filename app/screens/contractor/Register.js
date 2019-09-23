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
			Toast,Icon,Left
		} from "native-base";
import {ActivityIndicator,View, TouchableOpacity} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import { styles } from './styles';

import { actions, States } from '../../store';

class RegisterContractor extends React.Component {
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
			"abn":"12554",
			"first_name":"dfdf23",
			"last_name":"dfd5856",
			'email':"dedxe@gmail.com",
			'phone':"565852",
			"city":"sydney",
			"state":"nsw",
			'password':"S1234566",
			"confirmPassword":"S1234566",
			'roles':"contractor"
		};
	}

	formSubmit(){
	    let data={}
	    data.company=this.state.company,
	    data.abn=this.state.abn,
	    data.first_name=this.state.first_name,
	    data.last_name=this.state.last_name,
	    data.email=this.state.email,
	    data.phone_number=this.state.phone,
	    data.state=this.state.state,
	    data.city=this.state.city,
	    data.password=this.state.password,
	    data.confirmPassword=this.state.confirmPassword,
	    data.roles=this.state.roles,
	    // console.log(data);
	    // consol
	    this.props.register(data);
  	}

	render(){
		return (
		 	<Container>	  
		 		<Header>  
		            <Left>
		              <Button
		                transparent
		               onPress={()=>this.props.navigation.goBack()}           >
		                <Icon name="arrow-back" />
		              </Button>
		            </Left>
		            <Body>
		              <Title>Concrete ASAP</Title>
		            </Body>
		          </Header>        
	          	<Content>
	          	<Text style={{textAlign:"center", fontSize:20, fontWeight:'bold',}}>Register Contractor</Text>            
		            <Form>
		              <FormItem floatingLabel>
		                <Label>Company</Label>
		                <Input value={this.state.company} onChangeText={company => this.setState({company})} />
		              </FormItem>
		               <FormItem floatingLabel>
		                <Label>ABN</Label>
		                <Input value={this.state.abn} onChangeText={abn => this.setState({abn})} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>First Name</Label>
		                <Input value={this.state.first_name} onChangeText={first_name => this.setState({ first_name })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>Last Name</Label>
		                <Input value={this.state.last_name} onChangeText={last_name => this.setState({ last_name })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>Email</Label>
		                <Input value={this.state.email} onChangeText={email => this.setState({ email })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>Phone</Label>
		                <Input value={this.state.phone} onChangeText={phone => this.setState({ phone })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>City</Label>
		                <Input value={this.state.city} onChangeText={city => this.setState({ city })} />
		              </FormItem>
		              <FormItem floatingLabel>
		                <Label>State</Label>
		                <Input value={this.state.state} onChangeText={state => this.setState({ state })} />
		              </FormItem>
		              <FormItem floatingLabel last>
		                <Label>Password</Label>
		                <Input value={this.state.password} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
		              </FormItem>
		              <FormItem floatingLabel last>
		                <Label>Confirm Password</Label>
		                <Input value={this.state.confirmPassword} secureTextEntry={true} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
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
    	// console.log(actions);
      return dispatch(actions.contractor.register(data));
    },
  }
}

export default connect(null,mapDispatchToProps)(RegisterContractor);