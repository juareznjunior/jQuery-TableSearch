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
	
	var TableSearch = function(elem,domTBody,options) {
		
		this.elemTimeout;
		this.row;
		this.elem = elem;
		this.domTBody = domTBody;
		this.options = options;
		this.cache = [];
		this.rows;
		
		console.log(this.cache)
		
		this.search = function() {
			
			$(this.domTBody).removeClass('tablesearch-show-rows');
			
			var i = 0;
			
			this.rows = ( this.cache.length > 0 ) ? this.cache : this.domTBody.rows;
			
			while ( row = this.rows[i++] ) {
			
				if ( $(row.cells[this.options.rowIndex]).text().toLowerCase().indexOf($.trim(this.elem.value.toLowerCase())) > -1 ) {
				
					$(row).removeClass('tablesearch-hide-row').addClass('tablesearch-show-row');
					
					if ( $.inArray(row,this.cache) === -1 ) {
						this.cache[this.cache.length] = row;
					}
					
				} else {
					$(row).removeClass('tablesearch-show-row').addClass('tablesearch-hide-row');
				}
			}
		}
		
		this.trigger = function() {
			
			if ( this.elem.value !== '' && this.elem.value.length > 3 ) {
				window.clearTimeout(this.elemTimeout);
				this.elemTimeout = window.setTimeout($.proxy(this.search,this),100)
			} else {
				$(this.domTBody).addClass('tablesearch-show-rows');
				this.cache = [];
				this.rows = null;
			}
		}
		
		$(this.elem).on('keyup',$.proxy(this.trigger,this))
	}
	
	$.fn.tableSearch = function(domTBody, options) {
		return this.each(function(){
		
			if ( false === $(this).is(':text') ) {
				return;
			}
			
			new TableSearch(this,domTBody,$.extend(defaults,options));
		});
	}
	
	$('#jquery-table-search').tableSearch($('#demotable1')[0].tBodies[0]);
	
}(jQuery, window, document));