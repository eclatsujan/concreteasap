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
import {ActivityIndicator, View,TouchableWithoutFeedback,Keyboard, TouchableOpacity, ImageBackground, Dimensions, Image,StatusBar,KeyboardAvoidingView,Platform,SafeAreaView} from "react-native";

//React Pacakges
import Svg from 'react-native-svg';
import * as SecureStore from 'expo-secure-store';

//App Component
import AppBackground from '../../components/AppBackground';
import AppLoading from '../../components/AppLoading';

//Custom COmponent
import SubHeader from '../../components/SubHeader';
import LoginHeader from '../../components/LoginHeader';

//React Helper

//React Redux Stores
import { connect } from 'react-redux';
import { actions, States } from '../../store';

//Stylesheets
import { styles } from './styles';
import {appStyles} from '../assets/app_styles';

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
		data.roles=this.state.roles;

		this.props.register(data);

	}

	handleErrorState(){

	}

	render(){
		checkAppLoading();
		return (
			<AppBackground>
				<Container onPress={Keyboard.dismiss}>
					<Content enableAndroid>
						<LoginHeader/>
						<SubHeader>
							<Row style={[appStyles.bgPrimary,appStyles.subHeader]}>
								<Col style={appStyles.iconCol}>
									<Icon type="FontAwesome" name="user" style={appStyles.headerIcon} />
								</Col>
								<Col style={appStyles.subHeaderTxtCol}>
									<Text style={[appStyles.baseFont,appStyles.subHeaderTxt]}>Register AS Contractor</Text>
								</Col>
							</Row>
						</SubHeader>
						<Form style={appStyles.loginForm}>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="COMPANY" value={this.state.company} onChangeText={company => this.setState({company})} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="ABN"  value={this.state.abn} onChangeText={abn => this.setState({abn})} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="FIRST NAME"  value={this.state.first_name} onChangeText={first_name => this.setState({ first_name })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="LAST NAME" value={this.state.last_name} onChangeText={last_name => this.setState({ last_name })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="EMAIL" value={this.state.email} onChangeText={email => this.setState({ email })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="PHONE" value={this.state.phone} onChangeText={phone => this.setState({ phone })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="CITY" value={this.state.city} onChangeText={city => this.setState({ city })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]}  placeholder="STATE" value={this.state.state} onChangeText={state => this.setState({ state })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="PASSWORD" value={this.state.password} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="CONFIRM PASSWORD" value={this.state.confirmPassword} secureTextEntry={true} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
							</FormItem>
							<View style={styles.registerButton}>
								<Button full style={appStyles.button}  onPress={()=>this.formSubmit()}>
									<Text style={[appStyles.btnTxt,appStyles.baseFont]}>Register</Text>
								</Button>
							</View>
						</Form>
					</Content>
				</Container>
			</AppBackground>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (data) => {
			return dispatch(actions.contractor.register(data));
		}
	}
}

const mapStateToProps = (state) => {
    const {app}=state;
    return {app};
};


export default connect(mapStateToProps,mapDispatchToProps)(RegisterContractor);
