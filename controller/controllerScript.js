$('.home-btn').on('click', function() {
    $('#home-content').css('display', 'block');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'none');
});


$('.customer-btn').on('click', function() {
    $('#home-content').css('display', 'none');
    $('#customer-content').css('display', 'block');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'none');
});


$('.item-btn').on('click', function() {
    $('#home-content').css('display', 'none');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'block');
    $('#orders-content').css('display', 'none');
});

$('.orders-btn').on('click', function() {
    $('#home-content').css('display', 'none');
    $('#customer-content').css('display', 'none');
    $('#items-content').css('display', 'none');
    $('#orders-content').css('display', 'block');
});