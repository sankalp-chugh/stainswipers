function getUserArea() {
    var e = $("#userPinCode").val();
    6 == e.length ? $.ajax({
        data: "pinCode=" + e,
        url: "/api/getUserCity.php",
        type: "POST",
        success: function(a) {
            var t = jQuery.parseJSON(a);
            if ("successful" == t.status) {
                var i = getCookie("timesaverzUserCity");
                i == t.cityID ? ($("#topMenuCity").val(t.cityID), $("#topMenuCityMobile").val(t.cityID), setCookie("timesaverzUserCity", t.cityID, 90), $("#userPinCode").val(e), $("#userAreaName").html(t.areaData), $("#userAreaID").val($("#userAreaName").val()), $("#pinCodeFlag").val("1"), $("#cityIDFlag").val("1"), setCookie("timesaverzUserPinCode", e, 90), setCookie("timesaverzUserAreaName", $("#userAreaName option:selected").html(), 90), setCookie("timesaverzUserAreaID", $("#userAreaName").val(), 90)) : alert("The pin code you provided is for another city. Please change the city from the dropdown at the top of the page first to proceed."), mixpanel.track("Chose Pin Code", {
                    "Selected Pin Code": e
                })
            } else if ("noAreaFound" == t.status) {
                if (mixpanel.track("Chose Pin Code", {
                        "Unavailable Pin Code": e
                    }), $("#pinCodeFlag").val("0"), $("#cityIDFlag").val("0"), $("#userAreaID").val("0"), $("#userAreaName").html("Sorry! We do not service this area yet."), 0 == confirm("Looks like this area is not in our service list, do you want to call our helpline to check if they can still arrange a service for you?")) return;
                location.href = "tel:+919022711888"
            } else $("#pinCodeFlag").val("0"), $("#cityIDFlag").val("0"), $("#userAreaID").val("0"), alert("Sorry. We could not determine your location. Please select your city manually.")
        }
    }) : ($("#userAreaName").html(""), $("#pinCodeFlag").val("0"), $("#cityIDFlag").val("0"), $("#userAreaID").val("0"))
}

function changeCity() {
    var e = $("#topMenuCity").val();
    if ("choose" == e) $.ajax({
        data: "cityID=1",
        url: "/api/getCityName.php",
        type: "POST",
        success: function(a) {
            var t = jQuery.parseJSON(a);
            if ("successful" == t.status) {
                var i = t.cityName;
                setCookie("timesaverzUserCity", e, 90), window.location.replace("/" + i)
            }
        }
    });
    else {
        var a = getCookie("timesaverzUserCity"),
            t = $("#supercategoryName").val();
        a != e && $.ajax({
            data: "cityID=" + e,
            url: "/api/getCityName.php",
            type: "POST",
            success: function(a) {
                var i = jQuery.parseJSON(a);
                if ("successful" == i.status) {
                    var o = i.cityName;
                    setCookie("timesaverzUserCity", e, 90), window.location.replace("/" + o + "/" + t)
                }
            }
        })
    }
}

function changeCityMobile() {
    var e = $("#topMenuCityMobile").val(),
        a = $("#supercategoryName").val();
    if ("choose" == e) $.ajax({
        data: "cityID=1",
        url: "/api/getCityName.php",
        type: "POST",
        success: function(t) {
            var i = jQuery.parseJSON(t);
            if ("successful" == i.status) {
                var o = i.cityName;
                setCookie("timesaverzUserCity", e, 90), window.location.replace("/" + o + "/" + a)
            }
        }
    });
    else {
        var t = getCookie("timesaverzUserCity");
        t != e && $.ajax({
            data: "cityID=" + e,
            url: "/api/getCityName.php",
            type: "POST",
            success: function(t) {
                var i = jQuery.parseJSON(t);
                if ("successful" == i.status) {
                    var o = i.cityName;
                    setCookie("timesaverzUserCity", e, 90), window.location.replace("/" + o + "/" + a)
                }
            }
        })
    }
}

function changeUserAreaID() {
    $("#userAreaID").val($("#userAreaName").val()), setCookie("timesaverzUserAreaName", $("#userAreaName option:selected").html(), 90), setCookie("timesaverzUserAreaID", $("#userAreaName").val(), 90)
}

function loadCategories() {
    var e = $("#topMenuCity").val(),
        a = $("#supercategoryID").val();
    mixpanel.track("Categories Loaded", {
        "Selected Supercategory": a
    }), $.ajax({
        data: "cityID=" + e + "&supercategoryID=" + a,
        url: "/api/getCategories.php",
        type: "POST",
        success: function(t) {
            var i = jQuery.parseJSON(t);
            if ("successful" == i.status) {
                $("#serviceSelectionOptions").html(i.services);
                var o = $("#preselectedCategoryID").val();
                if ("0" != o) {
                    $("#service" + o).prop("checked", !0), $("#service" + o).addClass("active");
                    var r = $("#totalServicesSelected").val();
                    r++, $("#totalServicesSelected").val(r), loadSubcategories(o);
                    var s = $("#cartCounter").val();
                    s++, $("#cartCounter").val(s);
                    var l = $("#finalCartCounter").val();
                    l++, $("#finalCartCounter").val(l);
                    var n = '<div id="finalCartService' + s + '"><input type="hidden" id="variableID' + o + '" name="variableID' + s + '" class="variableID"><input type="hidden" id="workerID' + o + '" class="finalCartJobWorker" value="0" name="workerID' + s + '"><input type="hidden" id="workerType' + o + '" class="finalCartJobWorkerType" value="TSZ" name="workerType' + s + '"><input type="hidden" id="totalCost' + o + '" name="totalCost' + s + '"><input type="hidden" id="discountReceived' + o + '" name="discountReceived' + s + '"><input type="hidden" id="jobDate' + o + '" class="finalCartJobDate" name="jobDate' + s + '"><input type="hidden" id="jobTime' + o + '" value="1" class="finalCartJobTime" name="jobTime' + s + '"><input type="hidden" id="isRepeatService' + o + '" value="false" name="isRepeatService' + s + '"><input type="hidden" id="couponID' + o + '" value="0" name="couponID' + s + '"><input type="hidden" id="jobQuantity' + o + '" value="1" name="jobQuantity' + s + '"><input type="hidden" id="jobStatus' + o + '" class="finalCartJobStatus" value="pending" name="jobStatus' + s + '"><input type="hidden" id="jobIsCombo' + o + '" value="0" name="jobIsCombo' + s + '"><input type="hidden" id="jobComboID' + o + '" value="0" name="jobComboID' + s + '"></div>';
                    $("#finalCart").append(n)
                }
            } else mixpanel.track("Loading Failed", {
                City: e,
                Supercategory: a
            }), alert("Sorry. We could not fetch services at the moment. Please select a city to continue or try again in sometime.")
        }
    })
}

function loadSubcategories(e) {
    var a = $("#service" + e).val();
    $.ajax({
        data: "categoryID=" + e,
        url: "getSubcategories.php",
        type: "POST",
        success: function(t) {
            var i = jQuery.parseJSON(t);            
            if ("successful" == i.status) {
                var o = '<div id="subcategoryData' + e + '">';
                o += '<p class="col-md-12" id="serviceName' + e + '" style="padding-left: 0px;">' + a + " :</p>", o += i.subcategoryData, o += "</div>", $("#subcategoryDataSection").append(o), mixpanel.track("Categories", {
                    "Selected CategoryID": e
                }), $("html, body").animate({
                    scrollTop: $("#subcategoryData" + e).offset().top / 2
                }, 500)
            } else alert("Sorry. We could not fetch services at the moment. Try again in sometime.")
        }
    })
}

