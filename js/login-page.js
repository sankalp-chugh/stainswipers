	
	//Change city
	function changeCity()
	{
		$("#topMenuCityMobile").val($("#topMenuCity").val());
	}
	
	function changeCityMobile()
	{
		$("#topMenuCity").val($("#topMenuCityMobile").val());
	}
	
	//User login
	function userLogin()
	{
		var userMobileNumber = $("#userMobileNumber").val();
		var functionName = $("#cmdLogin").html();
		
		if(functionName == "Get OTP")
		{
			if(userMobileNumber.length == 10)
			{
				$.ajax({
					url		: '/api/checkUserExists.php',
					data	: 'userMobileNumber=' + userMobileNumber,
					type    : 'POST',
					success : function(response)
					{
						var data = jQuery.parseJSON(response);
						
						if(data.status == "successful")
						{
							//Check user type
							if(data.userType == "old")
							{
								//Show the rest of the form
								$(".oldUserDetails").fadeIn("slow").css("display", "block");
								$("#cmdLogin").html("Login");
								
								setCookie("timesaverzUserEmailAddress", data.userData.userEmailAddress, 90);
								setCookie("timesaverzUserFullName", data.userData.userFullName, 90);
								setCookie("timesaverzUserID", data.userData.userID, 90);
								setCookie("timesaverzUserAddress", data.userData.userAddress, 90);
								setCookie("timesaverzUserCity", data.userData.userCity, 90);
							}
							else
							{
								//Check if user has been migrated and we don't have some data
								if(data.userData.userEmailAddress != "")
									var emailAddress = data.userData.userEmailAddress;
								if(data.userData.userFullName != "")
									var fullName = data.userData.userFullName;
								
								if(emailAddress != "default")
									$("#userEmailAddress").val(emailAddress);
								if(fullName != "default")
									$("#userFullName").val(fullName);
								
								$(".newUserDetails").fadeIn("slow").css("display", "block");
								$(".oldUserDetails").fadeIn("slow").css("display", "block");
								$("#cmdLogin").html("Sign up");
								setCookie("timesaverzUserID", data.userData.userID, 90);
							}
						}
						else
						{
							alert("Sorry! We could not fetch your account details at the moment");
						}
					}
				});
			}
			else
			{
				//Hide forms
				$(".newUserDetails").css("display", "none");
				$(".oldUserDetails").css("display", "none");
			}
		}
		else if(functionName == "Login")
		{
			if($("#userMobileNumber").val() == "" || $("#userSentOTP").val() == "")
			{
				alert("Please provide all details to continue.");
			}
			else
			{
				$.ajax({
					url		: '/api/userLogin.php',
					data	: 'userType=old&userMobileNumber=' + $("#userMobileNumber").val() + "&userSentOTP=" + $("#userSentOTP").val(),
					type    : 'POST',
					success : function(response)
					{
						var data = jQuery.parseJSON(response);
						
						if(data.status == "successful")
						{
							$("#userSentOTP").val("");
							setCookie("timesaverzUserLoggedIn", "true", 90);
							setCookie("timesaverzUserMobileNumber", $("#userMobileNumber").val(), 90);
							
							var locationToGo = $("#redirectURL").val();
							if(locationToGo == "support-center")
								window.location.replace("/support-center");
							else if(locationToGo == "refer-a-friend")
								window.location.replace("/refer-a-friend");
							else
								window.location.replace("/dashboard");
						}
						else
						{
							alert("Sorry! We could not log you in at the moment. Please check the OTP you have entered.");
						}
					}
				});
			}
		}
		else if(functionName == "Sign up")
		{
			if($("#userMobileNumber").val() == "" || $("#userSentOTP").val() == "" || $("#userFullName").val() == "" || $("#userEmailAddress").val() == "")
			{
				alert("Please provide all details to continue.");
			}
			else
			{
				if($("#topMenuCity").val() != "choose" && $("#topMenuCity").val() != "auto" && $("#topMenuCityMobile").val() != "choose" && $("#topMenuCityMobile").val() != "auto")
				{
					$.ajax({
						url		: '/api/userLogin.php',
						data	: 'userType=new&userMobileNumber=' + $("#userMobileNumber").val() + "&userSentOTP=" + $("#userSentOTP").val() + "&userEmailAddress=" + $("#userEmailAddress").val() + "&userFullName=" + $("#userFullName").val() + "&userCity=" + $("#topMenuCity").val(),
						type    : 'POST',
						success : function(response)
						{
							var data = jQuery.parseJSON(response);
							
							if(data.status == "successful")
							{
								$("#userSentOTP").val("");
								setCookie("timesaverzUserLoggedIn", "true", 90);
								setCookie("timesaverzUserMobileNumber", $("#userMobileNumber").val(), 90);
								setCookie("timesaverzUserEmailAddress", $("#userEmailAddress").val().toLowerCase(), 90);
								setCookie("timesaverzUserFullName", capitalizeEachWord($("#userFullName").val()), 90);
								setCookie("timesaverzUserCity", $("#topMenuCity").val(), 90);
								window.location.replace("/dashboard");
							}
							else
							{
								alert("Sorry! We could not sign you up at the moment. Please check the OTP you have entered.");
							}
						}
					});
				}
				else
				{
					alert("Please choose your city from above to continue with signup.");
				}
			}
		}
	}
	
	function capitalizeEachWord(str) 
	{
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}