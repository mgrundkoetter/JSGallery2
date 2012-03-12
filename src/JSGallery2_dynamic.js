/**
 *	This script is free to use. It has been created by http://www.aplusmedia.de and
 *	can be downloaded on http://www.esteak.net.
 *	License: GNU GPL 2.0: http://creativecommons.org/licenses/GPL/2.0/
 *	Example on: http://blog.aplusmedia.de/moo-gallery2
 */
JSGallery2.implement({
	/**
	 * Adds a single image to the galery.
	 * @param {String} thumbnail url of thumbnail image
	 * @param {String} bigImageSrc url of big image
	 * @param {String} bigImageLink if the standard link to the big image should be different to '#', put here
	 */
	addImage: function(thumbnail, bigImageSrc, bigImageLink, alt) {
		//create new thumb
		var newId = this.thumbs.length + 1;
		var thumbContainer = new Element('div', {
			'id': 'image' + newId,
			'class': 'thumbnail'
		}).adopt(new Element('a', {
			'href': bigImageLink || '#',
			'rel': bigImageSrc
		}).adopt(new Element('img', {
			'src': thumbnail,
			'alt': alt,
			'title': alt
		})));
		//look for right insert location
		var targetPageNumber = Math.floor(this.thumbs.length / this.imagesPerPage);
		if(targetPageNumber < this.pageContainer.getChildren().length) {
			//insert after last thumb of current page
			thumbContainer.injectAfter(this.thumbs.getLast());
		} else {
			//insert into new page
			thumbContainer.injectInside(this.addPage());
		}
		//add to thumb list and convert
		this.thumbs[newId - 1] = thumbContainer;
		this.convertThumb(thumbContainer, newId - 1);
	},
	/**
	 * Creates a new page and returns it.
	 * @return {HTMLElement} new page
	 */
	addPage: function() {
		var newId = this.pageContainer.getChildren().length;
		var newPage = new Element('div', {
			'id': 'page' + newId,
			'class': 'page'
		}).inject(this.pageContainer);
		this.pageContainer.setStyle('width', this.pageContainer.getSize().x + newPage.getSize().x);
		return newPage;
	}
});