$(document).ready(function() {
    //slick config

    $("#slider").slick({
        arrows: true,
        dots: false,
        fade: true,
        infinite: true,
        slidesToScroll: 1,
        speed: 800,

    });

    $(".recall-block").slick({
        dots: false,
        arrows: false,
        // autoplay: true
    });

    //animation main gallery

    $(function() {
        var selectedClass = "";
        $("li").click(function(){
            selectedClass = $(this).attr("data-rel");
            $("#portfolio").fadeTo(100, 0.1);
            $("#portfolio div").not("."+selectedClass).fadeOut();
            setTimeout(function() {
                $("."+selectedClass).fadeIn();
                $("#portfolio").fadeTo(500, 1);
            }, 500);

        });
    });

    //tabs

    $(".tabs__controls-link").on("click", function(e) {
        e.preventDefault();

        var item = $(this).closest(".tabs__controls-item"),
            contentItem = $(".tabs__item"),
            itemPosition = item.index();

        contentItem.eq(itemPosition)
            .add(item)
            .addClass("active")
            .siblings()
            .removeClass("active");

    });
});

window.onload = function() {

    //filter portfolio

    $(function () {
        $(".gallery li").on("mouseenter mouseleave", function(e){

            var w = $(this).width();
            var h = $(this).height();

            var x = (e.pageX - this.offsetLeft - (w/2)) * ( w > h ? (h/w) : 1 );
            var y = (e.pageY - this.offsetTop  - (h/2)) * ( h > w ? (w/h) : 1 );

            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180 ) / 90 ) + 3 )  % 4;

            switch(direction) {
                case 0:
                    var slideFrom = {"top":"-100%", "right":"0"};
                    var slideTo = {"top":0};

                    var imgSlide = "0, 60";
                    break;
                case 1:
                    var slideFrom = {"top":"0", "right":"-100%"};
                    var slideTo = {"right":0};

                    var imgSlide = "-60, 0";
                    break;
                case 2:
                    var slideFrom = {"top":"100%", "right":"0"};
                    var slideTo = {"top":0};

                    var imgSlide = "0, -60";
                    break;
                case 3:
                    var slideFrom = {"top":"0", "right":"100%"};
                    var slideTo = {"right":0};

                    var imgSlide = "60, 0";
                    break;
            }

            if( e.type === 'mouseenter' ) {
                var element = $(this);
                element.find(".info").removeClass("transform").css(slideFrom);
                element.find("img").addClass("transform").css("transform","matrix(1, 0, 0, 1,"+imgSlide+")");
                setTimeout(function(){
                    element.find(".info").addClass("transform").css(slideTo);
                },1);

            }else {
                var element = $(this);
                element.find(".info").addClass("transform").css(slideFrom);
                element.find("img").removeClass("transform").css("transform","matrix(1, 0, 0, 1,"+imgSlide+")");
                setTimeout(function(){
                    element.find("img").addClass("transform").css("transform","matrix(1, 0, 0, 1,0,0)");
                },1);
            }
        });
    });
};