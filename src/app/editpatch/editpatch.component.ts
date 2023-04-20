import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ColorPatch } from '../models/colorpatch';

@Component({
  selector: 'app-editpatch',
  templateUrl: './editpatch.component.html',
  styleUrls: ['./editpatch.component.css'],
})
export class EditpatchComponent implements OnInit, OnChanges {

  @Input() patch?: ColorPatch;
  @Output() update: EventEmitter<ColorPatch> = new EventEmitter()
  patchTemplate?: ColorPatch;

  constructor() { }
  
  onInputPatch(patch: ColorPatch) {
    console.log(patch.name);
    this.patchTemplate = new ColorPatch(patch.r, patch.g, patch.b, patch.a, patch.name);
  }

  onClickSave() {
    if (this.patch && this.patchTemplate && this.patchTemplate.name) {
      this.patch.r = this.patchTemplate.r;
      this.patch.g = this.patchTemplate.g;
      this.patch.b = this.patchTemplate.b;
      this.patch.a = this.patchTemplate.a;
      this.patch.name = this.patchTemplate.name;
      this.update.emit(this.patch);

    }
    
  }

  ngOnChanges(): void {
    if (this.patch) {
      this.onInputPatch(this.patch);
    }
    
  }

  ngOnInit(): void {}
}
