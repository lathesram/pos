import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    isLoading = false;

    constructor(private fb: FormBuilder, private authService: AuthService) {
    }

    registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })

    onSubmitClicked() {
        // TODO:: implement modal
        if (!this.registerForm.valid) {
            return
        }

        this.isLoading = true;
        const email = this.registerForm.controls['email'].value ?? '';
        const password = this.registerForm.controls['password'].value ?? '';

        this.authService.register(email, password).subscribe({
            next: (user) => {
                this.isLoading = false;
                console.log(user)
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err.code)
                console.log(err.message);
            }
        })
    }

    verifyEmail() {
        const loggedUser = this.authService.getLoggedInUser();
        if(loggedUser && !loggedUser.emailVerified) {
            this.authService.verfiyEmail(loggedUser).subscribe({
                next: () => {
                    console.log("Verification Email Sent")
                },
                error: (err: { code: string; message: string; }) => {
                    console.log(err.code);
                    console.log(err.message);
                }
            })
        }
    }
}
