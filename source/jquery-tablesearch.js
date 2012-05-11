/*!
 * jQuery TableSearch
 * 
 * @autor:.....Juarez Gonçalves Nery Junior
 * @email:.....juareznjunior@gmail.com
 * @twitter:...@juareznjunior
 * 
 */
;(function($, window, document, undefined){
	
	var defaults = {
		rowIndex: 0
	}

	var TableSearch = (function($){

		// vars
		// private
		var _timeOut
			,_row
			,_elem
			,_selectorTBody
			,_options
			,_cache = []
			,_rows
			,_clsShowRows = 'tablesearch-show-rows'
			,_clsShowRow  = 'tablesearch-show-row'
			,_clsHideRow  = 'tablesearch-hide-row';

		// functions
		// private
		var _search = function() {
				var i = 0;

				_selectorTBody.removeClass(_clsShowRows);

				_rows = ( _cache.length > 0 ) ? _cache : _selectorTBody[0].rows;

				while ( _row = _rows[i++] ) {
				
					if ( $(_row.cells[_options.rowIndex]).text().toLowerCase().indexOf($.trim(_elem.value.toLowerCase())) > -1 ) {
					
						$(_row)
							.removeClass(_clsHideRow)
							.addClass(_clsShowRow);
						
						if ( $.inArray(_row,_cache) === -1 ) {
							_cache[_cache.length] = _row;
						}
						
					} else {
						$(_row)
							.removeClass(_clsShowRow)
							.addClass(_clsHideRow);
					}
				}
			}
			,_trigger = function() {
				if ( _elem.value !== '' && _elem.value.length > 3 ) {
					window.clearTimeout(_timeOut);
					_timeOut = window.setTimeout(_search,100);
				} else {
					_selectorTBody.addClass(_clsShowRows);
					_cache = [];
					_rows = null;
				}
			}

		// expose
		return {
			init: function(elem,selectorTBody,options) {

				// input
				_elem = elem;

				// jQuery Object
				_selectorTBody = selectorTBody;

				// options
				_options = options;

				$(_elem).on('keyup',_trigger);

			}
		}

	})(jQuery);
	
	$.fn.tableSearch = function(selectorTBody, options) {

		return this.each(function(){
		
			if ( false === $(this).is(':text') ) {
				return;
			}
			
			TableSearch.init(this,$(selectorTBody),$.extend(defaults,options));
		});
	}
	
}(jQuery, window, document));