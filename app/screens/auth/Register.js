import * as React from 'react';
import {View} from "react-native";

import {Button, Text, Form, Item as FormItem, Input, Content, Icon} from "native-base";

//Expo Packages
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//React State
import {connect} from 'react-redux';
import {actions} from '../../store';

//Custom Components/
import AppBackground from '../../components/AppBackground';
import SubHeader from '../../components/Headers/SubHeader';
import LoginHeader from '../../components/Headers/LoginHeader';
import ErrorHeader from '../../components/Headers/ErrorHeader';

//React Helper
import {helper} from '../../helpers'

//Styles
import {styles} from './styles';
import {appStyles} from "../assets/app_styles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

class Register extends React.Component {
    static navigationOptions = {
        // header: null,
        title: 'Concrete ASAP',
        headerStyle: {
            backgroundColor: '#f4511e',
        }
    };

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
    }

    componentDidMount() {
        this.setState({"page_title": this.props.navigation.getParam("title")});
        this.setState({"roles": this.props.navigation.getParam("roles")})
        this.getPermissionAsync();
    }

    componentWillUnmount() {
        this.props.flushError();
    }


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    async uploadLogo() {
        // console.log("ok");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            if (result.type !== "image") {
                alert("Please Select the valid type of file");
            }
        }
        this.setState({'photo': result});
        this.setState({'logoText': "Logo been selected"});
        // this.photo=
    }

    formSubmit() {
        let data = {};
        data["company"] = this.state.company;
        data["browse"] = this.state.browse;
        data["title"] = this.state.title;
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
        let app = this.props.app.toJS();
        let error = this.props.error.toJS();
        return (
            <AppBackground loading={app.loading} enableKeyBoard>
                <Content>
                    <LoginHeader/>
                    <SubHeader iconType="FontAwesome" iconName="user" title={this.state.page_title}/>
                    <ErrorHeader error={error}/>
                    <Form style={[appStyles.loginForm]}>
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["company"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="Company" value={this.state.company}
                                   onChangeText={(text) => this.setState({company: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["company"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["abn"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="ABN" value={this.state.abn}
                                   onChangeText={(text) => this.setState({abn: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["abn"])}
                        <Button
                            style={[appStyles.baseFont, appStyles.bgWhite, appStyles.borderRadiusDefault, appStyles.marginDefault]}
                            onPress={this.uploadLogo}>
                            <Text style={[appStyles.baseFont, appStyles.colorGray44]}>{this.state.logoText}</Text>
                            <Icon active style={[appStyles.colorGray44]} type="FontAwesome5" name='upload'/>
                        </Button>
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["title"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="Title" value={this.state.title}
                                   onChangeText={(text) => this.setState({title: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["title"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["first_name"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="First Name" value={this.state.first_name}
                                   onChangeText={(text) => this.setState({first_name: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["first_name"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["last_name"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="Last Name" value={this.state.last_name}
                                   onChangeText={(text) => this.setState({last_name: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["last_name"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["email"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="Email" value={this.state.email}
                                   onChangeText={(text) => this.setState({email: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["email"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["phone"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="Phone" value={this.state.phone}
                                   onChangeText={(text) => this.setState({phone: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["phone"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["city"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="City" value={this.state.city}
                                   onChangeText={(text) => this.setState({city: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["city"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["state"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="State" value={this.state.state}
                                   onChangeText={(text) => this.setState({state: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["state"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["password"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="Password" value={this.state.password}
                                   secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["password"])}
                        <FormItem
                            style={[appStyles.loginInput, helper.error.getErrorStyle(error.errors["confirm_password"])]}
                            regular>
                            <Input style={[appStyles.baseFont]} placeholder="Confirm Password"
                                   value={this.state.confirm_password} secureTextEntry={true}
                                   onChangeText={(text) => this.setState({confirm_password: text})}/>
                        </FormItem>
                        {helper.error.showErrorMessage(error.errors["confirm_password"])}
                        <View style={styles.registerButton}>
                            <Button full style={appStyles.button} onPress={() => this.formSubmit()}>
                                <Text style={[appStyles.btnTxt, appStyles.baseFont]}>Register</Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(Register);
