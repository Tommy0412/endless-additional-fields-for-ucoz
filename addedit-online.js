/*
* endless additional fields for ucoz (бесконечные дополнительные поля для ucoz)
* v1.0
* developer: mihail-174
* github: https://github.com/mihail-174/endless-additional-fields-for-ucoz
*/

var inputs = [
  {
    "name": "Information",
    "system_name": "fields-information",
    "fields": [
      {"name": "Name Of The Film", "input": "input", "type": "text"},
      {"name": "Original Movie Name", "input": "input", "type": "text"},
      {"name": "Produced in", "input": "input", "type": "text"},
      {"name": "Release day", "input": "input", "type": "text"},
      {"name": "Genre", "input": "input", "type": "text"},
      {"name": "Director", "input": "input", "type": "text"},
      {"name": "Duration", "input": "input", "type": "text"},
      {"name": "Actors", "textarea": "textarea", "rows": "5"}
    ]
  },
  {
    "name": "Player",
    "system_name": "fields-player",
    "fields": [
      {"name": "Player 1", "input": "input", "type": "text"}
    ]
  },
  {
    "name": "Series",
    "system_name": "fields-serial",
    "fields": [
      {"name": "Episode 1", "textarea": "textarea", "rows": "3"}
    ]
  },
  {
    "name": "Trailer",
    "system_name": "fields-trailer",
    "fields": [
      {"name": "Trailer", "input": "input", "type": "text"}
    ]
  }
];

$('#bdM64 tr').each(function(){
  if ( !$(this).attr('id') && $(this).find('hr').length>0 ) {
    $(this).remove();
  }
});


var message = $('#message').val();

// ВЫВОДИМ ПОЛЯ
render_fields(2, false);
render_fields(1, false);
render_fields(3, true);
render_fields(0, true);
function render_fields( num, bool ) {
  var fields = [],
      title = '';
  for( var i=0; i < inputs[num].fields.length; i++ ) {
    if ( inputs[num].fields[i].input ) {
      input = '<input class="additional-fields__text-field" type="' + inputs[num].fields[i].type + '" value="" />';
    }
    if ( inputs[num].fields[i].textarea ) {
      input = '<textarea class="additional-fields__text-field" rows="' + inputs[num].fields[i].rows + '" value=""></textarea>';
    }
    if ( bool == true ) {
      fields = fields + '<div class="additional-fields__row">' + '<div class="additional-fields__name-field">'+ inputs[num].fields[i].name +' | #' + i + '</div>' + '<div class="additional-fields__content-field">'+ input +'</div><div class="additional-fields__remove-field"><input class="additional-fields__remove-button" type="button" value="—"/></div>' + '</div>';
    }
  }
  title = inputs[num].name;
  if ( bool == true ) {
    $('#bdM64').after( '<div class="additional-fields '+ inputs[num].system_name +'"><h2 class="additional-fields__title">' + title + '</h2>' + fields + '</div>' );
  } else {
    $('#bdM64').after( '<div class="additional-fields '+ inputs[num].system_name +'"><h2 class="additional-fields__title">' + title + '</h2></div>' );
  }
}

// УДАЛЯЕМ КНОПКУ "УДАЛЕНИЕ ПОЛЯ" У ГРУППЫ ПОЛЕЙ "ИНФОРМАЦИЯ О ФИЛЬМЕ"
$('.fields-information .additional-fields__remove-field').remove();

// УДАЛЯЕМ КНОПКУ "УДАЛЕНИЕ ПОЛЯ" У ГРУППЫ ПОЛЕЙ "ТРЕЙЛЕР"
$('.fields-trailer .additional-fields__remove-field').remove();

// ДОБАВЛЕМ КНОПКУ "ДОБАВИТЬ ПОЛЕ" У ГРУППЫ ПОЛЕЙ "ПЛЕЕРА" И "СЕРИАЛ"
$('.fields-player, .fields-serial').append(
  '<div class="additional-fields__row additional-fields__add">' +
    '<div class="additional-fields__name-field"></div>' +
    '<div class="additional-fields__content-field"><input class="additional-fields__add-button" type="button" value="Add field"/></div>' +
  '</div>'
);

// КЛИК НА КНОПКУ "ДОВАТЬ ПОЛЕ"
$('.additional-fields__add-button').on('click', function(){
  var new_num_field = $(this).parents('.additional-fields').find('.additional-fields__row').length - 1;
  var last_num_field = $(this).parents('.additional-fields').find('.additional-fields__row').length;
  var name_for_new_field = $(this).parents('.additional-fields').find('h2').text();
  switch( name_for_new_field ) {
    case inputs[1].name:
      var name_field = 'Player '
      break
    case inputs[2].name:
      var name_field = 'Series '
      break
  }
  $(this).parents('.additional-fields').find('.additional-fields__add').before(
    '<div class="additional-fields__row">' +
      '<div class="additional-fields__name-field">' + name_field + last_num_field + ' | #' + new_num_field + '</div>' +
      '<div class="additional-fields__content-field"><input class="additional-fields__text-field" type="' + inputs[2].fields[0].type + '" value=""></div>' +
      '<div class="additional-fields__remove-field"><input class="additional-fields__remove-button" type="button" value="—"/></div>' +
    '</div>'
  );
});




