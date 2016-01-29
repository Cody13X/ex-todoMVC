$(document).ready(function() {
  //$('#throw').focus();
  var count = 0;
  var activeCount = 0;
  var decount = false;
  //reload
  if(localStorage.getItem('all')) {
    $('body').html(localStorage.getItem('all'));
    count = $('.list').children().length;
  }
  $('#throw').on("keypress", function(e) {
    var text = $("#throw").val();
    if(e.which == 13) { // KeyCode de la touche entrée
      this.value = '';
      var html = '<div class="parent">' + '<input style="border:none" class="disabled" value="'+text+'" disabled="true">' + '<i class="fa fa-times destroy">' + '</i>' + '<i class="fa fa-circle-o check">' + '</i>' + '</div>';
      $(".list").append(html);
      var todos = $('.list').html();
      var chevron = "<i class='fa fa-chevron-down checkall'></i>";
      $('.todo').append(chevron);
      $('footer').css("visibility", "visible");
      count++;
      $("#todo-count strong").text(count);
      //<span class="glyphicons glyphicons-remove"></span>
      //<span class="glyphicons glyphicons-chevron-down"></span>

      /*var todos2 = $('.todo').html();
      localStorage.setItem('store2', todos2);
      localStorage.setItem('store', todos);
      localStorage.setItem('statecount', count);*/
      var all = $('body').html();
      localStorage.setItem('all', all);
    }
  });
  function clearAll() {
    var len = $('.list').children('.completed').length;
    $('.list').children('.completed').each( function() {
      $(this).remove();
    });
    count -= len;
    $('.clrcomp').css({"visibility": "hidden"});
  }
  function deCount() {
    count--;
    $("#todo-count strong").text(count);
    decount = false;
    var all = $('body').html();
    localStorage.setItem('all', all);
  }
  //check selected todo
  function doCheck(pthis) {
    $(pthis).append($("<i class='fa fa-check checked'></i>"));
    //texte barré
    $(pthis).parent("div").children("input").css({"text-decoration": "line-through", "opacity": "0.5"});
    $(pthis).parent("div").toggleClass('completed');
    activeCount++;
    $("#todo-count strong").text(count-activeCount);
    var all = $('body').html();
    localStorage.setItem('all', all);
  }
  function unCheck(pthis) {
    $(pthis).parent("div").children("input").css({"text-decoration": "none", "opacity": "1"});
    $(pthis).find("i").remove();
    activeCount--;
    $("#todo-count strong").text(count-activeCount);
    var all = $('body').html();
    localStorage.setItem('all', all);
  }
  function onTick() {
    $('.parent').mouseover(function() {
      $(this).find(".destroy").css("visibility", "visible");
    });
    $('.parent').mouseout(function() {
      $(this).find(".destroy").css("visibility", "hidden");
    });
    $('.destroy').off('click').on("click", function() {
      $(this).parent().closest('div').remove();
      decount = true;
    });
    $('.parent').off('click').on("dblclick", function() {
      $(this).find(".disabled").removeAttr("disabled").focus();
    });
    $('.disabled').off('click').on("keypress", function(e) {
      if(e.which == 13) {
        var val = $(this).value;
        if(val === undefined) {
          $(this).parent("div").remove();
          decount = true;
        }
      }
    });
    //selectionne et deselectionne la div parent de l'input
    $('.check').off('click').on("click", function() {
      if( $(this).parent("div").children("input").css('text-decoration') == 'none') {
        doCheck(this);
        if( $('.clrcomp').css('visibility') == 'hidden')
          $('.clrcomp').css({"visibility": "visible"});
      }
      else {
        unCheck(this);
        if( $('.clrcomp').css('visibility') == 'visible')
          $('.clrcomp').css({"visibility": "hidden"});
      }
    });
    //select/deselect tout
    $('.checkall').off('click').on("click", function() {
      $(".check").each(function(entry, index, array) {
        if( $(this).parent("div").children("input").css('text-decoration') == 'none') {
          doCheck(this);
        }
        else {
          unCheck(this);
        }
      });
    });
    //show and hide border for buttons
    $('a').off('click').on("click", function() {
      var bgcolor = $(this).css("border-color");
      var testcol = "rgba(175, 47, 47, 0.2)";
      if(bgcolor !== testcol) {
        $(this).css({"border-color": "rgba(175, 47, 47, 0.2)"});
        if( $(this).hasClass('act') ) {
          $('.parent').remove();
          //save todo list in completed and remove
  /*        var list = localStorage.getItem('store');
          localStorage.setItem('completed', list);
          localStorage.removeItem('store');*/
        }
        //delete todos and save in completed list
        if( $(this).hasClass('comp') ) {
          $('.parent').remove();
          //save todo list in completed and remove
  /*        var list = localStorage.getItem('store');
          localStorage.setItem('completed', list);
          localStorage.removeItem('store');*/
        }
        //delete all selected todos
        if( $(this).hasClass('clrcomp') ) {
          clearAll();
        }
      }
      /*if( $(this).hasClass('selected') ) {
        console.log('piouf');
      }*/
      $('a').not(this).css({"border-color": "rgba(0, 0, 0, 0)"});
      //save the border link
      var all = $('body').html();
      localStorage.setItem('all', all);
    });
    if(decount) {
      deCount();
    }
    if(count==0) {
      $('footer').css("visibility", "hidden");
      $('.checkall').remove();
    }
    localStorage.clear();
	}
	setInterval(onTick, 500);
})
