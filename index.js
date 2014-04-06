var clone = require('bredele-clone');

/**
 * Expose Middleware
 */

module.exports = function(store) {

	/**
	 * Set and get path.
	 * example:
	 *   store.path('country.canada'); //get
	 *   store.path('country.canada', 'france');
	 *   store.path('name.3.2', 'olivier'); //works with arrys
	 *   
	 * @param  {String} name 
	 * @param  {Any} val  
	 * @api public
	 */
	
	store.path = function(name, val) {
		var path = name.split('.'),
				attr = clone(store.get(path[0]));

		if(!val) {
			for(var i = 1, l = path.length; i < l; i++) {
				attr = attr[path[i]];
			}
			return attr;
		} else {
			var cache = attr;

			for(var j = 1, h = path.length - 1; j < h; j++) {
				var prop = path[j];
				if(!cache.hasOwnProperty(prop) || (typeof cache[prop] !== 'object')) {
					cache[prop] = {};
				}
				cache = cache[prop];
			}

			cache[path[j]] = val;
			//TODO:L refactor, if no '.' just set with val
			store.set(path[0], h === 0 ? val : attr);
		}
	};


	/**
	 * Listen changes.
	 * example:
	 *
	 *    store.change('country.canada', fn);
	 *    
	 * @param  {String}   name  
	 * @param  {Function} fn    
	 * @param  {Object}   scope 
	 * @api public
	 */
	
	// store.change = function(name, fn, scope) {
	// 	var path = name.split('.');
	// 	this.on('change ' + path[0], function(val, prev) {
	// 		fn.call(scope);
	// 	});
	// };

};
