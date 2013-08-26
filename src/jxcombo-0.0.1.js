// Utility
if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	
	var JxCombo = {

		init: function( options , elem ) {

			console.log( options );

			console.log( elem );

			var jxcombos = elem !== undefined ? $(elem) : $("select[role='jxcombo']").not("[data-parent]");

			this.fillComboIndependent( jxcombos );

			this.bindEvents();
		},

		fillComboIndependent: function( jxcombos )
		{
			for( var index = 0; index < jxcombos.length; index++ )
			{
				var $jxcombo = $(jxcombos[index]);
				
				this.fillJxCombo( this, $jxcombo );
			}
		},

		fillComboDependent: function( e )
		{
			var self = e.data.self, $this = $(this);

			$('select[data-parent="#' + $this.attr('id') +'"]').each( function( ) {
			
				self.fillJxCombo( self, $(this),  $this.val() );

			});
		},

		bindEvents: function( ) {			

			var $parents = this._getComboParents();

			$parents.on('change', { self: this }, this.fillComboDependent);
		},

		fillJxCombo: function( self, $jxcombo, value ){

			var select = '<option value=""></option>';

			self.fetch( $jxcombo, value ).done( function( response ) {
				
				for( var i in response )
					select += '<option value="' + i + '">' + response[i] + '</option>';
		
				$jxcombo.html(select);

			}).fail( function ( xhr, ajaxOptions, thrownError ) {

				$jxcombo.html('<option>'+ xhr.status + ' - ' + xhr.statusText +'</option>');

			});		
		},

		fetch: function( $jxcombo, value ){

			return $.ajax({					
					url: $jxcombo.data('source'),
					data: { 'id' : value },
					method: 'GET',
					type: 'json',
					cache: false
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
			
			var jxqcombo = Object.create( JxCombo );
			
			jxqcombo.init( options, this );

			//$.data( this, 'jxcombo', jxqcombo );
		});
	};

	$.fn.jxcombo.options = {
		search: '@tutspremium',
		wrapEachWith: '<li></li>',
		limit: 10,
		refresh: null,
		onComplete: null,
		transition: 'fadeToggle'
	};

	//JxCombo.init();

})( jQuery, window, document );