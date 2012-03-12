/* 	Class:
		Flickr

	Author:
		Neil Jenkins - http://www.nmjenkins.com
		Michael Grundkoetter - http://aplusmedia.de (moved to mootools1.2)
		
	Version:
		1.0 (2008-02-01)
		
	Version history:
		1.0 Initial release
		
	License:
		GNU GPL 2.0: http://creativecommons.org/licenses/GPL/2.0/

	Description:
		Javascript class for querying the Flickr API.
		
	Usage:
		Call FlickrAPI2.initialise(String: APIKey) with your Flickr API key first.

		Public interfaces:

		get(Object: options, Function: callbackFunction, Array: extraArguments)
			obtions are as specificed in the Flickr API documentation. Must include a 'method' field.
			e.g. FlickrAPI2.get({method: 'flickr.photosets.getList', user_id: 'foobar'}, functionToCallWithData);

	Dependencies:
		mootools: http://mootools.net
*/

var FlickrAPI2 = {

	initialise: function(APIKey) {
		this._baseSource = "http://api.flickr.com/services/rest/?format=json&api_key=" + APIKey
						 + "&jsoncallback=FlickrAPI2.callBackFunction";
	},
	
	get: function(options, callBackFunction, extraArguments) {
		var key = this._getUniqueKey();

		var src = this._baseSource + key;
		for (var option in options)
			src += '&' + option + '=' + options[option];

		FlickrAPI2['callBackFunction' + key] = function(data) {
			if (data.stat != "ok")
				throw new Error('FlickrAPI Error: ' + data.message + '\nSource was:' + src);
	    	delete FlickrAPI2['callBackFunction' + key];
			$('FlickrAPIRequest' + key).destroy();
			
			var args = extraArguments || [];
			args.unshift(data);
			callBackFunction.apply(null, args);
		};

		new Asset.javascript(src, {
			type: 'text/javascript',
			id: 'FlickrAPIRequest' + key
		});
	},
	
	_getUniqueKey: (function() {
		var key = 0;
		return function() {
			return key++;
		}
	})()
}