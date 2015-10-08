	$(document).ready(function()
	{
		var cityID=getCookie("timesaverzUserCity");
		if(cityID=="")
		{
			cityID=1;
			setCookie("timesaverzUserCity",cityID,90);
		}
		
		$("#topMenuCity").val(cityID);
		$("#topMenuCityMobile").val(cityID);
	});
	
	function setCookie(cname,cvalue,exdays)
	{
		var d=new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires="expires="+d.toUTCString();
		document.cookie=cname+"="+cvalue+"; "+expires+"; path=/";
	}
	
	function getCookie(cname)
	{
		var name=cname+"=";
		var ca=document.cookie.split(';');
		for(var i=0;i<ca.length;i++)
		{
			var c=ca[i];
			while(c.charAt(0)==' ')
				c=c.substring(1);
			if(c.indexOf(name)==0)
				return c.substring(name.length,c.length);
		}
		return"";
	}
	
	mixpanel.track_links(".logo-cover']","Clicked On Logo To Navigate",{"referrer":document.referrer});
	mixpanel.track_links(".headerLinkAllServices","Clicked See All Services",{"referrer":document.referrer});
	mixpanel.track_links(".headerListYourService","Clicked List Your Service",{"referrer":document.referrer});
	mixpanel.track_links(".headerDesktopLogout","User Logged Out - Web",{"referrer":document.referrer});
	mixpanel.track_links(".headerMyAccount","Clicked on My Account - Web",{"referrer":document.referrer});
	mixpanel.track(".dl-trigger","Opened Menu - Mobile");
	mixpanel.track_links(".mobileMenuDashboard","Opened Menu - Mobile",{"referrer":document.referrer});
	mixpanel.track(".mobileMenuLogout","User Logged Out - Mobile");
	mixpanel.track_links(".mobileMenuLogin","Clicked on Login - Mobile",{"referrer":document.referrer});
	mixpanel.track_links(".mobileMenuSeeAllServices","Clicked on See All Services - Mobile",{"referrer":document.referrer});
	mixpanel.track_links(".mobileMenuListYourService","Clicked on List Your Service - Mobile",{"referrer":document.referrer});
	mixpanel.track_links(".footerLogo","Clicked on Logo - Footer",{"referrer":document.referrer});
	mixpanel.track(".footerBookService","Clicked on Book Service - Footer");
	mixpanel.track(".footerCallHelpline","Clicked on Call Helpline - Footer");
	mixpanel.track_links(".footerSocialFB","Clicked on Facebook Link - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerAboutUs","Clicked on About Us - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerTeam","Clicked on Team - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerCareers","Clicked on Careers - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerFAQ","Clicked on FAQ - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerPress","Clicked on Press - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerTrustAndSafety","Clicked on Trust and Safety - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerPrivacyPolicy","Clicked on Privacy Policy - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerTermsOfUse","Clicked on Terms of Use - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerBlog","Clicked on Blog - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerContactUs","Clicked on Contact Us - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerLinksPopularServices","Clicked on Popular Services - Footer",{"referrer":document.referrer});
	mixpanel.track_links(".footerLinksCities","Clicked on Cities - Footer",{"referrer":document.referrer});
	mixpanel.track(".zopim","Clicked on Zopim");