
$(function(){
  $('.field input').blur(function(){
    if (validator.isFieldValid(this.id, $(this).val())){
      $(this).parent().find('.error').text('').hide();
    } else {
      $(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
    }
  });

  $('form button.submit').click(function(){
    $('.field input').blur();
    if (!validator.isFormValid()) {
      return false;
  };
});

  $('input.reset').click(function(){
    $('.error').text('');
  })
})