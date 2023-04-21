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

  private patches$: BehaviorSubject<ColorPatch[]> = new BehaviorSubject(
    this.patches
  );

  myUrl: string = 'http://localhost:3000/patches';

  constructor() {}
  public init(): void {
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
      .subscribe((patches) => {
        this.patches = patches;
        this.patches$.next(patches);
      });
  }

  getColorPatches(): Observable<ColorPatch[]> {
    return this.patches$;
  }

  createColorPatch(patch: ColorPatch) {
    let newPatchObject = toObject(patch);
    this.http
      .post(this.myUrl, newPatchObject, { headers: this.headers })
      .subscribe(() => {
        this.patches.push(patch);
        this.patches$.next(this.patches);
      });
  }
  updateColorPatch(patch: ColorPatch) {
    const myIndex = this.patches.indexOf(patch);
    let newPatchObject = toObject(patch);
    console.log(newPatchObject);
    this.http
      .patch(`${this.myUrl}/${patch.id}`, newPatchObject, {
        headers: this.headers,
      })
      .subscribe(() => {

        this.patches.push(patch);
        this.patches$.next(this.patches);
      });
  }
  
  deleteColorPatch(patch: ColorPatch) {
    const myIndex = this.patches.indexOf(patch);
    this.http.delete(`${this.myUrl}/${patch.id}`).subscribe((result) => {
      this.patches.splice(myIndex, 1);
      this.patches$.next(this.patches);
    });
  }
}

export function toObject(object: any): object {
  type Output = { [key: string]: string };
  const returnValue: Output = {};
  Object.keys(object).forEach((key, index) => {
    if (key !== '_id') {
      returnValue[key.slice(1, key.length)] = object[key];
    }
  });
  return returnValue;
}
