import {customer_db, item_db, order_db} from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";

let cart_db =[]

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


$('#addToCard').click(function () {
    let itemCode = $('#cmbItemCode').val();
    let itemName = $('#orderItemName').val();
    let itemQty = Number($('#orderItemQty').val()) || 1;
    let itemPrice = Number($('#orderItemPrice').val()) || 0;
    let total = $(`#subTotal`).val();

    if (!itemCode || !itemName || !itemQty || !itemPrice || total) {
        Swal.fire({
            icon: 'warning',
            title: 'Fields are empty',
        });
        return;
    }

    cart_db.push({ itemCode: itemCode, itemName: itemName, itemQty: itemQty, itemPrice: itemPrice, total: total });

    $('#cart-tBody').append(`
        <tr>
            <td>${itemCode}</td>
            <td>${itemName}</td>
            <td>${itemQty}</td>
            <td>${itemPrice.toFixed(2)}</td>
            <td>${total}</td>
        </tr>
    `);

    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
    });
    // clea/r();
});

let price = 0
function updateSlip() {
    if (item !== null) {
        price = Number(item.price);
    }

    let qty = Number($('#ordersQty').val()) || 1;
    let cash = Number($('#cash').val()) || 0;
    let discount = Number($('#discount').val()) || 0;

    let totalPrice = price * qty;
    let discountAmount = totalPrice * (discount / 100);
    let discountedTotal = totalPrice - discountAmount;
    let balance = cash - discountedTotal;

    $('#item-price').val(discountedTotal.toFixed(2));
    $('#balance').val(balance.toFixed(2));

}


// $('#addToCard').on('click', function () {
//     let orderId = $('#orderId').val();
//     let date = $('#orderDate').val();
//     let customerId = $('#cmbCustomerId').val();
//     let customerFirstName = $('#custFName').val();
//     let customerLastName = $('#custLname').val();
//     let itemCode = $('#cmbItemCode').val();
//     let orderItemName = $('#orderItemName').val();
//     let orderItemPrice = parseFloat($('#orderItemPricee').val());
//     let orderItemQty = parseInt($('#orderItemQty').val());
//     let ordersQty = parseInt($('#ordersQty').val());
//
//     if(!orderId || !date || !customerId || !customerFirstName || !customerLastName ||  !itemCode || !orderItemName || !orderItemPrice || !orderItemQty || !ordersQty) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Validation Error',
//             text: 'Please ensure all fields are filled out correctly.',
//         });
//     }
//     if(ordersQty > orderItemQty) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Quantity Unavailable',
//             text: "Not enough quantity available.",
//         });
//     }
//     subTotal = orderItemPrice* orderItemQty;
//     let order = new OrdersModel(orderId, date, customerId, customerFirstName, customerLastName, itemCode, orderItemName, orderItemPrice, orderItemQty, ordersQty,subTotal);
//     order_db.push(order);
//     console.log(order_db);
//
//
//     for(let i = 0; i <item_db.length; i++) {
//         if(item_db[i].itemCode === itemCode) {
//             item_db[i].qty -= ordersQty;
//             updateItemTable();
//             break;
//         }
//     }
//     loadCartData();
//     Swal.fire({
//         icon: 'success',
//         title: 'Item Added',
//         text: 'Item successfully added to cart.',
//     });
// })

// const loadCartData = () => {
//     $('#cart-tBody').empty();
//     total = 0;
//     let CartSubTotal = 0;
//
//     order_db.map(order => {
//         CartSubTotal += order.subTotal;
//
//         let itemCode = order._itemCode;
//         let itemName = order.itemNa;
//         let orderItemPrice = order.itemPrice;
//         let ordersQty = order.OrderQty;
//         let subTotal = order.subTotal;
//
//         let data = `<tr>
//                             <td>${itemCode}</td>
//                             <td>${itemName}</td>
//                             <td>${orderItemPrice}</td>
//                             <td>${ordersQty}</td>
//                             <td>${subTotal}</td>
//                             </tr>`
//         $('#cart-tBody').append(data);
//     });
//
//     discountRate = parseFloat($('#rate').val()) || 0;
//     discount = (CartSubTotal * discountRate) / 100;
//     total = CartSubTotal - discount;
//
//     $('#subTotal').text(`Sub Total : ${CartSubTotal.toFixed(2)}`);
//     $('#discount').text(`Discount : ${discount.toFixed(2)}`);
//     $('#total').text(`Total : ${total.toFixed(2)}`);
//
//
//     let cash = parseFloat($('#cash').val()) || 0;
//     let balance = cash - total;
//     $('#balance').text(`Balance : ${balance.toFixed(2)}`);
// }
//
// $('#rate').on('input', function (){
//     loadCartData();
// })
// $('#cash').on('input', function (){
//     loadCartData();
// })


