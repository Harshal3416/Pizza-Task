import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import data from '../../assets/data.json';

@Component({
  selector: 'pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  selectPizza: boolean = true;
  custDetails: boolean;
  pizza: any;
  orderedPizza = [];
  totalPrice: number;
  quantity;
  orderDetail: any;
  // pizza1: { name: string; price: number; image: string; id: string; }[][];
  pizzas = [];
  // pizzas: { name: string; price: number; image: string; id: string; }[][];
  constructor() { }

  pizzas1 = [
    {
      name: 'Neapolitan Pizza',
      price: 480,
      image: '/assets/images/pizza1.jpg',
      id: '01'
    },
    {
      name: 'Chicago Pizza',
      price: 379,
      image: '/assets/images/pizza2.jpg',
      id: '02'
    },
    {
      name: 'Detroit Pizza',
      price: 597,
      image: '/assets/images/pizza3.jpg',
      id: '03'
    },
    {
      name: 'California Pizza',
      price: 721,
      image: '/assets/images/pizza4.jpg',
      id: '04'
    },
    {
      name: 'Family Night Pizza',
      price: 429,
      image: '/assets/images/pizza5.jpg',
      id: '05'
    },
    {
      name: 'Liberty Pizza',
      price: 379,
      image: '/assets/images/pizza6.jpg',
      id: '06'
    }
  ]

  pizzaForm : FormGroup

  
  ngOnInit(): void {
    console.log("DATA", data);
    this.pizzas = data
    // Initializing Form Group
    this.pizzaForm = new FormGroup({
      'itemName': new FormControl(null),
      'custName': new FormControl(null),
      'price': new FormControl(null),
      'qty': new FormControl(null),
      'address': new FormControl(null),
      'totalPrice': new FormControl(null),
      'status': new FormControl('Order Received'),
      'image': new FormControl(null)
    })
    if(JSON.parse(localStorage.getItem('data'))){
      this.orderedPizza = JSON.parse(localStorage.getItem('data'))
    }
    // Showing 1st order data when page loads
    this.orderDetail = this.orderedPizza[0]
  }

  changeStatus(item, index){
    // Changing the status and updating the local storage
    if(item.status == 'Order Received'){
      item.status = 'Preparing'
    }
    else if(item.status == 'Preparing'){
      item.status = 'Ready to Serve'
    }
    this.orderedPizza[index] = item
    localStorage.setItem('data', JSON.stringify(this.orderedPizza))
  }

  selectedPizza(pizza){
    this.pizza = pizza;
    this.selectPizza = false;
    this.custDetails = true;

    // Patching default values in the form
    this.pizzaForm.patchValue({
      'itemName': this.pizza.name,
      'price': this.pizza.price,
      'image': this.pizza.image
    })
  }

  placeOrder(){
    this.pizzaForm.patchValue({
      'totalPrice': this.pizza.price * this.pizzaForm.value.qty
    })    
    this.orderedPizza.push(this.pizzaForm.value);
    localStorage.setItem('data', JSON.stringify(this.orderedPizza))
    this.selectPizza = true;
    this.custDetails = false;
    this.orderDetail = this.orderedPizza[0]
  }

  showDetails(item){    
    this.orderDetail = item;
  }

  close(){
    this.selectPizza = true;
    this.custDetails = false;
  }
}
