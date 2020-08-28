import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',
    loadChildren: () => import('src/app/views/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'competition',
    loadChildren: () => import('src/app/views/competition/competition.module').then(m => m.CompetitionModule)},
  { path: 'task',
    loadChildren: () => import('src/app/views/task/task.module').then(m => m.TaskModule)},
  { path: 'improvement', component: ImprovementComponent },
  { path: 'inbox', component: InboxComponent },
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
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
