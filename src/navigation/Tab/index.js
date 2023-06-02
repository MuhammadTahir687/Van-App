import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import TouristTaxiBooking from '../../screens/Taxi/TouristTaxiBooking';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TouristHotelReservation from '../../screens/Hotel/TouristHotelReservation';
import TouristCarRental from '../../screens/Car Rental/TouristCarRental';
import TouristTourGuide from '../../screens/TourGuide/TouristTourGuide';
import Profile from '../../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Taxi') { iconName = focused ? 'car-sport' : 'car-sport-outline' }
                    if (route.name === 'Tour Guide') { iconName = focused ? 'ios-body' : 'ios-body-outline' }
                    if (route.name === 'TouristHotelReservation') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'TouristCarRental') { iconName = focused ? 'car-sport' : 'car-sport-outline' }
                    if (route.name === 'Profile') { iconName = focused ? 'person-circle' : 'person-circle-outline' }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            <Tab.Screen name="Taxi" component={TouristTaxiBooking} />
            <Tab.Screen name="Tour Guide" component={TouristTourGuide} />
            <Tab.Screen name="TouristHotelReservation" options={{ tabBarLabel: "Hotel" }} component={TouristHotelReservation} />
            <Tab.Screen name="TouristCarRental" options={{ tabBarLabel: "Car Rental" }} component={TouristCarRental} />
            <Tab.Screen name="Profile" options={{ tabBarStyle: { display: "none" } }} component={Profile} />
        </Tab.Navigator>
    )
}
export default TabScreens