<?php 
	if(isset($_POST['variableID']) && !empty($_POST['variableID'])){
		require_once('db_functions.php');
		$variableID = $_POST['variableID'];
		$db = new DB_Functions();

		// response Array
    	$response = array("status" => "failed","amcAvailable" => 0, "amcCost" => "", "amcNumberOfServices" => "", "categoryID" => "", "originalCost" => "", "payLaterCost" => "", "payNowCost" => "", "subcategoryID" => "");
    	
    	$varAttrib = $db->getVariableAttrib($variableID);

		if (isset($varAttrib)) {			
			$response['status'] = "successful";			
			$response["categoryID"] = $varAttrib[0];
			$response["subcategoryID"] = $varAttrib[1];
			$response["originalCost"] = $varAttrib[2];
			$response["payNowCost"] = $varAttrib[2];			
			echo json_encode($response);
		}else{
			echo json_encode($response);
		}
	}else{
		echo "Access Denied";
	}

 ?>