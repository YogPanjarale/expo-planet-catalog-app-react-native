import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Catalog } from "../screens/catalog";
import { PlanetItem } from "../screens/item";

const screens = {
    Catalog:{
        screen:Catalog,
    
    },
    PlanetItem:{
        screen:PlanetItem
    }
}
const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)