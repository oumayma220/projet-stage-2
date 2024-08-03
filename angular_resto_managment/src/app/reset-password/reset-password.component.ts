import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      token: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const token = this.resetPasswordForm.get('token')?.value;
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    this.registrationService.resetPassword(token, newPassword).subscribe(
      response => {
        console.log('Response from backend:', response); // Vérifiez la réponse du backend
        if (response === 'Password has been reset successfully.') {
          this.message = response;
          // Redirection ou autre logique après succès
        } else {
          this.message = 'An error occurred. Please try again.';
        }
      },
      error => {
        console.error('Error resetting password:', error);
        this.message = 'An error occurred. Please try again.';
      }
    );
  }
}