// КЛИК НА КНОПКУ "СОХРАНИТЬ МАТЕРИАЛ"
// $('#brief').click(function() {
$('input#bdF77').click(function() {

  $('#message').val( $('#message').val() + '<div class="dop-fields" style="display:none;">' );

  $('#message').val( $('#message').val() + '_fields-information_' );
  save_fields( 'fields-information' );
  $('#message').val( $('#message').val() + '_endfields-information_' );

  $('#message').val( $('#message').val() + '_fields-trailer_' );
  if ( $('.fields-trailer').find('.additional-fields__text-field').val() != '' ) {
    save_fields( 'fields-trailer' );
  }
  $('#message').val( $('#message').val() + '_endfields-trailer_' );

  $('#message').val( $('#message').val() + '_fields-player_' );
  if ( $('.fields-player .additional-fields__row').not('.additional-fields__add').length>0 ) {
    save_fields( 'fields-player' );
  }
  $('#message').val( $('#message').val() + '_endfields-player_' );

  $('#message').val( $('#message').val() + '_fields-serial_' );
  if ( $('.fields-serial .additional-fields__row').not('.additional-fields__add').length>0 ) {
    save_fields( 'fields-serial' );
  }
  $('#message').val( $('#message').val() + '_endfields-serial_' );

  $('#message').val( $('#message').val() + '</div>' );

  $('#bdF77').after( '<div class="warning-info">Refresh the page to continue editing this material</div>' );
  $('#bdF77, .fields-information, .fields-player, .fields-serial, .fields-trailer').remove();
});
function save_fields( field ) {
  // $('#message').val( $('#message').val() + '_'+field+'_' );
  $('.'+field).find('.additional-fields__row').not('.additional-fields__add').each(function(index){

      console.log( $(this).find('.additional-fields__text-field').val() );
      $('#message').val( $('#message').val() + '_field'+index+'_' + $(this).find('.additional-fields__text-field').val() + '_endfield'+index+'_' );

  });
  // $('#message').val( $('#message').val() + '_end'+field+'_' );
}

if ( $('body').hasClass('page-edit') ) {
  // ВЫВОД ИНФОРМАЦИИ В ПОЛЯ "ИНФОРМАЦИЯ О ФИЛЬМЕ"
  var matches = $('#message').val().match( /_fields-information_([\s\S]*?)_endfields-information_/ );
  var matches2 = matches[1].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
  for (var i = 0; i < matches2.length; i++) {
    value = matches2[i].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '');
    $('.fields-information .additional-fields__row').eq(i).find('.additional-fields__text-field').val( value );
  };

  // ВЫВОД ИНФОРМАЦИИ В ПОЛЯ "ТРЕЙЛЕР"
  var str = $('#message').val();
  var re = new RegExp("_fields-trailer_", "g");
  var myArray = re.test(str);
  if ( myArray == true ) {
    var matches = $('#message').val().match( /_fields-trailer_([\s\S]*?)_endfields-trailer_/ );
    var matches2 = matches[0].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
    if ( matches2 ) {
      for (var i = 0; i < matches2.length; i++) {
        value = matches2[i].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '');
        $('.fields-trailer .additional-fields__row').eq(i).find('.additional-fields__text-field').val( value );
      };
    }
  }

  // ВЫВОД ИНФОРМАЦИИ В ПОЛЯ "ПЛЕЕРА"
    var matches = $('#message').val().match( /_fields-player_([\s\S]*?)_endfields-player_/ );
    if ( matches[1] != '' ) {
      var matches2 = matches[1].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
      for (var i=0, j=1; i<matches2.length; i++, j++) {
        $('.fields-player .additional-fields__add').before(
          '<div class="additional-fields__row">' +
          '<div class="additional-fields__name-field">Плеер ' + j + ' | #' + i + '</div>' +
          '<div class="additional-fields__content-field"><input class="additional-fields__text-field" type="text" value=""/></div>' +
          '<div class="additional-fields__remove-field"><input class="additional-fields__remove-button" type="button" value="—"/></div>' +
          '</div>'
          );
      };
      for (var i = 0; i < matches2.length; i++) {
        value = matches2[i].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '');
        $('.fields-player .additional-fields__row').eq(i).find('.additional-fields__text-field').val( value );
      };
    };
  // }


  // ВЫВОД ИНФОРМАЦИИ В ПОЛЯ "СЕРИАЛ"
    var matches = $('#message').val().match( /_fields-serial_([\s\S]*?)_endfields-serial_/ );
    if ( matches[1] != '' ) {
      var matches2 = matches[1].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
      for (var i=0, j=1; i<matches2.length; i++, j++) {
        $('.fields-serial .additional-fields__add').before(
          '<div class="additional-fields__row">' +
          '<div class="additional-fields__name-field">Серия ' + j + ' | #' + i + '</div>' +
          '<div class="additional-fields__content-field"><input class="additional-fields__text-field" type="text" value=""/></div>' +
          '<div class="additional-fields__remove-field"><input class="additional-fields__remove-button" type="button" value="—"/></div>' +
          '</div>'
          );
      };
      for (var i = 0; i < matches2.length; i++) {
        value = matches2[i].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '');
        $('.fields-serial .additional-fields__row').eq(i).find('.additional-fields__text-field').val( value );
      };
    };
  // }
}

// КЛИК НА КНОПКУ "УДАЛИТЬ ПОЛЕ"
$('.additional-fields').on('click', '.additional-fields__remove-button', function() {
  $(this).parents('.additional-fields__row').remove();
});


// ПРИ ОТКРЫТИИ СТРАНИЦЫ ДЛЯ РЕДАКТИРОВАНИЯ УДАЛЯЕМ СЛУЖЕБНУЮ ИНФОРМАЦИЮ ИЗ ПОЛЯ ПОЛНОГО ОПИСАНИЯ
$(document).ready(function(){
  $('#message').val( $('#message').val().replace(/<div class="dop-fields" style="display:none;">([\s\S]*)/, '') );
  // $('#message').val( $('#message').val().replace(/_fields_([\s\S]*)/, '') );
});
