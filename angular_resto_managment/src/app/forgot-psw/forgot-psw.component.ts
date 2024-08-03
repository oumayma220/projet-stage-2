import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-forgot-psw',
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.css']
})
export class ForgotPswComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string = ''; // Initialisation de la propriété message

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService,    private router: Router // Injection du Router
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    const emailControl = this.forgotPasswordForm.get('email');
    if (emailControl) {
      const email = emailControl.value;
      this.registrationService.sendForgotPasswordEmail(email).subscribe(
        response => {
          console.log('Response from backend:', response); // Vérifiez la réponse du backend
          if (response === 'Password reset token sent to your email.') {
            this.message = response;
            this.router.navigate(['/reset-psw']); // Redirection vers la page reset-psw

          } else {
            this.message = 'An error occurred. Please try again.';
          }
        },
        error => {
          console.error('Error sending password reset email:', error);
          this.message = 'An error occurred. Please try again.';
        }
      );
    } else {
      console.error('Form control "email" is null or undefined.');
    }
  }
}