const updateItemTable = () => {
    $('#itemTbody').empty();
    item_db.slice(0, 5).forEach((item) => {
        let data = `<tr>
                            <td>${item.itemId}</td>
                            <td>${item.itemName()}</td>
                            <td>${item.itemPrice}</td>
                            <td>${item.itemQuantity}</td>
                            </tr>`
        $('#itemTbody').append(data);
    })
}

$('#purchase').on('click', function () {
    let orderId = $('#orderId').val();
    let date = $('#orderDate').val();
    let customerFName = $('#fname').val();
    let customerLName = $('#lname').val();
    let itemName = $('#orderItemName').val();
    let price = $('#orderItemPrice').val();
    let OrQty = $('#orderItemQty').val();
    let subTotal = $('#subTotal').text();
    let subTotalValue = parseFloat(subTotal.split(':')[1]);
    let discountRate = $('#rate').val();
    let discount = $('#discount').text();
    let discountValue = parseFloat(discount.split(':')[1]);
    let total = $('#total').text();
    let totalValue = parseFloat(total.split(':')[1]);

    if(!orderId || !date || !customerFName || customerLName || !itemName || !price || !OrQty || !subTotalValue || !discountRate || !discountValue || !totalValue) {
        Swal.fire({
            icon: 'error',
            title: 'Incomplete Information',
            text: 'Please ensure all fields are filled out correctly before proceeding.',
        });
        return;
    }
    Swal.fire({
        title: 'Confirm Purchase',
        text: "Are you sure you want to complete this purchase?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, complete purchase',
        cancelButtonText: 'Cancel'

    }).then((result) => {
        if (result.isConfirmed) {
            let OrderDetails = new  OrderDetailsModel(orderId, date, customerFName, customerLName, itemName, price, OrQty, subTotal, discountRate, discount, total);
            order_detail_db.push(OrderDetails)
            Swal.fire({
                icon: 'success',
                title: 'Purchase Completed',
                text: 'The purchase was successfully completed!',
            });
            clearItem();
            clearCustomer();
            $('#subTotal').val("");
            $('#rate').val("");
            $('#discount').val("");
            $('#total').val("");
            $('#cash').val("");
            $('#balance').val("");
            order_db.length = 0;
            loadCartData();
            loadOrderDetailsData();
        }
    });
})


const loadOrderDetailsData = () => {
    $('#OrderDetails-tbody').empty();
    order_detail_db.map((orderDetail, index) =>{
        let orderId = orderDetail.orderId;
        let date = orderDetail.date;
        let customerFName = orderDetail.customerFname;
        let customerLName = orderDetail.customerLname;
        let itemName = orderDetail.itemName;
        let price = orderDetail.ItemPrice;
        let OrQty = orderDetail.OrderQty;
        let subTotal = orderDetail.subTotal;
        let discountRate = orderDetail.DiscountRate;
        let discount = orderDetail.Discount;
        let total = orderDetail.FinalTotal;

        let data = `<tr>
                     <td>${orderId}</td>
                     <td>${date}</td>
                     <td>${customerFName}</td>
                     <td>${customerLName}</td>
                     <td>${itemName}</td>
                     <td>${price}</td>
                     <td>${OrQty}</td>
                     <td>${subTotal}</td>
                     <td>${discountRate}</td>
                     <td>${discount}</td>
                     <td>${total}</td>
                     
                 </tr>`
        $('#OrderDetails-tbody').append(data);
    })
}