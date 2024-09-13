import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {
  private componentsConfig = new Map<string, string>([
    ['end-year-input', 'endYear'],
    ['site-options', 'site'],
  ]);

  private componentMap = new Map<string, any>([
    ['end-year-input', () => import('./components/end-year-input.component').then(m => m.EndYearInputComponent)],
    ['site-options', () => import('./components/site-options.component').then(m => m.SiteOptionsComponent)],
  ]);

  @ViewChild('controlsContainer', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  form = inject(FormBuilder).group({
    endYear: [''],
    site: [''],
  });
  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.componentMap.forEach((item, key) => this.createComponent(key))
  }

  async createComponent(name: string) {
    console.log(name)
    const loadComponentFn = this.componentMap.get(name);
    const component = await loadComponentFn();
    const componentRef = this.vcr.createComponent(component);
    // const { EndYearInputComponent } = await import('./components/end-year-input.component');
    // console.log(componentRef)
    // componentRef.setInput('controlName', this.componentsConfig.get(name))
    // componentRef.setInput('formGroup', this.form)
    // const componentRef = this.vcr.createComponent(EndYearInputComponent);
    componentRef.setInput('controlName', this.componentsConfig.get(name))
    componentRef.setInput('formGroup', this.form)
  }


  onSubmit() {
    console.log(this.form.value);
  }
}

// import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-search-form',
//   standalone: true,
//   templateUrl: './search-form.component.html',
//   styleUrls: ['./search-form.component.scss'],
// })
// export class SearchFormComponent implements OnInit {
//   form: FormGroup;
//   private vcr = inject(ViewContainerRef);
//   private fb = inject(FormBuilder);

//   // Configuration for components and their corresponding form controls
//   private componentsConfig = [
//     { name: 'end-year-input', controlName: 'endYear' },
//     // Add more configurations as needed
//   ];

//   private componentMap = new Map<string, any>([
//     [
//       'end-year-input',
//       () =>
//         import('./components/end-year-input.component').then(
//           (m) => m.EndYearInputComponent
//         ),
//     ],
//     // Map other components as needed
//   ]);

//   ngOnInit(): void {
//     this.createForm();
//     this.loadComponents();
//   }

//   createForm() {
//     const controlsConfig = {};
//     // Initialize form controls based on configuration
//     this.componentsConfig.forEach((config) => {
//       controlsConfig[config.controlName] = ['']; // You can add validators here
//     });
//     this.form = this.fb.group(controlsConfig);
//   }

//   async loadComponents() {
//     for (const config of this.componentsConfig) {
//       const loadComponentFn = this.componentMap.get(config.name);
//       if (loadComponentFn) {
//         const component = await loadComponentFn();
//         const componentRef = this.vcr.createComponent(component);
//         // Pass the control name or control to the component
//         componentRef.setInput('controlName', config.controlName);
//         // Optionally pass the parent FormGroup if needed
//         componentRef.instance.formGroup = this.form;
//       } else {
//         console.error(`Component ${config.name} not found in the map.`);
//       }
//     }
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       // Handle form submission
//       console.log(this.form.value);
//     } else {
//       // Handle validation errors
//       console.log('Form is invalid');
//     }
//   }
// }