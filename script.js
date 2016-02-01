$(document).ready(function() {
  var count = 0;
  var activeCount = 0;
  var decount = false;
  var i = Number(localStorage.getItem('todo-counter')) + 1,
      $itemList = $('.list'),
      $newTodo = $('#throw';

  //reload
  if( localStorage.getItem('all') ) {
    $('.list').html( localStorage.getItem('all') );
    //compteur de todos
    count = $('.list').children().length;
    if(count>0) {
      $('.fa-chevron-down').css("visibility", "visible");
      $('footer').css("visibility", "visible");
    }
    //compteur de todo completed
    activeCount = $('.completed').length;
    $('.destroy').css({"visibility": "hidden"});
    if($('.parent').not(".completed").length > 0) {
      $('.fa-chevron-down').css({"color": "#A9A9B1"});
    }
    else
      $('.fa-chevron-down').css({"color": "black"});
  }
  if( localStorage.getItem('storeFooter') )
    $('footer').html( localStorage.getItem('storeFooter') );

  $('#throw').on("keypress", function(e) {
    var text = $("#throw").val();
    //filtre les todo vides
    if(e.which == 13 && text !== "") { // KeyCode de la touche entrée
      // Take the value of the input field and save it to localStorage
      localStorage.setItem( "todo-" + i, $newTodo.val() );

      // Set the to-do max counter so on page refresh it keeps going up instead of reset
      localStorage.setItem('todo-counter', i);

      // Append a new list item with the value of the new todo list
      $itemList.append("<div class='parent" + i + "'>" + '<input style="border:none" class="disabled" value="' + localStorage.getItem("todo-" + i) +'" disabled="true">' + '<i class="fa fa-times destroy">'
      + '</i>' + '<i class="fa fa-circle-o check">' + '</i>' + '</div>');


      //fonction ??
      var $newTodoList = $('#show-items li');
          // Empty the order array
          order.length = 0;

          // Go through the list item, grab the ID then push into the array
          $newTodoList.each(function() {
              var $this = $(this).attr('id');
              order.push($this);
          });

          // Convert the array into string and save to localStorage
          localStorage.setItem(
              'todo-orders', order.join(',')
          );



      // Hide the new list, then fade it in for effects
      $(".parent" + i).css('display', 'none').fadeIn();

      i++;



      this.value = '';
      var html = '<div class="parent">' + '<input style="border:none" class="disabled" value="'+text+'" disabled="true">' + '<i class="fa fa-times destroy">' + '</i>' + '<i class="fa fa-circle-o check">' + '</i>' + '</div>';
      $(".list").append(html);
      var todos = $('.list').html();
      $('.fa-chevron-down').css("visibility", "visible");
      $('footer').css("visibility", "visible");
      count++;
      $("#todo-count strong").text(count);
      if($('.parent').not(".completed").length > 0)
        $('.fa-chevron-down').css({"color": "#A9A9B1"});
      else
        $('.fa-chevron-down').css({"color": "black"});
      //<span class="glyphicons glyphicons-remove"></span>
      //<span class="glyphicons glyphicons-chevron-down"></span>
      var all = $('.list').html();
      localStorage.setItem('all', all);
      var footer = $('footer').html();
      localStorage.setItem('storeFooter', footer);
    }
  });
  //Clear completed todos
  function clearAll() {
    var len = $('.list').children('.completed').length;
    $('.list').children('.completed').each( function() {
      $(this).remove();
    });
    count -= len;
    activeCount -= len;
    $('.clrcomp').css({"visibility": "hidden", "border-color": "rgba(0, 0, 0, 0)"});
    $('.alltodos').css({"border-color": "rgba(175, 47, 47, 0.2)"});
    $('.parent').not('.completed').css({"display": "inline-block"});
  }
  function deCount() {
    count--;
    $("#todo-count strong").text(count);
    decount = false;
    var all = $('.list').html();
    localStorage.setItem('all', all);
  }
  //check selected todo
  function doCheck(pthis) {
    $(pthis).append($("<i class='fa fa-check checked'></i>"));
    //texte barré
    $(pthis).parent("div").children("input").css({"text-decoration": "line-through", "color": "#A9A9B1"});
    $(pthis).parent("div").toggleClass('completed');
    activeCount++;
    $("#todo-count strong").text(count-activeCount);
    var all = $('.list').html();
    localStorage.setItem('all', all);
  }
  //deselect
  function unCheck(pthis) {
    $(pthis).parent("div").children("input").css({"text-decoration": "none", "color": "rgb(84, 84, 84)"});
    $(pthis).parent("div").removeClass('completed');
    $(pthis).find("i").remove();
    activeCount--;
    $("#todo-count strong").text(count-activeCount);
    var all = $('.list').html();
    localStorage.setItem('all', all);
  }
  //boucle events
  function onTick() {
    $('body').off('click').on("click", function() {
      $('.disabled').attr("disabled", "true").css({"outline": "none"});
    });
    $('.parent').mouseover(function() {
      $(this).find(".destroy").css("visibility", "visible");
    });
    $('.parent').mouseout(function() {
      $(this).find(".destroy").css("visibility", "hidden");
    });
    //remove todo
    $('.destroy').off('click').on("click", function() {
      $(this).parent().closest('div').remove();
      decount = true;
    });
    //edit
    $('.parent').off('click').on("dblclick", function() {
      $(this).find(".disabled").removeAttr('disabled').focus().css({"outline": "solid", "text-decoration": "none", "color": "rgb(84, 84, 84)"});
    });
    //remove si vide
    $('.disabled').on("keypress", function(e) {
      if(e.which == 13) {
        var val = $(this).val();
        if(val === '') {
          $(this).parent("div").remove();
          decount = true;
        }
        $(this).attr("disabled", "true").css({"outline": "none"});
        if($(this).parent("div").hasClass('completed'))
          $(this).css({"text-decoration": "line-through", "color": "#A9A9B1"});
      }
    });
    //selectionne et deselectionne la div parent de l'input
    $('.check').off('click').on("click", function() {
      if($(this).parent("div").children("input").css('text-decoration') == 'none') {
        doCheck(this);
        if($('.clrcomp').css('visibility') == 'hidden')
          $('.clrcomp').css({"visibility": "visible"});
      }
      else {
        unCheck(this);
        if($('.clrcomp').css('visibility') == 'visible')
          $('.clrcomp').css({"visibility": "hidden"});
      }
      if($('.check').parent("div").not(".completed").length > 0) {
        $('.fa-chevron-down').css({"color": "#A9A9B1"});
      }
/*      else
        $('.fa-chevron-down').css({"color": "black"});

      var footer = $('footer').html();
      localStorage.setItem('storeFooter', footer);*/
    });
    //select/deselect tout
    $('.fa-chevron-down').off('click').on("click", function() {
      if( $(this).css('color') !== 'rgb(0, 0, 0)' ) {
        $(this).css({"color": "black"});
        $('.check').each(function() {
          if($(this).parent("div").children("input").css('text-decoration') == 'none') {
            doCheck(this);
          }
        });
      } else {
        $(this).css({"color": "#A9A9B1"});
        $('.check').each(function() {
          if($(this).parent("div").children("input").css('text-decoration') !== 'none') {
            unCheck(this);
          }
        });
      }
    });
    //show and hide border for buttons when click on link
    $('a').off('click').on("click", function() {
      var bgcolor = $(this).css("border-color");
      var testcol = "rgba(175, 47, 47, 0.2)";
      if(bgcolor !== testcol) {
        $(this).css({"border-color": "rgba(175, 47, 47, 0.2)"});
        //affiche tout
        if( $(this).hasClass('alltodos') ) {
          $('.check').parent("div").each(function() {
            if( $(this).css('display') == 'none')
              $(this).css({"display": "inline-block"});
          });
          if(count > 0 || activeCount > 0)
            $('.fa-chevron-down').css({"visibility": "visible"});
          else
            $('.fa-chevron-down').css({"visibility": "hidden"});
        }
        //filtre todos active
        if( $(this).hasClass('act') ) {
          $('.check').parent("div").each(function() {
            if( $(this).hasClass('completed') )
              $(this).css({"display": "none"});
            else
              $(this).css({"display": "inline-block"});
          });
          if($('.check').parent("div").not(".completed").length == 0)
            $('.fa-chevron-down').css({"visibility": "hidden"});
          else
            $('.fa-chevron-down').css({"visibility": "visible"});
        }
        //filtre todos completed
        if( $(this).hasClass('comp') ) {
          //Show completed todos list
          //si auncun completed affiche rien
          $('.check').parent("div").each(function() {
            if($(this).not(".completed").length > 0)
              $(this).css({"display": "none"});
            else
              $(this).css({"display": "inline-block"});
          });
          if(activeCount > 0)
            $('.fa-chevron-down').css({"visibility": "visible"});
          else
            $('.fa-chevron-down').css({"visibility": "hidden"});
        }
        $('a').not(this).css({"border-color": "rgba(0, 0, 0, 0)"});
      }
      //delete all selected todos
      if( $(this).hasClass('clrcomp') ) {
        clearAll();
      }
      //footer
      var footer = $('footer').html();
      localStorage.setItem('storeFooter', footer);
    });
    if(decount) {
      deCount();
    }
    if(count==0) {
      $('.clrcomp').css("visibility", "hidden");
      $('footer').css("visibility", "hidden");
      $('.fa-chevron-down').css("visibility", "hidden");
    }
    //filtre les todos
    if($('.act').css('border-color') == 'rgba(175, 47, 47, 0.2)') {
      $('.parent').each(function() {
        if($(this).not(".completed").length > 0)
          $(this).css({"display": "inline-block"});
        else
          $(this).css({"display": "none"});
      });
    }
    if($('.comp').css('border-color') == 'rgba(175, 47, 47, 0.2)') {
      $('.parent').each(function() {
        if($(this).not(".completed").length > 0)
          $(this).css({"display": "none"});
        else
          $(this).css({"display": "inline-block"});
      });
    }
    if($('.list').length > 0 && $('.parent').not(".completed").length == 0)
      $('.fa-chevron-down').css({"color": "black"});
    if( activeCount > 0 && $('.clrcomp').css('visibility') == 'hidden')
      $('.clrcomp').css("visibility", "visible");
    else if( activeCount < 1)
      $('.clrcomp').css("visibility", "hidden");

    if(count==0 && activeCount==0)
      localStorage.clear();

    localStorage.clear();
	}
	setInterval(onTick, 500);
})
