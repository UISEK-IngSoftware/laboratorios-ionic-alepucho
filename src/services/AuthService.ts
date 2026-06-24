const TOKEN_KEY='github_auth_token';
const USERNAME_KEY='github_auth_username';

class AuthService {
    login (username:string, token:string):boolean {
        if(username && token){
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USERNAME_KEY, username);
            return true;
        }
        return false;
    }

    logout(){
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
    }

    isAuthenticated():boolean{
        return localStorage.getItem(TOKEN_KEY) !== null && localStorage.getItem(USERNAME_KEY) !== null;
    }

    getToken(){
        return localStorage.getItem(TOKEN_KEY);
    }

    getUsername(){
        return localStorage.getItem(USERNAME_KEY);
    }

    getAuthHeader(){
        if(this.isAuthenticated()){
            return "Basic " + btoa(this.getUsername() + ":" + this.getToken());
        }
        return null;
    }
}

export default new AuthService();