import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Catalog } from "../screens/catalog";
import PlanetItem from "../screens/item";

const screens = {
    PlanetItem:{
        screen:PlanetItem
    },
    Catalog:{
        screen:Catalog,
    
    },
}
const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)