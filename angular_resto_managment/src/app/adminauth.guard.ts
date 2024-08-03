import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
   }
   canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.authService.currentUser$.subscribe(user => {
        if (user && user.role === 'ADMIN') {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}