import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {CommentService} from '../../../../core/inbox/_services/comment.service';
import {TranslationService} from '../../../../core/general/_services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private commentService: CommentService,
              private translationService: TranslationService) {
    // redirect to home if already logged in
    if (localStorage.getItem('revxray-user')) {
      this.translationService.setLanguage(this.translationService.getSelectedLanguage());
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.commentService.getCommentsAfterLastLogin(data.previousLogin)
            .pipe(first())
            .subscribe(
              lastLoginData => {
                localStorage.setItem('lastComments', JSON.stringify(lastLoginData));
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.router.navigate([this.returnUrl]);
              });
        },
        error => {
          this.loading = false;
        });
  }
}
