$('#home-button').on('click', function() {
    $('#home-container').css('display', 'block');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'none');
});


$('#customer-nav').on('click', function() {
    $('#home-container').css('display', 'none');
    $('#customer-content').css('display', 'block');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'none');
});


$('#item-nav').on('click', function() {
    $('#home-container').css('display', 'none');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'block');
    $('#orders-content').css('display', 'none');
});

$('#order-nav').on('click', function() {
    $('#home-container').css('display', 'none');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'block');
});