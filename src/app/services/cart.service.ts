import { AdditionalService } from 'src/app/models/additionalService';
import { Injectable } from '@angular/core';
import { Car } from '../models/cars';
import { CartItem } from '../models/cartItem';
import { AdditionalCartItems, CartItems } from '../models/cartItems';
import { AdditionalCartItem } from '../models/additionalCartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:Car){
    let item = CartItems.find(c=>c.car.id===car.id);
    if(item){
      item.quantity+=1;
    }else{
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity =1;
      CartItems.push(cartItem)
    }
  }
  addToCart2(additionalService:AdditionalService){
    let item = AdditionalCartItems.find(c=>c.additionalService.id===additionalService.id);
    if(item){
      item.quantity+=1;
    }else{
      let cartItem = new AdditionalCartItem();
      cartItem.additionalService = additionalService;
      cartItem.quantity =1;
      AdditionalCartItems.push(cartItem)
    }
  }

  removeFromCart(car:Car){
    let item:CartItem = CartItems.find(c=>c.car.id===car.id);
    CartItems.splice(CartItems.indexOf(item),1); //splice silmek için kullanılır (git bellekteki yerini indeksini bul ve 1 tane sil)
  }

  list():CartItem[]{
    return CartItems;
  }
  list2():AdditionalCartItem[]{
    return AdditionalCartItems;
  }
}