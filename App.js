import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { createBottomTabNavigator } from "react-navigation-tabs";
import {createStackNavigator} from 'react-navigation-stack'
  
import AccountScreen from './src/screens/AccountScreen'
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import SaveTrackScreen from './src/screens/SaveTrackScreen'
import {setNavigator } from './src/navigationRef'
 
import {Provider as AuthProvider} from  './src/context/AuthContext'
import {Provider as LocationProvider} from './src/context/LocationContext'
import {Provider as TrackProvider} from './src/context/TrackContext'


const switchNavigator = createSwitchNavigator({
  loginFlow:createSwitchNavigator({
     Signup: SignupScreen,
       Signin: SigninScreen
  }),
  mainFlow:createBottomTabNavigator({
    trackListFlow:createStackNavigator({
     TrackList:TrackListScreen,
    TrackDetail : TrackDetailScreen
  }),
  TrackCreateAndSaveFlow:createStackNavigator({
    TrackCreate : TrackCreateScreen,
    SaveTrack : SaveTrackScreen
    }),
  Account:AccountScreen
  })
})


const App = createAppContainer(switchNavigator)

export default () =>{
  return(
    <TrackProvider>  
      <LocationProvider>
        <AuthProvider>
          <App ref = { (navigator) =>  setNavigator(navigator)}/>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>  
  )

} 

 