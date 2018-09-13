import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  private products;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http.get('/getProducts').subscribe(data => {
      const products_string = data['products'];
      this.products = JSON.parse(products_string);
    });
  }

  addProduct(id, name, price, type, desc) {
    const product = {
      _id: id,
      name: name,
      price: price,
      type: type,
      desc: desc
    }
    const body = JSON.stringify(product)
    console.log(body)
    this.http.post('/addProduct', body, httpOptions).subscribe(
      data => {
        this.getAllProducts()
        return true
      },
      error => {
        console.error(error)
      }
    )
  }

}
