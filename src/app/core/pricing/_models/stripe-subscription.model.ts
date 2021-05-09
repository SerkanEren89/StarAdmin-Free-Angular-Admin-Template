import {PlanModel} from './plan.model';

export class StripeSubscriptionModel {
  subscriptionId: string;
  offerId: string;
  customerId: string;
  plan: PlanModel;
  token: string;
  email: string;
}
