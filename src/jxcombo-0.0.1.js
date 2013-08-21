( function($){

	var JxCombo = {
		
		init: function () {
			var self = this;

			var jxcombos = $("select[role='jxcombo']");

			self.bindEvents();

			for(var index = 0; index < jxcombos.length; index++) 
			{

				var $jxcombo = $(jxcombos[index]);
				
				var hasParent = $jxcombo.data('parent') ? true: false;				

				if ( ! hasParent )
				{
					
					//var $combo = $jxcombo;
					
					$.ajax({
						
						url: $jxcombo.data('source'),
						
						method: 'GET',
						
						type: 'json',

						async: false,

						beforeSend: function(){
							console.log('send');
						}

					}).done( function( response ){

						var select = '<option value=""></option>';
						
						for(var i in response) {
							
							select += '<option value="' + i + '">' + response[i] + '</option>';
						}					

						$jxcombo.html(select);

						$jxcombo.trigger("change");

					});
				}
				
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
					self = this;
					$combo = $(this);
					
					//console.log(self);

					return $.ajax({
						
						url: $combo.data('source'),
						
						method: 'GET',
						
						type: 'json'

						//async: false

					}).done( function( response ){

						console.log(self);

						var select = '<option value=""></option>';
						
						for(var i in response) {
							
							select += '<option value="' + i + '">' + response[i] + '</option>';
						}					

						$combo.html(select);

						$combo.trigger('change')

					}).fail(function(){
						console.log('error');
					});
				});

			});

			
		}

	}


	JxCombo.init();

})( jQuery );