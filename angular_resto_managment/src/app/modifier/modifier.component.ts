import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RegistrationService
  ) { }
  

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.service.getById(this.userId).subscribe(data => {
        console.log('User Data from API:', data); // Vérifiez les données ici
        this.user = data;
        // Mettez à jour le formulaire avec les données utilisateur
        this.userForm.patchValue({
          fullname: this.user.fullname || '',
          email: this.user.email || ''
        });
      }, error => {
        console.error('Error fetching user data:', error);
        // Gérez l'erreur (par exemple, afficher un message d'erreur)
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const updatedUser: User = {
      id: this.userId,
      fullname: this.userForm.value.fullname,
      email: this.userForm.value.email,
      password: '', // Supposons que le mot de passe n'est pas modifié ici
      role: this.user.role // Conservez le rôle existant ou gérez-le comme nécessaire
    };

    this.service.updateUserDetails(this.userId, updatedUser).subscribe(
      () => {
        console.log('Utilisateur mis à jour avec succès.');
        this.router.navigate(['/user']); // Redirection après mise à jour
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        this.router.navigate(['/user']); // Redirection après erreur
      }
    );
  }
}
