import { Component, OnInit, ViewChild } from '@angular/core';
import { SentenceComponent } from '.././sentence/sentence.component';
import { LessonService } from './lesson.service';
import { DifficultSound } from './lesson.service';


@Component({
  selector: 'lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
  providers: [LessonService]
})

export class lessonComponent implements OnInit {

  @ViewChild("currentSentence") currentSentence: SentenceComponent;
  
  constructor(service: LessonService) { 
    this.difficultSounds = service.getDifficultSounds();
  }

  difficultSounds = [];

  showSoundLightupInTime() {
    this.currentSentence.showSoundLightupInTime();
  }

  difficultSoundClicked(difficultSoundindex: number, soundNum: number, isSelected: boolean) {      
    this.deSelectDifficultSounds();
    this.difficultSounds[difficultSoundindex].isSelected = !isSelected;        
    this.currentSentence.setSoundsStatus(soundNum, this.difficultSounds[difficultSoundindex].isSelected);    
  }

  deSelectDifficultSounds() {
    this.difficultSounds.forEach((difficultSound: DifficultSound) => {
      difficultSound.isSelected = false;
    })    

  }
  ngOnInit() {
  }
}

