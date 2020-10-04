import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InboxComponent} from './views/pages/inbox/inbox.component';
import {ImprovementComponent} from './views/pages/improvement/improvement.component';
import {BaseComponent} from './views/theme/base/base.component';

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
          path: 'competition',
          loadChildren: () => import('src/app/views/pages/competition/competition.module').then(m => m.CompetitionModule)
        },
        {
          path: 'task',
          loadChildren: () => import('src/app/views/pages/task/task.module').then(m => m.TaskModule)
        },
        {path: 'improvement', component: ImprovementComponent},
        {path: 'inbox', component: InboxComponent},
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
