import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private service: RegistrationService, private _router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.getCurrentUser();
  }
 
  public getCurrentUser() {
    this.service.getPrincipal().subscribe(data => {
      if (data) {
        this.service.getById(data.principal.id).subscribe(user => {
          this.currentUserSubject.next(user);
          console.log("Current User: ", user);
          switch (user.role) {
            case 'ADMIN': {
              this._router.navigate(['/adminpage']);
              break;
            }
            default: {
              this._router.navigate(['/loginsuccess']);
              break;
            }
          }
        });
      } else {
        localStorage.clear();
        this.currentUserSubject.next(null);
      }
    });
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  logout(): void {
    localStorage.removeItem('accessToken');
    this._router.navigate(['/login']);
  }
}