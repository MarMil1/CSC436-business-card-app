import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  private URL = `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVisionKey}`;
  result = {
    fname: '',
    lname: '',
    email: '',
    phone: ''
  }
  
constructor(private http: HttpClient) { }

textReader(image) {
  const parsedImage = image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  return this.http.post(this.URL,
    {
    requests: [{
      image: {
      content: parsedImage
      },
      features: [{
        type: 'TEXT_DETECTION'
      }]
    }]});
}

textFillIn(textReader): any {
  const textArray = textReader.responses[0].textAnnotations;

  for (let i = 0; i < textArray.length; i++) {
    if (textArray[i].description.includes('@')) {
      // console.log('Email: ' + textArray[i].description);
      this.result.email = textArray[i].description
    } else if (/\d/.test(textArray[i].description)) {
      // console.log('Phone: ' + textArray[i].description);
      this.result.phone = textArray[i].description;
    } else if (i === 3) {
      this.result.fname = textArray[i].description;
    } else if (i === 4) {
      this.result.lname = textArray[i].description;
    } 
  }
  return this.result;
}



}
