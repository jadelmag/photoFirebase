import { Component, OnInit } from '@angular/core';
import { LoadImagesService } from '../../services/load-images.service';
import { FileItem } from '../../models/file-item.model';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: []
})
export class LoadComponent implements OnInit {

  files: FileItem[] = [];
  isOverDrop = false;

  constructor( public _loadImagesService: LoadImagesService ) { }

  ngOnInit() {
  }

  loadImages() {
    this._loadImagesService.loadImages( this.files );
  }

  clear() {
    this.files = [];
  }

}
