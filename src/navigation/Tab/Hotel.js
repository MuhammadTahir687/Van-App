import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HotelProfile from '../../screens/Hotel/HotelProfile';
import HotelBookings from '../../screens/Hotel/HotelBookings';
import HotelPreviousBusiness from '../../screens/Hotel/HotelPreviousBusiness';
import HotelRooms from '../../screens/Hotel/HotelRooms';

const Tab = createBottomTabNavigator();

const HotelTabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'HotelRooms') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'HotelBookings') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'HotelPreviousBusiness') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'Profile') { iconName = focused ? 'person-circle' : 'person-circle-outline' }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            <Tab.Screen name="HotelBookings" options={{ tabBarLabel: "Bookings" }} component={HotelBookings} />
            <Tab.Screen name="HotelRooms" options={{ tabBarLabel: "Hotel Rooms" }} component={HotelRooms} />
            <Tab.Screen name="HotelPreviousBusiness" options={{ tabBarLabel: "Business" }} component={HotelPreviousBusiness} />
            <Tab.Screen name="Profile" component={HotelProfile} />
        </Tab.Navigator>
    )
}
export default HotelTabScreens