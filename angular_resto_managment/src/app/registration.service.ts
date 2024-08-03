import { Injectable } from '@angular/core';
import { User } from './user';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { catchError, map, Observable } from 'rxjs';
import { Plat } from './plat';
import { TableRestaurant } from './TableRestaurant';
import { switchMap, tap } from 'rxjs/operators';
import { PanierService } from './panier.service';




@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl = "http://localhost:8081/rest";
  constructor(private _http: HttpClient, private panierService: PanierService) {

   }
   public loginUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>(this.baseUrl + `/notAuthenticated/signin`, user).pipe(
      switchMap(response => {
        // Créez un panier pour l'utilisateur connecté après une connexion réussie
        if (response && response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          return this.panierService.createPanier().pipe(
            map(panier => {
              // Sauvegardez l'ID du panier dans le localStorage ou dans l'objet utilisateur
              localStorage.setItem("panierId", panier.id.toString());
              return response; // Retournez la réponse originale de connexion
            })
          );
        } else {
          return [response]; // Retournez la réponse originale si aucun panier n'est créé
        }
      })
    );
  }
  public getPrincipal():Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem("accessToken")}`)
    }
    return this._http.get<any>(this.baseUrl + `/notAuthenticated/principal`,header)
  }
  public getById(id: number):Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem("accessToken")}`)
    }
    return this._http.get<any>(this.baseUrl + `/authenticated/getById/${id}`,header)
  }
  public registerUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>(this.baseUrl + `/notAuthenticated/signup`,user)
  }
  sendForgotPasswordEmail(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this._http.post(`${this.baseUrl}/notAuthenticated/forgot-password`, null, { params, responseType: 'text' });
  }
  
  public resetPassword(token: string, newPassword: string): Observable<string> {
    const params = new HttpParams()
      .set('token', token)
      .set('newPassword', newPassword);
    return this._http.post(`${this.baseUrl}/notAuthenticated/reset-password`, null, { params, responseType: 'text' });
  }
  private base="http://localhost:8081/rest/authenticated/users";
  public  getUsers():Observable<User[]> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem("accessToken")}`)
    }
    return this._http.get<User[]>(this.base,header);
  }
  
  private apiU = "http://localhost:8081/rest/authenticated/users"; 
  deleteUser(id: number): Observable<any> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem("accessToken")}`)
    }
 const url = `${this.apiU}/${id}`;
    return this._http.delete(url,header);
  }
  updateUserDetails(userId: number, user: User): Observable<any> {
    const url = `${this.apiU}/${userId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  
    return this._http.put(url, user, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        throw error; 
      })
    );
  }
  
// Méthodes pour les plats
private platApiUrl = "http://localhost:8081/rest/authenticated/plats";

public getAllPlats(): Observable<Plat[]> {
  const header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`)
  }
  return this._http.get<Plat[]>(this.platApiUrl, header);
}




public createPlat(payload:any){
  const headers = new HttpHeaders({
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    accept: "multipart/form-data"
  });
   return this._http.post<any>(`${this.baseUrl}/authenticated/plats`, payload, { headers })


}


public updatePlat(id: number, plat: Plat): Observable<Plat> {
  const url = `${this.platApiUrl}/${id}`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  
  return this._http.put<Plat>(url, plat, { headers }).pipe(
    catchError(error => {
      console.error('Erreur lors de la mise à jour du plat:', error);
      throw error;
    })
  );
}

public deletePlat(id: number): Observable<any> {
  const url = `${this.platApiUrl}/${id}`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  
  return this._http.delete(url, { headers }).pipe(
    catchError(error => {
      console.error('Erreur lors de la suppression du plat:', error);
      throw error;
    })
  );
}
public getPlatById(platId: number): Observable<Plat> {
  const url = `${this.baseUrl}/authenticated/plats/${platId}`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);

  return this._http.get<Plat>(url, { headers }).pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération du plat par ID:', error);
      throw error;
    })
  );
}
public createTable(tableRestaurant: TableRestaurant): Observable<TableRestaurant> {
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  return this._http.post<TableRestaurant>(`${this.baseUrl}/authenticated/create`, tableRestaurant, { headers });
}

public associateTableWithUser(tableId: number, userId: number): Observable<TableRestaurant> {
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  return this._http.post<TableRestaurant>(`${this.baseUrl}/authenticated/${tableId}/associate/${userId}`, null, { headers });
}

public getTableById(id: number): Observable<TableRestaurant> {
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  return this._http.get<TableRestaurant>(`${this.baseUrl}/authenticated/tables/${id}`, { headers });
}

public updateTable(id: number, tableRestaurant: TableRestaurant): Observable<TableRestaurant> {
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  return this._http.put<TableRestaurant>(`${this.baseUrl}/authenticated/tables/${id}`, tableRestaurant, { headers });
}


public deleteTable(id: number): Observable<any> {
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
  return this._http.delete<any>(`${this.baseUrl}/authenticated/tables/${id}`, { headers }).pipe(
    catchError(error => {
      console.error('Erreur lors de la suppression de la table:', error);
      throw error;
    })
  );
}

public getAllTables(): Observable<TableRestaurant[]> {
  const header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`)
  };
  return this._http.get<TableRestaurant[]>(`${this.baseUrl}/authenticated/tables`, header);
}


}




