import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { OCRService } from '../services/ocr.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scannedText: string = '';
  capturedImage: string | null = null; // Variable to store the captured image
  isProcessing: boolean = false; // Variable to control progress bar visibility

  constructor(private ocrService: OCRService, private platform: Platform) {}

  async scanImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      this.capturedImage = 'data:image/jpeg;base64,' + image.base64String; // Store the captured image
      this.isProcessing = true; // Show the progress bar
      this.scannedText = await this.ocrService.decodeImage(this.capturedImage);
    } catch (error) {
      console.error('Error capturing image', error);
      if (error === 'User cancelled photos app') {
        alert('Image capture cancelled.');
      } else {
        alert('An error occurred while capturing the image. Please try again.');
      }
    } finally {
      this.isProcessing = false; // Hide the progress bar after processing
    }
  }
}
