import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Profile from '../../screens/Profile/Profile';
import TaxiDriverBookings from '../../screens/Taxi/TaxiDriverBookings';
import TaxiPreviousBusiness from '../../screens/Taxi/TaxiPreviousBusiness';
import TaxiDriverCommision from '../../screens/Taxi/TaxiDriverCommision';
import TaxiDriverProfile from '../../screens/Taxi/TaxiDriverProfile';

const Tab = createBottomTabNavigator();

const TaxiDriverTabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'TaxiDriverBookings') { iconName = focused ? 'car-sport' : 'car-sport-outline' }
                    if (route.name === 'TaxiPreviousBusiness') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'TaxiDriverCommision') { iconName = focused ? 'cash' : 'cash-outline' }
                    if (route.name === 'Profile') { iconName = focused ? 'person-circle' : 'person-circle-outline' }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            <Tab.Screen name="TaxiDriverBookings" options={{ tabBarLabel: "Taxi Bookings" }} component={TaxiDriverBookings} />
            <Tab.Screen name="TaxiPreviousBusiness" options={{ tabBarLabel: "Business" }} component={TaxiPreviousBusiness} />
            {/* <Tab.Screen name="TaxiDriverCommision" options={{ tabBarLabel: "Commision Payable" }} component={TaxiDriverCommision} /> */}
            <Tab.Screen name="Profile" options={{ tabBarStyle: { display: "none" } }} component={TaxiDriverProfile} />
        </Tab.Navigator>
    )
}
export default TaxiDriverTabScreens