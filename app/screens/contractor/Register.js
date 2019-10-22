//React Pacakges
import * as React from 'react';
import {View,Keyboard,BackHandler,SafeAreaView} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Svg from 'react-native-svg';
// Expo Pacakges
import * as SecureStore from 'expo-secure-store';

//Native Base Pacakges
import {Container,Button,Text,Form,Item as FormItem,Input,Label,Title,Content,Icon, Row, Col} from "native-base";

//App Component
import AppBackground from '../../components/AppBackground';
import AppLoading from '../../components/AppLoading';

//Custom COmponent
import SubHeader from '../../components/SubHeader';
import LoginHeader from '../../components/LoginHeader';

//React Helper
import {helper} from '../../helpers'
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
		this.handleBackButton=this.handleBackButton.bind(this);
	}

	componentWillMount(){
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	handleBackButton(){
		this.props.flushError();
		this.props.navigation.goBack();
    return true;
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

	getErrorStyle(condition){
		let result={};
		if(condition){
			result={borderRightWidth:1,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2}
		}
		return result;
	}

	render(){
		return (
			<AppBackground loading={this.props.app.loading}>
				<Content extraScrollHeight={200}	>
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
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.company)]} error={this.props.error.errors.company ? true : false} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="COMPANY" value={this.state.company} onChangeText={company => this.setState({company})} />
							{helper.error.showErrorIcon(this.props.error.errors.company)}
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.company)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.company)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="ABN"  value={this.state.abn} onChangeText={abn => this.setState({abn})} />
							{helper.error.showErrorIcon(this.props.error.errors.abn)}
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.abn)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.first_name)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="FIRST NAME"  value={this.state.first_name} onChangeText={first_name => this.setState({ first_name })} />
							{helper.error.showErrorIcon(this.props.error.errors.first_name)}
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.first_name)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.last_name)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="LAST NAME" value={this.state.last_name} onChangeText={last_name => this.setState({ last_name })} />
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.last_name)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.email)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="EMAIL" value={this.state.email} onChangeText={email => this.setState({ email })} />
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.email)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.phone_number)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="PHONE" value={this.state.phone} onChangeText={phone => this.setState({ phone })} />
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.phone_number)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.phone)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="CITY" value={this.state.city} onChangeText={city => this.setState({ city })} />
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.city)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.state)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]}  placeholder="STATE" value={this.state.state} onChangeText={state => this.setState({ state })} />
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.state)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.password)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="PASSWORD" value={this.state.password} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.password)}
						<FormItem style={[appStyles.loginInput,helper.error.getErrorStyle(this.props.error.errors.reset_password)]} regular>
							<Input style={[appStyles.baseFont,appStyles.loginInputBox]} placeholder="CONFIRM PASSWORD" value={this.state.confirmPassword} secureTextEntry={true} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
						</FormItem>
						{helper.error.showErrorMessage(this.props.error.errors.reset_password)}
						<View style={styles.registerButton}>
							<Button full style={appStyles.button}  onPress={()=>this.formSubmit()}>
								<Text style={[appStyles.btnTxt,appStyles.baseFont]}>Register</Text>
							</Button>
						</View>
					</Form>
				</Content>
			</AppBackground>
		);

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (data) => {
			return dispatch(actions.user.register(data));
		},
		flushError:() =>{
			return dispatch(actions.error.removeErrors());
		}
	}
}

const mapStateToProps = (state) => {
    const {app,error}=state;
    return {app,error};
};


export default connect(mapStateToProps,mapDispatchToProps)(RegisterContractor);
