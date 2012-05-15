/*!
 * jQuery TableSearch
 * 
 * @autor......: Juarez Gonçalves Nery Junior
 * @email......: juareznjunior@gmail.com
 * @twitter....: @juareznjunior
 * @git........: https://github.com/juareznjunior/jQuery-TableSearch
 */
;(function($, window, document, undefined) {

	var TableSearch = function(elem,selectorTBody,options) {

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

		// input
		_elem = elem;

		// jQuery Object
		_selectorTBody = selectorTBody;

		// options
		_options = $.extend({},{
			rowIndex: 0
		},options);

		$(_elem).on('keyup',_trigger);

	};
	
	$.fn.tableSearch = function(selectorTBody, options) {
		return this.each(function(data) {

			if ( false === $(this).is(':text') ) {
				return;
			}

			data = $.data(this,'TableSearch');

			if ( undefined === data ) {
				$.data(this,'TableSearch', new TableSearch(this,$(selectorTBody),options));
			}
		});
	}
	
}(jQuery, window, document));