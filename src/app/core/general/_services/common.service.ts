import {Injectable} from '@angular/core';

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
}
