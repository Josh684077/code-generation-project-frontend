//Pinia store for user session
import { defineStore } from 'pinia';
//Axios for API calls
import axios from '../../axios-basis';

export const useUserSessionStore = defineStore('usersession', {
    state: () => ({
        jwt: '',
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        userType: '',
    }),
    getters: {
        isLoggedIn: (state) => state.jwt !== '' ,
        getUserFullName: (state) => state.firstName + ' ' + state.lastName,
        getId: (state) => state.id,
        getStoredUserType: (state) => state.userType,
    },
    actions: {
        login(email, password) {
            console.log("Logging in...");
            return new Promise((resolve, reject) => {
                axios.post('auth/login', {
                    email: email,
                    password: password
                })
                .then(response => {
                    this.jwt = response.data.jwt;
                    this.id = response.data.id;
                    //this.userType = response.data.userType;

                    sessionStorage["jwt"] = this.jwt;
                    sessionStorage["id"] = this.id;
                    sessionStorage["email"] = this.email;
                    sessionStorage["firstName"] = this.firstName;
                    sessionStorage["lastName"] = this.lastName;
                    //sessionStorage["userType"] = this.userType;

                    axios.defaults.headers.common['Authorization'] = this.jwt;
                    console.log(response);
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error.response);
                });
            });  
        },
        // localLogin() {
        //     if (sessionStorage["jwt"] !== undefined) {
        //         this.jwt = sessionStorage["jwt"];
        //         this.id = sessionStorage["id"];
        //         this.firstName = sessionStorage["firstName"];
        //         this.lastName = sessionStorage["lastName"];

        //         axios.defaults.headers.common['Authorization'] = this.jwt;
        //         console.log("Logged in automatically");
        //     }
        // },
        logout(){
            this.jwt = '';
            this.id = 0;
            sessionStorage.removeItem("jwt");
            axios.defaults.headers.common['Authorization'] = '';
        }
    }
});