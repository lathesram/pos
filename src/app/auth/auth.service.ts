import {Injectable} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  UserCredential
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private auth: Auth) {
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  verfiyEmail(loggedInUser: User): Observable<void> {
    return from(sendEmailVerification(loggedInUser))
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  getLoggedInUser(): User | null {
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

  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email))
  }

  deleteUser(user: User) {
    return from(deleteUser(user))
  }

  private isUserAlreadyExist(email: string) {
  }


}
