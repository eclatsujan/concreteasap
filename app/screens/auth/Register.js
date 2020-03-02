import * as React from 'react';
import {ScrollView, KeyboardAvoidingView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Button, Text, Form, Item as FormItem, Input, Content, View, Picker} from "native-base";

//Expo Packages
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//React State
import {connect} from 'react-redux';
import {actions} from '../../store';

//Custom Components/
import AppBackground from '../../components/App/AppBackground';
import SubHeader from '../../components/Headers/SubHeader';
import LoginHeader from '../../components/Headers/LoginHeader';
import ErrorHeader from '../../components/Headers/ErrorHeader';

//React Helper
import {helper} from '../../helpers'

//Styles
import {styles} from './styles';
import {appStyles} from "../../../assets/styles/app_styles";
import UploadButton from "../../components/Basic/Button/UploadButton";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "page_title": "",
            "company": "",
            'abn': "",
            "title": "",
            "first_name": "",
            "last_name": "",
            'email': "",
            'phone': "",
            "city": "",
            "state": "",
            'password': "",
            "confirm_password": "",
            'roles': "",
            'photo': null,
            logoText: "Logo"
        };
        this.uploadLogo = this.uploadLogo.bind(this);
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // The screen is focused
            // Call any action
            // console.log(this.props.navigation.getParam("roles"));
            this.setState({"roles": this.props.navigation.getParam("roles")});
        });
    }


    componentDidMount() {
        this.props.flushError();
        this.setState({"page_title": this.props.navigation.getParam("title")});
        this.setState({"roles": this.props.navigation.getParam("roles")})
        this.getPermissionAsync();
    }

    componentWillUnmount() {
        this.props.flushError();
    }


    async getPermissionAsync() {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    async uploadLogo() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            if (result.type !== "image") {
                alert("Please Select the valid type of file");
            }
            console.log(result);
            this.setState({'photo': result});
            this.setState({'logoText': "Logo been selected"});
        }
    }

    formSubmit() {
        let data = {};
        data["company"] = this.state.company;
        data["browse"] = this.state.browse;
        data["first_name"] = this.state.first_name;
        data["last_name"] = this.state.last_name;
        data["email"] = this.state.email;
        data["phone"] = this.state.phone;
        data["state"] = this.state.state;
        data["city"] = this.state.city;
        data["password"] = this.state.password;
        data["confirm_password"] = this.state.confirm_password;
        data["roles"] = this.state.roles;
        data["abn"] = this.state.abn;
        this.props.register(data, this.state.photo);
    }

    render() {
        let error = this.props.error;
        let errors = this.props.error.get("errors");
        console.log(errors);
        return (
            <AppBackground loading={this.props.app.get("loading")} enableKeyBoard>
                <LoginHeader/>
                <SubHeader iconType="FontAwesome" iconName="user" title={this.state.page_title}/>
                <ErrorHeader error={error}/>
                <Form style={[appStyles.loginForm]}>
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>Company</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("company"))]}
                        regular>
                        <Input style={[appStyles.baseFont, appStyles.colorBlack]} placeholder="Company"
                               value={this.state.company} onChangeText={(text) => this.setState({company: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("company"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>ABN</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("abn"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="ABN" value={this.state.abn}
                               onChangeText={(text) => this.setState({abn: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("abn"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>
                        Logo(Optional, Max Size: 5MB)
                    </Text>
                    <View style={[appStyles.bgWhite, appStyles.borderRadiusDefault, appStyles.my_5]}>
                        <UploadButton onUpload={this.uploadLogo} placeholder={this.state.logoText}/>
                    </View>
                    {helper.error.showErrorMessage(errors.get("photo"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>First
                        Name</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("first_name"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="First Name" value={this.state.first_name}
                               onChangeText={(text) => this.setState({first_name: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("first_name"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>Last Name</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("last_name"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="Last Name"
                               value={this.state.last_name}
                               onChangeText={(text) => this.setState({last_name: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("last_name"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>Email</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("email"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="Email" value={this.state.email}
                               autoCapitalize='none' onChangeText={(text) => this.setState({email: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("email"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>Phone</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("phone"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="Phone" value={this.state.phone}
                               onChangeText={(text) => this.setState({phone: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("phone"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>City</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("city"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="City" value={this.state.city}
                               onChangeText={(text) => this.setState({city: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("city"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>State</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("state"))]}
                        regular>
                        <Picker selectedValue={this.state.state}
                                itemStyle={appStyles.ft_small}
                                textStyle={appStyles.ft_small}
                                itemTextStyle={appStyles.ft_small}
                                onValueChange={(text) => {
                                    this.setState({state: text})
                                }}>
                            <Picker.Item label={"Select One"} value={""}/>
                            <Picker.Item label={"NSW"} value={"NSW"}/>
                            <Picker.Item label={"QLD"} value={"QLD"}/>
                            <Picker.Item label={"SA"} value={"SA"}/>
                            <Picker.Item label={"TAS"} value={"TAS"}/>
                            <Picker.Item label={"VIC"} value={"VIC"}/>
                            <Picker.Item label={"WA"} value={"WA"}/>
                        </Picker>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("state"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>Password</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("password"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="Password" value={this.state.password}
                               secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("password"))}
                    <Text style={[appStyles.colorPrimary, appStyles.boldFont, appStyles.upperCase]}>Confirm
                        Password</Text>
                    <FormItem
                        style={[appStyles.loginInput, helper.error.getErrorStyle(errors.get("confirm_password"))]}
                        regular>
                        <Input style={[appStyles.baseFont]} placeholder="Confirm Password"
                               value={this.state.confirm_password} secureTextEntry={true}
                               onChangeText={(text) => this.setState({confirm_password: text})}/>
                    </FormItem>
                    {helper.error.showErrorMessage(errors.get("confirm_password"))}
                    <View style={styles.registerButton}>
                        <Button full style={appStyles.button} onPress={() => this.formSubmit()}>
                            <Text style={[appStyles.btnTxt, appStyles.customFont]}>Register</Text>
                        </Button>
                    </View>
                </Form>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (data, photo) => {
            return dispatch(actions.user.register(data, photo));
        },
        flushError: () => {
            return dispatch(actions.error.removeErrors());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        app: state.get("app"),
        error: state.get("error")
    };
};


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Register));
