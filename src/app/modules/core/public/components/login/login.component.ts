import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first  } from 'rxjs/operators';

import { AuthenticationService } from 'app/_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  loginForm: FormGroup;
  returnUrl: string;
  error: string;


  // Getter for conveniently accessing to form fields.
  get f() { return this.loginForm.controls; }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {

    // Redirect to home if already logged in
    if (authenticationService.CurrentUserValue) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

  }

  onSubmit(): void {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      err => {
        this.error = err;
        this.loading = false;
      }
    );

  }

}
