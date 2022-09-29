import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  formR: FormGroup;

  constructor(private formB: FormBuilder) {
    this.formR = formB.group({
      name: [ null, [Validators.required] ],
      last_name: [ null, [Validators.required] ], 
      age: [ null, [Validators.required] ],
      email: [ null, [Validators.required] ],
      password: [ null, [Validators.required] ]
    })
  }

  ngOnInit(): void {
  }

}
