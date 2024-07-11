import { useContext, useState } from "react"
import { ACTION_TYPES ,useAppContext} from "../context";

const useTrackLocation = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const {dispatch}=useAppContext();
    // const [latLong, setLatLong] = useState(null);
    const [isFindingLocation,setIsFindingLocation]=useState(false);

    const success = (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch({type:ACTION_TYPES.SET_LANG_LONG,payload:{latLong:`${latitude},${longitude}`}})
        // setLatLong(`${latitude},${longitude}`)
        setErrorMessage('');
        setIsFindingLocation(false)
    }

    const error = () => {
        setErrorMessage("Unable to retrieve your location");
        setIsFindingLocation(false)
    }


    const handleTrackLocation = () => {

        setIsFindingLocation(true)
        if (!navigator.geolocation) {
            setErrorMessage("Geolocation is not supported by your browser");
            setIsFindingLocation(false)
        } else {

            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {
        // latLong,
        errorMessage,
        handleTrackLocation,
        isFindingLocation
    }
}

export default useTrackLocation;