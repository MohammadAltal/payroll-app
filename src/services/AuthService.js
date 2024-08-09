

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

    loginUser = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            return { status: true, message: 'Signin successful.' };
        } else {
            return { status: false, message: 'Invalid username/password.' };
        }
    };

    signupUser = (firstName, lastName, email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            return { status: false, message: 'Email already exists. Please use a different email.' };
        }

        const newUser = {
            id: Math.floor(Math.random() * 900000) + 100000,
            firstName,
            lastName,
            email,
            password,
            creationDate: new Date().toISOString(), // ISO format date
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Optionally, automatically log in the new user
        localStorage.setItem('user', JSON.stringify(newUser));

        return { status: true, message: 'Signup successful!' };
    };

}

export default AuthService;
