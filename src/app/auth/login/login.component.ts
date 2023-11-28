import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  onLoginClicked() {

    //TODO:: implement modal
    if (!this.loginForm.valid) return

    this.isLoading = true;
    const email = this.loginForm.controls['email'].value ?? '';
    const password = this.loginForm.controls['password'].value ?? '';

    this.authService.login(email,password).subscribe({
      next: (user) => {
        console.log(user)
      },
      error: (err): void => {
        console.log(err.code);
        console.log(err.message);
      }
    })

  }
}
