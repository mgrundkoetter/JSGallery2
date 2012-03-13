<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>JSGallery2 demopage</title>

	<script type="text/javascript" src="../lib/mootools-core.js"></script>
	<script type="text/javascript" src="../lib/mootools-more.js"></script>
	<script type="text/javascript" src="../src/JSGallery2.js"></script>
	<script type="text/javascript" src="../src/JSGallery2_dynamic.js"></script>
	<script type="text/javascript">
		var myGallery;
		window.addEvent("domready", function(){
			myGallery = new JSGallery2($$('.thumbnail'), $('bigImage'), $('pageContainer'), {'prevHandle': $('prev'), 'nextHandle': $('next'), 'loadingImage': 'loading.gif'});
			myGallery.addImage('images/thumb_16.jpg', 'images/big_16.jpg', '?image=images/big_16.jpg');
			myGallery.addImage('images/thumb_17.jpg', 'images/big_17.jpg', '?image=images/big_17.jpg');
		});
	</script>

	<link href="styles.css" media="screen" rel="stylesheet" type="text/css" />
</head>

<body>
	<div id="container">

		<h1>JSGallery2 example page</h1>

		<p>This an example for the JSGallery2 script. It evolved from the <a href="http://blog.aplusmedia.de/moo-gallery">old version</a> (for MooTools 1.11), which is still available.
		As this new version is fully compatible with the old one, consider to switch to MooTools 1.2 and use this version!
		It uses the <a href="http://mootools.net">mootools framework (version 1.2!)</a> and is totally free to use. Nevertheless, a backlink to my blog (or a <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=mg%40aplusmedia%2ede&item_name=A%2bmedia&no_shipping=1&return=http%3a%2f%2fblog%2eaplusmedia%2ede&cn=Betreff&tax=0&currency_code=EUR&lc=DE&bn=PP%2dDonationsBF&charset=UTF%2d8">donation</a> maybe?) would be very nice :-)<br/>
		This script was made by <a href="http://www.aplusmedia.de">A+media</a> and can be <a href="https://github.com/aplusmedia/JSGallery2">downloaded on github</a><br/>
		</p>

		<div id="pagerContainer">
			<div id="thumbs">
				<div id="pageContainer">
					<div id="page0" class="page">
						<div id="image1" class="thumbnail">
							<a href="?image=images/big_01.jpg" rel="images/big_01.jpg"><img src="images/thumb_01.jpg" alt=""/></a>
						</div>
						<div id="image2" class="thumbnail">
							<a href="?image=images/big_02.jpg" rel="images/big_02.jpg"><img src="images/thumb_02.jpg" alt=""/></a>
						</div>
						<div id="image3" class="thumbnail">
							<a href="?image=images/big_03.jpg" rel="images/big_03.jpg"><img src="images/thumb_03.jpg" alt=""/></a>
						</div>
						<div id="image4" class="thumbnail">
							<a href="?image=images/big_04.jpg" rel="images/big_04.jpg"><img src="images/thumb_04.jpg" alt=""/></a>
						</div>
						<div id="image5" class="thumbnail">
							<a href="?image=images/big_05.jpg" rel="images/big_05.jpg"><img src="images/thumb_05.jpg" alt=""/></a>
						</div>
						<div id="image6" class="thumbnail">
							<a href="?image=images/big_06.jpg" rel="images/big_06.jpg"><img src="images/thumb_06.jpg" alt=""/></a>
						</div>
						<div id="image7" class="thumbnail">
							<a href="?image=images/big_07.jpg" rel="images/big_07.jpg"><img src="images/thumb_07.jpg" alt=""/></a>
						</div>
						<div id="image8" class="thumbnail">
							<a href="?image=images/big_08.jpg" rel="images/big_08.jpg"><img src="images/thumb_08.jpg" alt=""/></a>
						</div>
						<div id="image9" class="thumbnail">
							<a href="?image=images/big_09.jpg" rel="images/big_09.jpg"><img src="images/thumb_09.jpg" alt=""/></a>
						</div>
					</div>
					<div id="page1" class="page">
						<div id="image10" class="thumbnail">
							<a href="?image=images/big_10.jpg#page1" rel="images/big_10.jpg"><img src="images/thumb_10.jpg" alt=""/></a>
						</div>
						<div id="image11" class="thumbnail">
							<a href="?image=images/big_11.jpg#page1" rel="images/big_11.jpg"><img src="images/thumb_11.jpg" alt=""/></a>
						</div>
						<div id="image12" class="thumbnail">
							<a href="?image=images/big_12.jpg#page1" rel="images/big_12.jpg"><img src="images/thumb_12.jpg" alt=""/></a>
						</div>
						<div id="image13" class="thumbnail">
							<a href="?image=images/big_13.jpg#page1" rel="images/big_13.jpg"><img src="images/thumb_13.jpg" alt=""/></a>
						</div>
						<div id="image14" class="thumbnail">
							<a href="?image=images/big_14.jpg#page1" rel="images/big_14.jpg"><img src="images/thumb_14.jpg" alt=""/></a>
						</div>
						<div id="image15" class="thumbnail">
							<a href="?image=images/big_15.jpg#page1" rel="images/big_15.jpg"><img src="images/thumb_15.jpg" alt=""/></a>
						</div>
					</div>
				</div>
			</div>
			<?php
			if(isset($_GET['image'])) {
				preg_match('%.*_(.*)\.jpg%', $_GET['image'], $result);
				$page = ceil($result[1] / 9 - 1);
				$prev = isset($result[1]) && $page > 0;
				$next = isset($result[1]) && $page < 2;
			}
			?>
			<a style="visibility: hidden;" href="<?php echo @$prev ? '?image=images/big_'.sprintf("%02s", (@$page - 1) * 9 + 1).'.jpg#page'.(@$page - 1) : '#';  ?>" onclick="myGallery.prevPage(); return false;" id="prev"><img src="prev_page.png" alt="back" style="border: 0px;"/></a>
			<a style="visibility: hidden;" href="<?php echo @$next ? '?image=images/big_'.sprintf("%02s", (@$page + 1) * 9 + 1).'.jpg#page'.(@$page + 1) : '#';  ?>" onclick="myGallery.nextPage(); return false;" id="next"><img src="next_page.png" alt="back" style="border: 0px;"/></a>
		</div>
		<div id="bigimageContainer">
			<img src="<?php echo isset($_GET['image']) ? $_GET['image'] : 'images/big_01.jpg'; ?>" alt="" id="bigImage"/>
		</div>


		<div style="clear: both; height: 50px;"></div>

		<p>You need a particular HTML structure to get this to work (or <a href="flickr.php">flickr</a>). First, you need a container where your pages are located in. You can then put thumbnail images into this
		page, each surrounded by a div. This additional container will later contain the dynamic border. If you like to have more pages, just create more page containers and so on.<br/>
		The most important thing, is the relation to the big image. So make sure, that each thumbnail is linked to somewhere and this link has a rel attribute. You just have to
		put the big image url in there.</p>

		<p>You may also provide two links to navigate through the pages. They will automatically be hidden. You can also provide a loading image optionally. It will be shown
		for each thumbnail while the big version of the image is preloaded. It also disappears automatically when preloading is done.</p>

		<p>Additionally, you can provide a no-script version very easily. Just a bit of coding in the dynamic language you like :-)</p>

		<p>On top of these features, you have the possibility to change the default behaviour by overwriting several class options</p>

		<p>Here are all the featuers:
			<ul>
				<li>nice transitions for page change, image select, etc.</li>
				<li>supports easy to build no-script version</li>
				<li>preloads images with separate indicators (optional)</li>
				<li>a bunch of options to change the default styles and bevaviours</li>
				<li>visibility of prev/next handles is controlled by mouse distance</li>
				<li>use the arrow keys to go to previous/next image</li>
				<li>use number keys to go to a certain page (beginning with 1)</li>
				<li>prevents too fast change of images (ugly effect interruption)</li>
				<li>several methods to be used with your own controls (prevImage/nextImage, prevPage/nextPage, gotoPage, selectByIndex)</li>
				<li>dynamic adding of new images to the gallery (with JSGallery2_dynamic)</li>
				<li>shows flickr images (with <a href="flickr.php">JSGallery2_flickr</a>)</li>
			</ul>
		</p>

		<p>Here is the JS call for the example gallery: (the last 2 images are added dynamically)</p>
