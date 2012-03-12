/**
 *	This script is free to use. It has been created by http://www.aplusmedia.de and
 *	can be downloaded on http://www.esteak.net.
 *	License: GNU GPL 2.0: http://creativecommons.org/licenses/GPL/2.0/
 *	Example on: http://blog.aplusmedia.de/moo-gallery2/simpleviewer.php
 *	- Does not work in IE
 */
var JSGallery2_simpleviewer = new Class({
	Extends: JSGallery2,
	/**
	 * Extension to JSGallery class. It is able to display simple viewer gallery.xml images.
	 * (http://www.airtightinteractive.com/simpleviewer/)
	 * @param {String} xmlfile XML filename
	 * @param {HTMLElement} bigImageContainer same like in JSGallery2
	 * @param {HTMLElement} pageContainer same like in JSGallery2
	 * @param {Integer} imagesPerPage how many images to display on one page
	 * @param {Object} options all JSGallery2 options
	 */
	initialize: function(xmlFile, bigImageContainer, pageContainer, imagesPerPage, options) {
		this.currentPageNumber = 0;
		this.loadedImages = 0;
		this.blockKeys = false;
		this.thumbs = [];
		this.imagesPerPage = imagesPerPage;
		this.setOptions(options);
		this.bigImage = bigImageContainer;
		this.pageContainer = pageContainer.empty();
		this.xhr = new Request({method: 'get', 'onSuccess': this.xhrcallback.bind(this), 'url': xmlFile}).send();
		this.createControls();
		if($defined(this.options.loadingImage)) {
			new Asset.image('loading.gif');
		}
	},
	/**
	 * Internal callback when xml file has been loaded.
	 * @param {Object} text the text content of the xml file
	 * @param {Object} xml the xml content as dom object
	 */
	xhrcallback: function(text, xml) {
		var iPath = $pick(xml.firstChild.attributes['imagePath'].textContent, "images/");
		var tPath = $pick(xml.firstChild.attributes['thumbPath'].textContent, "thumbs/");
		var photos = xml.evaluate('//image//filename', xml, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		//add the images
		for(var i = 0; i < photos.snapshotLength; i++) {
			var image = photos.snapshotItem(i).textContent;
			this.addImage(tPath + image, iPath + image);
		}
		//init preloading
		this.loadNextImage();
		//select first image
		if(this.options.initialIndex != -1) {
			this.selectByIndex(this.options.initialIndex);
		} else {
			this.gotoPage(0);
		}
	}
});