import { ChangeDetectionStrategy, inject } from '@angular/core';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ColorPatch } from '../models/colorpatch';
import { PatchesService } from '../patches.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorpickerComponent implements OnInit, OnChanges {
  
  editState: boolean = false;

  patchTemplate: ColorPatch = new ColorPatch(0, 0, 0, 0.5, '');
  editPatch?: ColorPatch;

  patches$?:BehaviorSubject<ColorPatch[]>;
  

  patchesService = inject(PatchesService);

  constructor() {}

  ngOnInit(): void {

    this.patches$ = this.patchesService.getColorPatches()
    this.patchesService.getColorPatches().asObservable().subscribe(patches => console.log(patches));

  }

  ngOnChanges() {
    // this.getRGBA();
  }

  onClickEdit(patch: ColorPatch) {
    if (!this.editState) {
      this.editPatch = patch;
    this.editState = true;
    this.patchesService.updateColorPatch(patch);
    }
  }

  onUpdatePatch(patch: ColorPatch) {
    this.editState = false;
    if (patch === this.patchTemplate) {
         this.patchesService.createColorPatch(patch);
         this.patchTemplate = new ColorPatch(0, 0, 0, 1, '');
    }
  }

  onClickDelete(patch: ColorPatch) {
    if (this.editState) return;
    if (confirm("Do you really want to delete " + patch.name + "?") ) {
      this.patchesService.deleteColorPatch(patch);
    }

  }
}
