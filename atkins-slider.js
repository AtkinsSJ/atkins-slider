/**
 * atkins-slider.js
 */
jQuery(document).ready(function($) {
	var createGallery = function(index, gallery) {

		var visibleSlideIndex = 0;

		var $gallery = $(gallery);
		console.log($gallery);
		$gallery.addClass('slider-gallery');

		var $thumbnails = $gallery.children('.gallery-item');
		$thumbnails.removeClass('gallery-item')
					.addClass('slider-item');
		// Resize thumbnails
		$thumbnails.find('a').each(function(i, a) {
			var $a = $(a),
				$img = $a.children('img'),
				url = $a.attr('href');

			url = url.split('//', 2)[1];

			// $img.attr('src', 'http://i1.wp.com/' + url + '?resize=640,480');
		});
		// Set first thumbnail visible
		$thumbnails.first().addClass('current');

		// Create caption area
		var $caption = $('<div>').addClass('slider-caption')
							.appendTo($gallery);
		$caption.text("Slider Caption");

		/**
		 * Switch to the slide with the given index
		 */
		var displaySlide = function(index) {
			if (index == visibleSlideIndex) return;

			console.log("Switching to slide #" + index);
			$thumbnails.eq(visibleSlideIndex).fadeOut(function() {
				$(this).removeClass('current');
			});
			visibleSlideIndex = index;
			$thumbnails.eq(index).fadeIn(function() {
				$(this).addClass('current');
			});

			$dotList.children().removeClass('current')
					.eq(index).addClass('current');
		};

		// Create dots
		var $dotList = $('<ol>').addClass('slider-dots')
							.appendTo($gallery);
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
	};

	$('.gallery').each(createGallery);
});