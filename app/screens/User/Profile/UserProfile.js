import * as React from 'react';
import {ScrollView,Image} from 'react-native';
import {Col, Row, View, Button, Text, Content} from 'native-base';

import {connect} from "react-redux";
import {withNavigation} from "react-navigation";

import {styles} from '../../contractor/styles.js';
import {appStyles} from "../../../../assets/styles/app_styles";

import AppBackground from "../../../components/AppBackground";
import AppHeader from "../../../components/Headers/AppHeader";
import SubHeader from "../../../components/Headers/SubHeader";

import csTextBox from "../../../components/Forms/csTextBox";
import {formValidation} from "../../../helpers/validation";

import {actions} from "../../../store/modules";
import {getNested} from "../../../helpers/app";


class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rowColumns: [
                {key: "company", title: "Company"}, {key: "abn", title: "ABN"},
                {key: "first_name", title: "First Name"}, {key: "last_name", title: "Last Name"},
                {key: "phone_number", title: "Phone Number"}, {key: "email", title: "email"},
                {key: "city", title: "City"},{key: "state", title: "State"}
            ],
            loading: false,
            showToastMsg: false
        };

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getUserProfile();
        });

        this.editProfile = this.editProfile.bind(this);
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    displayUserRow(detail) {
        return !this.state.rowColumns ? null : this.state.rowColumns.map((column, index) => (
            <View key={index}
                  style={[appStyles.py_10,appStyles.borderBottom, appStyles.borderGray44]}>
                <Row>
                    <Col>
                        <Text style={[appStyles.upperCase, appStyles.colorGray44,appStyles.boldFont]}>
                            {column["title"]}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={appStyles.arialFont}>{getNested(detail, column.key)}</Text>
                    </Col>
                </Row>
            </View>
        ));
    }

    editProfile() {
        this.props.navigation.navigate("Edit User Profile");
    }

    displayProfileImage(image) {
        return typeof image === undefined ? <View/>:
            <View style={[appStyles.flexRow, appStyles.flexCenter]}>
                <Image style={appStyles.defaultCircle} source={{uri: image}}/>
            </View>;
    }

    render() {
        let app = this.props.app.toJS();
        let user = this.props.user.toJS();
        user["detail"]["email"] = user["email"];

        let message = this.props.navigation.getParam("message");
        let message_type = this.props.navigation.getParam("message_type");
        return (
            <AppBackground loading={app.loading} toastMsg={message} toastType={message_type}
                           showToast={this.state.showToastMsg}>
                <ScrollView>
                    <AppHeader/>
                    <SubHeader title="User Profile" iconType="ConcreteASAP" iconName="user"/>
                    <Content contentContainerStyle={styles.content}>
                        <View style={[appStyles.bgWhite, appStyles.p_20]}>
                            {this.displayProfileImage(user["detail"]["profile_image"])}
                            {this.displayUserRow(user["detail"])}
                        </View>
                        <View style={[appStyles.my_10, appStyles.rowReverse, appStyles.flex1]}>
                            <View style={[appStyles.w_50]}>
                                <Button primary onPress={this.editProfile}
                                        style={[appStyles.flexRow, appStyles.flexCenter]}>
                                    <Text style={[appStyles.colorBlack]}>Edit Profile</Text>
                                </Button>
                            </View>
                        </View>
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.get("user"),
        app: state.get("app")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => {
            return dispatch(actions.user.getUserProfile())
        },
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(UserProfile));