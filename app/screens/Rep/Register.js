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
	Icon, Grid, Row, Col,

} from "native-base";
import {ActivityIndicator, View, TouchableOpacity, ImageBackground, Image, Dimensions,StatusBar} from "react-native";


//Expo Packages
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//Custom Components/
import SubHeader from '../../components/SubHeader';
import LoginHeader from '../../components/LoginHeader';

//React State
import { connect } from 'react-redux';
import { actions, States } from '../../store';

//Styles
import { styles } from './styles';
import {appStyles} from "../assets/app_styles";

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
			"company":"",
			"browse":"",
			"title":"",
			"first_name":"",
			"last_name":"",
			'email':"",
			'phone':"",
			"city":"",
			"state":"",
			'password':"",
			"confirmPassword":"",
			'roles':"rep",
			'abn':"",
		};
		this.uploadLogo=this.uploadLogo.bind(this);
	}

	componentDidMount() {
		 this.getPermissionAsync();
	 }


	getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

	async uploadLogo(){
		// console.log("ok");
		let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
		if(!result.cancelled){
			if(result.type!=="image"){
				alert("Please Select the valid type of file");
			}
		}
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
		let { height, width } = Dimensions.get('window');
		return (
			<ImageBackground source={require("../../../assets/concrete-background.png")} style={{width,height}}>
				<Container style={appStyles.bgTransparent}>
					<Content style={appStyles.content}>
						<LoginHeader/>
						<SubHeader>
							<Row style={[appStyles.bgPrimary,appStyles.subHeader]}>
								<View style={appStyles.subHeaderBg}></View>
								<Col style={appStyles.iconCol}>
									<Icon type="FontAwesome" name="user" style={appStyles.headerIcon} />
								</Col>
								<Col style={appStyles.subHeaderTxtCol}>
									<Text style={[appStyles.baseFont,appStyles.subHeaderTxt]}>Register AS Rep</Text>
								</Col>
							</Row>
						</SubHeader>
						<Form style={appStyles.loginForm}>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Company" value={this.state.company} onChangeText={(text) => this.setState({ company: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="ABN" value={this.state.abn} onChangeText={(text) => this.setState({ abn: text })} />
							</FormItem>
							<Button style={[appStyles.baseFont,appStyles.bgWhite,appStyles.borderRadiusDefault,appStyles.marginDefault]} onPress={this.uploadLogo}>
								<Text style={[appStyles.baseFont,appStyles.colorGray44]}>Logo</Text>
								<Icon active style={[appStyles.colorGray44]}  type="FontAwesome5" name='upload' />
							</Button>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Title" value={this.state.title} onChangeText={(text) => this.setState({ title: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="First Name" value={this.state.first_name} onChangeText={(text) => this.setState({ first_name: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Last Name" value={this.state.last_name} onChangeText={(text) => this.setState({ last_name: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Email" value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Phone" value={this.state.phone} onChangeText={(text) => this.setState({ phone: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="City" value={this.state.city} onChangeText={(text) => this.setState({ city: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="State" value={this.state.state} onChangeText={(text) => this.setState({ state: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Password" value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
							</FormItem>
							<FormItem style={appStyles.loginInput} regular>
								<Input style={[appStyles.baseFont]} placeholder="Confirm Password" value={this.state.confirmPassword} secureTextEntry={true} onChangeText={(text) => this.setState({ confirmPassword: text })} />
							</FormItem>
							<View style={styles.registerButton}>
								<Button full style={appStyles.button} onPress={()=>this.formSubmit()}>
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
			// console.log("Register page",data);
			return dispatch(actions.rep.register(data));
		},
	};
}

export default connect(null,mapDispatchToProps)(RegisterRep);
