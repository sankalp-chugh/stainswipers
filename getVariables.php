<?php 
	if(isset($_POST['subcategoryID']) && !empty($_POST['subcategoryID'])){
		require_once('db_functions.php');
		$subcategoryID = $_POST['subcategoryID'];
		$db = new DB_Functions();

		// response Array
    	$response = array("status" => "failed", "subcategoryID" => $subcategoryID, "payNowCost" => "", "payLaterCost" => "","categoryID" => "","subcategoryDescription" => "", "variableData" => "");
    	
    	$subcategoryVar = $db->getSubcategoryVariables($subcategoryID);

		if (isset($subcategoryVar)) {			
			$response['status'] = "successful";
			$varData = "<p class='stepLabels'>Select Type : </p><div class='select-style'><select id='variablesSelectBox{$subcategoryID}' onchange='javascript: showPrice(this);'>";
			$varData .= "<option value='choose'>Choose Option</option>";
			foreach ($subcategoryVar as $key => $value) {
				$varData .= "<option value=".$subcategoryVar[$key][1].">".$subcategoryVar[$key][2]."</option>";
			}
			$varData .= "</select></div>";
			$response['categoryID'] = $subcategoryVar[0][0];
			$response['variableData'] = $varData;
			echo json_encode($response);
		}else{
			echo json_encode($response);
		}
	}else{
		echo "Access Denied";
	}

 ?>