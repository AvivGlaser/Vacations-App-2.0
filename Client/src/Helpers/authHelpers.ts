import jwtDecode from "jwt-decode";
// auth Helpers
export function getUserDetails(token:string | any){
if(!token || typeof token !== "string") return;
if(token){
    const result: any = jwtDecode(token)
    return result;
}}
// token helpers
export function setTokenLS(token: string) {
  if(!token || typeof token !== "string") return;
  localStorage.setItem("token", token);
}
export function getTokenLS() {
  return localStorage.getItem("token");
}
export function clearTokenLS() {
  localStorage.removeItem("token");
}
// followed vacation helper
export function saveFollowingToLS(followedVacations: Array<any>) {
  localStorage.setItem("followedVacations", JSON.stringify(followedVacations));
}
// ordered vacation helper
export default function saveCartToLS(cartState: Array<any>) {
  localStorage.setItem("orderedVacations", JSON.stringify(cartState));
}

