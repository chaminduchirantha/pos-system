export default class CustomerModel {

    constructor(custId,fname,lname,address,salary) {
        this._custId = custId;
        this._fname = fname;
        this._lname = lname;
        this._address = address;
        this._salary = salary;
    }

    get custId() {
        return this._custId;
    }

    set custId(value) {
        this._custId = value;
    }

    get fname() {
        return this._fname;
    }

    set fname(value) {
        this._fname = value;
    }

    get lname() {
        return this._lname;
    }

    set lname(value) {
        this._lname = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get salary() {
        return this._salary;
    }

    set salary(value) {
        this._salary = value;
    }


}