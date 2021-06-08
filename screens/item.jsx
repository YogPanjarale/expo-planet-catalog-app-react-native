import React, { Component } from 'react'
import { Text, View, Alert, Image } from 'react-native'
import axios from 'axios';
import { Card } from 'react-native-elements';

function getImage(planettype) {
    let planet_type = '';
    switch (planettype) {
        case 'Super Earth':
            planet_type = 'super_earth'
            return require(`../assets/planets/super_earth.png`)
            break;
        case 'Gas Giant':
            planet_type = 'gas_giant'
            return require(`../assets/planets/gas_giant.png`)
            break;
        case 'Neptune Like':
            planet_type = 'neptune_like'
            return require(`../assets/planets/neptune_like.png`)
            break;
        case 'Terrestrial':
            planet_type = 'terrestrial'
            return require(`../assets/planets/terrestrial.png`)
            break;
        default:
            return null
            break;
    }
    // try {
    //     return require(`../assets/planets/'+${planet_type}.png`)
    // } catch (error) {
    //     return null
    // }
}
class PlanetItem extends Component {
    constructor() {
        super()
        this.state = {
            planetName: "GJ 667 C g",
            data: null,
            url: 'http://yog1.ddns.net:5000/planet',
            dataAvailable: false,
        }
    }
    componentDidMount() {
        this.getPlanet(this.state.planetName)
    }

    getPlanet(planetname) {
        const { url } = this.state
        axios.get(url, { params: { 'name': planetname } }).then((r) => {
            // console.log("Getting data from ", r./);
            if (r.data == "Planet Not Found") {
                throw Error("Planet Not Found")
            }
            // console.log(r.data[0])
            this.setState({ data: r.data[0], dataAvailable: true })
            // console.log(this.state)
        }).catch((e) => {
            Alert.alert("error", e.message)
        })
    }
    componentWillUnmount() {
        axios.Cancel()
    }
    render() {
        if (this.state.dataAvailable) {
            const { gravity, mass, radius, name, planet_type, in_goldilocks_zone } = this.state.data
            return (
                <View>
                    <Card>
                        <Card.Image source={getImage(planet_type)} style={{
                            alignSelf: 'center',
                            height: 500,
                            borderRadius: 50,
                        }} resizeMode='cover' accessibilityHint={"Planet Type :" + planet_type} />
                        <Card.Divider />
                        <Card.Title h4>
                            {name}{in_goldilocks_zone ? "🌟" : ""}
                        </Card.Title>
                        <Text>
                            {planet_type}
                        </Text>
                        <Text>
                            Mass : {mass} times of Earth
                        </Text>
                        <Text>
                            Radius : {radius} times of Earth
                        </Text>
                        <Text>
                            Gravity : {gravity.toFixed(3)} g
                        </Text>

                    </Card>
                </View>
            )
        }
        return (
            <View>
                <Text> Item Screen </Text>
            </View>
        )
    }
}

export default PlanetItem
