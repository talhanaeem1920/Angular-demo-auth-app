import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    
  }

  async login() {
    await this.authenticationService.logInUser(this.email,this.password);
  }

}
