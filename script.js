$(document).ready(function() /*=>*/ {
  var count = 0;
  var activeCount = 0;
  var decount = false;
  var i = Number(localStorage.getItem('todo-counter')) + 1,
        $itemList = $('.list'),
        $newTodo = $('#throw'),
        order = [],
        orderList;

  // Load todo list
  orderList = localStorage.getItem('todo-orders');

  orderList = orderList ? orderList.split(',') : [];
  //par defaut
  var islined = '<input style="border:none" class="disabled" value="';
  //si todo est completed
  var check = '<i class="fa fa-check checked">' + '</i>';
  var completed = "";

  //load first for active filter
  if( localStorage.getItem('storeFooter') )
    $('footer').html( localStorage.getItem('storeFooter') );

  //loop todo list from local storage if any
  for(j = 0, k = orderList.length; j < k; j++) {
    var ischeck = "";
    var dstyle = "";
    var texte = "";
    texte += orderList[j];
    if(texte.indexOf(" completed") >= 0) {
      ischeck = check;
      islined = '<input style="border:none; text-decoration:line-through; color: #A9A9B1;" class="disabled" value="';
      completed = " completed";
    }
    if($('.comp').css('border-color') == 'rgba(175, 47, 47, 0.2)') {
      if(completed === " completed")
        dstyle = "'style=display:inline-block;";
      else
        dstyle = "'style=display:none;";
    }
    else if($('.act').css('border-color') == 'rgba(175, 47, 47, 0.2)') {
      if(completed === " completed")
        dstyle = "'style=display:none;";
      else
        dstyle = "'style=display:inline-block;";
    }
    $itemList.append(
    "<div class='" + orderList[j] + dstyle + "'>" + islined + localStorage.getItem(orderList[j] ) +'" disabled="true">' + '<i class="fa fa-times destroy">'
    + '</i>' + '<i class="fa fa-circle-o check">' + ischeck + '</i>' + '</div>'
    );

    //reset defaut
    islined = '<input style="border:none" class="disabled" value="';
    completed = "";
  }

  //compteur de todos
  count = $('.list').children().length;
  if(count>0) {
    if($('.comp').css('border-color') !== 'rgba(175, 47, 47, 0.2)')
      $('.fa-chevron-down').css("visibility", "visible");

    $('footer').css("visibility", "visible");
  }
  //compteur de todo completed
  activeCount = $('.completed').length;
  $('.destroy').css({"visibility": "hidden"});
  if($('.list').children("div").not(".completed").length > 0) {
    $('.fa-chevron-down').css({"color": "#A9A9B1"});
  }
  else
    $('.fa-chevron-down').css({"color": "black"});

  //Clear orderlist
  function clearOrder() {
    var $newTodoList = $('.list div');
    // Empty the order array
    order.length = 0;

    // Go through the list item, grab the class then push into the array
    $newTodoList.each(function() {
      var $this = $(this).attr('class');
      order.push($this);
    });

    // Convert the array into string and save to localStorage
    localStorage.setItem( 'todo-orders', order.join(',') );
  }

  $('#throw').on("keypress", function(e) /*=>*/ {
    var text = $("#throw").val();
    //filtre les todo vides
    if(e.which == 13 && text !== "") { // KeyCode de la touche entrée
      // Take the value of the input field and save it to localStorage
      localStorage.setItem( "todo-" + i, $newTodo.val() );

      // Set the to-do max counter so on page refresh it keeps going up instead of reset
      localStorage.setItem('todo-counter', i);

      // Append a new list item with the value of the new todo list
      $itemList.append("<div class='todo-" + i + "'>" + '<input style="border:none" class="disabled" value="' + localStorage.getItem("todo-" + i) +'" disabled="true">' + '<i class="fa fa-times destroy">'
      + '</i>' + '<i class="fa fa-circle-o check">' + '</i>' + '</div>');

      clearOrder();

      i++;

      this.value = '';
      $('.fa-chevron-down').css("visibility", "visible");
      $('footer').css("visibility", "visible");
      count++;
      $("#todo-count strong").text(count);
      if($('.list').children("div").not(".completed").length > 0)
        $('.fa-chevron-down').css({"color": "#A9A9B1"});
      else
        $('.fa-chevron-down').css({"color": "black"});
      //<span class="glyphicons glyphicons-remove"></span>
      //<span class="glyphicons glyphicons-chevron-down"></span>

      var footer = $('footer').html();
      localStorage.setItem('storeFooter', footer);
    }
  });
  //Clear completed todos
  function clearAll() {
    var len = $('.list').children('.completed').length;
    // Remove todo list from localStorage based on the id of the clicked parent element
    $('.list').children('.completed').each( function() {
      var parentdiv = $(this).attr('class');
      localStorage.removeItem(parentdiv);
      //remove from DOM
      $(this).remove();
      //clear localstorage
      clearOrder();
    });
    count -= len;
    activeCount -= len;
    $('.clrcomp').css({"visibility": "hidden", "border-color": "rgba(0, 0, 0, 0)"});
    $('.alltodos').css({"border-color": "rgba(175, 47, 47, 0.2)"});
  //  $('.parent').not('.completed').css({"display": "inline-block"});
  }
  function deCount() {
    count--;
    $("#todo-count strong").text(count);
    decount = false;
  }
  //check selected todo
  function doCheck(pthis) {
    $(pthis).append($("<i class='fa fa-check checked'></i>"));
    //texte barré
    var parentdiv = $(pthis).parent("div").attr('class');
    var todoval = localStorage.getItem(parentdiv);
    localStorage.removeItem(parentdiv);
    parentdiv = parentdiv + " completed";
    localStorage.setItem(parentdiv, todoval);

    $(pthis).parent("div").children("input").css({"text-decoration": "line-through", "color": "#A9A9B1"});
    $(pthis).parent("div").toggleClass('completed');
    clearOrder();
    activeCount++;
    $("#todo-count strong").text(count-activeCount);
  }
  //deselect
  function unCheck(pthis) {
    $(pthis).parent("div").children("input").css({"text-decoration": "none", "color": "rgb(84, 84, 84)"});
    //annule todo check dans local storage
    var parentdiv = $(pthis).parent("div").attr('class');
    var todoval = localStorage.getItem(parentdiv);

    $(pthis).parent("div").removeClass('completed');
    localStorage.removeItem(parentdiv);
    parentdiv = $(pthis).parent("div").attr('class');
    localStorage.setItem(parentdiv, todoval);

    //supprime le check icon
    $(pthis).find("i").remove();
    clearOrder();
    activeCount--;
    $("#todo-count strong").text(count-activeCount);
  }
  //boucle events
  function onTick() {
    $('body').off('click').on("click", function() {
      $('.disabled').attr("disabled", "true").css({"outline": "none"});
    });
    $('.list').children("div").mouseover(function() {
      $(this).find(".destroy").css("visibility", "visible");
    });
    $('.list').children("div").mouseout(function() {
      $(this).find(".destroy").css("visibility", "hidden");
    });
    //remove todo
    $('.destroy').off('click').on("click", function() {
      var parentdiv = $(this).parent().closest('div').attr('class');
      // Remove todo list from localStorage based on the id of the clicked parent element
      localStorage.removeItem(parentdiv);
      //remove from DOM
      $(this).parent().closest('div').remove();
      clearOrder();
      decount = true;
    });
    //edit doubleclick
    $('.list').children("div").off('click').on("dblclick", function() {
      $(this).find(".disabled").removeAttr('disabled').focus().css({"outline": "solid", "text-decoration": "none", "color": "rgb(84, 84, 84)"});
    });
    //edite ou supprime todo si vide
    $('.disabled').on("keypress", function(e) {
      if(e.which == 13) {
        var val = $(this).val();
        var parentdiv = $(this).parent("div").attr('class');
        if(val === '') {
          // Remove todo list from localStorage based on the id of the clicked parent element
          localStorage.removeItem(parentdiv);

          $(this).parent("div").remove();
          clearOrder();
          decount = true;
        }
        //edite localStorage
        var todoval =  $(this).val();
        localStorage.setItem(parentdiv, todoval);

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
      else
        $('.fa-chevron-down').css({"color": "black"});

      var footer = $('footer').html();
      localStorage.setItem('storeFooter', footer);
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

    //affiche ou cache le bouton clear all
    if( activeCount > 0 && $('.clrcomp').css('visibility') == 'hidden')
      $('.clrcomp').css("visibility", "visible");
    else if( activeCount < 1)
      $('.clrcomp').css("visibility", "hidden");

//localStorage.clear();
	}
	setInterval(onTick, 500);
})
