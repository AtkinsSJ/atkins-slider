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

			$this->first_run = false;
		}
	}

	// add_data_to_container in jetpack
	function gallery_style($html) {
		
		return $html;
	}

	// add_data_to_images in jetpack
	function wp_get_attachment_link($html, $attachment_id) {
		if ($this->first_run) {
			return $html;
		}

		// What needs to be done:
		// * Add title to the <a>, equal to the image title
		// * Add data-lightbox attribute to <a>, equal to gallery name.

		$html = str_replace(
			'<a ',
			sprintf(
				'<a title="%1$s" data-lightbox="%2$s" ',
				'title',
				'gallery'
			),
			$html
		);

		return $html;
	}
}

new AtkinsSlider();