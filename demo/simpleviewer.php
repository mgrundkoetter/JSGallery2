<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>JSGallery2_simpleviewer demopage</title>
	<script type="text/javascript" src="../lib/mootools-core.js"></script>
	<script type="text/javascript" src="../lib/mootools-more.js"></script>
	<script type="text/javascript" src="../src/JSGallery2.js"></script>
	<script type="text/javascript" src="../src/JSGallery2_dynamic.js"></script>
	<script type="text/javascript" src="../src/JSGallery2_simpleviewer.js"></script>
	<script type="text/javascript">
		var myGallery;
		window.addEvent("domready", function(){
			myGallery = new JSGallery2_simpleviewer('gallery.xml', $('bigImage'), $('pageContainer'), 9, {'prevHandle': $('prev'), 'nextHandle': $('next'), 'loadingImage': 'loading.gif'});
		});
	</script>
	<style type="text/css" media="screen">
		body {
			background-color: #000;
			color: #fff;
			font-family: Helvetica;
			font-size: 12px;
			line-height: 1.2em;
		}
		
		body a {
			color: #fff;
		}
		
		#container {
			width: 1000px;
			margin: 100px auto;
		}
		
		#thumbs {
			overflow: hidden;
			position: relative;
		}
		
		#pageContainer {
			width: 3900px;
		}
		
		#pagerContainer {
			float: left;
			width: 250px;
			margin-right: 50px;
			height: 280px;
		}
		
		.page {
			float: left;
			width: 300px;
			margin-bottom: 10px;
		}
		
		.thumbnail {
			float: left;
			margin: 0 15px 17px 0;
			width: 65px;
			height: 65px;
		}
		
		pre {
			border: 1px solid #fff;
			background-color: #333;
			padding: 5px;
		}
		
		/* this is for the loading.gif */
		.thumbnail div img {
			margin: 22px;
		}
		
		.thumbnail a img {
			width: 65px;
			height: 65px;
		}
		
		#bigimageContainer {
			float: left;
			position: relative;
		}
		
		#bigImage {
			border: 3px solid #fff;
		}
		
		#prev {
			float: left;
			outline: none;
		}
		
		#next {
			float: right;
			outline: none;
		}
		
		a img {
			border: 2px solid #fff;
		}
	</style>
</head>

<body>
	<div id="container">
	
		<div style="width: 120px; float: left; margin-right: 10px;">
			<script type="text/javascript"><!--
			google_ad_client = "pub-5874325925181571";
			/* 120x600, Gallery-Example */
			google_ad_slot = "4388093750";
			google_ad_width = 120;
			google_ad_height = 600;
			//-->
			</script>
			<script type="text/javascript"
			src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
			</script>
		</div>
	
		<h1>JSGallery2_simpleviewer example page</h1>
		
		<p>This an example for the JSGallery2_simpleviewer script. It is an extension to the dynamic <a href="http://blog.aplusmedia.de/moo-gallery2">JSGallery2</a>, 
		which uses the <a href="http://mootools.net">mootools framework</a> (version 1.2) and is totally free to use.<br/>
		You can very easily create a nice, dynamic gallery with a particular HTML structure, an XML file in 
		<a href="http://www.airtightinteractive.com/simpleviewer/options.html">simpleviewer format</a> and one simple js call. (see below) <br/>
		This script was made by <a href="http://www.aplusmedia.de">A+media</a> and can be <a href="http://www.esteak.net/basket/addplugin/JSGallery2_simpleviewer">downloaded on eSteak.net</a></p>
	
		<div id="pagerContainer">
			<div id="thumbs">
				<div id="pageContainer">
					<!-- Image content goes here -->
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
			<img src="<?php echo isset($_GET['image']) ? $_GET['image'] : ''; ?>" alt="" id="bigImage"/>
		</div>
	
	
		<div style="clear: both; height: 50px;"></div>
		
		<p>You need one container for your pages and one for the big image - thats it! For further configuration, please look at the JSGallery2 documentation.</p>
	
		<p>Here is the JS call for the example gallery:</p>	
<pre>
myGallery = new JSGallery2_simpleviewer('gallery.xml', 			//the location of the xml file
				$('bigImage'), 				//the big image
				$('pageContainer'),			//container which contains the pages
				 9,					//the amount of images per page
				{'prevHandle': $('prev'),		//previous page link 
				 'nextHandle': $('next'), 		//next page link
				 'loadingImage': 'loading.gif'		//loading image for thumbnails
				});
</pre>

	<p><a href="http://www.esteak.net/basket/addplugin/JSGallery2_simpleviewer">Download on eSteak.net</a></p>
		
	</div>
</body>
</html>
