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
        // setCustomerId();
        // clear();
    }
});