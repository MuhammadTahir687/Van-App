import { View, Textß } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import TouristTaxiBooking from '../../screens/Taxi/TouristTaxiBooking';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TouristHotelReservation from '../../screens/Hotel/TouristHotelReservation';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Taxi') { iconName = focused ? 'car-sport' : 'car-sport-outline' }
                    if (route.name === 'TouristHotelReservation') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            <Tab.Screen name="Taxi" component={TouristTaxiBooking} />
            <Tab.Screen name="TouristHotelReservation" options={{ tabBarLabel: "Hotel" }} component={TouristHotelReservation} />
        </Tab.Navigator>
    )
}
export default TabScreens