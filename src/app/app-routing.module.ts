import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from './views/theme/base/base.component';
import {CategorizationComponent} from './views/pages/categorization/categorization.component';
import {InboxPoolComponent} from './views/pages/inbox-pool/inbox-pool.component';
import {TaskManagementComponent} from './views/pages/task-management/task-management.component';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('src/app/views/pages/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'guest-experience',
      loadChildren: () => import('src/app/views/pages/guest-experience/guest-experience.module').then(m => m.GuestExperienceModule)
    },
    {path: 'task-management/:id', component: TaskManagementComponent},
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
        {
          path: 'template',
          loadChildren: () => import('src/app/views/pages/template/template.module').then(m => m.TemplateModule)
        },
        {
          path: 'employee',
          loadChildren: () => import('src/app/views/pages/employee/employee.module').then(m => m.EmployeeModule)
        },
        {
          path: 'inbox',
          loadChildren: () => import('src/app/views/pages/inbox/inbox.module').then(m => m.InboxModule)
        },
        {
          path: 'crm',
          loadChildren: () => import('src/app/views/pages/crm/crm.module').then(m => m.CrmModule)
        },
        {
          path: 'hotel-template',
          loadChildren: () => import('src/app/views/pages/hotel-template/hotel-template.module').then(m => m.HotelTemplateModule)
        },
        {
          path: 'guest',
          loadChildren: () => import('src/app/views/pages/guest/guest.module').then(m => m.GuestModule)
        },
        {
          path: 'change-password',
          loadChildren: () => import('src/app/views/pages/change-password/change-password.module').then(m => m.ChangePasswordModule)
        },
        {
          path: 'settings',
          loadChildren: () => import('src/app/views/pages/settings/settings.module').then(m => m.SettingsModule)
        },
        {
          path: 'personal',
          loadChildren: () => import('src/app/views/pages/personal/personal.module').then(m => m.PersonalModule)
        },
        {
          path: 'uplifts',
          loadChildren: () => import('src/app/views/pages/uplift/uplift.module').then(m => m.UpliftModule)
        },
        {path: 'categorization', component: CategorizationComponent},
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
