import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CarRentalBookings from '../../screens/Car Rental/CarRentalBookings';
import CarRentalFleets from '../../screens/Car Rental/CarRentalFleets';
import CarRentalPreviousBusiness from '../../screens/Car Rental/CarRentalPrevoiusBusiness';
import CarRentalProfile from '../../screens/Car Rental/CarRentalProfile';
import TourGuideBookings from '../../screens/TourGuide/TourGuideBookings';
import TourGuideBusiness from '../../screens/TourGuide/TourGuideBusiness';
import TourGuideProfile from '../../screens/TourGuide/TourGuideProfile';
import TourGuidePlans from '../../screens/TourGuide/TourGuidePlans';

const Tab = createBottomTabNavigator();

const TourGuideTabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'TourGuidePlans') { iconName = focused ? 'ios-body' : 'ios-body-outline' }
                    if (route.name === 'TourGuideBookings') { iconName = focused ? 'bookmarks' : 'bookmarks-outline' }
                    if (route.name === 'TourGuideBusiness') { iconName = focused ? 'cash' : 'cash-outline' }
                    if (route.name === 'Profile') { iconName = focused ? 'person-circle' : 'person-circle-outline' }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: Colors.PrimaryColor,
                tabBarInactiveTintColor: '#797777',
                tabBarStyle: { paddingBottom: 5 },
                tabBarHideOnKeyboard: true
            })}>
            <Tab.Screen name="TourGuideBookings" options={{ tabBarLabel: "Bookings" }} component={TourGuideBookings} />
            <Tab.Screen name="TourGuidePlans" options={{ tabBarLabel: "Trip Plans" }} component={TourGuidePlans} />
            <Tab.Screen name="TourGuideBusiness" options={{ tabBarLabel: "Business" }} component={TourGuideBusiness} />
            <Tab.Screen name="Profile" component={TourGuideProfile} />
        </Tab.Navigator>
    )
}
export default TourGuideTabScreens