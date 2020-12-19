import {UserModel} from '../../auth/_models/user.model';

export class HotelInfoModel {
  id: number;
  uuid: string;
  name: string;
  contactPerson: string;
  contactNumber: string;
  address: string;
  selected: boolean;
  user: UserModel;
}
