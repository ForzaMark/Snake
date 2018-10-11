import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { SnakeMenuComponent } from './snake-menu/snake-menu.component';
import { SnakeEditorComponent } from './snake-editor/snake-editor.component';
import { SnakeEditorPreviewComponent } from './snake-editor-preview/snake-editor-preview.component';

const routes: Routes = [
  { path: '', component: SnakeMenuComponent },
  { path: 'snake-game', component: SnakeGameComponent },
  { path: 'snake-menu', component: SnakeMenuComponent },
  { path: 'snake-editor', component: SnakeEditorComponent},
  { path: 'snake-editor-preview', component: SnakeEditorPreviewComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
