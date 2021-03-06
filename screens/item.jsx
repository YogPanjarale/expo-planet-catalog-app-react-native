import React, { Component } from 'react'
import { Text, View, Alert, Image } from 'react-native'
import axios from 'axios';
import { Card } from 'react-native-elements';

export function getImage(planettype) {
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
    constructor(props) {
        super(props)
        // console.log(this)
        const name = this.props.navigation.getParam('name')
        this.state = {
            planetName: name,
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
            const { gravity, mass, radius, name, planet_type, in_goldilocks_zone,orbital_period ,orbital_radius,speed} = this.state.data
            const dummnyData={
                "gravity": 39.27859895089982,
                "in_goldilocks_zone": true,
                "mass": "4",
                "name": "GJ 667 C g",
                "orbital_period": 256.2,
                "orbital_radius": 0.549,
                "planet_type": "Super Earth",
                "radius": "1",
                "speed": 23.312612151638543
                }
            return (
                <View>
                    <Card>
                        <Card.Image source={getImage(planet_type)} style={{
                            alignSelf: 'center',
                            height: 500,
                            borderRadius: 50,
                        }} resizeMode='cover' accessibilityHint={"Planet Type :" + planet_type} />
                        <Card.Title h4>
                            {name}{in_goldilocks_zone ? "????" : ""}
                        </Card.Title>
                        <Card.Divider />
                        <Text>
                        {in_goldilocks_zone ? "In Goldilocks Zone" : ""}
                        </Text>
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
                        <Text>
                        Orbital Period : {orbital_period} days
                        </Text>
                        <Text>
                        Orbital Radius : {orbital_radius} times of Earth
                        </Text>
                        <Text>
                            Speed : {speed.toFixed(3)}
                            </Text>
                    
                    </Card>
                </View>
            )
        }
        return (
            <View>
            <Card><Card.Title>Planet Not Found</Card.Title></Card>
            </View>
        )
    }
}

export default PlanetItem
