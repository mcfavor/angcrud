import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogueref: MatDialogRef<DialogComponent>) { }

   freshnessList = ["Brand New", "Second Hand", "Refurbished"];
   productForm !: FormGroup;
   actionBtn: string = "Save";

   ngOnInit(): void {
      this.productForm = this.formBuilder.group({
        productname: ['', Validators.required],
        category: ['', Validators.required],
        freshness: ['', Validators.required],
        price: ['', Validators.required],
        comment: ['', Validators.required],
        date: ['', Validators.required]
      })

      if(this.editData) {
        this.actionBtn = "Update";
        this.productForm.controls['productname'].setValue(this.editData.productname);
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['freshness'].setValue(this.editData.freshness);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['comment'].setValue(this.editData.comment);
        this.productForm.controls['date'].setValue(this.editData.date);
      }
   }

   addProduct() {
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product Added Successfully")
            this.productForm.reset();
            this.dialogueref.close();
          },
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }
    }else {
      this.updateProduct();
    }
   }

   updateProduct() {
    this.api.updateProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("product updated")
        this.productForm.reset()
        this.dialogueref.close('update')
      },
      error:()=>{
        alert("error whilst updating the record")
      }
    })
   }

}
