import axios from "axios";


export default class ApiService{

    static BASE_URL = "http://localhost:8888"

    static getHeader(){
        const token = localStorage.getItem(token);
        return{
            Authorization: `Bearer ${token}`,
            "Content_Type": "application/json"
        }
    }


    //Auth part 

    //register a new user and we will pas registration object
   static async registerUser(registration){
    const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
    return response.data;
   }

   //login a user and we will pass login request
   static async loginUser(loginDetails){
    const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
    return response.data;
   }


   //USERS

   //should be an admin then can procceed
   static async getAllUsers(){
    const response = await axios.get(`${this.BASE_URL}/users/all`,{
        headers:this.getHeader()
    })
    return response.data;
   }

   static async getUserProfile(){
    const response = await async(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
        headers: this.getHeader()
    })
    return response.data;
   }

   static async getUser(userId){
    const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`,{
        headers: this.getHeader()
    });
    return response.data;
   }

   static async deleteUser(userId){
    const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`,{
        headers: this.getHeader()
    });
    return response.data;
   }

   static async getUserBooking(userId){
    const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
        headers: this.getHeader()
    })
    return response.data;
   }

   static async addRoom(formData){
    const response = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
        headers: {
            //... just spred the header to overwrite some diffrent part of header
            ...this.getHeader(),
            "Content_Type":"multipart/form-data"
        }
    });
    return response.data;
   }

   static async getAllAvailableRooms(){
    const response = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`)
    return response.data;
   }

   static async getAllRoomes(){
    const response = await axios.get("${this.BASE_URL}/rooms/all")
    return response.json;
   }

   static async getRoomType(){
    const response = await axios.get("${this.BASE_URL}/rooms/types")
    return response.data;
   }

   static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType){
    const response = await axios.get(
        `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
        &checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return response.data;
   }

   static async deleteRoom(roomId){
    const response = await axios.get(`${this.BASE_URL}/rooms/delete/${roomId}`, {
        headers: this.getHeader()
    })
    return response.data;
   }

   static async updateRoom(roomId, formData){
    const response = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
        headers: {
            ...this.getHeader,
            "Content_Type" : "multipart/formData"
        }
    });
    return response.data
   }

   static async getRoomById(roomId){
    const response = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`)
    return response.data;
   }



   //Bookings class

   static async bookRoom(userId, roomId, booking){
    const response = await axios.post(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, {
        headers: this.getHeader()
    })
    return response.data;
   }


   static async getAllBookings(){
    const response = await axios.get(`${this.BASE_URL}/bookings/all`, {
        headers: this.getHeader()
    })
    return response.data;
   }

   static async getBookingByConfirmationCode(confirmationCode){
    const response = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${confirmationCode}`, {
        headers: this.getHeader()
    })
    return response.data;
   }

   static async cancelBooking(bookingId){
    const response = await axios.put(`${this.BASE_URL}/booking/cancel/${bookingId}`, {
        headers: this.getHeader()
    })
    return response.data;
   }

   static logOut () {
    localStorage.removeItem("token");
    localStorage.removeItem("role")
   }

//    The !! (double negation) is a JavaScript trick used to convert any value to a boolean.
// If token exists (i.e., it’s not null or undefined), !!token will return true.
// If token is null (i.e., the item does not exist in localStorage), !!token will return false.
   static isAuthenticated(){
    const token = localStorage.getItem("token");
    return !!token;
   }

   static isAdmin(){
    const role = localStorage.getItem("role")
    return role === "ADMIN"
   }

   static isUser () {
    const user = localStorage.getItem(role)
    return role === "USER"
   }

}