function loadVariables(e, a) {
    $("#subcategoryAMC" + a).html(""), $("#cartPrice" + a).remove(), calculateTotal(), $.ajax({
        data: "subcategoryID=" + e,
        url: "getVariables.php",
        type: "POST",
        success: function(e) {
            var a = jQuery.parseJSON(e);
            if ("successful" == a.status)
                if ("" == a.variableData) {
                    var t = Math.round(1 * a.payNowCost * 1.14, 0);
                    t = 10 * Math.round(t / 10);
                    var i = (a.payLaterCost, a.categoryID),
                        o = (a.subcategoryID, a.variableID),
                        r = $("#serviceName" + i).html(),
                        s = $("input[type='radio'][name='categoryRadio" + i + "']:checked").val();
                    if (mixpanel.track("Variables", {
                            Selected: r
                        }), $("#variablesSection" + i).html(""), $("#variableID" + i).val(o), $("#subcategoryDescription" + i).html(a.subcategoryDescription), "1" == a.amcAvailable) {
                        var l = '<input type="radio" id="serviceFrequencyOneTime' + i + '" name="serviceFrequencyRadio' + i + '" value="oneTime" class="fRadio" checked onclick="javascript: changeFrequency(this);">';
                        l += '<label for="serviceFrequencyOneTime' + i + '" class="stepLabels"><span></span>One Time Service</label>', l += '<input type="radio" id="subcategoryFrequencyRepeat' + i + '" name="serviceFrequencyRadio' + i + '" value="repeat" class="fRadio" onclick="javascript: changeFrequency(this);">';
                        var n = a.amcNumberOfServices,
                            c = 12 / n,
                            t = Math.round(1 * a.payNowCost * 1.14, 0),
                            d = 1 * t * 1 * n,
                            u = Math.round(1.14 * a.amcCost),
                            p = 1 * d - 1 * u;
                        l += '<label for="subcategoryFrequencyRepeat' + i + '" class="stepLabels"><span></span>Repeat Service every ' + c + " months <b>(Save &#8377; " + p + ")</b></label>", l += '<input type="hidden" id="oneTimeServiceCost' + i + '" value="' + t + '"></input>', l += '<input type="hidden" id="repeatServiceCost' + i + '" value="' + u + '"></input>', $("#subcategoryAMC" + i).html(l)
                    }
                    if (s = "" != s ? "(" + s + ")" : "", 0 == $("#cartPrice" + i).length) {
                        var v = '<li class="row" id="cartPrice' + i + '" itemprop="offers" itemscope itemtype="http://schema.org/Offer"><p class="col-md-8">' + r + " " + s + '</p><p class="col-md-4 pull-right servicePrice" id="servicePrice' + i + '" itemprop="price">...  &#8377; ' + t + ' <span id="discount' + i + '"></span></p></li>';
                        $("#cartServices").append(v)
                    } else {
                        var v = '<p class="col-md-8">' + r + " " + s + '</p><p class="col-md-4 pull-right servicePrice" id="servicePrice' + i + '" itemprop="price">...  &#8377; ' + t + ' <span id="discount' + i + '"></span></p>';
                        $("#cartPrice" + i).html(v)
                    }
                    calculateTotal(), $("html, body").animate({
                        scrollTop: $("#subcategoryDescription" + i).offset().top / 2
                    }, 500)
                } else {
                    {
                        var i = a.categoryID;
                        a.subcategoryID
                    }
                    $("#variablesSection" + i).html(a.variableData), $("#subcategoryDescription" + i).html(a.subcategoryDescription)
                } else alert("Sorry. We could not fetch services at the moment. Try again in sometime.")
        }
    })
}

function changeFrequency(e) {
    var a = $(e).attr("id").match(/\d+/),
        t = $(e).attr("value"),
        i = $("#" + t + "ServiceCost" + a).val();
    $("#servicePrice" + a).html("...  &#8377; " + i + " <span id='discount" + a + "'></span>"), "oneTime" == t ? ($("#isRepeatService" + a).val("false"), $("#agentList" + a).css("display", "block"), $(".finalCartJobWorkerType").each(function() {
        $(this).val("TSZ")
    }), $(".finalCartJobWorker").each(function() {
        $(this).val("0")
    }), $(".finalCartJobStatus").each(function() {
        $(this).val("pending")
    }), $(".agents li").removeClass("active"), mixpanel.track("Job Frequency Selection - One Time")) : "repeat" == t && ($("#isRepeatService" + a).val("true"), $("#agentList" + a).css("display", "none"), $("#workerID" + a).val("0"), $("#workerType" + a).val("TSZ"), $("#jobStatus" + a).val("pending"), mixpanel.track("Job Frequency Selection - Repeat Service")), calculateTotal()
}

function showHideScheduleSelection() {
    var e = $("input[name='timeslotTypeSelection']:checked").val();
    "same" == e ? ($("#sameTimeslotOptions").css("display", "block"), $("#differentTimeslotOptions").css("display", "none"), $(".finalCartJobTime").each(function() {
        $(this).val($("#sameTimeslotTimeSelection").val())
    }), $(".finalCartJobDate").each(function() {
        $(this).val($("#sameTimeslotDateSelection").find("input:first").val())
    }), mixpanel.track("Same Time Slot")) : ($("#sameTimeslotOptions").css("display", "none"), $("#differentTimeslotOptions").css("display", "block"), $(".finalCartJobTime").each(function() {
        var e = ($(this).attr("id"), $(this).attr("id").match(/\d+/));
        $("#jobTime" + e).val($("#timeSelection" + e).val())
    }), $(".finalCartJobDate").each(function() {
        var e = ($(this).attr("id"), $(this).attr("id").match(/\d+/));
        $("#jobDate" + e).val($("#jobDateIndividualSelection" + e).val())
    }), mixpanel.track("Different Time Slot")), $(".variableID").each(function() {
        var e = $(this).attr("id").match(/\d+/),
            a = $("#serviceName" + e).html(),
            t = "";
        t += '<div class="row step1Address" id="timeslotOptions' + e + '"><p class="leftSideLabel" style=""><br>' + a + '</p><div class="col-md-6"><div class="dateBox pull-left"><div class="input-group date" id="dateSelection' + e + '"><input type="text" id="jobDateIndividualSelection' + e + '" class="form-control" data-date-format="dd-mm-yyyy" onchange="changeJobDate(this);"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span></div></div></div><div class="col-md-6"><div class="select-style"><select id="timeSelection' + e + '" class="timeDropdown" onchange="changeJobTimeSlot(this);"><option value="1">Any Time</option><option value="2">10am-1pm</option><option value="3">1pm-4pm</option><option value="4">4pm-7pm</option></select></div></div></div>', 0 == $("#timeslotOptions" + e).length ? $("#differentTimeslotOptions").append(t) : ($("#timeslotOptions" + e).remove(), $("#differentTimeslotOptions").append(t)), loadDatePicker()
    })
}

