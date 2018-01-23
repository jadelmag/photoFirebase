import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item.model';

@Directive({
  selector: '[appNgDropFiles]'
})

export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseOver.emit( true );
    this._stop( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
    this.mouseOver.emit( false );

    const transf = this.getTransfer( event );

    if ( !transf ) {
      return;
    }

    this.extractFiles( transf.files );

    this._stop( event );
    this.mouseOver.emit( false );
  }

  private getTransfer( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.original.dataTransfer;
  }

  private extractFiles( files: FileList ) {
    // tslint:disable-next-line:forin
    for ( const property in Object.getOwnPropertyNames(files) ) {
      const tempFile = files[property];
      if (this._fileCanLoaded(tempFile)) {
        const newFile = new FileItem(tempFile);
        this.files.push(newFile);
      }
    }
  }

  // Validations
  private _fileCanLoaded( file: File ): boolean {
    if ( !this._fileDropped( file.name ) && this._isImage( file.type) ) {
      return true;
    } else {
      return false;
    }
  }

  private _stop( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileDropped( fileName: string ): boolean {
    for (const file of this.files) {
      if (file.fileName === fileName) {
        console.log('File ', fileName + ' already is added');
        return true;
      }
    }
    return false;
  }

  private _isImage( type: string ): boolean {
    return ((type === '') || (type === undefined)) ? false : type.startsWith('image');
  }

}
