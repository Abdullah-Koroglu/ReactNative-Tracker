import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"

const trackReducer = (state , action) =>{
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload
        default:
            return state;
    }
}

fetchTracks = dispatch => async() =>{
    let data
    await trackerApi
        .get('/tracks')
        .then(response => (data = response))
        .catch(error => {
            console.log(error);
          });
    dispatch({type:'fetch_tracks' , payload:data.data})
}
createTrack = dispatch => async (name , locations) =>{
    await trackerApi.post('/tracks',{name , locations})
}

export const { Provider , Context } = createDataContext(
    trackReducer,
    { fetchTracks , createTrack } ,
    []
)