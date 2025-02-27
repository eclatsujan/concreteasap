import React, { Component } from 'react';
import {View, Image, Text} from 'react-native';

export default class StarRating extends Component {

    constructor(props){
        super(props);
    }

    render() {
        // Recieve the ratings object from the props
        let ratingObj = this.props["ratingObj"];

        // This array will contain our star tags. We will include this
        // array between the view tag.
        let stars = [];
        // Loop 5 times
        for (let i = 1; i <= 5; i++) {
            // set the path to filled stars
            let path = require('./star-filled.png');
            // If ratings is lower, set the path to unfilled stars
            if (i > ratingObj.ratings) {
                path = require('./star-unfilled.png');
            }

            stars.push((<Image style={styles.image} source={path} />));
        }

        return (
            <View style={ styles.container }>
                { stars }
                <Text style={styles.text}>({ratingObj.views})</Text>
                }
            </View>
        );
    }
}