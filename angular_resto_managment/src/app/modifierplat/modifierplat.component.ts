import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plat } from '../plat';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-modifierplat',
  templateUrl: './modifierplat.component.html',
  styleUrls: ['./modifierplat.component.css']
})
export class ModifierplatComponent implements OnInit {
  plat: Plat = new Plat();
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.registrationService.getPlatById(this.id).subscribe(
      data => {
        this.plat = data;
      },
      error => {
        console.error('Erreur lors de la récupération du plat:', error);
      }
    );
  }

  onSubmit() {
    this.registrationService.updatePlat(this.id, this.plat).subscribe(
      data => {
        console.log('Plat mis à jour avec succès:', data);
        this.router.navigate(['/plat']);
      },
      error => {
        console.error('Erreur lors de la mise à jour du plat:', error);

      }
    );
  }
}


