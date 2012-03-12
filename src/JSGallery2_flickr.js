/**
 *	This script is free to use. It has been created by http://www.aplusmedia.de and
 *	can be downloaded on http://www.esteak.net.
 *	License: GNU GPL 2.0: http://creativecommons.org/licenses/GPL/2.0/
 *	Example on: http://blog.aplusmedia.de/moo-gallery2/flickr.php
 *
 * 	Uses FlickrAPI script by Neil Jenkins - http://www.nmjenkins.com
 */
var JSGallery2_flickr = new Class({
	Extends: JSGallery2,
	/**
	 * Extension to JSGallery class. It is able to display flickr images as gallery.
	 * 
	 * @param {String} APIKey your flickr API key
	 * @param {Object} flickrOptions a flickr API option object
	 * 					Example: {method: 'flickr.photos.search', text: 'dresden hdr', per_page: 10}
	 * 					More information: http://www.flickr.com/services/api/
	 * @param {HTMLElement} bigImageContainer same like in JSGallery2
	 * @param {HTMLElement} pageContainer same like in JSGallery2
	 * @param {Integer} imagesPerPage how many images to display on one page
	 * @param {Object} options all JSGallery2 options
	 */
	initialize: function(APIKey, flickrOptions, bigImageContainer, pageContainer, imagesPerPage, options) {
		this.currentPageNumber = 0;
		this.loadedImages = 0;
		this.blockKeys = false;
		this.thumbs = [];
		this.imagesPerPage = imagesPerPage;
		this.setOptions(options);
		this.bigImage = bigImageContainer;
		this.pageContainer = pageContainer.empty();
		FlickrAPI2.initialise(APIKey);
		FlickrAPI2.get(flickrOptions, this.flickrCallback.bind(this));
		this.createControls();
		if($defined(this.options.loadingImage)) {
			new Asset.image('loading.gif');
		}
	},
	/**
	 * Internal callback for flickr data.
	 * @param {Object} data the JSON object
	 */
	flickrCallback: function(data) {
		//add the images
		data.photos.photo.each(function(photo) {
			var path = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
			this.addImage(path + '_s.jpg', path + '.jpg', '#', photo.title);
		}, this);
		//init preloading
		this.loadNextImage();
		//select first image
		if(this.options.initialIndex != -1) {
			this.selectByIndex(this.options.initialIndex);
		} else {
			this.gotoPage(0);
		}
	},
	/**
	 *	Changes the full size image to given one.
	 *	@param {String} newSrc, new target of the full size image
	 *	@param {String} newText, new text for the info element
	 */
	setImage: function(newSrc, newText) {
		this.tempTxt = newText || undefined;
		new Asset.image(newSrc, {id: 'bigImage', title: newText, onload: this.animate.bind(this)});
	},
	/**
	 * Starts animation after image has been loaded successfully
	 * @param {Object} newImg
	 */
	animate: function(newImg) {
		var effect = new Fx.Tween(this.bigImage, {duration: this.options.fadeSpeed, transition: Fx.Transitions.Quad.easeOut});
		effect.start('opacity', 0).chain(function(){
			this.bigImage = newImg.replaces(this.bigImage);
			if($defined($(this.options.titleTarget))) {
				$(this.options.titleTarget).set('html', this.tempTxt);
			}
			this.mouseLeaveHandler();
			effect.start('opacity', 1).chain(this.unBlockKeys.bind(this));
		}.bind(this));
	}
});