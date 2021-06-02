import React, { Component } from 'react'

class PlanetItem extends Component{
    constructor(planetName){
        super()
        this.state={
            planetName:planetName,
            data:{},
            url:'http://yog1.ddns.net:5000/planet?name='+planetName
        }
    }
    // get
}