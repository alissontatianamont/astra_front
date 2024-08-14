import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_api = environment.base;
  constructor(private http: HttpClient, private router: Router) { }

  getUsers(){
    return this.http.get(`${this.base_api}users`);
  }
  getUser($id){
    return this.http.get(`${this.base_api}users/${$id}`);
  }
  getAvatarUser(avatar: string): Observable<any> {
    return this.http.get(`${this.base_api}images/profile/${avatar}`);
  }
  
  createUser(user: any): Observable<any>{
    console.log("entra a create");
    return this.http.post(`${this.base_api}users`,user);
  }
  updateUser(user: any, $id): Observable<any>{
    console.log("entra a update");
    
    return this.http.post(`${this.base_api}users/${$id}`,user);
  }
  login(email:string, password:string):Observable<any>{
    return this.http.post<any>(`${this.base_api}login`,{email,password});
  }
  getUserId(): number | null {
    const userId = localStorage.getItem('usuario_id');
    return userId ? parseInt(userId, 10) : null;
  }
  logout() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.http.get(`${this.base_api}logout`).subscribe({
        next: () => {
          localStorage.removeItem('accessToken');
           this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error during logout', err);

        }
      });
    } else {
      console.log('asdasdasdasd');
      
       this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
  deleteUser($id) {
    return this.http.post(`${this.base_api}delete/${$id}`,$id);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
