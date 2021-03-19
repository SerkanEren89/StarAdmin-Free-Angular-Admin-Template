import {Injectable} from '@angular/core';
import {PersonalModel} from '../../personal/_models/personal.model';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private translateService: TranslateService) {
  }

  getChannelFilter() {
    return [{
      name: 'BOOKING',
      checked: true
    }, {
      name: 'HOTELSCOM',
      checked: true
    }, {
      name: 'TRIPADVISOR',
      checked: true
    }, {
      name: 'AGODA',
      checked: true
    }, {
      name: 'GOOGLE',
      checked: true
    }, {
      name: 'HOLIDAYCHECK',
      checked: true
    }, {
      name: 'OTELPUAN',
      checked: true
    }, {
      name: 'ODAMAX',
      checked: true
    }, {
      name: 'TATILSEPETI',
      checked: true
    }];
  }

  getTravelerTypes() {
    let all = '';
    let couple = '';
    let group = '';
    let single = '';
    let business = '';
    let family = '';
    let other = '';
    this.translateService.get('GENERAL.ALL')
      .subscribe(text => {
        all = text;
      });
    this.translateService.get('GENERAL.COUPLE')
      .subscribe(text => {
        couple = text;
      });
    this.translateService.get('GENERAL.GROUP')
      .subscribe(text => {
        group = text;
      });
    this.translateService.get('GENERAL.SINGLE')
      .subscribe(text => {
        single = text;
      });
    this.translateService.get('GENERAL.BUSINESS')
      .subscribe(text => {
        business = text;
      });
    this.translateService.get('GENERAL.FAMILY')
      .subscribe(text => {
        family = text;
      });
    this.translateService.get('GENERAL.OTHER')
      .subscribe(text => {
        other = text;
      });
    return [
      {
        name: all,
        value: 'ALL'
      },
      {
        name: couple,
        value: 'COUPLE'
      },
      {
        name: group,
        value: 'GROUP'
      },
      {
        name: single,
        value: 'SINGLE'
      },
      {
        name: business,
        value: 'BUSINESS'
      },
      {
        name: family,
        value: 'FAMILY'
      },
      {
        name: other,
        value: 'OTHER'
      }];
  }

  getTaskFilterStatus() {
    let closed = '';
    let pending = '';
    let reminder = '';
    this.translateService.get('TASK.CLOSED')
      .subscribe(top => {
        closed = top;
      });
    this.translateService.get('TASK.PENDING')
      .subscribe(bottom => {
        pending = bottom;
      });
    this.translateService.get('TASK.REMINDER')
      .subscribe(bottom => {
        reminder = bottom;
      });
    return [{
      name: pending,
      checked: false
    }, {
      name: closed,
      checked: false
    }, {
      name: reminder,
      checked: false
    }];
  }

  getHorizontalPositions() {
    let leftText = '';
    let rightText = '';
    this.translateService.get('GENERAL.LEFT')
      .subscribe(left => {
        leftText = left;
      });
    this.translateService.get('GENERAL.RIGHT')
      .subscribe(right => {
        rightText = right;
      });
    return [{
      name: leftText,
      value: 'left'
    }, {
      name: rightText,
      value: 'right'
    }];
  }

  getVerticalPositions() {
    let topText = '';
    let bottomText = '';
    this.translateService.get('GENERAL.TOP')
      .subscribe(top => {
        topText = top;
      });
    this.translateService.get('GENERAL.BOTTOM')
      .subscribe(bottom => {
        bottomText = bottom;
      });
    return [{
      name: topText,
      value: 'top'
    }, {
      name: bottomText,
      value: 'bottom'
    }];
  }

  getHotelStatuses() {
    return [{
      title: 'Select status',
      value: 'Action'
    }, {
      title: 'Active (Free)',
      value: 'ACTIVE_FREE'
    }, {
      title: 'Active (Demo)',
      value: 'ACTIVE_DEMO'
    }, {
      title: 'Active (Paid)',
      value: 'ACTIVE_PAID'
    }, {
      title: 'Active (Loyal)',
      value: 'ACTIVE_LOYAL'
    }, {
      title: 'Deactive (Payment Waited)',
      value: 'DEACTIVE_PAYMENT'
    }, {
      title: 'Deactive',
      value: 'DEACTIVE'
    }, {
      title: 'Only Contact Information',
      value: 'POTENTIAL_1'
    }, {
      title: 'Talked/Zoomed With',
      value: 'POTENTIAL_2'
    }, {
      title: 'Agreement Waited',
      value: 'POTENTIAL_3'
    }];
  }

  getReportTypes() {
    return [{
      name: 'Select status',
      value: 'Action'
    }, {
      name: 'WEEKLY_REVIEW',
      value: 'Weekly Review'
    }, {
      name: 'RANKING_REPORT',
      value: 'Ranking Report'
    }, {
      name: 'COMPETITION_REPORT',
      value: 'Competition Report'
    }
      /*
      , {
        name: 'CATEGORIES',
        value: 'Categories'
      }
       */
    ];
  }

  getEmptyPersonal() {
    const personal = new PersonalModel();
    personal.firstName = 'Select';
    personal.lastName = 'Personal';
    return personal;
  }

  getVisitTypes() {
    return [{
      name: 'Select status',
      value: 'Action'
    }, {
      name: 'FACE2FACE',
      value: 'FACE2FACE'
    }, {
      name: 'ZOOM',
      value: 'ZOOM'
    }, {
      name: 'PHONE',
      value: 'PHONE'
    }, {
      name: 'OFFER',
      value: 'OFFER'
    }
      /*
      , {
        name: 'CATEGORIES',
        value: 'Categories'
      }
       */
    ];
  }

  getLanguages() {
    return [
      {
        name: 'tr',
        value: 'Türkçe'
      }, {
        name: 'en',
        value: 'English'
      }];
  }
}
