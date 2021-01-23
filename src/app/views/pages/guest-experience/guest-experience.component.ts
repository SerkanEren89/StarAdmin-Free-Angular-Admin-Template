import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GuestModel} from '../../../core/guest/_models/guest.model';
import {GuestService} from '../../../core/guest/_services/guest.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-guest-experience',
  templateUrl: './guest-experience.component.html',
  styleUrls: ['../../../app.component.scss', './guest-experience.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuestExperienceComponent implements OnInit {
  guestModel: GuestModel;


  constructor(private route: ActivatedRoute,
              private guestService: GuestService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.guestService.getGuest(id)
      .subscribe((guestModel: GuestModel) => {
        this.guestModel = guestModel;
        this.cdr.detectChanges();
      });
  }


  rate() {
    this.guestModel.evaluated = true;
    this.guestService.updateGuest(this.guestModel.uuid, this.guestModel)
      .subscribe((guestModel: GuestModel) => {
        this.toastr.success('Thank you for your evolution');
      });
  }
}
