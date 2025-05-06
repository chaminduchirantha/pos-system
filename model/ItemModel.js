export  default class ItemModel{

    constructor(itemId,itemName,itemPrice,itemQuantity){
        this._itemId = itemId;
        this._itemName = itemName;
        this._itemPrice = itemPrice;
        this._itemQuantity = itemQuantity;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

    get itemQuantity() {
        return this._itemQuantity;
    }

    set itemQuantity(value) {
        this._itemQuantity = value;
    }

}