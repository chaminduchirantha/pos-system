import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

$(document).ready(function() {
    setGeneratedCustomerId()
});
    let currentId =1;

    function generateCustomerId() {
        let customerId = 'C' + String(currentId).padStart(3, '0');
        currentId++;
        return customerId;
    }


function loadCustomers() {
    $('#customer-tbody').empty();
    customer_db.map((customer, index) => {
        let data = `<tr>
                            <td>${customer._custId}</td>
                            <td>${customer._fname}</td>
                            <td>${customer._lname}</td>
                            <td>${customer._address}</td>
                            <td>${customer._salary}</td>
                        </tr>`

        $('#customer-tbody').append(data);
        generateCustomerId()
    })
}

function setGeneratedCustomerId() {
    $('#custId').val(generateCustomerId());
}


// ==========================save customer======================

$('#customerSave').on('click', function(){
    let custId = $('#custId').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let address = $('#address').val();
    let salary = $('#salary').val();
    console.log(`custIs: ${custId} ,fname: ${fname}, lname: ${lname}, address: ${address}, salary: ${salary}`);


    if(custId === ''|| fname === '' || lname === '' || address === '' || salary === '') {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {

        let customer_data = new CustomerModel(custId,fname, lname, address, salary);

        customer_db.push(customer_data);

        console.log(customer_db);


        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
        loadCustomers();
        loadCustomerIds()
        clear();
        setGeneratedCustomerId()
    }
});

// ================update customer============================

$('#customerUpdate').on("click", function(){
    let custId = $('#custId').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let address = $('#address').val();
    let salary = $('#salary').val();

    if (custId === '' || fname === '' || lname === '' || address === '' || salary === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;
    }

    let index = customer_db.findIndex(customer => customer._custId === custId);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "Customer not found to update",
            icon: "error"
        });
        return;
    }

    customer_db[index] = new CustomerModel(custId, fname, lname, address, salary);

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
    });
    clear();
    loadCustomers();
    setGeneratedCustomerId()
});

// ========================delete customer===========================

$('#customerDelete').on('click', function () {
    let custId = $('#custId').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let address = $('#address').val();
    let salary = $('#salary').val();

    if (custId === '' || fname === '' || lname === '' || address === '' || salary === '') {
        Swal.fire({
            title: "Error",
            text: "Fill the fields first",
            icon: "error",
        });
        return;
    }

    let index = customer_db.findIndex(customer => customer._custId === custId);

    if (index === -1) {
        Swal.fire({
            title: "Error",
            text: "Customer not found to delete",
            icon: "error"
        });
        return;
    }

    customer_db.splice(index, 1);
    loadCustomers();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Customer Deleted !"
    });

    clear();
});


$("#customerReset").on('click',function (){
    clear();
})

function clear() {
    $('#fname').val('');
    $('#lname').val('');
    $('#address').val('');
    $('#salary').val('');
}

// ========================on click==================================

$('#customer-tbody').on('click', 'tr', function () {
    let idx = $(this).index();
    console.log(idx);
    let obj = customer_db[idx];
    console.log(obj);

    let custId = obj.custId;
    let fname = obj.fname;
    let lname = obj.lname;
    let address = obj.address;
    let salary = obj.salary;

    $('#custId').val(custId);
    $('#fname').val(fname);
    $('#lname').val(lname);
    $('#address').val(address);
    $('#salary').val(salary);
});


function loadCustomerIds() {
    $('#cmbCustomerId').empty();
    $('#cmbCustomerId').append(`<option></option>`);
    customer_db.forEach(customer => {
        $('#cmbCustomerId').append(
            $('<option>', {
                value: customer.custId,
                text: customer.custId
            })
        );
    });
}


