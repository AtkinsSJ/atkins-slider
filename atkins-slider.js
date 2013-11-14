/**
 * atkins-slider.js
 */
jQuery(document).ready(function($) {
	var createGallery = function(index, gallery) {
		var $gallery = $(gallery);
		console.log($gallery);
		$gallery.addClass('slider-gallery');

		var $thumbnails = $gallery.children('.gallery-item');
		$thumbnails.removeClass('gallery-item')
					.addClass('slider-item');

		// Create caption area
		var $caption = $('<div>').addClass('slider-caption')
							.appendTo($gallery);
		$caption.text("Slider Caption");

		// Create dots
		var $dotList = $('<ol>').addClass('slider-dots')
							.appendTo($gallery);
		for (var i=0; i<$thumbnails.length; i++) {
			$dotList.append( $('<li class="slider-dot" data-index="'+i+'">') );
		}

		// Resize thumbnails

		// Hide caption elements
		$gallery.find('dd').hide();
	};

	$('.gallery').each(createGallery);
});