import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

function loadCustomers() {
    $('#customer-tbody').empty();
    customer_db.map((customer, index) => {
        let fname = customer.fname;
        let lname = customer.lname;
        let address = customer.address;
        let salary = customer.salary

        let data = `<tr>
                            <td>${index+1}</td>
                            <td>${fname}</td>
                            <td>${lname}</td>
                            <td>${address}</td>
                            <td>${salary}</td>
                        </tr>`

        $('#customer-tbody').append(data);
    })
}



//save Customer

$('#customerSave').on('click', function(){
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let address = $('#address').val();
    let salary = $('#salary').val();
    console.log(`fname: ${fname}, lname: ${lname}, address: ${address}, salary: ${salary}`);


    if(fname === '' || lname === '' || address === '' || salary === '') {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {

        let customer_data = new CustomerModel(fname, lname, address, salary);

        customer_db.push(customer_data);

        console.log(customer_db);

        loadCustomers();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
        clear();
    }
});

function clear() {
    $('#fname').val('');
    $('#lname').val('');
    $('#address').val('');
    $('#salary').val('');
}

$('#customer-tbody').on('click', 'tr', function () {
    let idx = $(this).index();
    console.log(idx);
    let obj = customer_db[idx];
    console.log(obj);

    let fname = obj.fname;
    let lname = obj.lname;
    let address = obj.address;
    let salary = obj.salary;

    $('#fname').val(fname);
    $('#lname').val(lname);
    $('#address').val(address);
    $('#salary').val(salary);
});


