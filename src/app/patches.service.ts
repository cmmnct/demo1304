import { Injectable, inject } from '@angular/core';
import { ColorPatch } from './models/colorpatch';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatchesService {
  http = inject(HttpClient);
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  patches: ColorPatch[] = [];
  #patches = signal(4);

  patches$: BehaviorSubject<ColorPatch[]> = new BehaviorSubject(this.patches);
  // remotePatches$: Observable<ColorPatch[]>;
  myUrl: string = 'http://localhost:3000/patches';

  constructor() {
    this.http
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
      )
      .subscribe((patches) => (this.patches = patches));
  }

  getColorPatches(): BehaviorSubject<ColorPatch[]> {
    
    return this.patches$;
  }

  createColorPatch(patch: ColorPatch) {
    let newPatch = {
      r: patch.r,
      g: patch.g,
      b: patch.b,
      a: patch.a,
      name: patch.name,
    };
    this.http
      .post(this.myUrl, newPatch, { headers: this.headers })
      .pipe()
      .subscribe((result) => console.log(result));
  }
  updateColorPatch(patch: ColorPatch) {
    // api call
  }
  deleteColorPatch(patch: ColorPatch) {
    const myIndex = this.patches.indexOf(patch);
    this.patches.splice(myIndex, 1);
  }
}

