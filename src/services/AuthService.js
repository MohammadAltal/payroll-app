

class AuthService {

     isUserAuthenticated = () => {
         const user = localStorage.getItem('user');
         // Check if the user is not null and not an empty object
         return user !== null && user !== '{}';
    };

    logoutUser = () => {
        localStorage.setItem('user', JSON.stringify({}));
        window.location.replace('/signin');
    };

}

export default AuthService;
