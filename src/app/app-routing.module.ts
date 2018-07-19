import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { AppSnakeMenunComponent } from './app-snake-menun/app-snake-menun.component';

const routes: Routes = [
  { path: '', component: AppSnakeMenunComponent },
  { path: 'snake-game', component: SnakeGameComponent },
  { path: 'snake-menu', component: AppSnakeMenunComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
