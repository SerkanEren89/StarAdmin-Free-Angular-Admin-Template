import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from './views/theme/base/base.component';
import {CategorizationComponent} from './views/pages/categorization/categorization.component';
import {InboxComponent} from './views/pages/inbox/inbox.component';
import {InboxPoolComponent} from './views/pages/inbox-pool/inbox-pool.component';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('src/app/views/pages/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: '',
      component: BaseComponent,
      children: [
        {
          path: 'dashboard',
          loadChildren: () => import('src/app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
          path: 'category',
          loadChildren: () => import('src/app/views/pages/category/category.module').then(m => m.CategoryModule)
        },
        {
          path: 'competition',
          loadChildren: () => import('src/app/views/pages/competition/competition.module').then(m => m.CompetitionModule)
        },
        {
          path: 'popularity',
          loadChildren: () => import('src/app/views/pages/popularity/popularity.module').then(m => m.PopularityModule)
        },
        {
          path: 'task',
          loadChildren: () => import('src/app/views/pages/task/task.module').then(m => m.TaskModule)
        },
        {path: 'categorization', component: CategorizationComponent},
        {path: 'inbox', component: InboxComponent},
        {path: 'inbox-pool', component: InboxPoolComponent},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
      ]
    },
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
