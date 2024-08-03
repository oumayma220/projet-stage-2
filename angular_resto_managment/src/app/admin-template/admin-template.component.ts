import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { PanierService } from '../panier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit , OnDestroy {
  panierItemCount: number = 0; // Propriété pour stocker le nombre de plats dans le panier
  private panierSubscription!: Subscription;
  constructor(public authService: AuthService, private router:Router, private panierService: PanierService) {}
  ngOnInit(): void {
    const panierId = Number(localStorage.getItem("panierId"));
    if (panierId) {
      this.panierService.updatePanierItemCount(panierId); // Initialiser le nombre d'éléments
      this.panierSubscription = this.panierService.panierItemCount$.subscribe(
        itemCount => {
          this.panierItemCount = itemCount;
        }
      );
    }
  }
  ngOnDestroy(): void {
    if (this.panierSubscription) {
      this.panierSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
    }
  }
  currentUser: User = new User();
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }  
}