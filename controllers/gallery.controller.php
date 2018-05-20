<?php

class GalleryController extends Controller {

	private $_imagesData;

	public function __construct() {
		$this->_imagesData = $this->getImagesData();
	}

	public function index() {

		$this->data['imagesData'] = $this->_imagesData;

	}

	private function getImagesData() {
		$imagesData = array();
		$path = '../webroot/images/gallery/';
		$srcPath = 'webroot/images/gallery/';
	  $imagesArray = scandir($path, 1);
		$info = '';


		// print_r(getimagesize('../webroot/images/gallery/'.$imagesArray[0]));

		for($i = 0; $i < count($imagesArray); $i++) {

			if (
				!$this->stringEndsWith($imagesArray[$i], '.jpg') === false ||
				!$this->stringEndsWith($imagesArray[$i], '.jpeg') === false ||
				!$this->stringEndsWith($imagesArray[$i], '.png') === false
			) {
				$img = ImageCreateFromJpeg($path.$imagesArray[$i]);

				array_push($imagesData, array(
					"a"	=> array(
						"href" => "${srcPath}{$imagesArray[$i]}",
						"dataSize" => imagesx($img).'x'.imagesy($img)
					),
					"img" => array(
						"thumbnailSrc" => "{$srcPath}{$imagesArray[$i]}",
						"alt" => "MD gallery image"
					)
				));
			}
		}

		return $imagesData;
	}

	private function stringEndsWith($string, $subString, $caseSensitive = true) {

    if ($caseSensitive === false) {
        $string	= mb_strtolower($string);
        $subString = mb_strtolower($subString);
    }

    $strlen = strlen($string);
    $subStringLength = strlen($subString);

    if ($subStringLength > $strlen) {
        return false;
    }

    return substr_compare($string, $subString, $strlen - $subStringLength, $subStringLength) === 0;
	}

}
