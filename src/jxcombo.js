if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
};

(function( $, window, document, undefined ) {
	
	var JxCombo = {

		init: function() {

			var self = this;
						
			var jxcombos = $("select[role='jxcombo']");
			
			for( var index = 0; index < jxcombos.length; index++ )
			{
				var $jxcombo = $(jxcombos[index]);

				var options = self.getOptions( $jxcombo );
			
				if ( options.parent === undefined )	
					self.fillComboIndependent( $jxcombo, options );
				else				
					self.bindEvents( $jxcombo, options, $(options.parent) );

			}

			
		},		
		
        bindEvents: function( $jxcombo, options, $parent ) {

			var self = this;

			var $parents = $parent || self._getComboParents();
			
			$parents.on('change', { self: self, $jxcombos : $jxcombo, options : options }, self.fillComboDependent);
		},

		getOptions: function( $jxcombo, options )
		{
			if( options !== undefined )
				return {
					source: options.source || $jxcombo.data('source'),
					parent: options.parent || $jxcombo.data('parent')
				};
			
			else
				return {
					source: $jxcombo.data('source'),
					parent: $jxcombo.data('parent')
				};			
		},

		fillComboIndependent: function( $jxcombo, options )
		{
			var self = this;

		    self.fillJxCombo($jxcombo, options);

		},

		fillComboDependent: function( e )
		{		

			var self = e.data.self, 
				$parentCombo = $(this), 
				$jxcombos = e.data.$jxcombos,
				options = e.data.options;

			$jxcombos.each( function( ) {
			    var $combo = $(this);
			    
			    if ($parentCombo.val()) {
			        self.fillJxCombo($combo, options, $parentCombo.val());
			    } else {
			        $combo.html('<option value=""></option>');
			        $combo.trigger('change');
			    }

			});
		},
		
		fillJxCombo: function( $jxcombo, options, parentValue ) {

		    var self = this,
		        select = '<option value=""></option>',
		        source = options.source;
		    
		    self.fetch($jxcombo, source, parentValue).done(function(response) {
		        var defaultValue = $jxcombo.data('default');
		        for (var i in response)
		            select += '<option value="' + i + '" ' + (defaultValue == i ? 'selected' : '') + '>' + response[i] + '</option>';
		        $jxcombo.html(select);
		        $jxcombo.trigger('change');

		    }).fail(function(xhr, ajaxOptions, thrownError) {

		        $jxcombo.html('<option>' + xhr.status + ' - ' + xhr.statusText + '</option>');

		    });
		},

		fetch: function( $jxcombo, source, parentValue ) {			
			
			return $.ajax({					
					url: source,					
					method: 'GET',
					type: 'json',
					cache: false,
					data: { 'id' : parentValue }
				});
		},

		_getComboParents: function( ) {
			
			var parents = "", $selects = $('select[data-parent]');

			for( var index = 0; index < $selects.length; index ++ ) 
			{
				var coma = index + 1 === $selects.length ? "" : ","

				parents += $( $selects[index] ).data('parent') +  coma;
			}

			return $(parents);
		}
	};

	$.fn.jxcombo = function( options ) {
		
		return this.each(function() {
			
			var jxcombo = Object.create( JxCombo ),
				$this = $(this);
			
				options = jxcombo.getOptions( $this, options );
			
			if ( options.parent === undefined )	
				jxcombo.fillComboIndependent( $this, options );
			else				
				jxcombo.bindEvents( $this, options, $(options.parent) );
			
		});
	};

	$.fn.jxcombo.options = {
		source: null
	};

	JxCombo.init();

})( jQuery, window, document );