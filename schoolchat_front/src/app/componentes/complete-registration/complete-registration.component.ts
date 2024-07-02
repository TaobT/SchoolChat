import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrl: './complete-registration.component.css'
})
export class CompleteRegistrationComponent {
  completeRegistrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.completeRegistrationForm = this.fb.group({
      userId: ['', Validators.required],
      username: ['', Validators.required],
      realName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]]
    });
  }

  completeRegistration() {
    if (this.completeRegistrationForm.valid) {
      const { userId, username, realName, password } = this.completeRegistrationForm.value;
      this.authService.completeRegistration(userId, username, realName, password).subscribe(response => {
        console.log('Registro completado');
      });
    }
  }
}
