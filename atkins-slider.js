/**
 * atkins-slider.js
 */
jQuery(document).ready(function($) {
	var createGallery = function(index, gallery) {

		var slideChangeDelay = 7000;
		var visibleSlideIndex = 0;
		var slideChangeTimeout;

		var $gallery = $(gallery)
						.addClass('slider-gallery');
		var $sliderFooter = $('<div>')
							.addClass('slider-footer')
							.appendTo($gallery);

		// Bind mouseOver and mouseOut
		$gallery.mouseenter(function() {
			clearTimeout(slideChangeTimeout);
		}).mouseleave(function(){
			slideChangeTimeout = setTimeout(changeSlideAfterDelay, slideChangeDelay);
		});

		var $thumbnails = $gallery.children('.gallery-item');
		$thumbnails.removeClass('gallery-item')
					.addClass('slider-item');
		// Resize thumbnails
		$thumbnails.find('a').each(function(i, a) {
			var $a = $(a),
				$img = $a.children('img'),
				url = $a.attr('href');

			url = url.split('//', 2)[1];

			$img.attr('src', 'http://i1.wp.com/' + url + '?resize=640,480');
			$img.addClass('slider-image');
		});
		// Set first thumbnail visible
		$thumbnails.first().addClass('current');

		// Create caption area
		var $caption = $('<div>').addClass('slider-caption')
							.appendTo($sliderFooter);
		$caption.text( $thumbnails.first().find('a').attr('title') );

		/**
		 * Switch to the slide with the given index
		 */
		var displaySlide = function(index) {
			if (index == visibleSlideIndex) return;

			$thumbnails.eq(visibleSlideIndex).fadeOut(function() {
				$(this).removeClass('current');
			});
			visibleSlideIndex = index;
			$thumbnails.eq(index).fadeIn(function() {
				$(this).addClass('current');
			});

			$caption.text( $thumbnails.eq(index).find('a').attr('title') );

			$dotList.children().removeClass('current')
					.eq(index).addClass('current');
		};

		// Create dots
		var $dotList = $('<ol>').addClass('slider-dots')
							.prependTo($sliderFooter);
		for (var i=0; i<$thumbnails.length; i++) {
			var $dot = $('<li class="slider-dot" data-index="'+i+'">');

			$dot.click(function() {
				displaySlide( $(this).attr('data-index') );
			})

			$dotList.append( $dot );
		}
		$dotList.children().first().addClass('current');

		// Hide caption elements
		$gallery.find('dd').hide();

		// Start changing slide on regular intervals
		var changeSlideAfterDelay = function() {
			var nextIndex = parseInt(visibleSlideIndex) + 1;
			if (nextIndex >= $thumbnails.length) {
				nextIndex = 0;
			}

			displaySlide(nextIndex);
			slideChangeTimeout = setTimeout(changeSlideAfterDelay, slideChangeDelay);
		};
		slideChangeTimeout = setTimeout(changeSlideAfterDelay, slideChangeDelay);
	};

	$('.gallery').each(createGallery);
});