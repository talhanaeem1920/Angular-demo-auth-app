import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email:string
  password:string
  password_confirmation:string
  company_name:string
  business_id:number
  first_name:string
  last_name:string

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  async signUp() {
    await this.authenticationService
    .signUpUser(
      this.email,this.password,this.password_confirmation,
      this.first_name,this.last_name,this.company_name,this.business_id);
  }

}
