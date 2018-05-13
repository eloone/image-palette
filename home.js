(function($){
  // Client script
  // Filter logic
  $('#search').keyup(function(e){
    var total = $('.gallery__item').length;
    var val = e.target.value;

    if (val.trim() !== '') {
      var hiddenItems = $('.gallery__item:not([class*="' + val + '"])');
      var visibleItems = $('.gallery__item[class*="' + val + '"]');

      showItems.show();
      visibleItems.hide();

      var count = total - hiddenItems.length;
      $('.count').text(count);
    } else {
      $('.gallery__item').show();
      $('.count').text(total);
    }
  });

  // Switch image sizes logic
  $('#select').change(function(e){
    var val = e.target.value;
    var pattern = 'gallery__item--';

    $('.gallery__item').removeClass(function() {
      var res = $(this).attr('class').match(new RegExp(pattern + '([a-z]+)', 'g'));
      return res && res[0];
    });

    if (val !== 'none') {
      $('.gallery__item').addClass(pattern + val);
    }

  });
}(jQuery));