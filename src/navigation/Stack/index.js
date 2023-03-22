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
        <Stack.Screen name="TabScreens" component={TabScreens} />
        <Stack.Screen name="HotelDetail" component={HotelDetail} />
        <Stack.Screen name="HotelRoomDetail" component={HotelRoomDetail} />
        <Stack.Screen name="CarRentalDetail" component={CarRentalDetail} />
        <Stack.Screen name="TourGuideDetail" component={TourGuideDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation