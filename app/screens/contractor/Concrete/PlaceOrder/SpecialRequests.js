import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content} from 'native-base';
//Redux
import {connect} from "react-redux";

// Custom Component
import AppBackground from '../../../../components/App/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../../../../assets/styles/app_styles";
import reoSpecialForm from "../../../../components/contractor/Concrete/Order/SpecialOrderForm";
import AppFooter from "../../../../components/App/Footer/AppFooter";

class SpecialRequests extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(special) {
        const {params} = this.props.navigation.state;
        const order = params ? params.order : null;

        let order_type=this.props.navigation.getParam("order_type")?this.props.navigation.getParam("order_type"):"accepted_orders";

        if(params.order_id){
            this.props.navigation.navigate("ModifyReviewOrder", {
                order,
                special,
                "order_id":params.order_id,
                order_type
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
                    <AppHeader/>
                    <SubHeader iconName="clipboard" title="Special Requests"/>
                    <Content>
                        <reoSpecialForm onSubmit={this.handleSubmit} initialValues={order} />
                    </Content>
                </ScrollView>
            </AppBackground>
        );
    }
}

// let orderSpecialRequests = reduxForm({formValues: "specialRequests"})(SpecialRequests);


export default connect(null,null)(SpecialRequests);
