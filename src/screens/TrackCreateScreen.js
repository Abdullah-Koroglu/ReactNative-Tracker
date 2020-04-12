import React , {useState , useCallback , useContext} from 'react'
import {Text , View , StyleSheet,Alert , ActivityIndicator} from 'react-native'
import {SafeAreaView, withNavigationFocus} from 'react-navigation'
import {Context as LocationContext } from '../context/LocationContext'
import useLocation  from '../hooks/useLocation'
import { AntDesign , Foundation} from "@expo/vector-icons";

import  Map from "../components/Map";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '../navigationRef'

TrackCreateScreen = ({isFocused , navigation}) =>{
    const {addLocation ,state , startRecording , stopRecording} = useContext(LocationContext)
    const callback = useCallback(location =>{
            console.log(state.recording)
            addLocation(location , state.recording)
        },[state.recording])
    const [err] = useLocation(isFocused || state.recording, callback)

    const errorAlert = () => Alert.alert(
        'We have to access your location to run together',
        '',
        [{text: 'OK', onPress: () => clearError()}],
        { cancelable: false }
      )
      if(err !== null ){errorAlert()} 
      if(!state.currentLocation){
        return <ActivityIndicator size='large' style={{marginTop:200}} />
        }
    //console.log(state.locations.length)
    return(<SafeAreaView forceInset={{top:'always'}}>
        <Text style={styles.header}>Create Track</Text>
        <Map></Map>
        <View style={styles.row}>
            <View>
                <Text>Altitude : </Text>
                <Text style={{fontSize:22}} >{parseInt(state.currentLocation.coords.altitude)} </Text>
            </View>
            <View>
                <Text>Speed : </Text>
                <Text style={{fontSize:22}} >{parseInt(state.currentLocation.coords.speed)} </Text>
            </View>
        </View>
        <View style={styles.row}>
            <TouchableOpacity
            onPress={()=>{
                if(!state.recording){
                    startRecording()
                }else{
                    stopRecording()
                }
            }}>
            <View style={styles.cycleButton}>
                {state.recording !== true ? 
                <AntDesign name='caretright' size={36} color='white'/> : 
                <Foundation name='pause' size={38} color='white'/>}
            </View>
            </TouchableOpacity>
            {!state.recording && state.locations.length?
            <TouchableOpacity
                onPress={() =>navigation.navigate('SaveTrack')}
            >
                <View style={styles.emptyCycleButton}>
                    <Text style={{color:'#98ceb7'}} >
                        SAVE
                    </Text>
                </View>
            </TouchableOpacity>:null}
        </View>
    </SafeAreaView>)
}

TrackCreateScreen.navigationOptions = (props) =>{
    return {
        headerShown:false
    };
};

const styles = StyleSheet.create({
    header:{
        fontSize:38,
        padding:15
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingHorizontal:20,
        paddingVertical:10
    },
    cycleButton:{
        width: 78,
        height: 78,
        borderRadius: 100/2,
        backgroundColor: '#98ceb7',
        alignItems:'center',
        justifyContent:'center'
    },
    emptyCycleButton:{
        width: 78,
        height: 78,
        borderRadius: 100/2,
        borderColor: '#98ceb7',
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center'
    }


})

export default withNavigationFocus(TrackCreateScreen) 