import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  constructor(private auth:AuthService,private router: Router){
  }
  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.currentUser$.pipe(
      take(1),
      map(user => {
        if (user) {
          // User is logged in, redirect to loginsuccess
          this.router.navigate(['/loginsuccess']);
          return false;
        } else {
          // User is not logged in, allow access
          return true;
        }
      })
    );
  }
}