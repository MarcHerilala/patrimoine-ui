import { error } from "console";
import jwtDecode from "jwt-decode"
import decodeToken from "./jwt-decode";
function isTokenValid(token:string):boolean{
 try{
   const decoded=decodeToken(token)
   const current_time=Math.floor(Date.now()/1000)
    if(decoded?.exp&&decoded.exp<current_time)
        return true 
    return false
 }catch(e){
    console.log("invalid",e);
    return false
    
 }
}
export default isTokenValid