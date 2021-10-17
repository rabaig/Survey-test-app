import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signout() {
    this.router.navigate(['/register']);
  }

  get getNameOfParticipant() {
    return localStorage.getItem('Participant');
  }

  get isSurveyPage() {
    return this.router.url === '/survey';
  }

}
