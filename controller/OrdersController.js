import {customer_db, item_db, order_db} from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";
import OrdersModel from "../model/OrdersModel.js";

let cart_db =[]
let CartSubTotal = 0;

$('#cmbCustomerId').change(function () {
    var selectedValue = $(this).val();
    customer_db.map(function (Customer) {
        if (selectedValue.toString() === Customer.custId.toString()) {
            $('#custFName').val(Customer.fname);
            $('#custLname').val(Customer.lname);
            $('#custAddress').val(Customer.address);
        }
    });
});

$('#cmbItemCode').change(function () {
    var selectedValue = $(this).val();
    item_db.map(function (Item) {
        if (selectedValue.toString() === Item.itemId.toString()) {
            $('#orderItemName').val(Item.itemName);
            $('#orderItemPrice').val(Item.itemPrice);
            $('#orderItemQty').val(Item.itemQuantity);

        }
    });
});


let subTotal = 0;
let discountRate = 0;
let discount = 0;
let total = 0;

$('#addToCard').on('click', function () {
    let itemCode = $('#cmbItemCode').val();
    let orderItemName = $('#orderItemName').val();
    let orderItemPrice = parseFloat($('#orderItemPrice').val());
    let orderItemQty = parseInt($('#orderItemQty').val());
    let ordersQty = parseInt($('#ordersQty').val());
    let total = $(`#subTotal`).val();



    if(!itemCode || !orderItemName || !orderItemPrice || !orderItemQty  || !total) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please ensure all fields are filled out correctly.',
        });
    }
    if(ordersQty > orderItemQty) {
        Swal.fire({
            icon: 'warning',
            title: 'Quantity Unavailable',
            text: "Not enough quantity available.",
        });
    }
    total = orderItemPrice* ordersQty;

    for(let i = 0; i <item_db.length; i++) {
        if(item_db[i].itemCode === itemCode) {
            item_db[i].qty -= ordersQty;
            break;
        }
    }

    cart_db.push({ itemCode: itemCode, itemName: orderItemName, itemQty: orderItemQty, itemPrice: orderItemPrice, total: total });

    let index = cart_db.length - 1;

    $('#cart-tBody').append(`

             <tr data-index="${index}">
               <td>${itemCode}</td>
                <td>${orderItemName}</td>
                <td>${orderItemPrice.toFixed(2)}</td>
                <td>${ordersQty}</td>
                <td>${total}</td>
                <td><button class="btn btn-danger btn-sm remove-cart-item" data-index="${index}">Remove</button></td>
           </tr>
        `);

    calculateTotal();
    updateItemTable();

    Swal.fire({
        icon: 'success',
        title: 'Item Added',
        text: 'Item successfully added to cart.',
    });
})

$('#cart-tBody').on('click', '.remove-cart-item', function () {
    let index = $(this).data('index');

    // Remove from cart_db
    cart_db.splice(index, 1);

    // Re-render cart
    $('#cart-tBody').empty();
    cart_db.forEach((item, i) => {
        $('#cart-tBody').append(`
            <tr data-index="${i}">
                <td>${item.itemCode}</td>
                <td>${item.itemName}</td>
                <td>${item.itemPrice.toFixed(2)}</td>
                <td>${item.itemQty}</td>
                <td>${item.total}</td>
                <td><button class="btn btn-danger btn-sm remove-cart-item" data-index="${i}">Remove</button></td>
            </tr>
        `);
    });

    calculateTotal();
    updateCalculation();
});


function updateCalculation() {
    console.log(CartSubTotal);

    discountRate = parseFloat($('#rate').val()) || 0;
    discount = (CartSubTotal * discountRate) / 100;
    total = CartSubTotal - discount;

    $('#discount').text(`Discount : ${discount.toFixed(2)}`);
    $('#total').text(`Total : ${total.toFixed(2)}`);

    let cash = parseFloat($('#cash').val()) || 0;
    let balance = cash - total;
    $('#balance').text(`Balance : ${balance.toFixed(2)}`);
}

function calculateTotal() {
    let total = 0;

    cart_db.forEach((item) => {
        total += item.total;
    })

    console.log(total);
    $('#subTotal').text("Sub total :" + total.toFixed(2));
    CartSubTotal = total;
}

$('#rate').on('input', function (){
    updateCalculation();
})
$('#cash').on('input', function (){
    updateCalculation();
})


const updateItemTable = () => {
    $('#itemTbody').empty();
    item_db.slice(0, 5).forEach((item) => {
        let data = `<tr>
                            <td>${item.itemId}</td>
                            <td>${item.itemName}</td>
                            <td>${item.itemPrice}</td>
                            <td>${item.itemQuantity}</td>
                            </tr>`
        $('#itemTbody').append(data);
    })
}

