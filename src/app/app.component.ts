import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Demo-Auth-App';

  constructor() {}
  
  ngOnInit(): void {
  }

}
