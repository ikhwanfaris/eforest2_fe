import { PostLoginModule } from './post-login/post-login.module';
import { PreLoginModule } from './pre-login/pre-login.module';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorModule } from './error/error.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pre-login/pre-login.module').then(m => m.PreLoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./post-login/post-login.module').then(m => m.PostLoginModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
];

@NgModule({
  imports: [
    PreLoginModule,
    PostLoginModule,
    ErrorModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
