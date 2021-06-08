import axios from 'axios'
import React, { Component } from 'react'
import { Alert, FlatList, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { getImage } from './item'

export class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            url: "http://yog1.ddns.net:5000/all"
        }
    }

    componentDidMount() {
        this.getPlanet()
    }
    getPlanet() {
        const { url } = this.state
        console.log("Getting data from ", url);
        axios.get(url).then((r) => {
            // console.log(r.data[0])
            this.setState({ allData: r.data })
            // console.log(this.state)
        }).catch((e) => {
            Alert.alert("error", e.message)
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: StatusBar.currentHeight || 0,
            }}>
                <FlatList data={this.state.allData}
                    renderItem={({ item }) => (
                        <ListItem bottomDivider onPress={() => {
                            // console.log("Button Pressed");
                            this.props.navigation.navigate("PlanetItem", item);
                        }}>
                            <Avatar source={getImage(item.planet_type)} />
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.planet_type} | Orbital Period : {item.orbital_period} days</ListItem.Subtitle>
                        </ListItem>
                    )}

                    keyExtractor={(i, k) => k + "no error"}
                />
            </View>
        )
    }
}