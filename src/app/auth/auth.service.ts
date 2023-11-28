import {Injectable} from "@angular/core";
import {
    Auth,
    createUserWithEmailAndPassword,
    deleteUser,
    sendEmailVerification,
    signInWithEmailAndPassword,
    User
} from "@angular/fire/auth";
import {from} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private auth: Auth) {
    }

    register(email: string, password: string) {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    verfiyEmail(loggedInUser: User) {
        return from(sendEmailVerification(loggedInUser))
    }

    login(email: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    getLoggedInUser() {
        // onAuthStateChanged(this.auth, (user) => {
        //     if(user) {
        //         return user.uid
        //     } else {
        //         return ''
        //     }
        // })

        return this.auth.currentUser;
    }

    logout() {

    }

    forgetPassword(email: string) {

    }

    deleteUser(user: User) {
        return from(deleteUser(user))
    }

    private isUserAlreadyExist(email: string) {
    }


}
