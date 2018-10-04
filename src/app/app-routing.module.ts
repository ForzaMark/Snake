import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { SnakeMenuComponent } from './snake-menu/snake-menu.component';

const routes: Routes = [
  { path: '', component: SnakeMenuComponent },
  { path: 'snake-game', component: SnakeGameComponent },
  { path: 'snake-menu', component: SnakeMenuComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
