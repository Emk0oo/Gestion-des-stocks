import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exam-angular';

  inputNomDuProduit: string= "";
  inputCalc: string= "";
  inputResult: string= "";
  value1: string | null= null;
  operator: string= "";
  

  addNumber(number: string){
    this.value1= number;
    this.inputCalc+= number;

  }

  execCalc(){
    console.log('on calcule');
    this.inputResult=eval(this.inputCalc);
  }

  clear(){
    this.inputCalc= "";
    this.inputResult= "";
    this.inputNomDuProduit= "";
  }
}

