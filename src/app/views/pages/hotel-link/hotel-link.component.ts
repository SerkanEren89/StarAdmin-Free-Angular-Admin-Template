import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HotelLinkService} from '../../../core/hotel-link/_services/hotel-link.service';
import {HotelLinkModel} from '../../../core/hotel-link/_models/hotel-link.model';
import {ToastrService} from 'ngx-toastr';
import {CommentCountModel} from '../../../core/inbox/_models/comment-count.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {HotelResponseService} from '../../../core/hotel-response/_services/hotel-response.service';
import {HotelResponseModel} from '../../../core/hotel-response/_models/hotel-response.model';

@Component({
  selector: 'app-hotel-link',
  templateUrl: './hotel-link.component.html',
  styleUrls: ['../../../app.component.scss', './hotel-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HotelLinkComponent implements OnInit {
  hotelLink: HotelLinkModel;
  commentCountList: CommentCountModel[];
  count: any =
    {
      odamax: 0,
      google: 0,
      booking: 0,
      tripadvisor: 0,
      otelpuan: 0,
      hotelscom: 0,
      holidaycheck: 0,
      agoda: 0
    };
  hotelResponse: HotelResponseModel;

  constructor(private hotelLinkService: HotelLinkService,
              private hotelResponseService: HotelResponseService,
              private commentService: CommentService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.hotelLink = new HotelLinkModel();
    this.hotelLinkService.getHotelLinks()
      .subscribe((hotelLink: HotelLinkModel) => {
        this.hotelLink = hotelLink;
        this.cdr.detectChanges();
      });
    this.commentService.getCommentsByCount()
      .subscribe((commentCountList: CommentCountModel[]) => {
        this.commentCountList = commentCountList;
        this.setCommentCounts();
        this.cdr.detectChanges();
      });
    this.hotelResponseService.getHotelResponse()
      .subscribe((hotelResponse: HotelResponseModel) => {
        this.hotelResponse = hotelResponse;
        this.cdr.detectChanges();
      },
        error => {
          this.hotelResponse = new HotelResponseModel();
        });
  }

  startGoogleCrawling() {
    this.hotelLinkService.crawlGoogle()
      .subscribe((result: Boolean) => {
        this.toastr.success('google crawler started');
        this.cdr.detectChanges();
      });
  }

  startBookingCrawling() {
    this.hotelLinkService.crawlBooking()
      .subscribe((result: Boolean) => {
        this.toastr.success('booking crawler started');
        this.cdr.detectChanges();
      });
  }

  startTripAdvisorCrawling() {
    this.hotelLinkService.crawlTripAdvisor()
      .subscribe((result: Boolean) => {
        this.toastr.success('tripadvisor crawler started');
        this.cdr.detectChanges();
      });
  }

  startHotelsComCrawling() {
    this.hotelLinkService.crawlHotelsCom()
      .subscribe((result: Boolean) => {
        this.toastr.success('hotelscom crawler started');
        this.cdr.detectChanges();
      });
  }

  startOtelPuanCrawling() {
    this.hotelLinkService.crawlOtelpuan()
      .subscribe((result: Boolean) => {
        this.toastr.success('otelpuan crawler started');
        this.cdr.detectChanges();
      });
  }

  startHolidayCheckCrawling() {
    this.hotelLinkService.crawlHolidayCheck()
      .subscribe((result: Boolean) => {
        this.toastr.success('holiday check crawler started');
        this.cdr.detectChanges();
      });
  }

  startAgodaCrawling() {
    this.hotelLinkService.crawlAgoda()
      .subscribe((result: Boolean) => {
        this.toastr.success('agoda crawler started');
        this.cdr.detectChanges();
      });
  }

  saveHotelLink() {
    this.hotelLinkService.saveHotelLinks(this.hotelLink)
      .subscribe((hotelLinkModel: HotelLinkModel) => {
        this.hotelLink = hotelLinkModel;
        this.toastr.success('hotel links saved with success');
        this.cdr.detectChanges();
      });
  }

  private setCommentCounts() {

    for (const commentCountModel of this.commentCountList) {
      if (commentCountModel.label === 'OTELPUAN') {
        this.count.otelpuan = commentCountModel.count;
      } else if (commentCountModel.label === 'GOOGLE') {
        this.count.google = commentCountModel.count;
      } else if (commentCountModel.label === 'TRIPADVISOR') {
        this.count.tripadvisor = commentCountModel.count;
      } else if (commentCountModel.label === 'HOTELSCOM') {
        this.count.hotelscom = commentCountModel.count;
      } else if (commentCountModel.label === 'BOOKING') {
        this.count.booking = commentCountModel.count;
      } else if (commentCountModel.label === 'ODAMAX') {
        this.count.odamax = commentCountModel.count;
      }
    }
  }

  saveHotelResponse() {
    this.hotelResponseService.saveHotelResponse(this.hotelResponse)
      .subscribe((hotelResponse: HotelResponseModel) => {
        this.hotelResponse = hotelResponse;
        this.toastr.success('Hotel response saved with success');
        this.cdr.detectChanges();
      });
  }
}
