import { LightningElement, wire, track } from 'lwc';
import stockUtils from 'c/stockUtils';
import getStockServiceApiKey from '@salesforce/apex/StockServiceController.getStockServiceApiKey';

export default class TraderEvent extends LightningElement {
    
    //@track error;

    @wire(getStockServiceApiKey)
    wiredApiKey({ error, data }) {
        if (error) {
            this.error = error;
            this.apiKey = undefined;
        } else if (data) {
            this.error = undefined;
            this.apiKey = data;
        }
    }

    
    apiKey;
    error;
    stock;

    rstockgm;
    rstockge;
    rstockual;
    rstockwmt;     
    rstocklly;
    
       
    init() {
        this.getStock('GM');        
        this.getStock('GE'); 
        this.getStock('JPM');       
        this.getStock('LLY');
        this.getStock('UAL');
    }
  
    getStock(symbol) {    
          
        if (symbol && this.apiKey) {
            
            stockUtils
                .getStock(this.apiKey, symbol)
                .then((stock) => {
                    this.stock = stock;
                    if (symbol == 'GM') {this.rstockgm = this.stock};
                    if (symbol == 'GE') {this.rstockge = this.stock}; 
                    if (symbol == 'JPM') {this.rstockjpm = this.stock};                    
                    if (symbol == 'LLY') {this.rstocklly = this.stock};                    
                    if (symbol == 'UAL') {this.rstockual = this.stock};                                                                         
                    
                    console.log(symbol);         
                    console.log(this.stock);         
                })
                .catch((error) => {
                    this.error = error;
                    console.log(this.error);            
                });            
        } 
               
        
    }




}
