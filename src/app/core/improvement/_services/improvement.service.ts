import {Injectable} from "@angular/core";
import {CommentModel} from "../../inbox/_models/comment.model";
import {ImprovementModel} from "../_models/improvement.model";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImprovementService {

  getAllImprovementList() {
    let improvements: ImprovementModel[] = new Array<ImprovementModel>();
    let improvement7: ImprovementModel  = new ImprovementModel();
    improvement7.category = 'Pricing';
    improvement7.performance = 64;
    improvement7.mentionCount = 460;
    improvement7.positiveMentionCount = 270;
    improvement7.neutralMentionCount = 40;
    improvement7.negativeMentionCount = 150;
    improvements.push(improvement7);

    let improvement1: ImprovementModel  = new ImprovementModel();
    improvement1.category = 'Amenities';
    improvement1.performance = 48;
    improvement1.mentionCount = 228;
    improvement1.positiveMentionCount = 112;
    improvement1.neutralMentionCount = 3;
    improvement1.negativeMentionCount = 113;
    improvements.push(improvement1);

    let improvement2: ImprovementModel  = new ImprovementModel();
    improvement2.category = 'Foods';
    improvement2.performance = 88;
    improvement2.mentionCount = 305;
    improvement2.positiveMentionCount = 230;
    improvement2.neutralMentionCount = 30;
    improvement2.negativeMentionCount = 45;
    improvements.push(improvement2);

    let improvement3: ImprovementModel  = new ImprovementModel();
    improvement3.category = 'Bar and Beverages';
    improvement3.performance = 48;
    improvement3.mentionCount = 88;
    improvement3.positiveMentionCount = 42;
    improvement3.neutralMentionCount = 3;
    improvement3.negativeMentionCount = 43;
    improvements.push(improvement3);

    let improvement5: ImprovementModel  = new ImprovementModel();
    improvement5.category = 'Cleanliness';
    improvement5.performance = 63;
    improvement5.mentionCount = 423;
    improvement5.positiveMentionCount = 266;
    improvement5.neutralMentionCount = 10;
    improvement5.negativeMentionCount = 147;
    improvements.push(improvement5);

    let improvement4: ImprovementModel  = new ImprovementModel();
    improvement4.category = 'Reception';
    improvement4.performance = 67;
    improvement4.mentionCount = 3;
    improvement4.positiveMentionCount = 2;
    improvement4.neutralMentionCount = 0;
    improvement4.negativeMentionCount = 1;
    improvements.push(improvement4);

    let improvement6: ImprovementModel  = new ImprovementModel();
    improvement6.category = 'Wifi';
    improvement6.performance = 82;
    improvement6.mentionCount = 325;
    improvement6.positiveMentionCount = 266;
    improvement6.neutralMentionCount = 10;
    improvement6.negativeMentionCount = 49;
    improvements.push(improvement6);

    return of(improvements);
  }

  assessmentByLanguage() {
    let improvements: ImprovementModel[] = new Array<ImprovementModel>();
    let improvement7: ImprovementModel  = new ImprovementModel();
    improvement7.language = 'Turkish';
    improvement7.performance = 64;
    improvement7.mentionCount = 460;
    improvement7.positiveMentionCount = 270;
    improvement7.neutralMentionCount = 40;
    improvement7.negativeMentionCount = 150;
    improvements.push(improvement7);

    let improvement1: ImprovementModel  = new ImprovementModel();
    improvement1.language = 'English';
    improvement1.performance = 48;
    improvement1.mentionCount = 228;
    improvement1.positiveMentionCount = 112;
    improvement1.neutralMentionCount = 3;
    improvement1.negativeMentionCount = 113;
    improvements.push(improvement1);

    let improvement2: ImprovementModel  = new ImprovementModel();
    improvement2.language = 'German';
    improvement2.performance = 88;
    improvement2.mentionCount = 305;
    improvement2.positiveMentionCount = 230;
    improvement2.neutralMentionCount = 30;
    improvement2.negativeMentionCount = 45;
    improvements.push(improvement2);

    let improvement3: ImprovementModel  = new ImprovementModel();
    improvement3.language = 'Arabic';
    improvement3.performance = 48;
    improvement3.mentionCount = 88;
    improvement3.positiveMentionCount = 42;
    improvement3.neutralMentionCount = 3;
    improvement3.negativeMentionCount = 43;
    improvements.push(improvement3);

    let improvement5: ImprovementModel  = new ImprovementModel();
    improvement5.language = 'Spanish';
    improvement5.performance = 63;
    improvement5.mentionCount = 423;
    improvement5.positiveMentionCount = 266;
    improvement5.neutralMentionCount = 10;
    improvement5.negativeMentionCount = 147;
    improvements.push(improvement5);

    let improvement4: ImprovementModel  = new ImprovementModel();
    improvement4.language = 'French';
    improvement4.performance = 67;
    improvement4.mentionCount = 3;
    improvement4.positiveMentionCount = 2;
    improvement4.neutralMentionCount = 0;
    improvement4.negativeMentionCount = 1;
    improvements.push(improvement4);

    let improvement6: ImprovementModel  = new ImprovementModel();
    improvement6.language = 'Dutch';
    improvement6.performance = 82;
    improvement6.mentionCount = 325;
    improvement6.positiveMentionCount = 266;
    improvement6.neutralMentionCount = 10;
    improvement6.negativeMentionCount = 49;
    improvements.push(improvement6);

    return of(improvements);
  }

  assessmentByTravelType() {
    let improvements: ImprovementModel[] = new Array<ImprovementModel>();
    let improvement7: ImprovementModel  = new ImprovementModel();
    improvement7.travelType = 'Couple';
    improvement7.performance = 64;
    improvement7.mentionCount = 460;
    improvement7.positiveMentionCount = 270;
    improvement7.neutralMentionCount = 40;
    improvement7.negativeMentionCount = 150;
    improvements.push(improvement7);

    let improvement1: ImprovementModel  = new ImprovementModel();
    improvement1.travelType = 'Single';
    improvement1.performance = 48;
    improvement1.mentionCount = 228;
    improvement1.positiveMentionCount = 112;
    improvement1.neutralMentionCount = 3;
    improvement1.negativeMentionCount = 113;
    improvements.push(improvement1);

    let improvement2: ImprovementModel  = new ImprovementModel();
    improvement2.travelType = 'Family';
    improvement2.performance = 88;
    improvement2.mentionCount = 305;
    improvement2.positiveMentionCount = 230;
    improvement2.neutralMentionCount = 30;
    improvement2.negativeMentionCount = 45;
    improvements.push(improvement2);

    let improvement3: ImprovementModel  = new ImprovementModel();
    improvement3.travelType = 'Friends';
    improvement3.performance = 48;
    improvement3.mentionCount = 88;
    improvement3.positiveMentionCount = 42;
    improvement3.neutralMentionCount = 3;
    improvement3.negativeMentionCount = 43;
    improvements.push(improvement3);

    return of(improvements);
  }
}
