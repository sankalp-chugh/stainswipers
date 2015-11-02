<?php 
	if(isset($_POST['categoryID']) && !empty($_POST['categoryID'])){
		require_once('db_functions.php');
		$categoryID = $_POST['categoryID'];
		$db = new DB_Functions();


		//time 
		$offset = strtotime("+0 minutes");
		$currentdate = date('Y-m-d', $offset);
		$currenttime = date('H:i:s', $offset);
		// response Array
    	$response = array("status" => "", "subcategoryData" => "", "subcategoryHidden" => "false");
    	
    	$subcategories = $db->getSubcategories($categoryID);

		if (isset($subcategories)) {			
			$response['status'] = "successful";
			$subData = "";
			foreach ($subcategories as $key => $value) {
				$subData .= "<input type='radio' id='category".$categoryID."sub{$subcategories[$key][0]}' name='categoryRadio".$categoryID."' value=".$subcategories[$key][0]." class='cRadio'><label for='category".$categoryID."sub{$subcategories[$key][0]}' class='stepLabels'><span></span>".$subcategories[$key][1]."</label>";
			}	
			$subData .="<p class='homeText' id='subcategoryDescription{$categoryID}' itemprop='description' style='text-align: justify;'></p><div id='variablesSection{$categoryID}'></div><p class='homeText' id='subcategoryAMC{$categoryID}'></p><hr>";
			
			$response['subcategoryData'] = $subData;	
			echo json_encode($response);
		}else{
			echo json_encode($response);
		}
	}else{
		echo "Access Denied";
	}
 ?>