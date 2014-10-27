//Resize The Image
$.fn.fullHeightImage = function(){
	var img = new Image;
	img.src = $(this).data("background-src");
	var tempHeight=img.height;
	var tempWidth=img.width;
	console.log(img, img.height, img.width);
	$(this).width(Number($(window).width()));
	if(Number(Number(tempHeight*$(window).width())/tempWidth) > Number(600)){
		console.log(Number(Number(tempHeight*$(window).width())/tempWidth));
		$(this).height(parseInt(tempHeight*$(window).width()/tempWidth));
	}
	else{
		console.log($(".intro-layout").height());
		$(this).height($(".intro-layout").height()+200);
	}
};
//jQuery Code For Parallax
$.fn.mParallax = function(){
    $(this).each(function(){
        var $myObject = $(this); // assigning the object
    
        $(window).scroll(function() {
            var mPosition = -($(window).scrollTop() / $myObject.data('speed')); 
            
            // Put together our final background position
            var coords = '50% '+ mPosition + 'px';

            // Move the background
            $myObject.css({ backgroundPosition: coords });
        }); 
    });   
};
//Toggle Sidebar
$.fn.toggleSidebar = function(){
	if($(".left-sidebar").hasClass("hidden")){
		console.log("CallForSideBar");
		$(".left-sidebar").removeClass("hidden");
	}
	else{
		console.log("CallForSideBar");
		$(".left-sidebar").addClass("hidden");
	}
};
//Change Header Size
$.fn.changeHeaderSmaller = function(){
	$(this).addClass("small");
	if(!$(".large-header").hasClass("small")){
		$(".large-header").addClass("small");
	}
};
$.fn.changeHeaderBigger = function(){
	$(this).removeClass("small");
	if($(".large-header").hasClass("small")){
		$(".large-header").removeClass("small");
	}
};
//Goto some Class
$.fn.gotoClass = function(){
	console.log("About To Scroll");
	var self = this;
	$('body').animate({
		scrollTop: ($(self).offset().top)
	},500,function(){
		console.log("Animation Complete");
	});
};
//Navigate To New Page
$.fn.visitPage = function(){
	console.log($(this).parent());
	switch($(this).data("nav-link")) {
	    case "home":
	        window.location.href="/home";
	        break;
	    case "c3":
	        window.location.href="/c3";
	        break;
	    case "voip":
	        window.location.href="/voip";
	        break;
        case "support":
	        window.location.href="/support";
	        break;
	    default:
	        console.log(link);
	}
}; 
//Dynamic Page Loading
$.fn.dynoPage = function(link){
	console.log($(this).parent());
	$(".caller-tab").parent().removeClass('active');
	$(this).parent().addClass("active");
	switch(link) {
	    case "home":
	        console.log(link);
	        $.get( "ajax/home", function( data ) {
				$( ".main-container" ).html( data );
				console.log( "Load was performed.",data );
				$(this).initailizeLateLoading();
			});
	        window.history.pushState('ajax-page', 'Home', '/'+link);
	        break;
	    case "c3":
	        console.log($(this).data("nav-link"));
	        $.get( "ajax/c3", function( data ) {
				$( ".main-container" ).html( data);
				console.log( "Load was performed.",$('#yourImageId'),$("#yourImageId").data());
				var src=$("#yourImageId").data("src");
				$(this).initailizeLateLoading();
			});
	        window.history.pushState('ajax-page', 'C3', '/'+link);
	        break;
	    case "voip":
	        console.log($(this).data("nav-link"));
	        $.get( "ajax/voip", function( data ) {
				$( ".main-container" ).html( data );
				console.log( "Load was performed.",data );
				$(this).initailizeLateLoading();
			});
	        window.history.pushState('ajax-page', 'VOIP', '/'+link);
	        break;
	    case "support":
	        console.log($(this).data("nav-link"));
	        $.get( "ajax/support", function( data ) {
				$( ".main-container" ).html( data );
				console.log( "Load was performed.",data );
				$(this).initailizeLateLoading();
			});
	        window.history.pushState('ajax-page', 'VOIP', '/'+link);
	        break;
	    default:
	        console.log(link);
	}
};
(function($){
	$.fn.initailizeLateLoading = function(){
		$('.bttrlazyloading').bttrlazyloading({
			threshold: -200,
			xs: {
				width: 720,
				height: 200
			},
			sm: {
				width: 360,
				height: 200
			},
			md: {
				width: 470,
				height: 200
			},
			lg: {
				width: 570,
				height: 200
			},
			retina: true,
			animation: 'flipInY',
			delay: 500,
			backgroundcolor: '#1A6990'
		});
	}
}(jQuery));
$(window).load(function(){
	$(".into-background").fullHeightImage();
});
$(function(){
	$( window ).resize(function() {
		$(".into-background").fullHeightImage();
	});
	$("a.button.header").on('click',function(){
		$(this).visitPage();
	});
	$(".glyphicon.glyphicon-align-justify.left").on("click",function(){
		$(".left-sidebar").toggleSidebar();
	})
	$(".glyphicon.glyphicon-chevron-down").on("click",function(){
		$(".services").gotoClass();
	});
	$(window).scroll(function(){
		console.log("ChangeHeader",$(".services").offset().top,$(window).height()+$(window).scrollTop());
		if($(window).scrollTop()>=$(window).height()-90){
			console.log("ChangeHeader");
			$("a.navbar-brand").changeHeaderSmaller();
			//$(".large-header").changeHeaderSmaller();
		}
		else{
			$("a.navbar-brand").changeHeaderBigger();
			//$(".large-header").changeHeaderSmaller();
		}
		if($(window).scrollTop()>=$(window).height()/2){
			$('.left-service,.right-service').removeClass('animated fadeOut');
    		$('.left-service').addClass('animated fadeInLeft');	
    		$('.right-service').addClass('animated fadeInRight');			
		}
	});
    
    $('section[data-type="background"]').mParallax();
});