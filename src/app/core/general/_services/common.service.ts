import {Injectable} from '@angular/core';
import {PersonalModel} from '../../personal/_models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
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
    return [
      {
        name: 'All',
        value: 'ALL'
      },
      {
        name: 'Couple',
        value: 'COUPLE'
      },
      {
        name: 'Group',
        value: 'GROUP'
      },
      {
        name: 'Single',
        value: 'SINGLE'
      },
      {
        name: 'Business',
        value: 'BUSINESS'
      },
      {
        name: 'Family',
        value: 'FAMILY'
      },
      {
        name: 'Other',
        value: 'OTHER'
      }];
  }

  getTaskFilterStatus() {
    return [{
      name: 'PENDING',
      checked: false
    }, {
      name: 'CLOSED',
      checked: false
    }, {
      name: 'REMINDER',
      checked: false
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
