import Cookie from 'js-cookie';

// Route Protection and Authentication
const AuthService = {
    isAuthenticated: false,
    login(userInfo){
        const reqBody = {
            body: JSON.stringify(userInfo),
            method : 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        return fetch(`${process.env.REACT_APP_HOSTURL}/loginpage`, reqBody)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                Cookie.set('userId', data.userId);
            })
            .then(() => {
                if(Cookie.get('userId')){
                    this.authenticate();
                }
            })
            .catch(error => {
                console.error('login is =>', error);
            })
    },
    authenticate(cb){
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    logout(cb){
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
};

export default AuthService;