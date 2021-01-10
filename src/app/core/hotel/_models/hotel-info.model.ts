import {UserModel} from '../../auth/_models/user.model';
import {HotelContactModel} from './hotel-contact.model';
import {HotelVisitModel} from './hotel-visit.model';

export class HotelInfoModel {
  id: number;
  uuid: string;
  name: string;
  contactPerson: string;
  contactNumber: string;
  address: string;
  contactNotes: string;
  selected: boolean;
  hotelStatus: string;
  user: UserModel;
  hotelContactList: HotelContactModel[];
  hotelVisitList: HotelVisitModel[];
}
