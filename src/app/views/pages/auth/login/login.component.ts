import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {CommentService} from '../../../../core/inbox/_services/comment.service';
import {TranslationService} from '../../../../core/general/_services/translation.service';
import {HotelResponseService} from '../../../../core/hotel-response/_services/hotel-response.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  @ViewChild('fremiumModal') public fremiumModal: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private authService: AuthService,
              private commentService: CommentService,
              private hotelResponseService: HotelResponseService,
              private translationService: TranslationService) {
    // redirect to home if already logged in
    if (localStorage.getItem('hoteluplift-user')) {
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
          this.hotelResponseService.getHotelResponse()
            .pipe(first())
            .subscribe(
              hotelResponses => {
                localStorage.setItem('hotelResponses', JSON.stringify(hotelResponses));
                this.commentService.getCommentsAfterLastLogin(data.previousLogin)
                  .pipe(first())
                  .subscribe(
                    lastLogin => {
                      localStorage.setItem('lastComments', JSON.stringify(lastLogin));
                      if (this.authService.isFremium()) {
                        this.modalService.open(this.fremiumModal);
                      }
                      this.router.navigate([this.returnUrl]);
                    },
                    error => {
                      this.router.navigate([this.returnUrl]);
                    });
              },
              error => {
                this.router.navigate([this.returnUrl]);
              });
        },
        error => {
          this.loading = false;
        });
  }

  upgradeToPro() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('pricing/payment');
  }
}
