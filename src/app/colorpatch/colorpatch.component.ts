import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorPatch } from '../models/colorpatch';

@Component({
  selector: 'app-colorpatch',
  templateUrl: './colorpatch.component.html',
  styleUrls: ['./colorpatch.component.css'],
})
export class ColorpatchComponent implements OnInit {
  @Input() patch: ColorPatch = new ColorPatch(0, 0, 0, 1, '');

  @Output() edit: EventEmitter<ColorPatch> = new EventEmitter();
  @Output() delete: EventEmitter<ColorPatch> = new EventEmitter();
  @Output() add: EventEmitter<ColorPatch> = new EventEmitter();

  constructor() {}

  onClickAdd() {
    this.add.emit(this.patch);
  }
  onClickEdit() {
    this.edit.emit(this.patch);
  }
  onClickDelete() {
    this.delete.emit(this.patch);
  }

  ngOnInit(): void {}
}
