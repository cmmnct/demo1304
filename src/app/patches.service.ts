import { Injectable, inject } from '@angular/core';
import { ColorPatch } from './models/colorpatch';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatchesService {
  http = inject(HttpClient);

  patches: ColorPatch[] = [];

  patches$: BehaviorSubject<ColorPatch[]> = new BehaviorSubject(this.patches);
  remotePatches$: Observable<ColorPatch[]>;
  myUrl: string = 'http://localhost:3000/patches';

  constructor() {this.remotePatches$ = this.http
      .get<ColorPatch[]>(this.myUrl)
      .pipe(
        map((patches) =>
          patches.map(
            (patch) =>
              new ColorPatch(
                patch.r,
                patch.g,
                patch.b,
                patch.a,
                patch.name,
                patch.id
              )
          )
        )
    );}

  getColorPatches(): Observable<ColorPatch[]> {
    
    return this.remotePatches$;
  }

  createColorPatch(patch: ColorPatch) {
    alert('create: ' + patch.name);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.myUrl, structuredClone(patch), { headers: headers }).pipe().subscribe(result => console.log(result))
  }
  updateColorPatch(patch: ColorPatch) {
    // api call
  }
  deleteColorPatch(patch: ColorPatch) {
    const myIndex = this.patches.indexOf(patch);
    this.patches.splice(myIndex, 1);
  }
}
