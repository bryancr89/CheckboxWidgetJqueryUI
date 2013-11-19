(function($) {
  $.widget('ui.checkbox', {
  	options: {
  		checkedClass: 'ui-plugin-checkbox-checked',
  		uncheckedClass: 'ui-plugin-checkbox-unchecked',
  		selectAll: true
  	},

  	_changeStatus: function(options){
    	var self = this,
    		$parent = $(options.ctx).parent(),
    		addClass, removeClass;
    	if(options.status === true){
    		addClass = self.options.checkedClass;
    		removeClass = self.options.uncheckedClass;
    	}
    	else {
    		addClass = self.options.uncheckedClass;
    		removeClass = self.options.checkedClass;
    	}
		$(options.ctx)
			.prop('checked', options.status)
			.prev()
			.addClass(addClass)
			.removeClass(removeClass);

		if(self.options.selectAll === true){	//Change status of the 'All' button automatically.
			if($parent.find('.' + self.options.uncheckedClass + ':not(:first-child)').length === 0){	//Get all unchecked except the all option
				$parent.find('.ui-plugin-checkbox-all')
					.addClass(self.options.checkedClass)
					.removeClass(self.options.uncheckedClass)
					.next().prop('checked', true);
			}
			else {
				$parent.find('.ui-plugin-checkbox-all')
					.addClass(self.options.uncheckedClass)
					.removeClass(self.options.checkedClass)
					.next().prop('checked', false);			
			}
		}
	},

	_create: function() {
	    var self = this,
	    	$element = $(self.element),
	    	$container = $('<div></div>'),
	    	text = $element.data('label'),
	    	changeCommon = function(){
		    	var status = $(this).is(':checked');
		    	self._changeStatus({
	    			ctx: this,
	    			status: status
	    		});
	    		return status;
		    };
	    $element.change(function(){
	    	changeCommon.call(this);
	    }).addClass('ui-plugin-checkbox-hide-input');
	    

	    $container
	    	.addClass('ui-plugin-checkbox')
	    	.html(text)
	    	.prop('title', text)
	    	.click(function(){
	    		var status = !$element.is(':checked');
	    		$element.prop('checked', status)
	    			.change();
	    	});
	    $element.before($container);
		
		//After add all the components initialize the element with the default value
	    self._changeStatus({
	    	ctx: $element, 
	    	status: $element.is(':checked')
	    });

	    if(self.options.selectAll === true && $element.parent().find('.ui-plugin-checkbox-all').length === 0){ //Add all option.
	    	var $input = $('<input type="checkbox" class="ui-plugin-checkbox-hide-input">'),
	    		$container = $('<div class="ui-plugin-checkbox ui-plugin-checkbox-all">All</div>');
	    	$input
	    		.change(function(){
	    			var status = changeCommon.call(this);
	    			if(status === true) {	//Mark all options as true.
	    				$(this).parent().find('.ui-plugin-checkbox')
	    					.addClass(self.options.checkedClass)
	    					.removeClass(self.options.uncheckedClass)
	    					.next().prop('checked', true);
	    			}
	    			else {	//Mark all options as false.
	    				$(this).parent().find('.ui-plugin-checkbox')
	    					.addClass(self.options.uncheckedClass)
	    					.removeClass(self.options.checkedClass)
	    					.next().prop('checked', false);
	    			}
	    		});

	    	$container.click(function(){
	    		var status = !$input.is(':checked');
	    		$input
	    			.prop('checked', status)
	    			.change();
	    	});

	    	$element.parent()
	    		.prepend($input)
	    		.prepend($container);
	    }
	}
  });
})($);