import {PersonalModel} from '../../personal/_models/personal.model';

export class HotelFilterModel {
  name = '';
  statusList: string[];
  personal: PersonalModel;
}