function showHideAgents() {
    var e = $("input[name='selectAgent']:checked").val();
    "self" == e ? ($(".agents").css("display", "block"), $(".finalCartJobWorkerType").each(function() {
        $(this).val("TSZ")
    }), $(".finalCartJobWorker").each(function() {
        $(this).val("0")
    }), mixpanel.track("I'll Choose")) : ($(".agents").css("display", "none"), $(".finalCartJobWorkerType").each(function() {
        $(this).val("TSZ")
    }), $(".finalCartJobWorker").each(function() {
        $(this).val("0")
    }), $(".finalCartJobStatus").each(function() {
        $(this).val("pending")
    }), $(".agents li").removeClass("active"), mixpanel.track("Timesaverz Will Choose"))
}

function fetchAgents() {}

function changeJobTimeSlot(e) {
    if ("sameTimeslotTimeSelection" == $(e).attr("id")) $(".finalCartJobTime").each(function() {
        $(this).val($(e).val())
    });
    else {
        var a = $(e).attr("id").match(/\d+/);
        $("#jobTime" + a).val($(e).val())
    }
}

function changeJobDate(e) {
    if ("jobDateSameSelection" == $(e).attr("id")) {
        if ($(".finalCartJobDate").each(function() {
                $(this).val($("#sameTimeslotDateSelection").find("input:first").val())
            }), $(e).val() == enabledStartDate) {
            var a = s,
                t = calcTime("+5.5");
            t = new Date(t);
            var i = t.getHours();
            if (i >= 0 && 12 >= i) {
                for (var o = 1; 3 >= o; o++) $("#sameTimeslotTimeSelection option[value='" + o + "']").attr("disabled", !0);
                $("#sameTimeslotTimeSelection option[value='4']").attr("disabled", !1), $("#sameTimeslotTimeSelection option[value='4']").attr("selected", !0)
            } else if (i >= 13 && 23 >= i)
                if (i >= 13 && 17 > i) {
                    for (var o = 1; 4 >= o; o++) $("#sameTimeslotTimeSelection option[value='" + o + "']").attr("disabled", !1);
                    $("#sameTimeslotTimeSelection option[value='1']").attr("selected", !0)
                } else if (i >= 17 && 19 >= i) {
                for (var o = 1; 2 >= o; o++) $("#sameTimeslotTimeSelection option[value='" + o + "']").attr("disabled", !0);
                $("#sameTimeslotTimeSelection option[value='3']").attr("disabled", !1), $("#sameTimeslotTimeSelection option[value='4']").attr("disabled", !1), $("#sameTimeslotTimeSelection option[value='3']").attr("selected", !0)
            } else if (i >= 20 && 23 >= i) {
                for (var o = 1; 3 >= o; o++) $("#sameTimeslotTimeSelection option[value='" + o + "']").attr("disabled", !0);
                $("#sameTimeslotTimeSelection option[value='4']").attr("disabled", !1), $("#sameTimeslotTimeSelection option[value='4']").attr("selected", !0)
            }
        } else {
            for (var a = $(e).attr("id").match(/\d+/), o = 1; 4 >= o; o++) $("#sameTimeslotTimeSelection option[value='" + o + "']").attr("disabled", !1);
            $("#sameTimeslotTimeSelection option[value='1']").attr("selected", !0)
        }
        var r = $("#sameTimeslotTimeSelection");
        changeJobTimeSlot(r)
    } else {
        var s = $(e).attr("id").match(/\d+/);
        if ($("#jobDate" + s).val($(e).val()), $(e).val() == enabledStartDate) {
            var a = s,
                t = calcTime("+5.5");
            t = new Date(t);
            var i = t.getHours();
            if (i >= 0 && 12 >= i) {
                for (var o = 1; 3 >= o; o++) $("#timeSelection" + a + " option[value='" + o + "']").attr("disabled", !0);
                $("#timeSelection" + a + " option[value='4']").attr("disabled", !1), $("#timeSelection" + a + " option[value='4']").attr("selected", !0)
            } else if (i >= 13 && 23 >= i)
                if (i >= 13 && 17 > i) {
                    for (var o = 1; 4 >= o; o++) $("#timeSelection" + a + " option[value='" + o + "']").attr("disabled", !1);
                    $("#timeSelection" + a + " option[value='1']").attr("selected", !0)
                } else if (i >= 17 && 19 >= i) {
                for (var o = 1; 2 >= o; o++) $("#timeSelection" + a + " option[value='" + o + "']").attr("disabled", !0);
                $("#timeSelection" + a + " option[value='3']").attr("disabled", !1), $("#timeSelection" + a + " option[value='4']").attr("disabled", !1), $("#timeSelection" + a + " option[value='3']").attr("selected", !0)
            } else if (i >= 20 && 23 >= i) {
                for (var o = 1; 3 >= o; o++) $("#timeSelection" + a + " option[value='" + o + "']").attr("disabled", !0);
                $("#timeSelection" + a + " option[value='4']").attr("disabled", !1), $("#timeSelection" + a + " option[value='4']").attr("selected", !0)
            }
        } else {
            for (var a = $(e).attr("id").match(/\d+/), o = 1; 4 >= o; o++) $("#timeSelection" + a + " option[value='" + o + "']").attr("disabled", !1);
            $("#timeSelection" + a + " option[value='1']").attr("selected", !0)
        }
        var r = $("#timeSelection" + s);
        changeJobTimeSlot(r)
    }
}

function changeJobAgent(e) {
    var a = $(e).attr("id").split("-"),
        t = a[1].match(/\d+/),
        i = a[0].match(/\d+/);
    $("#workerID" + i).val(t), $("#workerType" + i).val("agents"), $("#jobStatus" + i).val("assigned"), mixpanel.track("Agent Selection", {
        "Agent ID": t,
        "Agent Name": "Agent"
    })
}

function loadDatePicker() {
    var e = calcTime("+5.5");
    e = new Date(e);
    var a = e.getHours();
    if (a >= 0 && 12 >= a) {
        var t = "" + e.getDate(),
            i = "" + (e.getMonth() + 1);
        i.length < 2 && (i = "0" + i), t.length < 2 && (t = "0" + t);
        var o = t + "-" + i + "-" + e.getFullYear();
        $(".input-group.date").datepicker({
            datesDisabled: forbiddenDates,
            startDate: o,
            endDate: "+90d",
            defaultViewDate: "+0d",
            format: "dd-mm-yyyy",
            autoclose: !0,
            disableTouchKeyboard: !0
        }), $(".input-group.date").datepicker("setDate", o);
        for (var r = 1; 3 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !0);
        $(".timeDropdown option[value='4']").attr("disabled", !1), $(".timeDropdown option[value='4']").attr("selected", !0)
    } else if (a >= 13 && 23 >= a)
        if ($(".input-group.date").datepicker({
                datesDisabled: forbiddenDates,
                startDate: "+1d",
                endDate: "+90d",
                defaultViewDate: "+0d",
                format: "dd-mm-yyyy",
                autoclose: !0,
                disableTouchKeyboard: !0
            }), $(".input-group.date").datepicker("setDate", "+1d"), a >= 13 && 17 > a) {
            for (var r = 1; 4 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !1);
            $(".timeDropdown option[value='1']").attr("selected", !0)
        } else if (a >= 17 && 19 >= a) {
        for (var r = 1; 2 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !0);
        $(".timeDropdown option[value='3']").attr("disabled", !1), $(".timeDropdown option[value='4']").attr("disabled", !1), $(".timeDropdown option[value='3']").attr("selected", !0)
    } else if (a >= 20 && 23 >= a) {
        for (var r = 1; 3 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !0);
        $(".timeDropdown option[value='4']").attr("disabled", !1), $(".timeDropdown option[value='4']").attr("selected", !0)
    }
}

