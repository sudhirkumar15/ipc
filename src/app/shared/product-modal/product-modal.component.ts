import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
  EventEmitter, Input, OnChanges, Output, OnInit, AfterViewInit, TemplateRef, ViewChild
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductModalComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('template') template: TemplateRef<any>;
  private _show: boolean;
  private _conformShow: boolean;
  private _modalBodyTemplate: TemplateRef<any>;
  @Input() modalClass;
  @Input() backdropClick: boolean;
  @Input() title: string;
  @Input()
  set show(v: boolean) {
    if (!v) {
      this.closeWindow();
    } else {
      this._show = v;
      this.openModal();
    }
  }

  @Input() modalCode;
  @Input()
  set modalBodyTemplate(v: TemplateRef<any>) {
    this._modalBodyTemplate = v;
  }

  get modalBodyTemplate(): TemplateRef<any> {
    return this._modalBodyTemplate;
  }
  @Output() close = new EventEmitter<string>();
  @Output() onShown = new EventEmitter<string>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.modalService.onShow.subscribe((reason: string) => {
      this.onShown.emit(this.modalCode);
    });
  }

  openModal() {
    if (this._show) {
      setTimeout(() => {
        this.modalRef = this.modalService.show(this.template,
          Object.assign({}, { class: 'modal-window ' + this.modalClass, ignoreBackdropClick :  this.backdropClick  })
        );
      });
    }
  }

  closeWindow() {
    if (this.modalRef) {
      this._show = false;
      this.modalRef.hide();
      this.close.emit(`modal_closed-${this.modalCode}`);
    }
  }
}
