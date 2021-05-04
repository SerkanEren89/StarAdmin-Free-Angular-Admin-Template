import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {PricingService} from '../../../../core/pricing/_services/pricing.service';
import {CommonService} from '../../../../core/general/_services/common.service';

@Component({
  selector: 'app-pricing-offer',
  styleUrls: ['../../../../app.component.scss', './pricing-offer.component.scss'],
  templateUrl: './pricing-offer.component.html'
})
export class PricingOfferComponent implements OnInit {
  features;

  constructor(private pricingService: PricingService,
              private commonService: CommonService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.features = this.commonService.getFeatureSet();
  }

  contactUs() {
    this.pricingService.contactUs()
      .subscribe((result: boolean) => {
        if (result) {
          this.toastr.success('We received your request. We will get in touch with you as soon as possible');
          this.cdr.detectChanges();
        }
      });
  }

  scrollToElement() {
    const toScroll = document.getElementById('featureTable');
    toScroll.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}
