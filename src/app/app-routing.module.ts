import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FormsComponent } from './views/forms/forms.component';
import { ButtonsComponent } from './views/buttons/buttons.component';
import { TablesComponent } from './views/tables/tables.component';
import { IconsComponent } from './views/icons/icons.component';
import { TypographyComponent } from './views/typography/typography.component';
import { AlertsComponent } from './views/alerts/alerts.component';
import { AccordionsComponent } from './views/accordions/accordions.component';
import { BadgesComponent } from './views/badges/badges.component';
import { ProgressbarComponent } from './views/progressbar/progressbar.component';
import { BreadcrumbsComponent } from './views/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './views/pagination/pagination.component';
import { DropdownComponent } from './views/dropdown/dropdown.component';
import { TooltipsComponent } from './views/tooltips/tooltips.component';
import { CarouselComponent } from './views/carousel/carousel.component';
import { TabsComponent } from './views/tabs/tabs.component';
import {InboxComponent} from "./views/inbox/inbox.component";
import {ImprovementComponent} from "./views/improvement/improvement.component";
import {RatingComponent} from "./views/rating/rating.component";
import {CompetitionComponent} from "./views/competition/competition.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'improvement', component: ImprovementComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'competition', component: CompetitionComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordions', component: AccordionsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'dropdowns', component: DropdownComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'tabs', component: TabsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
