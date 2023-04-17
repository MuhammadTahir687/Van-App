import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Profile from '../../screens/Profile/Profile';
import TaxiDriverBookings from '../../screens/Taxi/TaxiDriverBookings';
import TaxiPreviousBusiness from '../../screens/Taxi/TaxiPreviousBusiness';
import TaxiDriverCommision from '../../screens/Taxi/TaxiDriverCommision';
import TaxiDriverProfile from '../../screens/Taxi/TaxiDriverProfile';
import HotelRooms from '../../screens/Hotel/HotelRooms';
import HotelProfile from '../../screens/Hotel/HotelProfile';

const Tab = createBottomTabNavigator();

const HotelTabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'HotelRooms') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'Profile') { iconName = focused ? 'person-circle' : 'person-circle-outline' }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            <Tab.Screen name="HotelRooms" options={{ tabBarLabel: "Hotel Rooms" }} component={HotelRooms} />
            <Tab.Screen name="Profile" component={HotelProfile} />
        </Tab.Navigator>
    )
}
export default HotelTabScreens