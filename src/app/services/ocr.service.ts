import { Injectable } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class OCRService {
  worker!: Tesseract.Worker;
  constructor() {}

  async decodeImage(base64Image: string): Promise<string> {
    this.worker = await createWorker(['ben', 'eng']);
    console.log('Worker created', { worker: this.worker });
    
    await this.worker.load();

    const  data  = await this.worker.recognize(base64Image);
    await this.worker.terminate();
    console.log('Text extracted',  data.data );
    
    return data.data.text;
  }

}
