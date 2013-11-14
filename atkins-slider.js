/**
 * atkins-slider.js
 */
jQuery(document).ready(function($) {
	var createGallery = function(index, gallery) {
		var $gallery = $(gallery);
		console.log($gallery);
		$gallery.addClass('slider-gallery');

		var switchSlide = function(index) {
			console.log("Switching to slide #" + index);
		};

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
		$thumbnails.first().addClass('visible');

		// Create caption area
		var $caption = $('<div>').addClass('slider-caption')
							.appendTo($gallery);
		$caption.text("Slider Caption");

		// Create dots
		var $dotList = $('<ol>').addClass('slider-dots')
							.appendTo($gallery);
		for (var i=0; i<$thumbnails.length; i++) {
			var $dot = $('<li class="slider-dot" data-index="'+i+'">');

			$dot.click(function() {
				switchSlide( $(this).attr('data-index') );
			})

			$dotList.append( $dot );
		}

		// Hide caption elements
		$gallery.find('dd').hide();
	};

	$('.gallery').each(createGallery);
});