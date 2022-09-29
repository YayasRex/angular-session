import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  formL: FormGroup;
  accessUser: Person[];

  constructor(private Fb: FormBuilder, private route: Router) {
    this.accessUser = [];
    this.formL = Fb.group({
      userEmail: [null, [Validators.required]],
      passwordUser: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  sendLogin($event: Event) {
    $event.preventDefault();
    if (this.formL.valid) {
      const userLogged = this.formL.value;
      console.log('userLogged', userLogged);
      if (JSON.parse(localStorage.getItem('people') as string)) {
        this.accessUser = JSON.parse(localStorage.getItem('people') as string);
      }
      if (this.accessUser) {
        let accessPass = this.accessUser.find(
          (element) => element.email === userLogged.userEmail
        );
        if (accessPass) {
          let validPassword = accessPass.password === userLogged.passwordUser;
          console.log('contrasena', validPassword);
          if (validPassword) {
            this.route.navigate(['home']);
          }
        }
      }
    }
  }
}
