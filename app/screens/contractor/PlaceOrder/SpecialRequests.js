import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from 'native-base';
//Redux
import {connect} from "react-redux";

// Custom Component
import AppBackground from '../../../components/AppBackground'
import AppHeader from '../../../components/Headers/AppHeader'
import SubHeader from '../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../../../assets/styles/app_styles";
import SpecialOrderForm from "../../../components/contractor/SpecialOrderForm";

class SpecialRequests extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(special) {
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;
        if(params.order_id){
            this.props.navigation.navigate("ModifyReviewOrder", {
                order,
                special,
                "order_id":params.order_id
            });
        }
        else{
            this.props.navigation.navigate("ReviewOrder", {
                order,
                special
            });
        }
    }


    render() {
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;
            /* 2. Read the params from the navigation state */
        return (
            <AppBackground enableKeyBoard>
                <ScrollView style={appStyles.pb_45} keyboardShouldPersistTaps={"always"}>
                    <AppHeader backMenu/>
                    <SubHeader iconName="clipboard" title="Special Requests"/>
                    <Content>
                        <SpecialOrderForm onSubmit={this.handleSubmit} initialValues={order} />
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

// let orderSpecialRequests = reduxForm({form: "specialRequests"})(SpecialRequests);


export default connect(null,null)(SpecialRequests);
