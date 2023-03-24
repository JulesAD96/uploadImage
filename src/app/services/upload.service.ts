import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  percentageChange: Subject<number> = new Subject<number>();

  progessPercentage(percentage:number)
  {
    this.percentageChange.next(percentage)
  }

  constructor(private http:HttpClient) { }


  uploadImage(image:any)
  {
    const form = new FormData()
    form.append('image', image)

    return this.http.post(`url-api-to-upload`, form, {
      reportProgress:true,
      observe:'events'
    })
  }
}
