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
		// Resize thumbnails
		$thumbnails.find('a').each(function(i, a) {
			var $a = $(a),
				$img = $a.children('img'),
				url = $a.attr('href');

			url = url.split('//', 2)[1];

			$img.attr('src', 'http://i1.wp.com/' + url + '?resize=640,480');
		});

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

		// Hide caption elements
		$gallery.find('dd').hide();
	};

	$('.gallery').each(createGallery);
});