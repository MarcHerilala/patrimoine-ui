import jwtDecode from "jwt-decode";
type JwtPlayLoad={
    "iss": string,
    "sub": string,
    "exp": number,
    "iat": number,
    "scope": string
  }
function decodeToken(token:string){
  try{
    const decodedToken:JwtPlayLoad=jwtDecode.jwtDecode<JwtPlayLoad>(token)
    return decodedToken
  }
  catch(e){
    console.log(e);
    
  }

    
}
export default decodeToken;
