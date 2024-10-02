import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize form with default values and validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signInWithPassword(email, password).then(response => {
        if (response.error) {
          // Gérer les erreurs d'authentification
          console.error('Login error', response.error.message);
        } else {
          console.log('Login successful', response.data.user);
          // Redirige vers une autre page, par exemple la page d'accueil
          this.router.navigate(['/home']);
        }
      }).catch(error => {
        console.error('Unexpected error', error);
      });
    } else {
      console.log('Form Errors', this.loginForm.errors);
    }
  }

  async handleAuth() {
    const response = await this.authService.signInWithGithub();

    console.log(response);
  }

}