function checkUserExists() {
    var e = $("#userMobileNumber").val();
    if (10 == e.length) {
        var a = (getCookie("timesaverzUserMobileNumber"), getCookie("timesaverzUserLoggedIn"), getCookie("timesaverzUserCity"));
        getOTPClicked = new Date, $.ajax({
            url: "/api/checkUserExists.php",
            data: "userMobileNumber=" + e + "&userCity=" + a,
            type: "POST",
            success: function(a) {
                var t = jQuery.parseJSON(a);
                if ("successful" == t.status) {
                    if ($(".getOTPButton").css("display", "none"), $(".loginContinueButton").css("display", "block"), $("#cmdContinueStep3").css("display", "block"), $("#userType").val(t.userType), "old" == t.userType) $("#userID").val(t.userData.userID), $("#userAddress").val(t.userData.userAddress), $("#userPinCode").val(t.userData.userPinCode), getUserArea(), 0 != t.userData.userAreaID && $("#userAreaName").val(t.userData.userAreaID), mixpanel.identify(t.userData.userID), $(".oldUserDetails").fadeIn("slow").css("display", "block"), setCookie("timesaverzUserID", t.userData.userID, 90), setCookie("timesaverzUserMobileNumber", e, 90), setCookie("timesaverzUserEmailAddress", t.userData.userEmailAddress, 90), setCookie("timesaverzUserAddress", t.userData.userAddress, 90), setCookie("timesaverzUserFullName", t.userData.userFullName, 90);
                    else if ("migrated" == t.userType) {
                        var i = t.userData.userEmailAddress,
                            o = t.userData.userFullName,
                            r = t.userData.userAddress;
                        "default" != i && $("#userEmailAddress").val(i), "default" != o && $("#userFullName").val(o), "default" != r && $("#userAddress").val(r), $("#userPinCode").val(t.userData.userPinCode), getUserArea(), 0 != t.userData.userAreaID && $("#userAreaName").val(t.userData.userAreaID), $("#userID").val(t.userData.userID), mixpanel.identify(t.userData.userID), setCookie("timesaverzUserID", t.userData.userID, 90), setCookie("timesaverzUserMobileNumber", e, 90), $(".newUserDetails").fadeIn("slow").css("display", "block"), $(".oldUserDetails").fadeIn("slow").css("display", "block")
                    } else "new" == t.userType && ($("#userID").val(t.userData.userID), mixpanel.identify(t.userData.userID), setCookie("timesaverzUserID", t.userData.userID, 90), setCookie("timesaverzUserMobileNumber", e, 90), $(".newUserDetails").fadeIn("slow").css("display", "block"), $(".oldUserDetails").fadeIn("slow").css("display", "block"));
                    generateWebLead(), $("#otpInfo").fadeIn("slow").delay(1e3).fadeOut("fast")
                } else alert("Sorry! We could not fetch your account details at the moment")
            }
        })
    } else $(".newUserDetails").css("display", "none"), $(".oldUserDetails").css("display", "none"), alert("Mobile number needs to be 10 digits. Please do not put in country code.")
}

function userLogin() {
    generateWebLead(), "" != $("#userMobileNumber").val() && ("old" == $("#userType").val() ? $.ajax({
        url: "/api/checkLogin.php",
        data: "userType=old&userMobileNumber=" + $("#userMobileNumber").val() + "&userSentOTP=" + $("#userSentOTP").val(),
        type: "POST",
        async: !1,
        success: function(e) {
            var a = jQuery.parseJSON(e);
            if ("successful" == a.status) {
                var t = new Date,
                    i = t.getTime(),
                    o = i - getOTPClicked.getTime();
                ga("send", "event", "Login Process", "Time Taken", o), setCookie("timesaverzUserLoggedIn", "true", 90), $("#loggedInFlag").val("1"), nextSectionAccess = !0, $("input[id='payNow']").prop("checked", !0), $("#returningCustomerName").html(getCookie("timesaverzUserFullName")), $("#returningCustomerMobile").html(getCookie("timesaverzUserMobileNumber")), $("#returningCustomerAddress").html(getCookie("timesaverzUserAddress") + ", " + getCookie("timesaverzUserAreaName") + ". " + $("#topMenuCity option:selected").html() + " - " + getCookie("timesaverzUserPinCode")), $("#customerDetailsInput").fadeOut(), $("#returnCustomerDetails").fadeIn("slow"), $("#customerDetailsInput").css("display", "none"), $("#returnCustomerDetails").css("display", "block")
            } else alert("accountBlocked" == a.status ? "Sorry! It seems your account has been blocked. Please contact our helpline for further assistance." : "invalidOTP" == a.status ? "Sorry! It seems the OTP you provided is incorrect. Please try again." : "Sorry! We could not fetch your account details at the moment.")
        }
    }) : "" != $("#userMobileNumber").val() && "" != $("#userSentOTP").val() && "" != $("#userFullName").val() && "" != $("#userEmailAddress").val() && "" != $("#userAddress").val() && "" != $("#userAreaID").val() && "" != $("#userPinCode").val() ? $.ajax({
        url: "/api/checkLogin.php",
        data: "userType=new&userMobileNumber=" + $("#userMobileNumber").val() + "&userSentOTP=" + $("#userSentOTP").val() + "&userEmailAddress=" + $("#userEmailAddress").val() + "&userFullName=" + $("#userFullName").val() + "&userAddress=" + $("#userAddress").val() + "&userCityID=" + getCookie("timesaverzUserCity") + "&userAreaID=" + $("#userAreaID").val() + "&userPinCode=" + $("#userPinCode").val(),
        type: "POST",
        async: !1,
        success: function(e) {
            var a = jQuery.parseJSON(e);
            "successful" == a.status ? ($("#userSentOTP").val(""), setCookie("timesaverzUserMobileNumber", $("#userMobileNumber").val(), 90), setCookie("timesaverzUserEmailAddress", $("#userEmailAddress").val(), 90), setCookie("timesaverzUserFullName", $("#userFullName").val(), 90), setCookie("timesaverzUserAddress", $("#userAddress").val(), 90), setCookie("timesaverzUserPinCode", $("#userPinCode").val(), 90), setCookie("timesaverzUserAreaName", $("#userAreaName option:selected").html(), 90), setCookie("timesaverzUserLoggedIn", "true", 90), $("#loggedInFlag").val("1"), nextSectionAccess = !0, $("input[id='payNow']").prop("checked", !0), $("#returningCustomerName").html(getCookie("timesaverzUserFullName")), $("#returningCustomerMobile").html(getCookie("timesaverzUserMobileNumber")), $("#returningCustomerAddress").html(getCookie("timesaverzUserAddress") + ", " + getCookie("timesaverzUserAreaName") + ". " + $("#topMenuCity option:selected").html() + " - " + getCookie("timesaverzUserPinCode")), $("#customerDetailsInput").fadeOut(), $("#returnCustomerDetails").fadeIn("slow"), $("#customerDetailsInput").css("display", "none"), $("#returnCustomerDetails").css("display", "block")) : alert("invalidOTP" == a.status ? "Sorry! It seems the OTP you provided is incorrect. Please try again." : "Sorry! We could not fetch your account details at the moment.")
        }
    }) : alert("Please provide all details to continue."))
}

