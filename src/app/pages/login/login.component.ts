import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";

import { AuthService } from 'src/app/globals/services/auth.service';
import { SessionService } from 'src/app/globals/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  inputType:string = 'password';
  loginError:boolean;

  constructor(
    private formBuilder:FormBuilder,
    private sessionService:SessionService,
    private authService:AuthService,
    private router:Router,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      if(user) {
        console.log('Google User?', user);
        this.sessionService.googleLogin(user.idToken).then(response => {
          this.authService.save(response, true);
          this.loginError = false;
          this.router.navigate(['/recientes']);
        });
      }
    });
  }

  login() {
    console.log('Iniciar sesion', this.form.getRawValue());
    this.sessionService.login(this.form.getRawValue()).then(response => {
      console.log('Inicio sesion ', response.token);
      this.authService.save(response);
      this.loginError = false;
      this.router.navigate(['/recientes']);
    }).catch(err => {
      this.loginError = true;
      this.router.navigate(['/recientes']);
    });

  }

  togglePasswordView() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
