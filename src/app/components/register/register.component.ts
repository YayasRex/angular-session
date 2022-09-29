import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  formR: FormGroup;

  persons: Person[];
  showError: boolean;
  emailCheck:string;

  constructor(private formB: FormBuilder) {
    this.persons = [];
    this.emailCheck='';
    this.showError = false;
    this.formR = formB.group({
      name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(18)]],
      email: [null, [Validators.required,Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
    });
  }

  ngOnInit(): void {}

  sendRegister($event: Event) {
    $event.preventDefault();
    if (this.formR.valid) {
      const userRegisted = this.formR.value;
      console.log('user Registed', userRegisted);
      if (JSON.parse(localStorage.getItem('people') as string)) {
        this.persons = JSON.parse(localStorage.getItem('people') as string);
      }
      if (this.persons) {
        let emailValid = this.persons.find(
          (element) => element.email === userRegisted.email
        );
        if (emailValid) {
          this.showError = true;
          this.checkedEmailError();
          
        } else {
          this.persons.push(userRegisted);
          localStorage.setItem('people', JSON.stringify(this.persons));
          this.formR.reset();
        }
      }
    }
  }

  

  checkedEmailError(){
    setTimeout(() =>{
      this.showError=false;
    } ,2500);
  
  }


  get nameValue() {
    return this.formR.get('name');
  }

  get lastNameValue() {
    return this.formR.get('last_name');
  }

  get ageValue() {
    return this.formR.get('age');
  }

  get emailValue() {
    return this.formR.get('email');
  }

  get passwordValue() {
    return this.formR.get('password');
  }

  getErrorName() {
    return this.nameValue?.hasError('required') ? 'Name is required' : '';
  }

  getErrorLastName() {
    return this.lastNameValue?.hasError('required')
      ? 'Last name is required'
      : '';
  }

  getErrorAge() {
    return this.ageValue?.hasError('required')
      ? 'Age is required'
      : this.ageValue?.hasError('min')
      ? 'Minimum 18 years old'
      : '';
  }

  getErrorEmail() {
    return this.emailValue?.hasError('required')
      ? 'Email is required'
      : this.emailValue?.hasError('pattern')
      ? 'Invalid Email'
      : this.showError
      ? 'Email already in use'
      : '';
  }

  getErrorPassword() {
    return this.passwordValue?.hasError('required')
      ? 'Password is requiered'
      : this.passwordValue?.hasError('pattern')
      ? 'Password needs to be at least eight characters, one uppercase letter and one number'
      : '';
  }
}
