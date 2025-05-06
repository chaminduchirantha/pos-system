import {item_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";


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

$('#item-Save').on('click', function(){
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

        let item_data = new ItemModel(itemId,itemName, itemPrice, itemQty);

        item_db.push(item_data);

        console.log(item_db);


        Swal.fire({
            title: "Added Successfully Item!",
            icon: "success",
            draggable: true
        });
        loadItems();
        clear();
    }
});


$("#itemClear").on('click',function (){
    clear();
})

function clear() {
    $('#itemId').val('');
    $('#item-name').val('');
    $('#item-price').val('');
    $('#item-qty').val('');
}

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