<pre>
myGallery = new JSGallery2(	$$('.thumbnail'), 	//these are the thumbnail elements
				$('bigImage'), 		//the big image
				$('pageContainer'),	//container which contains the pages
				{'prevHandle': $('prev'),	//previous page link
				 'nextHandle': $('next'), 	//next page link
				 'loadingImage': 'loading.gif'	//loading image for thumbnails
				});
</pre>

	<p>You see, you only need very few parameters to get this to work. Optionally, you can change many things with some options:</p>

<pre>
option:			default value,		description

borderWidthDeselected: 	2,	//the width of the border of an deselected image
				(should be the same as in css)
borderWidthSelected: 	7,	//border width of the selected image
borderColor: 		'#fff',	//the color of the borders
loadingMask: 		'#000',	//color of the mask overlay during loading of the big images
loadingOpacity: 	0.6,	//opacity of the border div during loading (including the mask)
loadingImage: 		null,	//you may specify a loading image which is displayed while
				the big images are being loaded
selectSpeed: 		200,	//the duration of the select effect in ms
				(high values will make it look ugly)
fadeSpeed: 		250,	//the duration of the image fading effect in ms
pageSpeed: 		1000,	//the duration of the change page effect in ms
prevHandle: 		null,	//if you pass a previous page handle in here, it will be
				hidden if it's not needed
nextHandle: 		null,	//like above, but for next page
initialIndex: 		-1,	//which thumb to select after init.
				you could create deep links with it.
maxOpacity: 		0.8	//maximum opacity before cursor reaches prev/next control,
				then it will be set to 1 instantly.
</pre>

<p>If you want to add images dynamically, you just need to include the JSGallery2_dynamic.js and call:</p>

<pre>myGallery.addImage('images/thumb_17.jpg', 'images/big_17.jpg', '?image=images/big_17.jpg');</pre>

<p>If you like to create a JSGallery2 from flickr images, check out my <a href="flickr.php">JSGallery2_flickr</a> extension for JSGallery2.</p>

	<p><a href="https://github.com/aplusmedia/JSGallery2">Download on github</a></p>

	</div>
</body>
</html>
