import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { SnakeMenuComponent } from './snake-menu/snake-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeEditorComponent } from './snake-editor/snake-editor.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SnakeEditorPreviewComponent } from './snake-editor-preview/snake-editor-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeGameComponent,
    SnakeMenuComponent,
    SnakeEditorComponent,
    SnakeEditorPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
