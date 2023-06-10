import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CarRentalBookings from '../../screens/Car Rental/CarRentalBookings';
import CarRentalFleets from '../../screens/Car Rental/CarRentalFleets';
import CarRentalPreviousBusiness from '../../screens/Car Rental/CarRentalPrevoiusBusiness';
import CarRentalProfile from '../../screens/Car Rental/CarRentalProfile';
import BAProfile from '../../screens/BusinessAdvertiser/BAProfile';
import BABusiness from '../../screens/BusinessAdvertiser/BABusiness';

const Tab = createBottomTabNavigator();

const AdvertiserTabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    // if (route.name === 'CarRentalFleets') { iconName = focused ? 'car-sport' : 'car-sport-outline' }
                    // if (route.name === 'CarRentalBookings') { iconName = focused ? 'bookmarks' : 'bookmarks-outline' }
                    if (route.name === 'BABusiness') { iconName = focused ? 'cash' : 'cash-outline' }
                    if (route.name === 'Profile') { iconName = focused ? 'person-circle' : 'person-circle-outline' }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            {/* <Tab.Screen name="CarRentalBookings" options={{ tabBarLabel: "Bookings" }} component={CarRentalBookings} />
            <Tab.Screen name="CarRentalFleets" options={{ tabBarLabel: "Car Fleets" }} component={CarRentalFleets} /> */}
            <Tab.Screen name="BABusiness" options={{ tabBarLabel: "Business" }} component={BABusiness} />
            <Tab.Screen name="Profile" component={BAProfile} />
        </Tab.Navigator>
    )
}
export default AdvertiserTabScreens