import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toster.service';

export interface Users {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  userData: any;

  constructor( private _http: HttpClient, private _cookie: CookieService, private router: Router,public toaster: ToasterService ) {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('user'));
    this.user = this.userSubject.asObservable();
  }

  userLogIn(data: Users): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post<any[]>(`${environment._url}/auth/login/`,data, httpOptions).pipe(map((userData: any) => {
      if(userData.status) {
        console.log(userData);
        localStorage.setItem('user', JSON.stringify(userData.user));
        this._cookie.set('a_token', userData.token.access);
        this._cookie.set('r_token', userData.token.refresh);
        this.userSubject = userData;
        return userData;
      }
    }));
  }

  registerUser(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post<any[]>(`${environment._url}/auth/register/`, data, httpOptions).pipe(map((userData: any) => {
      if(userData.status) {
        localStorage.setItem('user', JSON.stringify(userData.user));
        this._cookie.set('a_token', userData.token.access);
        this._cookie.set('r_token', userData.token.refresh);
        this.userSubject = userData;
        return userData;
      }
    }));
  }

  sessionClear(): void {
    this._cookie.delete('a_token');
    this._cookie.delete('r_token');
    this._cookie.deleteAll();
    localStorage.removeItem('user');
    localStorage.clear();
    this.userSubject.next(null);
    this.toaster.success('Log out successfully.');
    this.router.navigate(['']);
  }

  logOut(): Observable<any[]> {
    let data = { refresh_token : this._cookie.get('r_token') };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/auth/logout/`, data, httpOptions);
  }
  
  getToken() {
    return (!!localStorage.getItem('user') && !!this._cookie.get('a_token') && !!this._cookie.get('r_token'));
  }

  emailOTPValidation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/auth/register/email-verification/`, data, httpOptions);
  }

  getPersonalDetails(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/personal-details`, httpOptions);
  }

  createPersonalDetails(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/jp/personal-details`, data, httpOptions);
  }

  updatePersonalDetails(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.patch<any[]>(`${environment._url}/jp/personal-details`, data, httpOptions);
  }

  getSeekerProfile(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-profile`, httpOptions);
  }

  createSeekerProfile(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/jp/seeker-profile`, data, httpOptions);
  }

  updateSeekerProfile(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.patch<any[]>(`${environment._url}/jp/seeker-profile`, data, httpOptions);
  }

  getSeekerSubProfileCitification(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-sub-profile-citification/`, httpOptions);
  }

  getSingleSeekerSubProfileCitification(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-sub-profile-citification/${id}/`, httpOptions);
  }

  updateSeekerSubProfileCitification(id: number, data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.put<any[]>(`${environment._url}/jp/seeker-sub-profile-citification/${id}/`, data, httpOptions);
  }

  updatePartialSeekerSubProfileCitification(id: number, data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.patch<any[]>(`${environment._url}/jp/seeker-sub-profile-citification/${id}/`, data, httpOptions);
  }

  deleteSeekerSubProfileCitification(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.delete<any[]>(`${environment._url}/jp/seeker-sub-profile-citification/${id}/`, httpOptions);
  }

  createSeekerSubProfileCitification(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/jp/seeker-sub-profile-citification/`, data, httpOptions);
  }

  getSeekerSubProfileEducation(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-sub-profile-education/`, httpOptions);
  }

  getByIdSeekerSubProfileEducation(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-sub-profile-education/${id}/`, httpOptions);
  }

  createSeekerSubProfileEducation(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/jp/seeker-sub-profile-education/`, data, httpOptions);
  }

  updateSeekerSubProfileEducation(id: number, data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.put<any[]>(`${environment._url}/jp/seeker-sub-profile-education/${id}/`, data, httpOptions);
  }

  updateByIdSeekerSubProfileEducation(id: number, data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.patch<any[]>(`${environment._url}/jp/seeker-sub-profile-education/${id}/`, data, httpOptions);
  }

  deleteByIdSeekerSubProfileEducation(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.delete<any[]>(`${environment._url}/jp/seeker-sub-profile-education/${id}/`, httpOptions);
  }

  getSeekerSubProfileLanguage(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-sub-profile-language/`, httpOptions);
  }

  getByIdSeekerSubProfileLanguage(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-sub-profile-language/${id}`, httpOptions);
  }

  createSeekerSubProfileLanguage(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/jp/seeker-sub-profile-language/`, data, httpOptions);
  }

  updateSeekerSubProfileLanguage(id: number, data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.put<any[]>(`${environment._url}/jp/seeker-sub-profile-language/${id}`, data, httpOptions);
  }

  updateByIdSeekerSubProfileLanguage(id: number, data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.patch<any[]>(`${environment._url}/jp/seeker-sub-profile-language/${id}`, data, httpOptions);
  }

  deleteByIdSeekerSubProfileLanguage(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.delete<any[]>(`${environment._url}/jp/seeker-sub-profile-language/${id}`, httpOptions);
  }

  getSeekerSubProfileResume(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/seeker-sub-profile-resume`, httpOptions);
  }

  createSeekerSubProfileResume(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/jp/seeker-sub-profile-resume`, data, httpOptions);
  }

  searchSkill(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.get<any[]>(`${environment._url}/jp/skill-search`, httpOptions);
  }

  uploadResume(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    return this._http.post<any[]>(`${environment._url}/jp/bulk-resume-upload/multiple_upload/`, data, httpOptions);
  }

  searchFromCV(key: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({'Authorization': `Bearer ${this._cookie.get('a_token')}` })};
    let url = (key) ? `${environment._url}/jp/bulk-resume-search?search=${key}` : `${environment._url}/jp/bulk-resume-search`;
    return this._http.get<any[]>(url, httpOptions);
  }

}
