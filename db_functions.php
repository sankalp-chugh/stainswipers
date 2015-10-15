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
	    	$sub_list_query = mysql_query("SELECT `service_sub_id`, `service_sub_name` FROM ".PREFIX."service_subcategory WHERE service_id_fk = ".$categoryID); 
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
	    public function getSubcategoryVariables($subcategoryID) {
	    	include_once("config.php");
	    	$subvar_list_query = mysql_query("SELECT  `service_id_fk` AS categoryId, `sub_type_id` AS subcategoryVarId,  `sub_type_name` AS name,  `sub_type_price` AS price	FROM ".PREFIX."`subcategory_type` LEFT JOIN ".PREFIX."`subcategory_type_detail` ON  `sub_type_id_fk` =  `sub_type_id` WHERE  `service_sub_id_fk` =".$subcategoryID); 
	    	$subvar_list = array();  		    	
	    	while($row = mysql_fetch_array($subvar_list_query, MYSQL_NUM)){
	    		$subvar_list[] = $row;
	    	}
	    	return $subvar_list;
	    }

	}

	$db = new DB_Functions;
	$db->getSubcategoryVariables(1);
?>