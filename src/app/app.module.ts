import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { lessonComponent } from './lesson/lesson.component';
import { SentenceComponent } from './sentence/sentence.component';

@NgModule({
  declarations: [
    AppComponent,
    lessonComponent,
    SentenceComponent

  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
