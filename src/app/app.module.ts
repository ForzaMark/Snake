import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { SnakeMenuComponent } from './snake-menu/snake-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeEditorComponent } from './snake-editor/snake-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeGameComponent,
    SnakeMenuComponent,
    SnakeEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
