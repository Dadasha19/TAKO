$('.products_menu').on('click', function(){
  $(this).toggleClass('active');
  $('.dropdown_menu_all').toggleClass('active');
});
$('.menu-toggle').on('click', function(){
    $('body').toggleClass('open');
    $('.bg_menu').toggleClass('open');
});
document.getElementById('year').textContent = new Date().getFullYear();
var swiper = new Swiper('.reviews_slider', {
  	spaceBetween: 32,
  	slidesPerView: 4,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		980: {
		slidesPerView: 4,
		spaceBetween: 32,
		},
		720: {
		slidesPerView: 3,
		spaceBetween: 32,
		},
		0: {
		slidesPerView: 2,
		spaceBetween: 32,
		},
	},
});
var swiper = new Swiper('.works_more_slider', {
  spaceBetween: 30,
  effect: "fade",
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

function catalogItemCounter(field){
	var fieldCount = function(el) {
	var 
		min = el.data('min') || false,
		max = el.data('max') || false, 
		dec = el.prev('.dec'), 
		inc = el.next('.inc');
		function init(el) {
			if(!el.attr('disabled')){
				dec.on('click', decrement);
				inc.on('click', increment);
			}
			function decrement() {
				var value = parseInt(el[0].value);
				value--;

				if(!min || value >= min) {
					el[0].value = value;
				}
			};
			function increment() {
				var value = parseInt(el[0].value);
				value++;
				if(!max || value <= max) {
					el[0].value = value++;
				}
			};
		}
		el.each(function() {
			init($(this));
		});
	};
	$(field).each(function(){
		fieldCount($(this));
	});
}
    
catalogItemCounter('.fieldCount');

/* works_more_right_slider */


