<?php 
	class DB_Functions{
		private $db;
		
		function __construct(){
			require_once("db_connect.php");
			$this->db = new DB_Connect();
			$this->db->connect();
		}

		function __destruct(){

		}

		/**
	     * Getting subcategory for the applied category id
	     * Return subcategory
	     */
	    public function getSubcategories($categoryID) {
	    	include_once("config.php");
	    	$sub_list_query = mysql_query("SELECT `service_sub_id`, `service_sub_name` FROM ".PREFIX."conn_service_sub WHERE service_id = ".$categoryID); 
	    	$sub_list = array();  		    	
	    	while($row = mysql_fetch_array($sub_list_query, MYSQL_NUM)){
	    		$sub_list[] = $row;
	    	}
	    	return $sub_list;
	    }

	    /**
	     * Getting subcategory for the applied category id
	     * Return subcategory
	     */
	    public function getSubcategoryVariables($subcategoryID, $categoryID) {
	    	include_once("config.php");
	    	$subvar_list_query = mysql_query("SELECT `service_id` AS categoryId, `id` AS subcategoryVarId,  `sub_type_name` AS name,  `sub_type_price` AS price	FROM `".PREFIX."conn_service_type` WHERE  `service_sub_id` =".$subcategoryID." AND service_id =".$categoryID); 
	    	$subvar_list = array();  		    	
	    	while($row = mysql_fetch_array($subvar_list_query, MYSQL_NUM)){
	    		$subvar_list[] = $row;
	    	}
	    	return $subvar_list;
	    }

	    /**
	     * Getting variable attrib for the applied variable id
	     * Return attributes
	     */
	    public function getVariableAttrib($variableID) {
	    	include_once("config.php");
	    	$var_list_query = mysql_query("SELECT `service_id_fk` AS categoryId, `service_sub_id_fk` AS subcategoryId, `sub_type_price` AS price FROM ".PREFIX."`subcategory_type` WHERE  `id` =".$variableID); 
	    	$var_list = array();  		    	
	    	$var_list = mysql_fetch_assoc($var_list_query, MYSQL_NUM);
	    	return $var_list;
	    }

	}

	//$db = new DB_Functions;
	//print_r($db->getSubcategories(1));
?>