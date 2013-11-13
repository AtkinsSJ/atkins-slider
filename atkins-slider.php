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
			add_filter('post_gallery', array($this, 'post_gallery'));
			add_filter('gallery_style', array($this, 'gallery_style'));
			add_filter( 'wp_get_attachment_link', array( $this, 'wp_get_attachment_link' ), 10, 2 );
		}
	}

	// enqueue_assets in jetpack
	function post_gallery($output) {
		if ($this->first_run) {

			wp_enqueue_script(
				'atkins-slider',
				plugins_url('atkins-slider.js', __FILE__),
				array('jquery'),
				'1.0.0',
				true );

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

		return $html;
	}
}

new AtkinsSlider();