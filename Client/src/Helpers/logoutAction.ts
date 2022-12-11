import { CLIENT_URLS } from "../Environment/enviornment";
import { clearTokenLS } from "./authHelpers";
import popUpAlert from "./popUpAlert";

export default function logoutAction(){
    popUpAlert({title:"Logging out...", icon:"info"})
    clearTokenLS()
    window.location.replace(`${CLIENT_URLS.BASE}/login`)
}
