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
	Toast, Icon, Left, Grid, Row, Col
} from "native-base";
import {ActivityIndicator, View, TouchableOpacity, ImageBackground, Dimensions, Image} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import { styles } from './styles';
import {appStyles} from '../assets/app_styles';

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
			"company":"",
			"abn":"",
			"first_name":"",
			"last_name":"",
			'email':"",
			'phone':"",
			"city":"",
			"state":"",
			'password':"",
			"confirmPassword":"",
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
		let { height, width } = Dimensions.get('window');
		return (
			<ImageBackground source={require("../../../assets/concrete-background.png")} style={{width,height}}>
				<Container style={appStyles.bgTransparent}>
					<Header style={[appStyles.headerHeight]} transparent>
						<Grid>
							<Row>
								<Col style={appStyles.contentCenter}>
									<Image source={require("../assets/Logo18.png")} style={appStyles.logoHeader} />
								</Col>
							</Row>
						</Grid>
					</Header>
					<Content style={appStyles.content}>
						<Grid style={appStyles.paddingDefault}>
							<Row style={[appStyles.bgPrimary,appStyles.subHeader]}>
								<Col style={appStyles.iconCol}>
									<Icon type="FontAwesome" name="user" style={appStyles.headerIcon} />
								</Col>
								<Col style={appStyles.subHeaderTxtCol}>
									<Text style={[appStyles.baseFont,appStyles.subHeaderTxt]}>Register AS Contractor</Text>
								</Col>
							</Row>
						</Grid>
						<Form style={appStyles.loginForm}>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Company" value={this.state.company} onChangeText={company => this.setState({company})} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="ABN"  value={this.state.abn} onChangeText={abn => this.setState({abn})} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="First Name"  value={this.state.first_name} onChangeText={first_name => this.setState({ first_name })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Last Name" value={this.state.last_name} onChangeText={last_name => this.setState({ last_name })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Email" value={this.state.email} onChangeText={email => this.setState({ email })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Phone" value={this.state.phone} onChangeText={phone => this.setState({ phone })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="City" value={this.state.city} onChangeText={city => this.setState({ city })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]}  placeholder="State" value={this.state.state} onChangeText={state => this.setState({ state })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Password" value={this.state.password} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Confirm Password" value={this.state.confirmPassword} secureTextEntry={true} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
							</FormItem>
							<View style={styles.registerButton}>
								<Button full style={appStyles.button}  onPress={()=>this.formSubmit()}>
									<Text style={[appStyles.btnTxt,appStyles.baseFont]}>Register</Text>
								</Button>
							</View>
						</Form>
					</Content>
				</Container>
			</ImageBackground>
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