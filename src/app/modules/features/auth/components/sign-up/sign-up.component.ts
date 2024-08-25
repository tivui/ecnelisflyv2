import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void { }

  passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      const response = await this.authService.signup(this.signupForm.value.email, this.signupForm.value.password);
      console.log("response", response)
    } else {
      console.log('Form Errors', this.signupForm.errors);
    }
  }

}
