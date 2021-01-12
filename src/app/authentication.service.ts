import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:3000/api/v1/';  // URL to web api
  isLoggedIn:boolean = false
  errorMessage:string = ''

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router:Router) { 
      this.isLoggedIn = (this.localStorageService.getData('isLoggedIn') === "true")
    }

  ngOnInit(): void {
  }  

  async logInUser(email:string,password:string) {
    const url = `${this.baseUrl}auth/sign_in`;
    this.http.post<any>(url, {email: email,password: password}, {observe: 'response'})
    .subscribe({
      next: resp => {
        this.localStorageService.setData("status",resp.status)
        this.localStorageService.setData("statusText", resp.statusText)
        this.localStorageService.setData("email", resp.body.data.email)
        this.localStorageService.setData("first_name", resp.body.data.first_name)
        this.localStorageService.setData("last_name", resp.body.data.last_name)
        if( resp.status == 200 && resp.statusText == 'OK'){
          this.localStorageService.setData("isLoggedIn", true)
          this.isLoggedIn = true;
          this.errorMessage = ''
          this.localStorageService.remove("error")
          this.router.navigate(['dashboard']);
        }
      },
      error: error => {
        console.error('There was an error!', error);
        this.localStorageService.remove("status")
        this.localStorageService.remove("statusText")
        this.localStorageService.remove("email")
        this.localStorageService.remove("first_name")
        this.localStorageService.remove("last_name")
        this.localStorageService.remove("isLoggedIn")
        this.localStorageService.setData("error", error.error.errors[0])
        this.localStorageService.setData("isLoggedIn", false)
        this.isLoggedIn = false
        this.errorMessage = error.error.errors[0]
        alert(error.error.errors);
        this.router.navigate(['sign_in'])
      }
    });
  }

  async logOutUser() {
    this.localStorageService.remove("status")
    this.localStorageService.remove("statusText")
    this.localStorageService.remove("email")
    this.localStorageService.remove("first_name")
    this.localStorageService.remove("last_name")
    this.localStorageService.remove("isLoggedIn")
    this.localStorageService.remove("error")
    this.router.navigate(['sign_in'])
  }

  async signUpUser(email:string,password:string,password_confirmation:string,
    first_name:string,last_name:string,company_name:string,business_id:number) {
    const url = `${this.baseUrl}admin/sign_up`;
    this.http.post<any>(url,
      {email: email,password: password,password_confirmation:password_confirmation,
        first_name:first_name,last_name:last_name,company_name:company_name,business_id:business_id},
      {observe: 'response'})
    .subscribe({
      next: resp => {
        console.log(resp)
        this.localStorageService.setData("status",resp.status)
        this.localStorageService.setData("statusText", resp.statusText)
        this.localStorageService.setData("email", resp.body.email)
        this.localStorageService.setData("first_name", resp.body.first_name)
        this.localStorageService.setData("last_name", resp.body.last_name)
        if( resp.status == 201 && resp.statusText == 'Created'){
          this.localStorageService.setData("isLoggedIn", true)
          this.isLoggedIn = true;
          this.errorMessage = ''
          this.router.navigate(['dashboard']);
        }
      },
      error: error => {
        console.error('There was an error!', error);
        this.isLoggedIn = false
        alert("Sign Up Failed");
        this.router.navigate(['register'])
      }
    });
  }

}
