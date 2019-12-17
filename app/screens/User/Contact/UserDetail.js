import * as React from 'react';
import {ScrollView} from "react-native";
import {Content} from 'native-base';
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import AppBackground from "../../../components/AppBackground";
import {UserContactDetail} from "../../../components/User/UserContactDetail";

export default class UserDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {title: "ABN", key: "abn"}, {title: "Company", key: "company"},
                {title: "Email", key: "email"}, {title: "First Name", key: "first_name"},
                {title: "Last Name", key: "last_name"}, {title: "Phone Number", key: "phone_number"},
            ]
        };
    }

    formatUser() {
        let user;
        let user_detail = this.props.navigation.getParam("user");
        user = user_detail.get("detail");
        user["email"] = user_detail.get("email");
        return user;
    }

    render() {
        let user = this.formatUser();
        return (
            <AppBackground>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="Contact" iconType="ConcreteASAP" iconName="user"/>
                    <Content>
                        <UserContactDetail userProfile={user?.get("profile_image")} row={user}
                                           rowColumns={this.state.rowColumns}/>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }

}