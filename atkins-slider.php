<?php
/**
 * Plugin Name: AtkinsSlider
 * Plugin URI: http://samatkins.co.uk
 * Description: 
 * Version: 1.0
 * Author: Samuel Atkins
 * Author URI: http://samatkins.co.uk
 * License: GPL2
 */

class AtkinsSlider {

	var $first_run = true;

	// Gallery id, used for linking the lightbox
	var $gallery = 0;

	function __construct() {
		add_action('init', array($this, 'init'));
	}

	function init() {
		// Frontend setup
		if (!is_admin()) {
			// Disable the default gallery style
			add_filter('use_default_gallery_style', '__return_false');

			add_filter('post_gallery', array($this, 'post_gallery'));
			add_filter('gallery_style', array($this, 'gallery_style'));
			add_filter( 'wp_get_attachment_link', array( $this, 'wp_get_attachment_link' ), 10, 2 );
		}
	}

	// enqueue_assets in jetpack
	function post_gallery($output) {
		if ($this->first_run) {

			wp_enqueue_script(
				'lightbox',
				plugins_url('lightbox/js/lightbox-2.6.min.js', __FILE__),
				array('jquery'),
				false,
				true
			);
			wp_enqueue_style(
				'lightbox',
				plugins_url('lightbox/css/lightbox.css', __FILE__),
				false,
				false,
				'all'
			);

			wp_enqueue_script(
				'atkins-slider',
				plugins_url('atkins-slider.js', __FILE__),
				array('jquery', 'lightbox'),
				false,
				true
			);
			wp_enqueue_style(
				'lightbox',
				plugins_url('atkins-slider.css', __FILE__),
				false,
				false,
				'all'
			);

			$this->first_run = false;
		}
	}

	// add_data_to_container in jetpack
	function gallery_style($html) {
		$this->gallery++;

		return $html;
	}

	// add_data_to_images in jetpack
	function wp_get_attachment_link($html, $attachment_id) {
		if ($this->first_run) {
			return $html;
		}

		$attachment = get_post($attachment_id);

		$html = str_replace(
			'<a ',
			sprintf(
				'<a title="%1$s" data-lightbox="%2$s" ',
				$attachment->post_excerpt,
				'gallery-'.$this->gallery
			),
			$html
		);

		return $html;
	}
}

new AtkinsSlider();