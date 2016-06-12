$(function(){
  console.log('login ready');

  $('#user_forms_container').hide();
  $('.lgnBtns').on('click', function(){
    $('#user_forms_container').show();
  });
});
