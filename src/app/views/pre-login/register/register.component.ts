import { GENDER } from './../../../shared/constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  genderList = GENDER;
  registerFormGroup!: FormGroup;
  acceptanceCriteria = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)])]
    })
  }
  registerHandler() {
    const payload = { ...this.registerFormGroup.value };
    const usersList = localStorage.getItem('users');
    delete payload['confirmPassword'];
    if (usersList) {
      const arr = JSON.parse(usersList);
      const isUserExist = JSON.parse(usersList).findIndex((obj: any) => obj.email === payload.email);
      console.log(isUserExist);
      if (isUserExist === -1) {
        // when user exist
        arr.push(payload);
        localStorage.setItem('users', JSON.stringify(arr));
        alert('successfully registered');
        this.router.navigate(['login']);
      } else {
        alert('User already exist');
      }
    } else {
      localStorage.setItem('users', JSON.stringify([payload]));
      
    }
  }

}
