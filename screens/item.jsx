import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class PlanetItem extends Component {
    constructor(){
        super()
        this.state={
            planetName:this.props.planetName,
            data:{},
            url:'http://yog1.ddns.net:5000/planet?name='+planetName
        }
    }
    render() {
        return (
            <View>
                <Text> Item Screen </Text>
            </View>
        )
    }
}

export default PlanetItem
