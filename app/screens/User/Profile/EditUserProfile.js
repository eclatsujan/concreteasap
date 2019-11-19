import * as React from 'react';
import {ScrollView} from 'react-native';
import {View, Content} from 'native-base';

import {reduxForm, Field} from "redux-form/lib/immutable";
import {connect} from "react-redux";

import {styles} from '../../contractor/styles.js';

import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";
import csTextBox from "../../../components/Forms/csTextBox";
import {formValidation} from "../../../helpers/validation";
import {actions, user} from "../../../store/modules";
import UserProfileForm from './UserProfileForm'


class EditUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.submitAccount = this.submitAccount.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
    }

    submitAccount(values) {
        let user_detail = values.toJS();
        let profile_image=user_detail["profile_image"];
        delete user_detail["profile_image"];
        this.props.editUserDetail(user_detail,profile_image);
        // console.log(user_detail);
    }

    cancelButton() {
        this.props.navigation.goBack();
    }

    render() {
        let user = this.props.user.toJS();
        let app = this.props.app.toJS();
        user["detail"]["email"] = user["email"];
        return (
            <AppBackground loading={app.loading} enableKeyBoard>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="User Profile" iconType="ConcreteASAP" iconName="user"/>
                    <Content contentContainerStyle={styles.content}>
                        <View>
                            <UserProfileForm initialValues={user["detail"]} cancelHandler={this.cancelButton}
                                             accountSubmit={this.submitAccount}/>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

let editUserProfile = reduxForm({form: "editUserProfile"})(EditUserProfile);

const mapDispatchToProps = (dispatch) => {
    return {
        editUserDetail: (user_detail,photo) => {
            return dispatch(actions.user.editUserDetail(user_detail,photo))
        },
    }
};

export default connect(state => {
    return {
        user: state.get("user"),
        app: state.get("app")
    }
}, mapDispatchToProps)(editUserProfile);