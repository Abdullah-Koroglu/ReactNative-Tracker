import createDataContext from './createDataContext'
import { navigate } from "../navigationRef";

const locationReducer = (state , action) =>{
    switch (action.type) {
        case 'add_current_location':
            return {...state , currentLocation:action.payload}
        case 'start_recording':
            return{...state, recording:true}
        case 'stop_recording':
            return{...state, recording:false}
        case 'add_location':
            return{...state , locations : [...state.locations , action.payload]}
        case 'change_name':
            return{...state , name:action.payload}
        case 'reset':
            return {...state , name:'' , locations:[]}
        default:
            return state;
    }
}

changeName = dispatch => (name) =>{
    dispatch({type:'change_name' , payload:name})
} 
startRecording = dispatch => () =>{
    dispatch({type:'start_recording'})
}
stopRecording = dispatch => () =>{
    dispatch({type:'stop_recording'})
}
addLocation = dispatch => (location , recording ) =>{
    dispatch({type:'add_current_location' , payload:location})
    if(recording){
        dispatch({type:'add_location' , payload:location})
    }
}

reset = dispatch =>()=>{
    dispatch({type:'reset'})
    navigate('TrackList')
}

export const { Context , Provider } = createDataContext(
    locationReducer,
    {startRecording , stopRecording , addLocation , changeName , reset},
    {recording : false , locations: [], currentLocation:null , name:''}
)