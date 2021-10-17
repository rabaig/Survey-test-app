import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  OnSubmit(name: string) {
    localStorage.clear();
    localStorage.setItem('Participant', name);
    this.router.navigate(['/survey']);
  }
}
