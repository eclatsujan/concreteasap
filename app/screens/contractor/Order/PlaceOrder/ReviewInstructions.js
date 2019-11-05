import * as React from 'react';
import {ScrollView} from 'react-native';
import {Content, Button, Text, Textarea, Form} from 'native-base';

import {connect} from 'react-redux';
import {actions, States} from '../../../../store';

// Custom Component
import AppBackground from '../../../../components/AppBackground'
import AppHeader from '../../../../components/Headers/AppHeader'
import SubHeader from '../../../../components/Headers/SubHeader'

//StyleSheet
import {appStyles} from "../../../assets/app_styles";


class ReviewInstructions extends React.Component {
    constructor(props) {
        super(props);
    }

    submitForm(full_order) {
        this.props.submit(full_order);
    }

    render() {
        const {params} = this.props.navigation.state;
        const full_order = params ? params.full_order : null;
        let app = this.props.app.toJS();
        return (
            <AppBackground loading={app.loading}>
                <AppHeader backMenu/>
                <Content>
                    <ScrollView style={appStyles.pb_45}>
                        <SubHeader iconName="search" title="Review Instructions"/>

                        <Form>
                            <Text>Special Instructions</Text>
                            <Textarea style={appStyles.bgWhite} rowSpan={5} bordered
                                      placeholder={full_order.specialInstructions} disabled>
                                {full_order["specialInstructions"]}
                            </Textarea>
                            <Text>Delivery Instructions</Text>
                            <Textarea style={appStyles.bgWhite} rowSpan={5}
                                      bordered placeholder={full_order.deliveryInstructions} disabled>
                                {full_order["deliveryInstructions"]}
                            </Textarea>

                            <Button style={appStyles.bgWhite}
                                    style={[appStyles.button, appStyles.bgPrimary, appStyles.horizontalCenter]}
                                    onPress={() => this.submitForm(full_order)}>
                                <Text style={appStyles.colorBlack}>NEXT</Text>
                            </Button>
                        </Form>
                    </ScrollView>
                </Content>
            </AppBackground>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submit: (collection) => {
            return dispatch(actions.order.createOrder(collection))
        },
    }
};

const mapStateToProps = (state) => {
    // const {order, app} = state;
    return {
        order: state.get("order"),
        app: state.get("app")
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewInstructions);
