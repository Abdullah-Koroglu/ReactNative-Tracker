import React , {useState , useEffect , useContext} from 'react'
import {Text , View , StyleSheet} from 'react-native'
import  MapView, {Marker , Polyline}  from "react-native-maps";
import {Context as LocationContext } from '../context/LocationContext'

const Map = () =>{
   
    const {state : {currentLocation , locations} } = useContext(LocationContext)

    return(
    <MapView 
    style={styles.mapStyle}
    initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.00005,
        longitudeDelta: 0.00005,
      }}
    >
        <Marker
      coordinate={currentLocation.coords}/>
      <Polyline 
      coordinates={locations.map(loc => loc.coords)}
      strokeWidth={10}
      strokeColor='rgba(130,180,150,0.9)'
      lineCap='round'
      />
    </MapView>
    )
}

const styles = StyleSheet.create({
    mapStyle:{
        height:500
    }

})

export default Map