import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  progress: boolean = false;
  public percentOfUploading$: Observable<number>;

  constructor(
    private uploadService:UploadService
  ) {
    this.percentOfUploading$ = this.uploadService.percentageChange.
    pipe(startWith(0))
  }

  onChange(event:any){
    this.progress = true
    const file = event.target.files
    this.uploadService.uploadImage(file).subscribe(
      (uploadResponse:any) => {
        if(uploadResponse.type === HttpEventType.UploadProgress){
          if(uploadResponse.total) {
            let percentage = Math.round(
              (100*uploadResponse.loaded) / uploadResponse.total
            )
            this.uploadService.progessPercentage(percentage)
          }
        }
      }
    )
  }

}
