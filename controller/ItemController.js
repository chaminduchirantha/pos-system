import {customer_db, item_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

$(document).ready(function() {
    clear();
});


let itemNamePattern = /([A-Za-z\s]+(?:Watch|Model)?)/;
let itemQtyPattern = /^([1-9][0-9]*|0)(\.[0-9]+)?$/;
let itemPricePattern = /^\d+(\.\d{2})?$/;

// =====================load Table====================

function loadItems() {
    $('#itemTbody').empty();
    item_db.map((item, index) => {
        let data = `<tr>
                            <td>${item._itemId}</td>
                            <td>${item._itemName}</td>
                            <td>${item._itemPrice}</td>
                            <td>${item._itemQuantity}</td>
                        </tr>`

        $('#itemTbody').append(data);
    });
}

function nextId() {
    if (item_db.length === 0) return "I001";

    let lastItemID = item_db[item_db.length - 1].itemId;
    let number = parseInt(lastItemID.slice(1), 10);
    let nextNumber = number + 1;
    return "I" + nextNumber.toString().padStart(3, '0');
}


// ============================Item Saved ========================

$('#item-Save').on('click', function(){
    let itemId = nextId();
    let itemName = $('#item-name').val();
    let itemPrice = $('#item-price').val();
    let itemQty = $('#item-qty').val();
    console.log(`itemId: ${itemId} ,itemName: ${itemName}, itemPrice: ${itemPrice}, itemQty: ${itemQty}`);

    if(!itemNamePattern.test(itemName)){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Item Name Pattern',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }
     if(!itemQtyPattern.test(itemQty)){
            Swal.fire({
                title: 'Error!',
                text: 'Invalid Item Qty Pattern',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
         return;
        }

     if(!itemPricePattern.test(itemPrice)){
            Swal.fire({
                title: 'Error!',
                text: 'Invalid Item price Pattern',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
         return;
        }


    if(itemId === ''|| itemName === '' || itemPrice === '' || itemQty === '' ) {

        Swal.fire({
            title: 'Error!',
            text: 'Please fill the input Fields',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {

        let item_data = new ItemModel(itemId,itemName, itemPrice, itemQty);

        item_db.push(item_data);

        console.log(item_db);


        Swal.fire({
            title: "Added Successfully Item!",
            icon: "success",
            draggable: true
        });
        loadItems();
        loadItemIds();
        clear();
    }
});


$("#itemClear").on('click',function (){
    clear();
    nextId()
})

// ==================clear=========================

function clear() {
    $('#itemId').val(nextId());
    $('#item-name').val('');
    $('#item-price').val('');
    $('#item-qty').val('');
}


// =======================Item Update===================================

$('#itemUpdate').on("click", function(){
    let itemId = $('#itemId').val();
    let itemName = $('#item-name').val();
    let itemPrice = $('#item-price').val();
    let itemQty = $('#item-qty').val();
    console.log(`itemId: ${itemId} ,itemName: ${itemName}, itemPrice: ${itemPrice}, itemQty: ${itemQty}`);

    if(itemId === ''|| itemName === '' || itemPrice === '' || itemQty === '' ) {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {

        let index = item_db.findIndex(item => item._itemId === itemId);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "Item not found to update",
            icon: "error"
        });
        return;
    }

        item_db[index] = new ItemModel(itemId,itemName, itemPrice, itemQty);

        console.log(item_db);


        Swal.fire({
            title: "update Successfully Item!",
            icon: "success",
            draggable: true
        });
        loadItems();
        clear();
    }
});

// =================================Item Deleted========================

$('#itemDelete').on('click', function () {
    let itemId = $('#itemId').val();
    let itemName = $('#item-name').val();
    let itemPrice = $('#item-price').val();
    let itemQty = $('#item-qty').val();
    console.log(`itemId: ${itemId} ,itemName: ${itemName}, itemPrice: ${itemPrice}, itemQty: ${itemQty}`);

    if(itemId === ''|| itemName === '' || itemPrice === '' || itemQty === '' ) {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;
    }

    let index = item_db.findIndex(item => item._itemId === itemId);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "item not found to delete",
            icon: "error"
        });
        return;
    }

    item_db.splice(index, 1);

    Swal.fire({
        title: "Deleted!",
        text: "Item Deleted Successfully!",
        icon: "success"
    });

    loadItems();
    clear();
});

// ==============================on click =================================

$('#itemTbody').on('click', 'tr', function () {
    let id = $(this).index();
    console.log(id);
    let obj = item_db[id];
    console.log(obj);

    let itemId = obj.itemId;
    let itemName = obj.itemName;
    let itemPrice = obj.itemPrice;
    let itemQty = obj.itemQuantity;

    $('#itemId').val(itemId);
    $('#item-name').val(itemName);
    $('#item-price').val(itemPrice);
    $('#item-qty').val(itemQty);
});


function loadItemIds() {
    $('#cmbItemCode').empty();
    $('#cmbItemCode').append(`<option>Select Item ID</option>`);
    item_db.forEach(item => {
        $('#cmbItemCode').append(
            $('<option>', {
                value: item.itemId,
                text: item.itemId
            })
        );
    });
}


function searchItemById(itemId) {
    let item = item_db.find(i => i._itemId === itemId);

    if (!item) {
        Swal.fire({
            title: "Not Found!",
            text: "Not Item found with ID: " + itemId,
            icon: "warning"
        });
        return;
    }
}


$('#searchItemButton').on('click', function () {
    let searchId = $('#searchItemId').val().trim();
    if (searchId === '') {
        Swal.fire({
            title: "Item Is Not Found",
            text: "Unsuccessful Item Search",
            icon: "error"
        });
    } else {
        Swal.fire({
            title: "Item is Find",
            text: "Successfully Item Search",
            icon: "success"
        });
        searchItemById(searchId);
    }
});
