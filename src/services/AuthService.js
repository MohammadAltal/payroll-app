

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

    loginUser = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.userName === username && user.password === password);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.replace('/home');
            return true;
        } else {
            return false;
        }
    };

}

export default AuthService;
