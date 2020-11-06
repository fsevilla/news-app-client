import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SessionService } from './../../globals/services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form:FormGroup;
  answers:any;

  constructor(private formBuilder:FormBuilder, private sessionService:SessionService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.compararPasswords.bind(this)
    });
  }

  crearUsuario() {
    if(this.form.valid) {
      console.log('Crear usuario...');
      this.sessionService.signup(this.form.getRawValue()).then().catch(err => {
        console.error('Failed to signup user', err);
      });
    } else {
      console.log('Te faltan datos')
    }
  }

  compararPasswords() {
    if(!this.form) { return null; }
    const values = this.form.getRawValue();
    if(values.password === values.confirm) {
      return null;
    } else {
      return { mismatch: true }
    }
  }

}
