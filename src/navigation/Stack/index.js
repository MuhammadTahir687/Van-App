import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "../../screens/Splash/SplashScreen";
import PersonelAccount from "../../screens/Login/PersonelAccount";
import BusinessAccount from "../../screens/Login/BusinessAccount";
import Auth from "../../screens/Login/Auth";
import PersonelAccountSignup from "../../screens/SignUp/PersonelAccount";
import BusinessAccountSignup from "../../screens/SignUp/BusinessAccount";
import TabScreens from "../Tab";
import HotelDetail from "../../screens/Hotel/HotelDetail";
import CarRentalDetail from "../../screens/Car Rental/CarRentalDetail";
import TourGuideDetail from "../../screens/TourGuide/TourGuideDetail";
import HotelRoomDetail from "../../screens/Hotel/HotelRoomDetail";
import TourPlacesDetail from "../../screens/TourGuide/TourPlacesDetail";
import CarFleetDetail from "../../screens/Car Rental/CarFleetDetail";
import TaxiDriverTabScreens from "../Tab/TaxiDriver";
import EditTouristProfile from "../../screens/Profile/EditTouristProfile";
import EditTaxiDriverProfile from "../../screens/Profile/EditTaxiDriverProfile";
import HotelTabScreens from "../Tab/Hotel";
import EditHotelManagerProfile from "../../screens/Profile/EditHotelManagerProfile";
import AddHotelRooms from "../../screens/Hotel/AddHotelRooms";
import TaxiSignup from "../../screens/SignUp/TaxiSignup";
import HotelSignup from "../../screens/SignUp/HotelSignup";
import CarRentalSignup from "../../screens/SignUp/CarRentalSignup";
import CarRentalTabScreens from "../Tab/CarRental";
import AddCarRentalFleet from "../../screens/Car Rental/AddCarRentalFleet";
import EditCarRentalProfile from "../../screens/Profile/EditCarRentalProfile";
import BusinessAdvertiser from "../../screens/SignUp/BusinessAdvertiser";
import TourGuideSignup from "../../screens/SignUp/TourGuideSignup";
import EditTourGuideProfile from "../../screens/Profile/EditTourGuideProfile";
import TourGuideTabScreens from "../Tab/TourGuide";
import AddTripPlans from "../../screens/TourGuide/AddTripPlans";
import { AdvertiserServices } from "../../services/advertiserServices";
import EditBAProfile from "../../screens/Profile/EditBAProfile";
import AdvertiserTabScreens from "../Tab/AdvertiserTab";
import BAProfile from "../../screens/BusinessAdvertiser/BAProfile";
import TouristTaxiBookingDetail from "../../screens/Taxi/TouristTaxiBookingDetail";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="PersonelAccount" component={PersonelAccount} />
        <Stack.Screen name="BusinessAccount" component={BusinessAccount} />
        <Stack.Screen name="PersonelAccountSignup" component={PersonelAccountSignup} />
        <Stack.Screen name="BusinessAccountSignup" component={BusinessAccountSignup} />
        <Stack.Screen name="TaxiSignup" component={TaxiSignup} />
        <Stack.Screen name="HotelSignup" component={HotelSignup} />
        <Stack.Screen name="CarRentalSignup" component={CarRentalSignup} />
        <Stack.Screen name="TabScreens" component={TabScreens} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default StackNavigation
