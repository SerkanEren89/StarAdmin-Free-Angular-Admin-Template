import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {first} from 'rxjs/operators';
import {CommonService} from '../../../../core/general/_services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  languages;
  selectedLanguage: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private commonService: CommonService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      preferredLanguage: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.languages = this.commonService.getLanguages();
    this.selectLanguage(this.languages[0]);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        });
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language;
    this.registerForm.controls['preferredLanguage'].setValue(this.selectedLanguage.name);
  }
}
