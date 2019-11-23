import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Subject, Observable, Subscription } from 'rxjs';
import domtoimage from 'dom-to-image';
import { WebcamService } from '../webcam.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnDestroy {
  sub = new Subscription();
  
  @Output() base64 = new EventEmitter();

  public errors: WebcamInitError[] = [];

  public webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  showWebcam = true;

  result = {
    fname: '',
    lname: '',
    email: '',
    phone: ''
  }

  @Output() textsFromWebCam = new EventEmitter();

  constructor(private webCamService: WebcamService) { }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }

  confirm() {
    const imageSnapshot = document.getElementById('imageSnapshot');
    // console.log(imageSnapshot);
    domtoimage.toPng(imageSnapshot)
    .then( (dataUrl: string) => {
      // console.log(dataUrl);
      const tempSub = this.webCamService.textReader(dataUrl)
      .subscribe(res => {
        this.result = this.webCamService.textFillIn(res);
        this.textsFromWebCam.emit(this.result);
      });    
      this.sub.add(tempSub);
      this.base64.emit(dataUrl);
    }).catch( (e: any) => {
      console.log('SELECTED IMAGE BASE64 SOMETHING WENT WRONG');
      console.log(e);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