function applyCoupon() {
    var e = $("#couponName").val();
    if ("" != e) {
        e = e.toUpperCase(), $("#couponName").val(e);
        var a = $("#topMenuCity").val(),
            t = "false",
            i = $("#makePaymentTotalAmount").html().match(/\d+/);
        $.ajax({
            url: "/api/applyCoupon.php",
            data: "couponName=" + e + "&cityID=" + a + "&accessingFromApp=" + t + "&orderAmount=" + i,
            type: "POST",
            success: function(e) {
                var a = jQuery.parseJSON(e);
                if ("successful" == a.status) {
                    for (var t = a.count, i = !1, o = 0; t > o; o++) {
                        var r = a.couponData[o].categoryID,
                            s = a.couponData[o].couponID,
                            l = a.couponData[o].discountType,
                            n = a.couponData[o].discountValue;
                        if (0 != $("#servicePrice" + r).length && "" == $("#discount" + r).html()) {
                            $("#removeC").css("display", "block"), $("#applyC").css("display", "none"), $("#couponID" + r).val(s);
                            var c = $("#servicePrice" + r).html().match(/\d+/);
                            if ("amount" == l) {
                                mixpanel.track("Coupon Applied", {
                                    CategoryID: r,
                                    "Coupon Name": p,
                                    "Discount Received": n
                                });
                                var d = 1 * c - 1 * n;
                                d = Math.round(d), $("#servicePrice" + r).html("...  &#8377; " + d + " <span id='discount" + r + "'>" + n + "</span>"), calculateTotal()
                            } else if ("percent" == l) {
                                var u = 1 * c * 1 * n / 100;
                                u = Math.round(u), mixpanel.track("Coupon Applied", {
                                    CategoryID: r,
                                    "Coupon Name": p,
                                    "Discount Received": u
                                });
                                var d = 1 * c - 1 * u;
                                d = Math.round(d), $("#servicePrice" + r).html("...  &#8377; " + d + " <span id='discount" + r + "'>" + u + "</span>"), calculateTotal()
                            }
                            i = !0
                        }
                        0 == r && $(".servicePrice").each(function() {
                            var e = $(this).attr("id").match(/\d+/);
                            $("#couponID" + e).val(s);
                            var a = $("#servicePrice" + e).html().match(/\d+/);
                            if ("amount" == l) {
                                mixpanel.track("Coupon Applied", {
                                    CategoryID: e,
                                    "Coupon Name": p,
                                    "Discount Received": n
                                });
                                var t = 1 * a - 1 * n;
                                t = Math.round(t), $("#servicePrice" + e).html("...  &#8377; " + t + " <span id='discount" + e + "'>" + n + "</span>"), calculateTotal()
                            } else if ("percent" == l) {
                                var o = 1 * a * 1 * n / 100;
                                o = Math.round(o), mixpanel.track("Coupon Applied", {
                                    CategoryID: e,
                                    "Coupon Name": p,
                                    "Discount Received": o
                                });
                                var t = 1 * a - 1 * o;
                                t = Math.round(t), $("#servicePrice" + e).html("...  &#8377; " + t + " <span id='discount" + e + "'>" + o + "</span>"), calculateTotal()
                            }
                            $("#removeC").css("display", "block"), $("#applyC").css("display", "none"), i = !0
                        })
                    }
                    alert(0 == i ? "You have not added the applicable service to cart. Please check offer details carefully and try again." : "Woohoo! The coupon was successfully applied.");
                    var p = $("#couponName").val();
                    ga("send", "event", "Coupon", "Applied", p), "YES20" == p && ($("#payNowInstamojo").prop("disabled", "true"), $("#payNowPayUMoney").prop("disabled", "true"), $("#payLater").prop("disabled", "true"), $("#payNowPayTM").prop("checked", "true"))
                } else "failed" == a.status ? (alert(a.reason), mixpanel.track("Coupon Could Not Be Applied", {
                    CategoryID: r,
                    "Coupon Name": p,
                    "Reason for Failure": a.reason
                })) : alert("Sorry! We could not apply the coupon at the moment")
            }
        })
    } else alert("Please provide coupon code.")
}

function removeCoupon() {
    var e = !1;
    $(".servicePrice span").each(function() {
        var a = $("#couponName").val();
        if (ga("send", "event", "Coupon", "Removed", a), "" != $(this).html()) {
            var t = $(this).html(),
                i = $(this).attr("id").match(/\d+/),
                o = $("#servicePrice" + i).html().match(/\d+/),
                r = 1 * o + 1 * t;
            $("#discount" + i).html(""), $("#discountReceived" + i).val("0"), $("#couponID" + i).val("0"), $("#servicePrice" + i).html("...  &#8377; " + r + " <span id='discount" + i + "'></span>"), $("#couponName").val(""), $("#removeC").css("display", "none"), $("#applyC").css("display", "block"), calculateTotal(), e = !0
        }
    }), 0 == e && ($("#couponName").val(""), $("#removeC").css("display", "none"), $("#applyC").css("display", "block")), $("#payNowInstamojo").removeProp("disabled"), $("#payNowPayUMoney").removeProp("disabled"), $("#payLater").removeProp("disabled")
}

function showPrice(e) {
    var a = ($(e).attr("id").match(/\d+/), $(e).val());
    "choose" != a && $.ajax({
        data: "variableID=" + a,
        url: "getVariableCost.php",
        type: "POST",
        success: function(e) {
            var t = jQuery.parseJSON(e);
            if ("successful" == t.status) {
                var i = t.payNowCost;
                //var i = Math.round(1 * t.payNowCost * 1.14, 0);
                //i = 10 * Math.round(i / 10);
                var o = (t.payLaterCost, t.categoryID),
                    r = (t.subcategoryID, $("#serviceName" + o).html()),
                    s = $("input[type='radio'][name='categoryRadio" + o + "']:checked").val();
                if ("1" == t.amcAvailable) {
                    var l = '<input type="radio" id="serviceFrequencyOneTime' + o + '" name="serviceFrequencyRadio' + o + '" value="oneTime" class="fRadio" checked onclick="javascript: changeFrequency(this);">';
                    l += '<label for="serviceFrequencyOneTime' + o + '" class="stepLabels"><span></span>One Time Service</label>', l += '<input type="radio" id="subcategoryFrequencyRepeat' + o + '" name="serviceFrequencyRadio' + o + '" value="repeat" class="fRadio" onclick="javascript: changeFrequency(this);">';
                    var n = t.amcNumberOfServices,
                        c = 12 / n,
                        d = 1 * i * 1 * n,
                        u = Math.round(1.14 * t.amcCost),
                        p = 1 * d - 1 * u;
                    l += '<label for="subcategoryFrequencyRepeat' + o + '" class="stepLabels"><span></span>Repeat Service every ' + c + " months <b>(Save &#8377; " + p + ")</b></label>", l += '<input type="hidden" id="oneTimeServiceCost' + o + '" value="' + i + '"></input>', l += '<input type="hidden" id="repeatServiceCost' + o + '" value="' + u + '"></input>', $("#subcategoryAMC" + o).html(l)
                } else $("#subcategoryAMC" + o).html("");
                if (s = "" != s ? "(" + s + ")" : "", 0 == $("#cartPrice" + o).length) {
                    var v = '<li class="row" id="cartPrice' + o + '" itemprop="offers" itemscope itemtype="http://schema.org/Offer"><p class="col-md-8">' + r + " " + s + '</p><p class="col-md-4 pull-right servicePrice" id="servicePrice' + o + '" itemprop="price">...  &#8377; ' + i + ' <span id="discount' + o + '"></span></p></li>';
                    $("#cartServices").append(v)
                } else {
                    var v = '<p class="col-md-8">' + r + " " + s + '</p><p class="col-md-4 pull-right servicePrice" id="servicePrice' + o + '">...  &#8377; ' + i + ' <span id="discount' + o + '"></span></p>';
                    $("#cartPrice" + o).html(v)
                }
                $("#variableID" + o).val(a), calculateTotal()
            } else alert("Sorry. We could not fetch service details at the moment. Try again in sometime.")
        }
    })
}

