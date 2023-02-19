// @refresh reset
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import { auth } from './Firebase/firebase';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './screens/Settings/Settings';
import {
  BirthdaySettings,
  Chatroom,
  EmailSettings,
  GPASetttings,
  GraduationYearSettings,
  NameSettings,
  PasswordSettings,
  Profile,
  SchoolSettings,
  SignUpBirthday,
  SignUpName,
  SignUpSchool,
  SignUpAvatar
} from './screens';
import DeskPrivacy from './screens/Settings/DeskPrivacy';
import AchievementsScreen from './screens/Achievements';
import NewChat from './screens/NewChat';
import DeskItem from './screens/DeskItem';
import DeskItems from './screens/DeskItems';
import SelectDeskItem from './screens/SelectDeskItem';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Feed from './screens/Feed';
import AddDeskItem from './screens/AddDeskItem';
import SaveDeskItem from './screens/SaveDeskItem';
import Suggested from './screens/Suggested';
import SearchSelect from './screens/SearchSelect';
import StartScreen from './screens/StartScreen';
import Login from './screens/Login';
import Desk from './screens/Desk';
import { Colors } from './constants';
import ClassSchoolProfile from './screens/ClassSchoolProfile';
import Search from './screens/Search';
import Friends from './screens/Friends';
import SignUpEmail from './screens/SignUp/SignUpEmail';
import SignUpUsername from './screens/SignUp/SignUpUsername';
import SignUpPassword from './screens/SignUp/SignUpPassword';
import NewBurningQuestion from './screens/NewBurningQuestion';

const store = createStore(rootReducer, applyMiddleware(thunk))
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [loading, setLoading] = useState(true)
  const [fontsLoaded] = useFonts({
    Kanit: require('./assets/fonts/Kanit-Regular.ttf'),
    KanitBold: require('./assets/fonts/Kanit-Bold.ttf'),
    KanitMedium: require('./assets/fonts/Kanit-Medium.ttf'),
    KanitSemiBold: require('./assets/fonts/Kanit-SemiBold.ttf'),
    KanitLight: require('./assets/fonts/Kanit-Light.ttf'),
    KanitExtraLight: require('./assets/fonts/Kanit-ExtraLight.ttf'),


  });

  useEffect(() => {


    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false)
        setIsLoggedIn(true)

      }
      else {
        setIsLoggedIn(false)
        setLoading(false)
      }
    })


  }, [])








  function Classroom({ route }) {
    return (
      <Drawer.Navigator
        initialRouteName='Chatroom'
        drawerStyle={{
          backgroundColor: '#333',
          width: '100%',
        }}
        drawerPosition={'right'} drawerType={'back'}
        drawerContent={() => {
          return (
            <Feed route={route} />)
        }}>
        <Drawer.Screen name='Feed' children={() => { return <Feed route={route} /> }} />
        <Drawer.Screen name='Chatroom' children={() => { return <Chatroom route={route} /> }} />


      </Drawer.Navigator>)
  }


  if (!fontsLoaded || loading) {

    return (
      <View style={{ backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={Colors.white} />
      </View>
    )

  }


  if (!isLoggedIn) {
    return (

      <SafeAreaProvider >
        <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

        <Provider store={store}>


          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='StartScreen'
              screenOptions={{
                headerShown: false,
                animationDuration: 200,


              }} >

              <Stack.Group

                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SearchSelect" component={SearchSelect}
                  options={{
                    gestureDirection: "vertical",
                    presentation: 'modal'

                  }} />
                <Stack.Screen
                  name="StartScreen"
                  component={StartScreen} />

                <Stack.Screen
                  name="SignUpName"
                  component={SignUpName}
                />

                <Stack.Screen
                  name="SignUpUsername"
                  component={SignUpUsername}
                />

                <Stack.Screen
                  name="SignUpBirthday"
                  component={SignUpBirthday} />

                <Stack.Screen
                  name="SignUpSchool"
                  component={SignUpSchool} />

                <Stack.Screen
                  name="SignUpAvatar"
                  component={SignUpAvatar} />

                <Stack.Screen
                  name="SignUpPassword"
                  component={SignUpPassword} />

                <Stack.Screen
                  name="SignUpEmail"
                  component={SignUpEmail}

                />

                <Stack.Screen
                  name="Login"
                  children={() => <Login colorScheme={colorScheme} />}

                />


              </Stack.Group >
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>

      </SafeAreaProvider >

    )
  }



  return (

    <SafeAreaProvider >


      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Main"} component={Main} options={{ headerShown: false }} />




            <Stack.Group>

              <Stack.Screen name="Settings" component={Settings} />

              <Stack.Screen name="DeskPrivacy" component={DeskPrivacy} />
              <Stack.Screen name="NameSettings" component={NameSettings} />

              <Stack.Screen name="EmailSettings" component={EmailSettings} />
              <Stack.Screen name="BirthdaySettings" component={BirthdaySettings} />
              <Stack.Screen name="GPASettings" component={GPASetttings} />
              <Stack.Screen name="SchoolSettings" component={SchoolSettings} />
              <Stack.Screen name="GraduationYearSettings" component={GraduationYearSettings} />

              <Stack.Screen name="PasswordSettings" component={PasswordSettings} />

            </Stack.Group>


            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ClassSchoolProfile" component={ClassSchoolProfile} />


            <Stack.Screen name="Suggested" component={Suggested} options={{ gestureDirection: 'vertical', headerShown: false }} />

            <Stack.Screen name="NewChat" component={NewChat}
              options={{
                gestureDirection: "vertical",
                presentation: 'modal'

              }} />

            <Stack.Screen name="Achievements" component={AchievementsScreen}
              options={{
                gestureDirection: "vertical",
                headerShown: false,
                presentation: 'modal',


              }} />
            <Stack.Screen name="Friends" component={Friends}
              options={{
                gestureDirection: "vertical",
                headerShown: false,


              }} />

            <Stack.Screen name="SearchSelect" component={SearchSelect}
              options={{
                headerShown: false,

                gestureDirection: "vertical",
                presentation: 'modal'

              }} />
            <Stack.Screen name="NewBurningQuestion" component={NewBurningQuestion} />

            <Stack.Screen name="Classroom" component={Classroom} />

            <Stack.Screen name="Chatroom" component={Chatroom}

            />
            <Stack.Screen name="Desk" component={Desk}
              options={{
                headerShown: false

              }} />

            <Stack.Screen name="Search" component={Search}
              options={{
                gestureDirection: 'vertical',
                headerShown: false,
                animation: 'fade',
                animationDuration: 150

              }} />

            <Stack.Screen name="SaveDeskItem" component={SaveDeskItem} options={{ headerShown: false }} />

            <Stack.Screen name="AddDeskItem" component={AddDeskItem}
              options={{
                gestureDirection: "vertical",
                headerShown: false
              }} />


            <Stack.Screen name="DeskItem" component={DeskItem}
              options={{
                gestureDirection: "vertical",

              }} />

            <Stack.Screen name="DeskItems" component={DeskItems} options={{ headerShown: false }} />

            <Stack.Screen name="SelectDeskItem" component={SelectDeskItem}
              options={{
                gestureDirection: "vertical",
                presentation: 'modal'

              }}

            />



          </Stack.Navigator>


        </NavigationContainer>

      </Provider>
    </SafeAreaProvider>
  );




}






