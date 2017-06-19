/*
* endless additional fields for ucoz (бесконечные дополнительные поля для ucoz)
* v1.0
* developer: mihail-174
* github: https://github.com/mihail-174/endless-additional-fields-for-ucoz
*/

$(document).ready(function(){

  $('.node__descr').before( $('.node__film-serials') );
  $('.node__descr').before( $('.node__film-players') );

  var inputs = [
    {
      "name": "Информация о фильме",
      "system_name": "fields-information",
      "fields": [
        {"name": "Русское Имя Фильма", "input": "input", "type": "text"},
        {"name": "Оригинальное Имя Фильма", "input": "input", "type": "text"},
        {"name": "Произведено в", "input": "input", "type": "text"},
        {"name": "Дата Выпуска", "input": "input", "type": "text"},
        {"name": "Жанр Картины", "input": "input", "type": "text"},
        {"name": "Режиссер Фильма", "input": "input", "type": "text"},
        {"name": "Длительность Фильма", "input": "input", "type": "text"},
        {"name": "Главные Роли Исполняют", "textarea": "textarea", "rows": "5"}
      ]
    }
  ];


  var hidden_info = $('.dop-fields').html();
  // $('.node-online-film .dop-fields').remove();

  var perem_fields = hidden_info.match( /_fields-information_([\s\S]*?)_endfields-information_/ );
  var perem_fields = perem_fields[1].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
  var content = [];
  for (var i=0; i<inputs[0].fields.length; i++) {
    content = content +
     '<div class="film-info__row">' +
     '<div class="film-info__label"><span>' + inputs[0].fields[i].name + '</span></div>' +
     '<div class="film-info__content">' + perem_fields[i].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '') + '</div>' +
     '</div>';
   }
  $('.node__film-info').html( content );



  var perem_fields = hidden_info.match( /_fields-player_([\s\S]*?)_endfields-player_/ );
  var perem_fields = perem_fields[1].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
  if ( perem_fields ) {
    var tabs = [];
    var tabs_content = [];
    for (var i=0, j=1; i<perem_fields.length; i++, j++) {
      tabs = tabs + '<li><a href="#player'+ j +'">Плеер ' + j + '</li>';
      tabs_content = tabs_content + '<div id="player'+ j +'" style="display:none;"><iframe width="640" height="360" frameborder="0" allowfullscreen="" scrolling="no" src="' + perem_fields[i].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '') + '"></iframe></div>';
    }
    $('.node__film-players').html(
      '<ul>' + tabs + '</ul>' +
      tabs_content
    );
  } else {
    $('.node__film-players').remove();
  }

  var perem_fields = hidden_info.match( /_fields-serial_([\s\S]*?)_endfields-serial_/ );
  var perem_fields = perem_fields[1].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
  if ( perem_fields ) {
    var tabs = [];
    var tabs_content = [];
    for (var i=0, j=1; i<perem_fields.length; i++, j++) {
      tabs = tabs + '<li><a href="#seriya'+ j +'">Серия ' + j + '</a></li>';
      tabs_content = tabs_content + '<div id="seriya'+ j +'" style="display:none;"><iframe width="640" height="360" frameborder="0" allowfullscreen="" scrolling="no" src="' + perem_fields[i].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '') + '"></iframe></div>';
    }
    $('.node__film-serials').html(
      '<ul>' + tabs + '</ul>' +
      tabs_content
    );
  } else {
    $('.node__film-serials').remove();
  }


// <iframe width="650px" height="500px" frameborder="0" allowfullscreen="" scrolling="no" src=""></iframe>

  var perem_fields = hidden_info.match( /_fields-trailer_([\s\S]*?)_endfields-trailer_/ );
  var perem_fields = perem_fields[1].match( /_field[0-9]*_([\s\S]*?)_endfield[0-9]*_/g );
  if ( perem_fields ) {
    var tabs = [];
    var tabs_content = [];
    $('.node__film-players ul').prepend( '<li><a href="#player0">Анонс</li>' );
    $('.node__film-players ul').after( '<div id="player0"><iframe width="640" height="360" frameborder="0" allowfullscreen="" scrolling="no" src="' + perem_fields[0].replace(/_field[0-9]*_|_endfield[0-9]*_/g, '') + '"></iframe></div>' );
  }

  $(".node__film-players").tabs();
  $(".node__film-serials").tabs();

});