function calculateTotal() {
    var e = 0,
        a = $.animateNumber.numberStepFactories.separator(","),
        t = 0;
    $(".servicePrice").each(function() {
        var a = $(this).html().match(/\d+/);
        e += 1 * a;
        var i = $(this).attr("id").match(/\d+/),
            o = $("#discount" + i).html();
        o = "" == o ? "0" : o.match(/\d+/), $("#totalCost" + i).val(a), $("#discountReceived" + i).val(o), t++
    }), $("#totalServicesInCart").val(t);
    var i = 0;
    $(".taxPrice").html("&#8377; " + i);
    var o = Math.round(e + i);
    $("#finalPrice").animateNumber({
        number: o,
        numberStep: a,
        easing: "easeInQuad"
    }), $("#makePaymentTotalAmount").html("&#8377; " + o), o > 0 ? $("#serviceSelectedFlag").val("1") : ($("#serviceSelectedFlag").val("0"), $("#step2").removeClass("in"));
    var r = $("#finalCartCounter").val();
    r > 1 ? $(".dateAndTimeSelectionOptionsArea").css("display", "block") : $(".dateAndTimeSelectionOptionsArea").css("display", "none")
}

function paymentOptionSelection() {
    var e = $("input[name='paymentOption']:checked").val(),
        a = $("#currentPaymentOptionSelection").val();
    "payNow" == e && a != e ? ($("#paymentDescription").html("You can pay securely using Credit Card, Debit Card, Net Banking, Wallet and Cash Card options."), "0" != $("#finalPrice").val() && ($(".servicePrice").each(function() {
        var e = $(this).html().match(/\d+/);
        e = Math.round(1 * e * 100 / 105, 0);
        var a = $(this).attr("id").match(/\d+/),
            t = $("#discount" + a).html();
        $(this).html("...  &#8377; " + e + " <span id='discount" + a + "'>" + t + "</span>")
    }), $("#currentPaymentOptionSelection").val("payNow"), calculateTotal())) : "payLater" == e && a != e && ($("#paymentDescription").html('Please draw a cheque in favor of "Timesaverz Dotcom Pvt Ltd". But, just so that you know, since you have already decided to save time with Timesaverz, you might as well save money by PAYING NOW and <u>availing a 5% discount.</u>'), "0" != $("#finalPrice").val() && ($(".servicePrice").each(function() {
        var e = $(this).html().match(/\d+/);
        e = Math.round(1 * e * 1.05, 0);
        var a = $(this).attr("id").match(/\d+/),
            t = $("#discount" + a).html();
        $(this).html("...  &#8377; " + e + " <span id='discount" + a + "'>" + t + "</span>")
    }), $("#currentPaymentOptionSelection").val("payLater"), calculateTotal()))
}

function placeOrder() {
    var e = $("#loggedInFlag").val(),
        a = $("#pinCodeFlag").val(),
        t = $("#finalCartCounter").val(),
        i = 0;
    if ("1" != e && 0 == i && (alert("Please provide your details to continue placing your order."), i = 1), "1" != a && 0 == i && (alert("Please provide the work location to continue placing your order."), i = 1), t > 0 && 0 == i) {
        ga("send", "event", "Step 3 - v3.2", "Completed");
        var o = getCookie("timesaverzUserID"),
            r = getCookie("timesaverzUserAreaID"),
            s = getCookie("timesaverzUserAddress");
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) var l = "mobileweb";
        else var l = "web";
        var n = $("#currentPaymentOptionSelection").val(),
            c = $("input[name='paymentOption']:checked").attr("id"),
            d = $("<input>").attr("type", "hidden").attr("name", "userID").val(o),
            u = $("<input>").attr("type", "hidden").attr("name", "userAreaID").val(r),
            p = $("<input>").attr("type", "hidden").attr("name", "jobAddress").val(s),
            v = $("<input>").attr("type", "hidden").attr("name", "jobBookedFrom").val(l),
            m = $("<input>").attr("type", "hidden").attr("name", "jobPaymentType").val(n),
            y = $("<input>").attr("type", "hidden").attr("name", "finalAmount").val($("#makePaymentTotalAmount").html().match(/\d+/)),
            h = $("<input>").attr("type", "hidden").attr("name", "transactionMode").val(c),
            f = $("<input>").attr("type", "hidden").attr("name", "couponName").val($("#couponName").val()),
            b = $("#makePaymentTotalAmount").html().match(/\d+/);
        ga("send", "event", "Revenue", "Generated", b), ga("send", "event", "Total Services Booked", $("#finalCartCounter").val()), $("#finalCart").append(d), $("#finalCart").append(u), $("#finalCart").append(p), $("#finalCart").append(v), $("#finalCart").append(m), $("#finalCart").append(y), $("#finalCart").append(h), $("#finalCart").append(f), $("#finalCart").submit()
    } else alert("We know you're excited about Timesaverz as well. Start off by adding a few services first.")
}

function generateWebLead() {
    var e = $("#leadGenerated").val();
    if ("false" == e) {
        ga("send", "event", "Web Lead", "Generated");
        var a = getCookie("timesaverzUserID"),
            t = getCookie("timesaverzUserAreaID");
        "" == t && (t = 0);
        var i = getCookie("timesaverzUserCity"),
            o = $("#userAddress").val(),
            r = $("#cartCounter").val(),
            s = $("#makePaymentTotalAmount").html().match(/\d+/);
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) var l = "mobileweb";
        else var l = "web";
        $.ajax({
            type: "POST",
            url: "/api/generateWebLead.php",
            data: $("#finalCart").serialize() + "&userID=" + a + "&userAreaID=" + t + "&cityID=" + i + "&userAddress=" + o + "&cartCounter=" + r + "&finalAmount=" + s + "&jobBookedFrom=" + l,
            success: function() {
                $("#leadGenerated").val("true")
            }
        })
    }
}

function calcTime(e) {
    return d = new Date, utc = d.getTime() + 6e4 * d.getTimezoneOffset(), nd = new Date(utc + 36e5 * e)
}
var getOTPClicked = 0,
    enabledStartDate = "",
    forbiddenDates = ["15-08-2015"];
