(function($){})(window.jQuery);
$(document).ready(function (){
    // Bootstrap Image Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // On Click events
    $('body').on('click','#block-nav li',function(e) {
        e.preventDefault();
        innerPageURL = $(this).find('a').attr('href');
        screenOverlay();
        loadInnerContent();
    });

    $('body').on('click','#screen-overlay',function(){
          closeOverlay();
    });

});

function loadInnerContent() {
    var containerWidth = $('.container').width();
    $('<div></div>').attr('id','inner-page-wrapper').addClass('col-sm-12').appendTo('.container').fadeIn(1,function() {
        $('#inner-page-wrapper').load(innerPageURL+' .container > *',function() {
            $(this).css('min-height',$(window).height())
                .width(containerWidth-30)
                .animate({top:'10%'},1000,function(){
                    //appendFooter();
                });
        })
    });
}
function screenOverlay(){
    var windowWidth = $(window).width();
    var documentHeight = $(document).height();
    $('<div></div>').attr('id','screen-overlay').css({width: windowWidth,height: documentHeight}).prependTo('body').fadeIn(600);
}
function appendFooter() {
    var containerWidth = $('.container').width();
    var navigation = $('#block-nav').html();
    $('<footer></footer>').attr('id','inner-nav').appendTo('.container').fadeIn(1,function(){
        var navItemHeight = $('#block-nav li').height();
        $('#inner-nav').append(navigation);
        $(this).width(containerWidth);
        $(this).animate({top: 0},500);
    })
}
function closeOverlay(){
    $('#inner-page-wrapper').animate({top: '100%'},500,function(){
        $(this).remove();
        $('#screen-overlay').fadeOut(500,function(){
            $(this).remove();
        })
    })
}