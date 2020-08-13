import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {NavbarComponent} from './views/navbar/navbar.component';
import {SidebarComponent} from './views/sidebar/sidebar.component';
import {FooterComponent} from './views/footer/footer.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {ButtonsComponent} from './views/buttons/buttons.component';
import {TablesComponent} from './views/tables/tables.component';
import {TypographyComponent} from './views/typography/typography.component';
import {IconsComponent} from './views/icons/icons.component';
import {AlertsComponent} from './views/alerts/alerts.component';
import {AccordionsComponent} from './views/accordions/accordions.component';
import {BadgesComponent} from './views/badges/badges.component';
import {ProgressbarComponent} from './views/progressbar/progressbar.component';
import {BreadcrumbsComponent} from './views/breadcrumbs/breadcrumbs.component';
import {PaginationComponent} from './views/pagination/pagination.component';
import {DropdownComponent} from './views/dropdown/dropdown.component';
import {TooltipsComponent} from './views/tooltips/tooltips.component';
import {CarouselComponent} from './views/carousel/carousel.component';
import {TabsComponent} from './views/tabs/tabs.component';
import {LineChartComponent} from "./views/line-chart/line-chart.component";
import {ChartsModule} from "ng2-charts";
import {InboxComponent} from "./views/inbox/inbox.component";
import {ImprovementComponent} from "./views/improvement/improvement.component";
import {RatingComponent} from "./views/rating/rating.component";
import {CompetitionComponent} from "./views/competition/competition.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    InboxComponent,
    ImprovementComponent,
    RatingComponent,
    CompetitionComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    AlertsComponent,
    AccordionsComponent,
    BadgesComponent,
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    TabsComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
