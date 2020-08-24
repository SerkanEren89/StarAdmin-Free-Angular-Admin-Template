import {Observable, of} from "rxjs";
import {CommentModel} from "../_models/comment.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  getCommentList() : Observable<CommentModel[]> {
    let comments: CommentModel[] = new Array<CommentModel>();
    let comment1: CommentModel  = new CommentModel();
    comment1.content = 'Güzel tatil geçirdim.personelden çok memnun olup ,herkese tavsiye ederim.';
    comment1.source = "Booking.com";
    comment1.commentDate = new Date();
    comment1.travelDate = new Date();
    comment1.rating = 8.8;
    comment1.writtenBy = 'Serkan E.';
    comments.push(comment1);

    let comment2: CommentModel  = new CommentModel();
    comment2.content = 'Yemekleri basarili. Plaji asiri ruzgarli ve dalgali, eleman eksikligi var hersey cok yavas. Valizleri yarim saat bekledikten sonra gidip lobiden kendimiz aldik. Ortak wc de bozuk musluk uyarmama ragmen 24 saat sonra hala su akitiyordu';
    comment2.source = "TripAdvisor";
    comment2.commentDate = new Date();
    comment2.travelDate = new Date();
    comment2.rating = 7.0;
    comment2.writtenBy = 'Fatih B.';
    comments.push(comment2);

    let comment3: CommentModel  = new CommentModel();
    comment3.content = 'Genel olarak çok memnun kaldık. Bir tek odanız kara manzaralı ise çırcır böceklerınden balkon keyfi yapamıyorsunuz sesten';
    comment3.source = "Hotels.com";
    comment3.commentDate = new Date();
    comment3.travelDate = new Date();
    comment3.rating = 8.0;
    comment3.writtenBy = 'Sercan T.';
    comments.push(comment3);

    let comment4: CommentModel  = new CommentModel();
    comment4.content = 'Ortalama. Wifi çok kötüydü';
    comment4.source = "Booking.com";
    comment4.commentDate = new Date();
    comment4.travelDate = new Date();
    comment4.rating = 7.0;
    comment4.writtenBy = 'Merve G.';
    comments.push(comment4);

    let comment5: CommentModel  = new CommentModel();
    comment5.content = 'Odam kottaydı, daha ne kadar kötü olabilir ki.';
    comment5.source = "TripAdvisor.com";
    comment5.commentDate = new Date();
    comment5.travelDate = new Date();
    comment5.rating = 6.0;
    comment5.writtenBy = 'Oguzhan A.';
    comments.push(comment5);

    let comment6: CommentModel  = new CommentModel();
    comment6.content = 'Pis odalari. Banyo eski sinek dolu. Havuzlari bakimsiz personel guler yuzlu ilgili degil. Hizmet kalitesi cok dusuk. Mudurunden tut temizlikcisine kadar ilgisiz';
    comment6.source = "TripAdvisor.com";
    comment6.commentDate = new Date();
    comment6.travelDate = new Date();
    comment6.rating = 3.0;
    comment6.writtenBy = 'Mustafa D.';
    comments.push(comment6);

    let comment7: CommentModel  = new CommentModel();
    comment7.content = 'Yemekleri basarili. Plaji asiri ruzgarli ve dalgali, eleman eksikligi var hersey cok yavas. Valizleri yarim saat bekledikten sonra gidip lobiden kendimiz aldik. Ortak wc de bozuk musluk uyarmama ragmen 24 saat sonra hala su akitiyordu';
    comment7.source = "Tatilsepeti.com";
    comment7.commentDate = new Date();
    comment7.travelDate = new Date();
    comment7.rating = 6.0;
    comment7.writtenBy = 'Behzat Ç.';
    comments.push(comment7);
    return of(comments);
  }
}
