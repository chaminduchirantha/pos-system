$('#home-button').on('click', function() {
    $('#home-container').css('display', 'block');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'none');
    $('#order-detail-content').css('display', 'none');
});


$('#customer-nav').on('click', function() {
    $('#customer-content').css('display', 'block');
    $('#home-container').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'none');
    $('#order-detail-content').css('display', 'none');
});


$('#item-nav').on('click', function() {
    $('#items-content').css('display', 'block');
    $('#home-container').css('display', 'none');
    $('#customer-content').css('display', 'none');
    $('#orders-content').css('display', 'none');
    $('#order-detail-content').css('display', 'none');

});

$('#order-nav').on('click', function() {
    $('#orders-content').css('display', 'block');
    $('#home-container').css('display', 'none');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#order-detail-content').css('display', 'none');

});

$('#orderDetails-nav').on('click', function() {
    $('#order-detail-content').css('display', 'block');
    $('#home-container').css('display', 'none');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'none');

});

$(document).ready(function () {
        $('#home-container').css('display', 'block');
        $('#customer-content').css('display', 'none');
        $('#items-content').css('display', 'none');
        $('#orders-content').css('display', 'none');
        $('#order-detail-content').css('display', 'none');
});
