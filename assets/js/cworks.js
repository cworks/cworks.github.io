var blog = (function($) {

	// module scope variables
	var 
		// constants
		configMap = {
			extended_width: 260,
			extended_title: 'Click to retract',
			retracted_width: 0,
			retracted_title: 'Click to extend'
		},
		// vars
		$chatSlider,
		toggleSlider, onClickSlider, initModule;

	// alternates slider width
	toggleSlider = function() {
		var slider_width = $chatSlider.width();
		// extend slider if fully retracted
		if(slider_width === configMap.retracted_width) {
			$chatSlider.animate({width : configMap.extended_width})
				.attr('title', configMap.extended_title);
			return true;
		} else if(slider_width === configMap.extended_width) {
		// retract slider if fully extended
			$chatSlider.animate({width : configMap.retracted_width})
				.attr('title', configMap.retracted_title);
			return true;
		}
		// do not take action if slider is in transition
		return false;
	};
	// receives click event and calls toggleSlider
	onClickSlider = function(event) {
		toggleSlider();
		return false;
	};
	// sets initial state and provides feature
	initModule = function($container) {
		// initialize slider and width and title				
		$chatSlider = $container.find('.sidebar');
		// set the title of the slider
		// bind the user click event to the event handler
		$chatSlider.attr('title', configMap.retracted_title)
			.click(onClickSlider);
		return true;
	};

	// export public methods by returning an object from spa name-space
	return { initModule : initModule };	

}(jQuery));