$(document).ready(function() {
    $(".header").addClass("headerFixed");
    var e = calcTime("+5.5");
    e = new Date(e);
    var a = e.getHours();
    if (a >= 0 && 12 >= a) {
        var t = "" + e.getDate(),
            i = "" + (e.getMonth() + 1);
        i.length < 2 && (i = "0" + i), t.length < 2 && (t = "0" + t);
        var o = t + "-" + i + "-" + e.getFullYear();
        $(".input-group.date").datepicker({
            datesDisabled: forbiddenDates,
            startDate: o,
            endDate: "+90d",
            defaultViewDate: "+0d",
            format: "dd-mm-yyyy",
            autoclose: !0,
            disableTouchKeyboard: !0
        }), $(".input-group.date").datepicker("setDate", o);
        for (var r = 1; 3 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !0);
        $(".timeDropdown option[value='4']").attr("disabled", !1), $(".timeDropdown option[value='4']").attr("selected", !0), enabledStartDate = $("#jobDateSameSelection").val()
    } else if (a >= 13 && 23 >= a) {
        if ($(".input-group.date").datepicker({
                datesDisabled: forbiddenDates,
                startDate: "+1d",
                endDate: "+90d",
                defaultViewDate: "+0d",
                format: "dd-mm-yyyy",
                autoclose: !0,
                disableTouchKeyboard: !0
            }), $(".input-group.date").datepicker("setDate", "+1d"), a >= 13 && 17 > a) {
            for (var r = 1; 4 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !1);
            $(".timeDropdown option[value='1']").attr("selected", !0)
        } else if (a >= 17 && 19 >= a) {
            for (var r = 1; 2 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !0);
            $(".timeDropdown option[value='3']").attr("disabled", !1), $(".timeDropdown option[value='4']").attr("disabled", !1), $(".timeDropdown option[value='3']").attr("selected", !0)
        } else if (a >= 20 && 23 >= a) {
            for (var r = 1; 3 >= r; r++) $(".timeDropdown option[value='" + r + "']").attr("disabled", !0);
            $(".timeDropdown option[value='4']").attr("disabled", !1), $(".timeDropdown option[value='4']").attr("selected", !0)
        }
        enabledStartDate = $("#jobDateSameSelection").val()
    }
    $(document).on("click", 'input[type="checkbox"].options', function() {
        if (1 == $(this).prop("checked")) {
            var e = $(this).attr("id").match(/\d+/);
            if (0 == $("#subcategoryData" + e).length) {
                $(this).addClass("active");
                var a = $("#totalServicesSelected").val();
                a++, $("#totalServicesSelected").val(a), loadSubcategories(e);
                var t = $("#sameTimeslotTimeSelection").val(),
                    i = $("#cartCounter").val();
                i++, $("#cartCounter").val(i);
                var o = $("#finalCartCounter").val();
                o++, $("#finalCartCounter").val(o);
                var r = '<div id="finalCartService' + i + '"><input type="hidden" id="variableID' + e + '" name="variableID' + i + '" class="variableID"><input type="hidden" id="workerID' + e + '" class="finalCartJobWorker" value="0" name="workerID' + i + '"><input type="hidden" id="workerType' + e + '" class="finalCartJobWorkerType" value="TSZ" name="workerType' + i + '"><input type="hidden" id="totalCost' + e + '" name="totalCost' + i + '"><input type="hidden" id="discountReceived' + e + '" name="discountReceived' + i + '"><input type="hidden" id="jobDate' + e + '" class="finalCartJobDate" name="jobDate' + i + '"><input type="hidden" id="jobTime' + e + '" value="' + t + '" class="finalCartJobTime" name="jobTime' + i + '"><input type="hidden" id="isRepeatService' + e + '" value="false" name="isRepeatService' + i + '"><input type="hidden" id="couponID' + e + '" value="0" name="couponID' + i + '"><input type="hidden" id="jobQuantity' + e + '" value="1" name="jobQuantity' + i + '"><input type="hidden" id="jobStatus' + e + '" class="finalCartJobStatus" value="pending" name="jobStatus' + i + '"><input type="hidden" id="jobIsCombo' + e + '" value="0" name="jobIsCombo' + i + '"><input type="hidden" id="jobComboID' + e + '" value="0" name="jobComboID' + i + '"></div>';
                $("#finalCart").append(r), showHideScheduleSelection()
            } else 1 == $(this).prop("checked");
            var s = $("#service" + e).val() + " " + $("#supercategoryName").val();
            //ga("send", "event", "service", "selected", s)
        } else if (0 == $(this).prop("checked")) {
            $(this).removeClass("active");
            var a = $("#totalServicesSelected").val();
            a--, $("#totalServicesSelected").val(a);
            var e = $(this).attr("id").match(/\d+/);
            $("#subcategoryData" + e).remove(), $("#cartPrice" + e).remove(), $("#agentList" + e).remove(), $("#timeslotOptions" + e).remove(), calculateTotal(), $("#variableID" + e).parent().remove();
            var o = $("#finalCartCounter").val();
            o--, $("#finalCartCounter").val(o);
            var s = $("#service" + e).val() + $("#supercategoryName").val();
            //ga("send", "event", "service", "unselected", s)
        }
    }), $(document).on("click", ".cRadio", function() {
        var e = $(this).attr("name").match(/\d+/),
            a = $(this).attr("id").match(/\d+/);
        loadVariables(a, e)
    }), $(document).on("change", ".agentRadio", function() {
        var e = $(this),
            a = e.parent();
        a.siblings().filter(function() {
            return !!$(this).find('input[name="' + e.attr("name") + '"]:radio').length
        }).removeClass("active"), this.checked && a.addClass("active")
    }), $(".continueBtn").click(function(e) {
        var a = $(this).attr("id").match(/\d+/),
            t = !1,
            i = "";
        if ("0" == a)
            if ("" == $("#userPinCode").val()) e.stopPropagation(), t = !1, i = "Please provide your pin code.";
            else {
                var o = $("#pinCodeFlag").val();
                "1" == o ? ($("#userAreaID").val($("#userAreaName").val()), setCookie("timesaverzUserPinCode", $("#userPinCode").val(), 90), setCookie("timesaverzUserAreaID", $("#userAreaName").val(), 90), $.ajax({
                    url: "/api/updateUserArea.php",
                    data: "userID=" + getCookie("timesaverzUserID") + "&userPinCode=" + getCookie("timesaverzUserPinCode") + "&userAreaID=" + getCookie("timesaverzUserAreaID"),
                    type: "POST",
                    async: !1,
                    success: function() {}
                }), t = !0, ga("send", "event", "Step 3", "Completed")) : (e.stopPropagation(), t = !1, i = "We do not provide services in the area you have selected. Select another area to continue.")
            } else if ("1" == a)
            if ($("#totalServicesInCart").val() == $("#totalServicesSelected").val()) {
                var o = $("#serviceSelectedFlag").val();
                if ("1" == o) {
                    t = !0;
                    var r = getCookie("timesaverzUserLoggedIn");
                    "true" == r && generateWebLead(), ga("send", "event", "Step 1 - v3.2", "Completed")
                } else e.stopPropagation(), t = !1, i = "Please select at least one service to continue.", $("#step2").removeClass("in")
            } else e.stopPropagation(), t = !1, i = "Please add all the services you have selected to cart.";
        else if ("2" == a) {
            var o = 0;
            $(".finalCartJobWorker").each(function() {
                "" == $.trim($(this).val()) && (e.stopPropagation(), t = !1, i = "Please select agents for your job to continue.", o = 1)
            }), $(".finalCartJobWorkerType").each(function() {
                ("" == $.trim($(this).val()) || "0" == $.trim($(this).val())) && (e.stopPropagation(), t = !1, i = "Please select agents for your job to continue.", o = 1)
            }), $(".finalCartJobDate").each(function() {
                "" == $.trim($(this).val()) && (e.stopPropagation(), t = !1, i = "Please choose service date for your job to continue.", o = 1)
            }), $(".finalCartJobTime").each(function() {
                "" == $.trim($(this).val()) && (e.stopPropagation(), t = !1, i = "Please choose service timeslot for your job to continue.", o = 1)
            }), $(".finalCartJobStatus").each(function() {
                "" == $.trim($(this).val()) && (e.stopPropagation(), t = !1, i = "Please choose agent for your job to continue.", o = 1)
            }), 0 == o && (t = !0, ga("send", "event", "Step 2 - v3.2", "Completed"))
        } else "3" == a ? (generateWebLead(), "true" != getCookie("timesaverzUserLoggedIn") ? ("" != $("#userMobileNumber").val() ? "old" == $("#userType").val() ? $.ajax({
            url: "/api/checkLogin.php",
            data: "userType=old&userMobileNumber=" + $("#userMobileNumber").val() + "&userSentOTP=" + $("#userSentOTP").val(),
            type: "POST",
            async: !1,
            success: function(a) {
                var o = jQuery.parseJSON(a);
                if ("successful" == o.status) {
                    var r = new Date,
                        s = r.getTime(),
                        l = s - getOTPClicked.getTime();
                    ga("send", "event", "Login Process", "Time Taken", l), setCookie("timesaverzUserLoggedIn", "true", 90), $("#loggedInFlag").val("1"), t = !0, $("input[id='payNow']").prop("checked", !0), $("#userMobileNumber").attr("readonly", "readonly")
                } else "accountBlocked" == o.status ? (e.stopPropagation(), t = !1, i = "Sorry! It seems your account has been blocked. Please contact our helpline for further assistance.") : "invalidOTP" == o.status ? (e.stopPropagation(), t = !1, i = "Sorry! It seems the OTP you provided is incorrect. Please try again.") : (e.stopPropagation(), t = !1, i = "Sorry! We could not fetch your account details at the moment.")
            }
        }) : "" != $("#userMobileNumber").val() && "" != $("#userSentOTP").val() && "" != $("#userFullName").val() && "" != $("#userEmailAddress").val() ? $.ajax({
            url: "/api/checkLogin.php",
            data: "userType=new&userMobileNumber=" + $("#userMobileNumber").val() + "&userSentOTP=" + $("#userSentOTP").val() + "&userEmailAddress=" + $("#userEmailAddress").val() + "&userFullName=" + $("#userFullName").val() + "&userAddress=" + $("#userAddress").val() + "&userCityID=" + getCookie("timesaverzUserCity"),
            type: "POST",
            async: !1,
            success: function(a) {
                var o = jQuery.parseJSON(a);
                "successful" == o.status ? ($("#userSentOTP").val(""), setCookie("timesaverzUserMobileNumber", $("#userMobileNumber").val(), 90), setCookie("timesaverzUserEmailAddress", $("#userEmailAddress").val(), 90), setCookie("timesaverzUserFullName", $("#userFullName").val(), 90), setCookie("timesaverzUserAddress", $("#userAddress").val(), 90), setCookie("timesaverzUserLoggedIn", "true", 90), $("#loggedInFlag").val("1"), t = !0, $("input[id='payNow']").prop("checked", !0), $(".newUserDetails").css("display", "none"), $(".oldUserDetails").css("display", "none"), $("#userMobileNumber").attr("readonly", "readonly")) : "invalidOTP" == o.status ? (e.stopPropagation(), t = !1, i = "Sorry! It seems the OTP you provided is incorrect. Please try again.") : (e.stopPropagation(), t = !1, i = "Sorry! We could not fetch your account details at the moment.")
            }
        }) : (e.stopPropagation(), t = !1, i = "Please provide all details to continue.") : (e.stopPropagation(), t = !1, i = "Please provide mobile number to continue."), ga("send", "event", "Step 2", "Completed")) : (t = !0, ga("send", "event", "Step 2", "Completed"))) : "4" == a && (t = !0);
        if (1 == t) {
            var s = $(this).attr("data-target");
            $(s).addClass("in"), $(".stepContent").removeClass("in"), $("html,body").animate({
                scrollTop: $(s).offset().top - 200
            }, 200)
        } else alert(i)
    });
    var s = (getCookie("timesaverzUserPinCode"), $("#cityID").val());
    "" != s ? (setCookie("timesaverzUserCity", s, 90), $("#topMenuCity").val(s), $("#topMenuCityMobile").val(s)) : (setCookie("timesaverzUserCity", "1", 90), $("#topMenuCity").val("1"), $("#topMenuCityMobile").val("1"));
    var l = getCookie("timesaverzUserAddress");
    $("#userAddress").val(l), $("#userMobileNumber").val(getCookie("timesaverzUserMobileNumber")), "" != getCookie("timesaverzUserMobileNumber") && ($("#loggedInFlag").val("1"), $("#cmdContinueStep3").css("display", "block"));
    var n = $("#preselectedCategoryID").val();
    if ("0" != n) {
        $("#service" + n).prop("checked", !0), $("#service" + n).addClass("active");
        var c = $("#totalServicesSelected").val();
        c++, $("#totalServicesSelected").val(c), loadSubcategories(n);
        var d = $("#cartCounter").val();
        d++, $("#cartCounter").val(d);
        var u = $("#finalCartCounter").val();
        u++, $("#finalCartCounter").val(u);
        var p = '<div id="finalCartService' + d + '"><input type="hidden" id="variableID' + n + '" name="variableID' + d + '" class="variableID"><input type="hidden" id="workerID' + n + '" class="finalCartJobWorker" value="0" name="workerID' + d + '"><input type="hidden" id="workerType' + n + '" class="finalCartJobWorkerType" value="TSZ" name="workerType' + d + '"><input type="hidden" id="totalCost' + n + '" name="totalCost' + d + '"><input type="hidden" id="discountReceived' + n + '" name="discountReceived' + d + '"><input type="hidden" id="jobDate' + n + '" class="finalCartJobDate" name="jobDate' + d + '"><input type="hidden" id="jobTime' + n + '" value="1" class="finalCartJobTime" name="jobTime' + d + '"><input type="hidden" id="isRepeatService' + n + '" value="false" name="isRepeatService' + d + '"><input type="hidden" id="couponID' + n + '" value="0" name="couponID' + d + '"><input type="hidden" id="jobQuantity' + n + '" value="1" name="jobQuantity' + d + '"><input type="hidden" id="jobStatus' + n + '" class="finalCartJobStatus" value="pending" name="jobStatus' + d + '"><input type="hidden" id="jobIsCombo' + n + '" value="0" name="jobIsCombo' + d + '"><input type="hidden" id="jobComboID' + n + '" value="0" name="jobComboID' + d + '"></div>';
        $("#finalCart").append(p)
    }
    $(document).on("click", ".expandToViewMore", function() {
        "Show More" == $(".expandToViewMore").html() ? ($(".limitedOffersView").css("height", "100%"), $(".expandToViewMore").html("Show Less")) : "Show Less" == $(".expandToViewMore").html() && ($(".limitedOffersView").css("height", "65px"), $(".expandToViewMore").html("Show More"))
    });
    var v = getCookie("selectionPopupShown");
    "true" != v && setCookie("selectionPopupShown", "true", 90)
});