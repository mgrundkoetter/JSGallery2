var JSGallery2 = new Class({
	Implements: Options,
	options: {
		'borderWidthDeselected': 2,	//the width of the border of an deselected image (should be the same as in css)
		'borderWidthSelected': 7,	//border width of the selected image
		'borderColor': '#fff',		//the color of the borders
		'loadingMask': '#000',		//color of the mask overlay during loading of the big images
		'loadingOpacity': 0.6,		//opacity of the border div during loading (including the mask)
		'loadingImage': 'loading.gif',		//you may specify a loading image which is displayed while the big images are being loaded
		'selectSpeed': 200,			//the duration of the select effect in ms (high values will make it look ugly)
		'fadeSpeed': 250,			//the duration of the image fading effect in ms
		'pageSpeed': 1000,			//the duration of the change page effect in ms
		'prevHandle': null,			//if you pass a previous page handle in here, it will be hidden if it's not needed
		'nextHandle': null,			//like above, but for next page
		'titleTarget': null,		//target HTML element where image texts are copied into
		'initialIndex': -1,			//which thumb to select after init. you could create deep links with it.
		'maxOpacity': 0.8			//maximum opacity before cursor reaches prev/next control, then it will be set to 1 instantly.
	},
	/**
	 *	Constructor. Starts up the whole thing :-)
	 *
	 *	This script is free to use. It has been created by http://www.aplusmedia.de and
	 *	can be downloaded on http://www.esteak.net.
	 *	License: GNU GPL 2.0: http://creativecommons.org/licenses/GPL/2.0/
	 *	Example on: http://blog.aplusmedia.de/moo-gallery2
	 *	Known issues:
	 *	- preloading does not care about initialIndex param
	 *	- hovering to a control over the border of the big image will make the other one flickering
	 *	- if you enter and leave the control area very quickly, the control flickers sometimes
	 *	- does not work in IE6
	 *
	 * 	@param {Array} thumbs, An array of HTML elements
	 *	@param {HTMLelement} bigImageContainer, the full size image
	 *	@param {HTMLelement} pageContainer, If you have several pages, put them in this container
	 *	@param {Object} options, You have to pass imagesPerPage if you have more than one!
	 */
	initialize: function(thumbs, bigImageContainer, pageContainer, options) {
		this.currentPageNumber = 0;
		this.loadedImages = 0;
		this.blockKeys = false;
		this.imagesPerPage = pageContainer.getFirst().getChildren().length;
		this.setOptions(options);
		this.thumbs = thumbs;
		this.bigImage = bigImageContainer;
		this.pageContainer = pageContainer;
		this.convertThumbs();
		if(this.options.initialIndex != -1) {
			this.selectByIndex(this.options.initialIndex);
		} else {
			this.gotoPage(0);
		}
		this.createControls();
		if($defined(this.options.loadingImage)) {
			new Asset.image(this.options.loadingImage);
		}
		this.loadNextImage();
	},
	/**
	 *	Creates the previous and next links over the big image.
	 */
	createControls: function() {
		this.prevLink = new Element('a', {
			events: {
				'click': this.prevImage.bindWithEvent(this),
				'mouseleave': this.mouseLeaveHandler.bindWithEvent(this)
			},
			styles: {
				'width': '46px',
				'display': 'block',
				'position': 'absolute',
				'top': 0,
				'height' : '98%',
				'background': 'url(prev_image.png) no-repeat 0 50%',
				'outline': 'none'
			},
			'href': '#'
		}).injectInside(this.bigImage.getParent());
		this.prevLink.addEvent('mouseover', this.focusControl.bindWithEvent(this, this.prevLink));
		this.nextLink = this.prevLink.clone().injectAfter(this.prevLink).set({
			'events': {
				'click': this.nextImage.bindWithEvent(this),
				'mouseleave': this.mouseLeaveHandler.bindWithEvent(this)
			},
			'styles': {
				'right': 0, 
				'background-image': 'url(next_image.png)'
			}
		});
		this.prevLink.setStyle('left', 0);
		this.nextLink.addEvent('mouseover', this.focusControl.bindWithEvent(this, this.nextLink));
		this.bigImage.addEvents({
			'mousemove': this.mouseOverHandler.bindWithEvent(this),
			'mouseleave': this.mouseLeaveHandler.bindWithEvent(this)
		});
		document.addEvent('keydown', this.keyboardHandler.bindWithEvent(this));
		this.mouseLeaveHandler();
	},
	/**
	 * Focuses one control
	 * 
	 * @param {Event} event
	 * @param {HTMLElement} control
	 */
	focusControl: function(event, control) {
		control.set('opacity', 1);
	},
	/**
	 *	Handles mouse movement over the big image.
	 * @param {Event} event
	 */
	mouseOverHandler: function(event) {
		var currentIndex = this.thumbs.indexOf(this.selectedContainer);
		//this makes the control on the other side fade out in just the moment when you reach one
		var activeRange = this.bigImage.getSize().x;
		var op = 0;
		if(currentIndex < this.thumbs.length - 1) {
			op = this.options.maxOpacity - this.getDistanceToMouse(this.nextLink, event) / activeRange;
		}
		this.nextLink.set('opacity', op);
		op = 0;
		if(currentIndex > 0) {
			op = this.options.maxOpacity - this.getDistanceToMouse(this.prevLink, event) / activeRange;
		}
		this.prevLink.set('opacity', op);
	},
	/**
	 * Hides the controls.
	 */
	mouseLeaveHandler: function() {
		this.nextLink.set('opacity', 0);
		this.prevLink.set('opacity', 0);
	},
	/**
	 * Handles keyboard interactions.
	 * @param {Event} event
	 */
	keyboardHandler: function(event){
		if(!this.blockKeys) {
			if(event.code >= 49 && event.code <= 57) {
				this.gotoPage(event.key - 1);
			} else if (event.key == "left") {
				this.prevImage(event); 					
			} else if (event.key == "right") {
				this.nextImage(event);
			}
		}
	},
	/**
	 *	Returns the distance to the mouse from the middle of a given element.
	 *	@param {HTMLelement} element
	 *	@param {Event} event
	 * 	@return integer
	 */
	getDistanceToMouse: function(element, event) {
		var s = element.getSize();
		var xDiff = Math.abs(event.client.x - (element.getLeft() + s.x / 2));
		var yDiff = Math.abs(event.client.y - (element.getTop() + s.y / 2));
		return Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
	},
	/**
	 * 	Adds the border to the thumbs and so on. (conversion of static thumbs)
	 */
	convertThumbs: function() {
		this.thumbs.each(function(thumbContainer, count) {
			this.convertThumb(thumbContainer, count);
		}, this);
	},
	/**
	 * Converts one single thumb.
	 * @param {HTMLelement} thumbContainer
	 * @param {Integer} count
	 */
	convertThumb: function(thumbContainer, count) {
		if(!$defined(thumbContainer)) {
			return;
		}
		thumbContainer.addEvent('click', this.select.bind(this, thumbContainer)).setStyle('position', 'relative').set('counter', count);
		var bigImage = thumbContainer.getFirst().set('href', 'javascript: void(0);').get('rel');
		var border = new Element('div', {
			styles: {
				'border': this.options.borderWidthDeselected + 'px solid ' + this.options.borderColor,
				'width': thumbContainer.getSize().x,
				'height': thumbContainer.getSize().y,
				'position': 'absolute',
				'background-color': this.options.loadingMask,
				'top': 0,
				'left': 0
			},
			'rel': bigImage,
			'description': thumbContainer.getElements('img')[0].get('title')
		}).injectTop(thumbContainer).set('opacity', this.options.loadingOpacity);
		thumbContainer.getElements('img')[0].set('title', '');
	},
	/**
	 * 	Removes key blocking.
	 */
	unBlockKeys: function() {
		this.blockKeys = false;
	},
	/**
	 *	Selects a certain image. (You have to pass the outer container of the image)
	 *	@param {HTMLelement} container
	 */
	select: function(container) {
		if(this.blockKeys || !$defined(container)) {
			return false;
		}
		this.blockKeys = true;
		if($defined(this.selectedContainer)) {
			//this prevents an ugly effect if you click on the currently selected item
			if(container == this.selectedContainer) {
				this.unBlockKeys();
				return false;
			}
			this.deselect(this.selectedContainer);
		}
		//if target image is not on current page, we have to go there first 
		var targetPage = Math.floor(container.get('counter') / this.imagesPerPage);
		if(this.currentPageNumber != targetPage) {
			this.gotoPage(targetPage, container);
		}
		this.selectedContainer = container;
		//make calculations a bit more handy
		var s = container.getSize();
		var des = this.options.borderWidthDeselected;
		var sel = this.options.borderWidthSelected;
		new Fx.Morph(container.getFirst(), {
			duration: this.options.selectSpeed, 
			transition: Fx.Transitions.Quad.easeOut
		}).start({
			'border-width': [des, sel + 'px'],
			'width': [s.x, s.x - 2 * (sel - des) ],
			'height': [s.y, s.y - 2 * (sel - des)]
		});
		var source = container.getFirst();
		this.setImage(source.get('rel'), source.get('description'));
	},
	/**
	 * Preloads one big image
	 */
	loadNextImage: function() {
		var thumbContainer = this.thumbs[this.loadedImages].getFirst();
		if($defined(this.options.loadingImage)) {
			new Element('img', {'src': this.options.loadingImage}).injectTop(thumbContainer);;
		}
		var imageToLoad = thumbContainer.get('rel');
		new Asset.image(imageToLoad, {
			onload: this.imageLoaded.bind(this, this.thumbs[this.loadedImages])
		});
	},
	/**
	 * Callback after an image has been successfully preloaded.
	 * Removes the loading effects from the border div.
	 * @param {HTMLElement} thumbContainer the thumb wrapper div
	 */
	imageLoaded: function(thumbContainer) {
		this.loadedImages++;
		if($defined(this.options.loadingImage)) {
			//remove loading gif
			thumbContainer.getFirst().getFirst().destroy();
		}
		//remove loading styles
		thumbContainer.getFirst().setStyle('background-color', 'transparent').setOpacity(1);
		if(this.loadedImages < this.thumbs.length) {
			this.loadNextImage();
		}
	},
	/**
	 * Selects an image by its thumbnail index.
	 * @param {integer} index of the thumbnail, starting with 0
	 */
	selectByIndex: function(index) {
		this.mouseLeaveHandler();
		if(index < 0 || this.thumbs.length <= index) {
			index = 0;
		}
		this.select(this.thumbs[index]);
	},
	/**
	 *	Opposite to method above.
	 *	@param {HTMLelement} container
	 */
	deselect: function(container) {
		new Fx.Morph(container.getFirst(), {duration: this.options.selectSpeed, transition: Fx.Transitions.Quad.easeOut}).start({
			'border-width': this.options.borderWidthDeselected + 'px',
			'width': container.getSize().x,
			'height': container.getSize().y
		});
	},
	/**
	 *	Changes the full size image to given one.
	 *	@param {String} newSrc, new target of the full size image
	 *	@param {String} newText, new text for the info element
	 */
	setImage: function(newSrc, newText) {
		var effect = new Fx.Tween(this.bigImage, {duration: this.options.fadeSpeed, transition: Fx.Transitions.Quad.easeOut});
		effect.start('opacity', 0).chain(function(){
			this.bigImage.set('src', newSrc);
			if($defined($(this.options.titleTarget))) {
				$(this.options.titleTarget).set('html', newText);
			}
			this.mouseLeaveHandler();
			effect.start('opacity', 1).chain(this.unBlockKeys.bind(this));
		}.bind(this));
	},
	/**
	 *	Navigates to previous page.
	 */
	prevPage: function() {
		this.gotoPage(this.currentPageNumber - 1);
	},
	/**
	 *	Navigates to next page.
	 */
	nextPage: function() {
		this.gotoPage(this.currentPageNumber + 1);
	},
	/**
	 *	Selects the previous image.
	 */
	prevImage: function(e) {
		e = new Event(e).stop();
		this.selectByIndex(this.thumbs.indexOf(this.selectedContainer) - 1);
	},
	/**
	 *	Selects the next image.
	 */
	nextImage: function(e) {
		e = new Event(e).stop();
		this.selectByIndex(this.thumbs.indexOf(this.selectedContainer) + 1);
	},
	/**
	 *	Navigates to given page and selects the first image of it.
	 *	Also hides the handles (if set).
	 *	@param {Integer} pageNumber, index of the target page (0-n)
	 *  @param {HTMLElement} selectImage, optionally receives a particular image to select
	 */
	gotoPage: function(pageNumber, selectImage) {
		//if we like to select another image on that page than the first one
		selectImage = $pick(selectImage, this.thumbs[pageNumber * this.imagesPerPage]);
		var lastPage = Math.ceil(this.thumbs.length / this.imagesPerPage);
		if(pageNumber >= 0 && pageNumber < lastPage) {
			this.pageContainer.set('tween', {
				duration: this.options.pageSpeed, 
				transition: Fx.Transitions.Quint.easeInOut
			});
			this.pageContainer.tween('margin-left', this.pageContainer.getFirst().getSize().x * pageNumber * -1);
			this.currentPageNumber = pageNumber;
			this.select(selectImage);
			
			//update handles
			if($defined(this.options.prevHandle)) {
				new Fx.Tween(this.options.prevHandle, {duration:this.options.fadeSpeed * 2}).start('opacity', pageNumber == 0 ? 0 : 1);
			}
			if($defined(this.options.nextHandle)) {
				new Fx.Tween(this.options.nextHandle, {duration:this.options.fadeSpeed * 2}).start('opacity', pageNumber == lastPage - 1 ? 0 : 1);
			}
		}
	}
});