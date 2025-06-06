import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-post-car',
  standalone: false,
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {

  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA", "HAVAL"];
  listOfType = ["Petrol", "Hybrid", "Dissel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  postCarForm: FormGroup;
  isSpinning:boolean = false;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private service : CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(){
    this.postCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
  }

  
  postCar(){
    this.isSpinning = true;
    console.log(this.postCarForm.value);
    console.log(this.selectedFile);

    if (!this.postCarForm.valid || !this.selectedFile) {
      this.message.error("Please fill all fields and select a file.", {nzDuration: 5000});
      this.isSpinning = false;
      return;
    }

    // const selectedYear = this.postCarForm.get('year')?.value;
    // if (!selectedYear) {
    //   this.message.error("Please select a valid model year.", {nzDuration: 5000});
    //   this.isSpinning = false;
    //   return;
    // }

    // const formattedYear = `${selectedYear}-01-01`;

    const formData: FormData = new FormData();
    formData.append("img", this.selectedFile);
    formData.append("brand", this.postCarForm.get('brand').value);
    formData.append("name", this.postCarForm.get('name').value);
    formData.append("type", this.postCarForm.get('type').value);
    formData.append("transmission", this.postCarForm.get('transmission').value);
    formData.append("color", this.postCarForm.get('color').value);
    formData.append("year", this.postCarForm.get('year').value);
    formData.append("description", this.postCarForm.get('description').value);
    formData.append("price", this.postCarForm.get('price').value);
    formData.append("userId", StorageService.getUserId());

    this.service.postCar(formData).subscribe((res) =>{
        this.isSpinning = false;
        this.message.success("Car posted successfully!", {nzDuration: 5000});
        this.router.navigateByUrl("/customer/dashboard");
      },
      error => {
        this.message.error("Something went wrong ", {nzDuration: 5000});
      }
    )
  }
  
  onFileSelected(event: any){
    // console.log("Selected File:", this.selectedFile);
    // this.selectedFile = event.target.files[0];
    // this.previewImage();

    this.selectedFile = event.target.files[0];
    console.log("Selected File: ", this.selectedFile); 
    if (this.selectedFile) {
        this.previewImage();
    }
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      console.log("Image preview updated:", this.imagePreview);
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
