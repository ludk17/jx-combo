( function($){

	var self;
	var JxCombo = {
		
		init: function () {
			self = this;

			var jxcombos = $("select[role='jxcombo']");

			self.bindEvents();

			for(var index = 0; index < jxcombos.length; index++) 
			{

				var $jxcombo = $(jxcombos[index]);
				
				var hasParent = $jxcombo.data('parent') ? true: false;
				
				if ( ! hasParent )

					self.llenarconAjax( $jxcombo );
				
			}
		},

		bindEvents: function() {
			
			var parents = "";
			var $selects = $('select[data-parent]');

			for( var index = 0; index < $selects.length; index ++ )
			{
				var coma = index + 1 === $selects.length ? "" : ","
				parents += $( $selects[index] ).data('parent') +  coma;				
			}


			$( parents ).on('change', function (){

				$('select[data-parent="#' + $(this).attr('id') +'"]').each(function(){
					self.llenarconAjax( $(this) );
				});

			});

			
		},

		llenarconAjax: function( $jxcombo ){

			$.ajax({					
					url: $jxcombo.data('source'),
					method: 'GET',
					type: 'json'
				}).done( function( response ) {

					var select = '<option value=""></option>';

					for(var i in response)
						select += '<option value="' + i + '">' + response[i] + '</option>';
				
					$jxcombo.html(select);
				});
		}
	}


	JxCombo.init();

})( jQuery );