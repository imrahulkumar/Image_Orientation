import { Component, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("el") el: any
  title = 'imageOrientation';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  imageIndex = 0;
  imageUrl: any[] = ['https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
    'https://i.picsum.photos/id/372/200/200.jpg?hmac=QFGGlcWGNWBK0oDD1jghIaCvGIFU5iJJcd2VhF5oH6o']

  file: any;
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  cropperReady(e) {
    this.getFileTypeBlob(this.el.transformedBase64, this.el.format)
    this.el.cropper.x1 = 0;
    this.el.cropper.y1 = 0;
    this.el.cropper.x2 = 0;
    this.el.cropper.y2 = 0;
    this.el.cropperScaledMinHeight = 0
    this.el.cropperScaledMinWidth = 0
  }
  rotateLeft() {
    this.canvasRotation--;
  }
  rotateRight() {
    this.canvasRotation++;
  }

  getFileTypeBlob(d, imageFileFormat) {
    let phase1 = d.split(',')[0];
    let phase2 = phase1.split(';')[0];
    let type = phase2.split(':')[1]
    let blob = this.dataURItoBlob(d);
    this.file = new File([blob], `${this.randomNameGenerator()}`, { type: type });
  }


  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  randomNameGenerator() {
    let length = 9;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  next() {
    this.imageIndex = (this.imageIndex + 1) % this.imageUrl.length;
  }
  prev() {
    this.imageIndex = Math.abs((this.imageIndex - 1) % this.imageUrl.length);
  }

  download() {
    const url = window.URL.createObjectURL(this.file);
    window.open(url);
  }
}
