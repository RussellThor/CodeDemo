import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sound, SentenceService } from './sentence.service';

@Component({
  selector: 'sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./../lesson/lesson.component.css', 
              './sentence.component.css'],
  providers: [SentenceService],
})
export class SentenceComponent implements OnInit {

  @Output('letter-clicked-for-lesson') letterClickedForLesson = new EventEmitter();
  
  constructor(service: SentenceService) { 
    this.words = service.getSentenceData();
    let realTimePlaybackData = service.formatDataForRealTimePlayback(this.words);
    this.soundStartTimeFlatArray = realTimePlaybackData.flatTimingData;
    this.totalLengthOfSentenceMilliSeconds = realTimePlaybackData.totalSentenceTime;
  }

  timeTickIntervalMilliSeconds = 10;
  interval = null;
  isPlaying = false;
  currentTimeMilliSeconds = 0; // records in real time how long since the sound light up button was pushed.
  totalLengthOfSentenceMilliSeconds: number = 0;
  words = [];
  soundStartTimeFlatArray = [];
  
  showSoundLightupInTime() {
    // Make the sounds in the sentence light up as if they were in time with someone saying the sentence slowly.
    // we need to keep track of the current time and compare it to the start/stop times of each sound in the sentence
    // to decide what sound should currently be lit up.
    // This could be done more efficiency if it used the soundTimeFlatArray, also could setInterval as the sound length, discuss.
    if (!this.isPlaying) {      
      this.isPlaying = true; // can get a resource leak if you don't do this, discuss etc.
      this.interval = setInterval(
        () => {
          // Called each timer tick, 10 milliseconds in this case.
          // Check that the current time is less than the total time it takes to say the sentence.
          // If it is, then light up the correct sound, else stop the timer, and reset the state variables.
          if (this.currentTimeMilliSeconds <= this.totalLengthOfSentenceMilliSeconds) {            
            this.currentTimeMilliSeconds += this.timeTickIntervalMilliSeconds;

            // generate the start time of the sound being checked. It is calculated as a cumulative sum each time which is obviously not the most efficient.
            let startTimeOfCurrentSoundToCheck: number = 0;            
            this.words.forEach(word => {
              word.forEach((sound:Sound ) => {
                sound.isSelected = false;
                // to decide if a sound should be lit up, the current time should be greater than its start time and less than its end time (start time + duration)
                if ((this.currentTimeMilliSeconds >= startTimeOfCurrentSoundToCheck) && (this.currentTimeMilliSeconds <= startTimeOfCurrentSoundToCheck + sound.durationInMilliSeconds)) {
                  sound.isSelected = true;
                }
                startTimeOfCurrentSoundToCheck += sound.durationInMilliSeconds;
              })
            });
          } else {
            clearInterval(this.interval);
            this.currentTimeMilliSeconds = 0;
            this.isPlaying = false;
          }
        }
        , this.timeTickIntervalMilliSeconds)
    }
  }

  letterClicked($event: Event, wordIndex: number, i: number) {
    this.words[wordIndex][i].isSelected = !this.words[wordIndex][i].isSelected;
    this.setSoundsStatus(this.words[wordIndex][i].soundNum, this.words[wordIndex][i].isSelected);
    this.letterClickedForLesson.emit();    
    $event.stopPropagation();
  }

  // set all the sounds of that type in the sentence to active/inactive
  setSoundsStatus(soundNum: number, isSelected: boolean) {

    this.words.forEach(word => {
      word.forEach((sound: Sound) => {
        sound.isSelected = false;
        if (sound.soundNum == soundNum) {
          sound.isSelected = isSelected;
        }
      })
    });
  }
  
  ngOnInit() {
  }

}
