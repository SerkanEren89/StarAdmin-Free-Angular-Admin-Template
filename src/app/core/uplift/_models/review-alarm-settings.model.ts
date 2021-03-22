export class ReviewAlarmSettingsModel {
  sendSms: boolean;
  sendMail: boolean;
  minRating: number;
  maxRating: number;
  channelList: string[];
}
