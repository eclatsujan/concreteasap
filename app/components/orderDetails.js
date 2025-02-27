import React from "react";
import {Text, Col, Grid} from "native-base";

import {appStyles} from "../../assets/styles/app_styles";

export default class orderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                "Post Code",
                "MPA",
                "AGG",
                "Slump",
                "Additives",
                "Placement Type",
                "Quantity",
                "Time",
                "Date",
                "Urgency",
                "On Site / Call"
            ],
        }
    }

    renderHeader() {
        return this.state.header.map((header) => {
            return (<Text>{header}</Text>)
        });
    }

    render() {
        return (
            <Grid>
                <Col style={{marginLeft: 15, marginTop: 15}}>
                    {this.renderHeader()}
                </Col>
                <Col style={{marginTop: 15}}>
                    <Text>Post Code</Text>
                    <Text>Type</Text>
                    <Text>MPA</Text>
                    <Text>AGG</Text>
                    <Text>Slump</Text>
                    <Text>ACC</Text>
                    <Text>Placement Type</Text>
                    <Text>Quantity</Text>
                    <Text>Time</Text>
                    <Text>Date</Text>
                    <Text>Urgency</Text>
                    <Text>On Site / Call</Text>
                </Col>
            </Grid>
        );
    }
}