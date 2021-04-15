import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-azure-media-services';
  myPlayer: any;
  lastSecond = 0;
  videoEnd= false;

  ngOnInit(): void{
    const myOptions = {
      'nativeControlsForTouch': false,
      controls: true,
      autoplay: true,
      muted: true,
      width: '700px',
      height: '420px',
    };


    this.myPlayer = amp('azuremediaplayer', myOptions);
    this.myPlayer.src([
      {
        'src': 'https://ethrai-usea.streaming.media.azure.net/b92ece06-9f6f-443b-8e32-43af8fca15e1/ignite.ism/manifest',
        'type': 'application/vnd.ms-sstr+xml'
      }
    ]);

    // setTimeout(()=>{
      let previousTime = 0;
      let currentTime = 0;

      let supposedCurrentTime =0;
      this.myPlayer.addEventListener('timeupdate',()=>{

        const videoDuration = Math.floor(this.myPlayer.duration());
        const currentSecond = Math.floor(this.myPlayer.currentTime());
        const timeReachedToTrack = Math.floor(80 * videoDuration / 100);

        this.lastSecond = currentSecond;

        /*if(currentSecond >= timeReachedToTrack && !itemToInteractWith.isDone && this.other.currentUser.type !== UserType.ANONYMOUS && this.enrollmentStuff.id) {

          itemToInteractWith.isDone = true;
          this.setPlayedItemAsDoneAndSeen(itemToInteractWith);

          // send teh track
        }*/

        previousTime = currentTime;
        currentTime = this.myPlayer.currentTime();
        if (!this.myPlayer.seeking()) {
          supposedCurrentTime = this.myPlayer.currentTime();
        }
      });

     /* if(this.currentItemLoad === itemToInteractWith.id){
        this.myPlayer.currentTime(this.currentCourseDetailSecond);
      }*/

      // prevent user to seek the video
      this.myPlayer.addEventListener('seeking', ()=> {
        const delta = this.myPlayer.currentTime() - supposedCurrentTime;
        // if(itemToInteractWith.isDone){
        //   console.log('currentTime=>Yes ');
        // }
        // else
        if (Math.abs(delta) > 1 && this.videoEnd === false) {
          this.myPlayer.currentTime(supposedCurrentTime) ;
          console.log('Prevent seeking');
        }
      });

      this.myPlayer.addEventListener('pause',()=>{
        console.log(' Video paused');
        // this.listenToPauseCloseOrReloadWindow();
      });

      this.myPlayer.addEventListener('ended',()=>{
        supposedCurrentTime = 0;
        this.videoEnd = true;
        console.log('Video ended');
        console.log(this.videoEnd);
        // this.moveToTheNextItem(itemToInteractWith,true);

      });
    // }, 2000);
  }
}
