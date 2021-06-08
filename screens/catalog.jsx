import axios from 'axios'
import React, { Component } from 'react'
import { Alert, FlatList, View, Text, StatusBar, TouchableOpacity } from 'react-native'

export class Catalog extends Component {
    constructor() {
        super()
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
    Item({ item }) {
        // const data=
        // console.log(item)

        return (
        <View style={{
            backgroundColor: '#feefee',
            minWidth: StatusBar.currentHeight / 2,
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        }}>
            <TouchableOpacity>
                <Text style={{fontWeight:'500',fontSize:24}}>{item.name}</Text>
                <Text style={{fontWeight:'normal'}}>{item.name}</Text>
            </TouchableOpacity>
        </View>
        )
    }
    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: StatusBar.currentHeight || 0,
            }}>
                <FlatList data={this.state.allData} renderItem={this.Item} keyExtractor={(item, index) => { return index + "no error" }}>

                </FlatList>
            </View>
        )
    }
}