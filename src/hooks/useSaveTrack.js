import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";

export default () =>{
    const {createTrack} = useContext(TrackContext)
    const {state , reset} = useContext(LocationContext)

    const saveTrack = async() =>{
       await createTrack(state.name , state.locations)
        reset()
        
    }
    return [saveTrack]
}