import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'exam-angular';

  inputNomDuProduit: string= "";
  inputCalc: string= "";
  inputResult: string= "";
  value1: string | null= null;
  operator: string= "";
  inputUnite: string= "";
  tab: any[] = [];

  addNumber(number: string){
    this.value1= number;
    this.inputCalc+= number;

  }

  execCalc(){
    this.inputResult=eval(this.inputCalc);
  }

  clear(){
    this.inputCalc= "";
    this.inputResult= "";
    this.inputNomDuProduit= "";
  }

  sendToInventory(){
    let objet = {
      nomDuProduit: this.inputNomDuProduit,
      quantite: this.inputResult,
      unite: this.inputUnite
    }
    this.tab.push(objet);
    localStorage.setItem("inventaire", JSON.stringify(this.tab));
  }

  ngOnInit() {
    const storedInventory = localStorage.getItem("inventaire");
    if (storedInventory) {
      this.tab = JSON.parse(storedInventory);
    } else {
      this.tab = []; // Initialize as empty array if no data in storage
    }
  }

  exportCSV() {
    let date= new Date();
      var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Exportation de l\'inventaire',
      useBom: true,
      noDownload: false,
      headers: ["Nom du Produit", "Quantités", "Unité"],
      eol: '\n'
    };
  
    new ngxCsv(this.tab, 'exportInventaire'+date, options);
  }

  print() {
    // Création de la table HTML
    var table = '<table border="1">';
    table += '<thead><tr><th>Nom</th><th>Quantités</th><th>Unité</th></tr></thead>';
    table += '<tbody>';
    for(let i = 0; i < this.tab.length; i++) {
        table += '<tr>';
        table += '<td>' + this.tab[i].nomDuProduit + '</td>';
        table += '<td>' + this.tab[i].quantite + '</td>';
        table += '<td>' + this.tab[i].unite + '</td>';
        table += '</tr>';
    };
    table += '</tbody>';
    table += '</table>';

    document.body.innerHTML = table;

    window.print();
}
}

