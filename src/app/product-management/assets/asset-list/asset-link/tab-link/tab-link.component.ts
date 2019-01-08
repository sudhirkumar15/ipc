import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { AssetLinkApiService } from '@products/service/asset-link-api.service';
import { AssetLinkData } from '@repository/bucket/asset-link.bucket';
import { AssetLinkTypeModel } from '@repository/model/asset.model';
import { ProductModel } from '@repository/model/product.model';
import { Global } from 'app/g';
import { ErrorService } from '@services/error.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-asset-link-tab-link',
  templateUrl: './tab-link.component.html',
  styleUrls: ['./tab-link.component.scss']
})
export class TabLinkComponent implements OnInit, OnDestroy {
  assetLinkTypes: Array<AssetLinkTypeModel>;
  selectedProducts: Array<ProductModel>;
  assetLinkForm: FormGroup;
  formSubmitAttempt: boolean;
  apiSubscription: Subscription;
  @Input()
  set refreshForm(v: boolean) {
    if (v) {
      this.createForm();
    }
  }
  constructor(
    private fb: FormBuilder,
    private assetLinkApi: AssetLinkApiService,
    private assetLinkData: AssetLinkData,
    public global: Global,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.formSubmitAttempt = false;
    this.createForm();
    this.selectedProducts = this.assetLinkData.products;
    this.assetLinkApi.getAssetLinkTypes(this.assetLinkData.asset.currentRevisionId);
    this.apiSubscription = this.assetLinkApi.apiEvent.subscribe((event) => this.handleAssetLinkTypes(event));
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }

  onSave() {
    this.formSubmitAttempt = true;
    if (this.assetLinkForm.valid) {
      this.assetLinkData.assetProductLink = this.assetLinkForm.value;
      this.assetLinkApi.updateProductAssetLink();
      this.assetLinkApi.apiEvent.next('close_modal');
    }
  }

  private handleAssetLinkTypes(event: string) {
    switch (event) {
      case 'asset_product_link_created':
        this.assetLinkApi.apiEvent.next('close_modal');
        break;
      case 'asset_link_type_list_received':
        this.assetLinkTypes = this.assetLinkData.assetLinkTypes;
        break;
      case 'asset_link_selected_products_update':
        this.selectedProducts = this.assetLinkData.products;
        this.updateForm();
        break;
    }
  }

  private updateForm() {
    this.assetLinkForm.reset();
    this.createForm();
  }

  private createForm() {
    this.assetLinkForm = this.fb.group({
      productAssetLinks: this.fb.array(this.createProductLinkArray())
    });
  }

  private createProductLinkArray(): Array<FormGroup> {
    const linkTypeForm = [];
    if (this.selectedProducts) {
      for (const product of this.selectedProducts) {
        linkTypeForm.push(
          this.fb.group({
            linkTypeId: ['', [Validators.required]],
            productId: [product.id],
            productName: [product.name],
            assetRevisionId: [this.assetLinkData.asset.currentRevisionId]
          })
        );
      }
    }
    return linkTypeForm;
  }

  onParentSelectChange(event) {
    const controls = <FormArray>this.assetLinkForm.controls['productAssetLinks'];
    for (let i = 0; i < controls.length; i++) {
      controls.at(i).patchValue({ linkTypeId: 2 });
    }
  }

  isFieldValid(field: string) {
    return this.errorService.isFieldValid(this.assetLinkForm, field, this.formSubmitAttempt);
  }

  getErrorMessage(field: string) {
    return this.errorService.getErrorMessage(this.assetLinkForm, 'asset_product_link', field);
  }

  displayFieldCss(field: string) {
    return this.errorService.displayFieldCss(this.assetLinkForm, field, this.formSubmitAttempt);
  }

  cancel() {
    this.assetLinkApi.apiEvent.next('close_modal');
  }
}
