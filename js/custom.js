$( document ).ready(function() {
  
	/*Nurse Call*/
	$('.help-nurse').click(function(e){
		e.preventDefault();
		$('body').addClass('modal_opened');
		$('.modal#nurse-m').show();
	});
	$('.modal-nurse__cancel').click(function(e){
		e.preventDefault();
		$('body').removeClass('modal_opened');
		$('.modal#nurse-m').hide();
	});
	/*Request Things*/
	$('.help-things').click(function(e){
		e.preventDefault();
		$('body').addClass('modal_opened');
		$('.modal#things-m').addClass('things-m_opened');
	});
	$('.things-pull, .things-close').click(function(){
		$('body').removeClass('modal_opened');
		$('.modal#things-m').removeClass('things-m_opened');
	});
	/*Request Things switching*/
	$('.things-item').click(function(e){
		e.preventDefault();
		var category = $(this).attr('href');
		$('.things-category'+category).show();
		$('.things-main').hide();
	});
	$('.js-back2main').click(function(e){
		e.preventDefault();
		$('.things-category').hide();
		$('.things-main').show();
	});
	/*Request Things carousel*/	
	$('.things-carousel').slick({
		infinite: false,
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
		
});