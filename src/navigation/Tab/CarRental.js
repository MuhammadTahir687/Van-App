import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CarRentalBookings from '../../screens/Car Rental/CarRentalBookings';
import CarRentalFleets from '../../screens/Car Rental/CarRentalFleets';
import CarRentalPreviousBusiness from '../../screens/Car Rental/CarRentalPrevoiusBusiness';
import CarRentalProfile from '../../screens/Car Rental/CarRentalProfile';

const Tab = createBottomTabNavigator();

const CarRentalTabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'CarRentalFleets') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'CarRentalBookings') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'CarRentalPreviousBusiness') { iconName = focused ? 'ios-business' : 'ios-business-outline' }
                    if (route.name === 'Profile') { iconName = focused ? 'person-circle' : 'person-circle-outline' }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            <Tab.Screen name="CarRentalBookings" options={{ tabBarLabel: "Bookings" }} component={CarRentalBookings} />
            <Tab.Screen name="CarRentalFleets" options={{ tabBarLabel: "Car Fleets" }} component={CarRentalFleets} />
            <Tab.Screen name="CarRentalPreviousBusiness" options={{ tabBarLabel: "Business" }} component={CarRentalPreviousBusiness} />
            <Tab.Screen name="Profile" component={CarRentalProfile} />
        </Tab.Navigator>
    )
}
export default CarRentalTabScreens