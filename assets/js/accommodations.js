// required bootstrap.js, moment.js, jquery

var $gallery = new Array;
var $galleryRoom = new Array;
var urls = ["booking.hotelgest.com"];
if (urls.indexOf(window.location.hostname) >= 0) {
    var path = 'https://api.hotelgest.com/v1/';
    var baseurl = '/v3';
} else if ( typeof hg_params === "undefined" ) {
    var path = 'https://sandboxapi.hotelgest.com/v1/';
    var baseurl = '/booking/v3';
}else{
    var path = 'https://api.hotelgest.com/v1/';
    var baseurl = hg_params.baseurl;
}

var $date_in_val = '';
var $date_out_val = '';
var $booking_occupancy = 1;
var formatDate = 'DD-MM-YYYY';
try {
  var $pcode = hg_params.pcode;
}
catch(err) {
  var $pcode = 114;
}
var $currency = 'eur';
var $firstLoad = true;
var $debug = true;
var $dataProperty = {};
var $dataRoom = {};
var $dataRoomItem = {};
var $dataItem = {};
var $dataCart = [];
var $DescriptRoom = {};
var $listRoom = {};
var listPackObj = {};
var listPackCodeObj = {};
var $objectInfoRoom = {};
var $objectInfoPack = {};
var $minPricePack = {};
var $minPricePackRoom = {};
var policytextList = {};
var readmoreList = [];
var paymentType = {};
var discountObj = {};
var $currencyObj = [];
var $promoCode = false;
var isPremium = false;
// langaujes
var language = '';
var translator;
window.currencySymbol = "€";
window.priceDecimalPlaces = 2;
window.currencySymbolShowAfter = 1;

function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
}


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-26990615-2', 'auto');
ga('send', 'pageview');
function wbParseQueryString() {
    var str = window.location.search;
    var objURL = {};
    str.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                objURL[ $1 ] = $3;
            }
    );
    return objURL;
}

query = wbParseQueryString();
if (typeof query.pcode !== "undefined")
    $pcode = query.pcode;


if ( typeof hg_params === "undefined" ){
    if (typeof query.rtcode !== "undefined") {
        $rcode = query.rtcode;
    }
}else{
    var $rcode = hg_params.rtcode;
    if (typeof query.rtcode !== "undefined" && typeof  $rcode === "undefined") {
        $rcode = query.rtcode;
    }
}

try {
   $lang = hg_params.lang;
}
catch(err) {
    if (typeof query.lang !== "undefined") {
        $lang = query.lang;
    } else {
        $lang = false
    }
}
if (typeof query.css !== "undefined") {
    var $css = query.css;
} else {
    var $css = '';
}
/*if (typeof query.pack !== "undefined") {
    var $packSelected = query.pack;
} else {
    var $packSelected = 0;
}*/
var $packSelected = 0;
if ( typeof hg_params === "undefined" ){
    if (typeof query.pack !== "undefined") {
        $packSelected = query.pack;
    }
}else{
  $packSelected = hg_params.pack;
  if (typeof query.pack !== "undefined" && $packSelected == 0 ) {
    $packSelected = query.pack;
  }
}
/*
if (typeof query.onlyPack !== "undefined") {
    var $onlyPack = 1;
} else {
    var $onlyPack = 0;
}*/
var $onlyPack = 0;
if ( typeof hg_params === "undefined" ){
    if (typeof query.onlyPack !== "undefined") {
        $onlyPack = query.onlyPack;
    }
}else{
  $onlyPack = hg_params.onlyPack;
  if (typeof query.onlyPack !== "undefined" && $onlyPack == 0 ) {
    $onlyPack = query.pack;
  }
}

var fbAnalytics = false;
if (typeof hg_params !== "undefined" &&  typeof hg_params.fbAnalytics !== "undefined")
    fbAnalytics = hg_params.fbAnalytics;
else if (typeof query.fbAnalytics !== "undefined")
    fbAnalytics = query.fbAnalytics;
if ( fbAnalytics ) {
    !function (f, b, e, v, n, t, s)
    {
        if (f.fbq)
            return;
        n = f.fbq = function () {
            n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq)
            f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', fbAnalytics);
    fbq('track', 'PageView');
}

var analytics = false;
if ( typeof hg_params !== "undefined" && typeof hg_params.analytics !== "undefined")
    analytics = hg_params.analytics;
else if (typeof query.analytics !== "undefined")
    analytics = query.analytics;
if ( analytics ) {
    ga('create', analytics, 'auto', 'clientTracker');
    ga('clientTracker.send', 'pageview');
}

(function ($) {
    if (typeof query.occupancy !== "undefined") {
        $.removeCookie("booking_occupancy");
        $booking_occupancy = query.occupancy;
        $('.booking-occupancy').val($booking_occupancy);
    }
    if (typeof query.promocode !== "undefined") {
        $('#promoCode').val( query.promocode );
        $('#promoCodeMobile').val( query.promocode );
    }
    if (typeof query.tpv !== "undefined") {
        if( query.tpv =='ok'){
            $('#modalFinish .reference').html( query.rscode );
            $('#modalFinish').modal('show');
        }
        if( query.tpv =='ko' ){

        }
    }

    //translate
    $('.not-available').html(mainlang["not_available"]);

    var checkin_input = $('#fromDate'); // $('#fromDate');
    var checkout_input = $('#toDate'); //$('#toDate');
    var occupancy_input = $('.booking-occupancy'); //$('#toDate');

    $(document).ready(function () {

        accommodations.browserLanguage(0, $lang);
        if (typeof query.dto !== "undefined" && typeof query.dfrom !== "undefined") {
//alert(query.dto + '' + query.dfrom);
            $('#fromDate').val(query.dfrom);
            $('#toDate').val(query.dto);
            urlmoment  = ( typeof hg_params === "undefined" ) ? "/lang/moment/" : "assets/js/i18n/moment/" ;
            $.getScript( baseurl + urlmoment + language.toLowerCase() + ".js",
                    function (result) {
                        var fromdayT = moment(query.dfrom, formatDate);
                        var todayT = moment(query.dto, formatDate);
                        //alert(  fromdayT.format("D MMM YYYY") + " - " + todayT.format("D MMM YYYY")  );
                        $('#DateRangHotel').val(fromdayT.format("D MMM YYYY") + " - " + todayT.format("D MMM YYYY"));
                        moment.defineLocale(language.toLowerCase(), null);
                    }
            );
            accommodations.bindDate();
        } else if ($.cookie('date_in') != null && $.cookie('date_out') != null) {
            $date_in_val = $.cookie('date_in'); //.format(formatDate);
            $date_out_val = $.cookie('date_out'); //.format(formatDate);

            //checkin_input.val($date_in_val);
            //checkout_input.val($date_out_val);
            accommodations.bindDate();
        }

        if ($.cookie('booking_occupancy') != null) {
            $booking_occupancy = $.cookie('booking_occupancy'); //.format(formatDate);
            occupancy_input.val($booking_occupancy); //.attr('value', date_out);
        }


        if (typeof query.currency !== "undefined") {
            $currency = query.currency;
        }
//prepare date for chrome
        $("input#fromDateMobile").on("change", function () {
            $('#fromDate').val(moment($(this).val(), "YYYY-MM-DD").format(formatDate));
            accommodations.bindDate();
            accommodations.roomAjax($pcode);
        });
        $("input#toDateMobile").on("change", function () {
            $('#toDate').val(moment($(this).val(), "YYYY-MM-DD").format(formatDate));
            accommodations.bindDate();
            accommodations.roomAjax($pcode);
        });

        $('#promoCodeMobile').on('input', function() { $('#promoCode').val( $('#promoCodeMobile').val() );  });
        $("#promoCode").on('input', function() { $('#promoCodeMobile').val( $('#promoCode').val() );   });

        $( ".booking-occupancy" ).change(function() {
            $('.booking-occupancy').val( $(this).val() );
            $('#btn-search-main').trigger("click");
      	});
        $("#btn-search-main,#btn-search").on("click", function () {
            $firstLoad = false;
            var date_in_val = checkin_input.val();
            var date_out_val = checkout_input.val();
            var booking_occupancy_val = $booking_occupancy =  $('.booking-occupancy').val();//occupancy_input.val();
            var d1a = new Date(date_in_val);
            var d2a = new Date(date_out_val);
            var d1b = new Date(window.fromDate);
            var d2b = new Date(window.toDate);
            $('#loading-container1').addClass('loading-container');
            $('#loading-container2').addClass('loading');
            if ($.cookie("dataCart") === '' || $.cookie("dataCart") === 'null' || typeof $.cookie("dataCart") === 'undefined') {
                $booking_occupancy = booking_occupancy_val;
                $.removeCookie("date_in");
                $.removeCookie("date_out");
                $.removeCookie("booking_occupancy");
                $.cookie('date_in', date_in_val, {expires: 7, path: '/'});
                $.cookie('date_out', date_out_val, {expires: 7, path: '/'});
                $.cookie('booking_occupancy', booking_occupancy_val, {expires: 7, path: '/'});
                accommodations.bindDate();
                accommodations.roomAjax($pcode);
            } else {
                /* alert($.cookie("dataCart") + '' + checkin_input.val() + '-' + d1a.getTime() + '===' + d1b.getTime() + '-' + window.fromDate + '<br>' +
                 checkout_input.val() + '-' + d1a.getTime() + '===' + d1b.getTime() + '-' + window.toDate
                 );*/
                if (d1a.getTime() != d1b.getTime() && d1a.getTime() != d1b.getTime()) {
                    confirm(translator.get('If you change the dates, all your rooms will be removed. Are you sure?'), false, translator.get('Accept'), translator.get('Close'), function (result) {
                        if (result) {
                            $booking_occupancy = booking_occupancy_val;
                            $.removeCookie("date_in");
                            $.removeCookie("date_out");
                            $.removeCookie("booking_occupancy");
                            $.cookie('date_in', date_in_val, {expires: 7, path: '/'});
                            $.cookie('date_out', date_out_val, {expires: 7, path: '/'});
                            $.cookie('booking_occupancy', booking_occupancy_val, {expires: 7, path: '/'});
                            //alert(typeof result + '---' + result);
                            accommodations.bindCleanCart();
                            accommodations.bindDate();
                            accommodations.roomAjax($pcode);
                        }
                    });
                } else {
                    accommodations.bindDate();
                    accommodations.roomAjax($pcode);
                }
            }
        });
        /* $('#fromDate,#toDate').daterangepicker({
         autoApply: true,
         "minDate": moment().format("DD/MM/YYYY"),
         autoUpdateInput: false,
         locale: {
         format: formatDate, cancelLabel: 'Clear'
         }
         });
         $('#fromDate,#toDate').on('apply.daterangepicker', function (ev, picker) {
         $('#fromDate').val(picker.startDate.format(formatDate));
         $('#toDate').val(picker.endDate.format(formatDate));
         $('#fromDateMobile').val(picker.endDate.format('YYYY-MM-DD'));
         $('#toDateMobile').val(picker.endDate.format('YYYY-MM-DD'));
         accommodations.bindDate();
         accommodations.roomAjax($pcode);
         });*/
        accommodations.init();
        accommodations.initCurrency();
        accommodations.browserLanguage($pcode, $lang);
        accommodations.cssIframe($pcode);
        accommodations.bindDate();
        accommodations.addBooking();
        var datepicker_params = {
            "ajax_url": "\/mediterraneo\/wp-admin\/admin-ajax.php",
            "htl_ajax_url": "\/mediterraneo\/?htl-ajax=get_checkin_dates",
            "start_of_week": "monday",
            "start_date": "2017-09-07",
            "end_date": "",
            "min_nights": "1",
            "max_nights": "0",
            "datepicker_format": "D MMM YYYY", "disabled_dates": [], "month_names_short": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "enable_checkout": "1",
            "i18n": {"selected": "Your stay:", "night": "Night", "nights": "Nights", "button": "Close", "day-names": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "month-names": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "error-more": "Date range should not be more than 1 night", "error-more-plural": "Date range should not be more than %d nights", "error-less": "Date range should not be less than 1 night", "error-less-plural": "Date range should not be less than %d nights", "info-more": "Please select a date range longer than 1 night", "info-more-plural": "Please select a date range longer than %d nights", "info-range": "Please select a date range between %d and %d nights", "info-default": "Please select a date range"}
        };
        var datepicker_format = "D MMM YYYY";
        var i18nRangHotel;
        i18nRangHotel = dictRangHotel[language];


        $("#DateRangHotel, #DateRangHotelMobile").attr('placeholder', translator.get("Select date"));
        var date_select_input = $('#DateRangHotel, #DateRangHotelMobile');
        var checkin_input = $('#fromDate');
        var checkout_input = $('#toDate');
        //default
        if (date_select_input.val() == '') {
            date_select_input.val(moment().format("D MMM YYYY") + " - " + moment().add(1, 'days').format("D MMM YYYY"));
        }
        var datepickerhg = new HotelDatepicker(document.getElementById('DateRangHotel'), {
            infoFormat: datepicker_format,
            i18n: i18nRangHotel,
            startOfWeek: 'monday',
            getValue: function () {
                if (checkin_input.attr('hdin') && checkout_input.attr('hdout')) {
                    //alert( moment(checkin_input.val(),'DD/MM/YYYY').format("MM/DD/YYYY")  );
                    return checkin_input.attr('hdin') + " - " + checkout_input.attr('hdout');
                }
                return;
            },
            setValue: function (s, s1, s2) {
                var checkin_date = new Date(s1.replace(/-/g, "/"));
                var checkout_date = new Date(s2.replace(/-/g, "/"));
                //var checkin_date_formatted = fecha.format(checkin_date, datepicker_format);
                //var checkout_date_formatted = fecha.format(checkout_date, datepicker_format);
                var checkin_date_formatted = moment(checkin_date, datepicker_format);
                var checkout_date_formatted = moment(checkout_date, datepicker_format);
                var chckin_d_format = fecha.format(checkin_date, 'DD-MM-YYYY');
                var chckout_d_format = fecha.format(checkout_date, 'DD-MM-YYYY');
                ;
                date_select_input.val(checkin_date_formatted.format("D MMM YYYY") + " - " + checkout_date_formatted.format("D MMM YYYY"));
                // date_select_input.val(checkin_date_formatted + " - " + checkout_date_formatted);
                checkin_input.val(chckin_d_format).attr('hdin', s1);
                checkout_input.val(chckout_d_format).attr('hdout', s2);
                $('#btn-search-main').trigger("click");
            }
        });
        var datepickerhg2 = new HotelDatepicker(document.getElementById('DateRangHotelMobile'), {
            infoFormat: datepicker_format,
            i18n: i18nRangHotel,
            startOfWeek: 'monday',
            getValue: function () {
                if (checkin_input.attr('hdin') && checkout_input.attr('hdout')) {
                    //alert( moment(checkin_input.val(),'DD/MM/YYYY').format("MM/DD/YYYY")  );
                    return checkin_input.attr('hdin') + " - " + checkout_input.attr('hdout');
                }
                return;
            },
            setValue: function (s, s1, s2) {
                var checkin_date = new Date(s1.replace(/-/g, "/"));
                var checkout_date = new Date(s2.replace(/-/g, "/"));
                var checkin_date_formatted = moment(checkin_date, datepicker_format);
                var checkout_date_formatted = moment(checkout_date, datepicker_format);
                var chckin_d_format = fecha.format(checkin_date, 'DD-MM-YYYY');
                var chckout_d_format = fecha.format(checkout_date, 'DD-MM-YYYY');
                date_select_input.val(checkin_date_formatted.format("D MMM YYYY") + " - " + checkout_date_formatted.format("D MMM YYYY"));
                checkin_input.val(chckin_d_format).attr('hdin', s1);
                checkout_input.val(chckout_d_format).attr('hdout', s2);
                $('#btn-search-main').trigger("click");
            }
        });
    });
    var accommodations = {
        init: function ($pcode) {

            window.bookingRequest = {};
            window.bookingRequest.extraItems = {};
            window.bookingRequest.roomCount = 1;
            window.bookingRequest.adults = 1;
            window.bookingRequest.children = 0;
            window.bookingRequest.extraItemsTotalPrice = 0;
            window.bookingRequest.totalPrice = 0;
            window.bookingRequest.totalAccommodationOnlyPrice = 0;
            window.bookingRequest.totalDays = 1;
            window.accommodationIsReservationOnly = 0; //jose

            /* borrar
             accommodations.bindGallery();*/

            if (window.accommodationDisabledRoomTypes) {
                accommodations.populateAvailableDays(window.accommodationId, window.bookingRequest.roomTypeId);
                accommodations.populateAvailableStartDays(window.accommodationId, window.bookingRequest.roomTypeId, accommodations.bindCalendar);
            } else {
                accommodations.bindSelectDatesButtons();
            }

            //ininiamos el boton booking
            $('#confirmBookingForm').validator('update');
            $('#confirmBookingForm').validator('validate');
            $('input#booking-customer-email').on('input', function (e) {
                $('span.email').html($(this).val());
            });
            /* $("#btn-search-main").unbind('click').click(function (e) {
             if ($('#discount-code').val() != 'undefined') {
             accommodations.discountCode($('#discount-code').val());
             }
             });*/
            if (typeof query.discountCode !== "undefined")
                accommodations.discountCode(query.discountCode);
            accommodations.bindCurrency();
        },
        discountCode: function (code) {
            discountObj = {'type': 1, 'value': 10};
            $.cookie('discountCode', discountObj, {expires: 1, path: '/'});
        },
        browserLanguage: function (pcode, $lang) {
            var languaguesArray = ['', 'fr', 'en', 'es', 'ca', 'eu', 'de'];
            if ($lang) {
                if ($.inArray($lang, languaguesArray) !== -1) {
                    language = $lang;
                } else {
                    language = 'en';
                }

            } else {
                lang = navigator.language;
                $lang = lang.split("-")[0];

                if ($.inArray($lang, languaguesArray) == -1) {
                    language = 'en';
                } else {
                    language = $lang;
                }

            }
            $.datepicker.setDefaults($.datepicker.regional[ language ]);
            $.ajax({
                type: 'GET',
                url: path + '/property/' + $pcode + '/customPolicyLang/', // + $rcode,
                dataType: 'json',
                /* async: false,*/
                success: function (data) {
                    $.each(data, function (i, item) {
                        var namepolicyC = "policy_" + i;
                        dict[namepolicyC] = item.name;
                    });
                },
                complete: function () {
                    //alert('fin');
                }
            });

            moment.locale(language);
            translator = $('body').translate({lang: language, t: dict});

            if (pcode != 0) {
                accommodations.initPropertyLang(pcode);
            }

            $('#GroupSelectLang button').text($('#GroupSelectLang .dropdown-item[data-lang="' + language + '"]').text());
            //alert( '#GroupSelectLang .dropdown-item[data-lang="'+language+'"]'+$('#GroupSelectLang .dropdown-item[data-lang="'+language+'"]').text());

            //var mainlang = mainlang[language];
        },
        initPropertyLang: function ($pcode) {

            $('.select_lang option[data-lang="' + language + '"]').attr('selected', 'selected');
            accommodations.placeholderTranslate();
            accommodations.infoProperty($pcode);
            accommodations.roomAjax($pcode);
            $("#GroupSelectLang a").each(function (index) {
                $(this).prop('href', '?' + accommodations.insertParam('lang', $(this).data('lang')));
            });
        },
        insertParam: function (key, value) {
            key = encodeURI(key);
            value = encodeURI(value);
            var kvp = document.location.search.substr(1).split('&');
            var i = kvp.length;
            var x;
            while (i--)
            {
                x = kvp[i].split('=');
                if (x[0] == key)
                {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }

            //this will reload the page, it's likely better to store this until finished
            document.location.search = kvp.join('&');
        },
        cssIframe: function () {
            $.ajax({
                type: 'GET',
                url: path + 'webpage/item?pcode=' + $pcode + '&key=cssiframe' + $css, // + $rcode,
                dataType: 'json',
                success: function (data) {
                    $('<style type="text/css">\n' + data + '</style>').appendTo("head");
                },
                complete: function () {
                    //alert('fin');
                }
            });
        },
        initCurrency: function () {

            $.ajax({
                type: 'GET',
                url: path.replace("v1", "") + 'static/forest.json', // + $rcode,
                dataType: 'json',
                async: true,
                success: function (data) {

                    accommodations.bindCurrency();
                },
                complete: function () {
                    //alert('fin');
                }
            });
        },
        bindCurrency: function () {

            if ($.cookie('currency') != null) {
                $currency = $.cookie('currency');
            }

            $('#GroupSelectMoney button').text($('#GroupSelectMoney .dropdown-item[data-currency="' + $currency + '"]').text());
            /* $("#GroupSelectMoney a").each(function (index) {
             $(this).prop('href', '?' + accommodations.insertParam('currency', $(this).data('currency')));
             });*/

            $(".btn-booking").unbind('click').click(function (e) {

            });
        },
        reloadBindDate: function () {
            var date_in_val = checkin_input.val();
            var date_out_val = checkout_input.val();
            var booking_occupancy_val = occupancy_input.val();
            // alert('5.->   ' +date_in_val +'    '+date_out_val);
            $.removeCookie("date_in");
            $.removeCookie("date_out");
            $.removeCookie("booking_occupancy");
            $.cookie('date_in', date_in_val, {expires: 7, path: '/'});
            $.cookie('date_out', date_out_val, {expires: 7, path: '/'});
            $.cookie('booking_occupancy', booking_occupancy_val, {expires: 7, path: '/'});
            accommodations.bindDate();
            if (typeof ($rtcode) !== 'undefined') {
                accommodations.roomAjax($pcode, $rtcode);
                accommodations.roomEmbed();
            }

            /*  calendar */
            window.roomTypeId = $rtcode;
            setTimeout(function () {
                accommodations.populateAvailableStartDays($pcode, $rtcode, accommodations.bindCalendar);
            }, 1000);
        },
        bindPromoCode: function () {
            promocode = $('#promoCode').val();
            if (promocode != '') {
                $promoCode = promocode;
                accommodations.checkPromoCodeAjax( promocode );
            }else{
               $promoCode =  false;
            }
        },
        checkPromoCodeAjax: function (code) {
            //$.cookie("bindPromoCode", [], {path: '/'});
             $.ajax({
                type: 'GET',
                url: path + 'price/promocode?pcode=' + $pcode + '&code=' + code, // + $rcode,
                dataType: 'json',
                success: function (data) {
                    if( Object.prototype.toString.call( data ) === '[object Array]' ) {
                        $('#promoCode, #promoCodeMobile').addClass('btn-danger');
                        toastr.error(translator.get("Wrong promotion code"));
                    }else{
                        $('#promoCode, #promoCodeMobile').removeClass('btn-danger');
                        toastr.success(translator.get("Promotion code applied"));
                    }
                }
            });
        },
        bindDate: function () {
           //load promo code con la fecha
           accommodations.bindPromoCode();

            // date
            if (moment($('#fromDate').val(), formatDate).isValid()) {
                var fromday = moment($('#fromDate').val(), formatDate);
                var today = moment($('#toDate').val(), formatDate);
                window.fromDate = fromday.format("YYYY-MM-DD");
                window.toDate = today.format("YYYY-MM-DD");
                var today = new Date(fromday);
                //lastday.setMonth(lastday.getMonth() + 1);
                var from_mm = today.getMonth() + 1; //January is 0!
                var from_yyyy = today.getFullYear();
                var lastday = new Date(today);
                lastday.setMonth(lastday.getMonth() + 1);
                var to_mm = lastday.getMonth() + 1;
                var to_yyyy = lastday.getFullYear();
                var to_dd = new Date(to_yyyy, to_mm, 0);
                to_dd = to_dd.getDate();
                //total Days
                $date_arrival = new Date(window.fromDate);
                $date_departure = new Date(window.toDate);
                //$date_departure.setDate($date_departure.getDate() - 1);
            } else {
                var fromday = new Date();
                fromday.setDate(fromday.getDate());
                var today = new Date();
                today.setDate(today.getDate() + 1);
                window.fromDate = moment(fromday).format("YYYY-MM-DD");
                window.toDate = moment(today).format("YYYY-MM-DD");
                var today = new Date();
                var from_mm = today.getMonth() + 1; //January is 0!
                var from_yyyy = today.getFullYear();
                var lastday = new Date(today);
                lastday.setMonth(lastday.getMonth() + 1);
                var to_mm = lastday.getMonth() + 1;
                var to_yyyy = lastday.getFullYear();
                var to_dd = new Date(to_yyyy, to_mm, 0);
                to_dd = to_dd.getDate();
                $date_arrival = new Date(window.fromDate);
                $date_departure = new Date(window.toDate);
            }
            window.now = moment();
            window.untilDays = moment($date_arrival).diff(window.now, 'days') + 1;
            window.totalDays = accommodations.calculateDifferenceInDays(accommodations.convertLocalToUTC($date_arrival), accommodations.convertLocalToUTC($date_departure));
            window.calendarfromDate = from_yyyy + '-' + from_mm + '-' + '01';
            window.calendartoDate = to_yyyy + '-' + to_mm + '-' + to_dd

        },
        infoProperty: function ($pcode) {
            $.ajax({
                type: 'GET',
                url: path + 'property/' + $pcode,
                dataType: 'json',
                success: function (data) {
                    $dataProperty = data;
                    //title page
                    window.currencySymbol = data.currency;
                    if ( typeof hg_params === "undefined" ){
                      document.title = 'Booking ' + data.name;
                      $('.page-header h1').html(data.name);
                      $('.hotel-details h5').html(data.name);
                    }
                    if (data.phone) {

                    }
                    if (data.max_occupancy) {
                        $('.booking-occupancy').html('');
                        $booking_occupancy = ( $booking_occupancy <= data.min_occupancy )? data.min_occupancy : $booking_occupancy ;
                        for (i = data.min_occupancy; i <= data.max_occupancy; i++) {
                            $('.booking-occupancy').append($('<option>', {
                                value: i,
                                text: i
                            }));
                        }
                    }
                    if (data.phone) {
                        $('[ng-show="property.phone_number"] .ng-binding').html(data.phone);
                        $('[ng-show="property.phone_number"] .ng-binding').prop("href",'tel: '+data.phone );
                    } else {
                        $('[ng-show="property.phone_number"]').hide();
                    }
                    if (data.phone2) {
                        $('[ng-show="property.phone_number2"] .ng-binding').html(data.phone2);
                    } else {
                        $('[ng-show="property.phone_number2"]').hide();
                    }
                    if (data.address) {
                        var url_address = data.address + ", " + data.num + ", " + data.province + " (" + data.name + ")";
                        //alert(encodeURIComponent(url_address));
                        $('[ng-show="property.address_line_1 || property.address_line_2"] a').prop('href', "http://maps.google.com/?q=" + encodeURIComponent(url_address));
                        $('[ng-show="property.address_line_1 || property.address_line_2"] .ng-binding').html(data.address + ', ' + data.num + ', ' + data.province);
                    } else {
                        $('[ng-show="property.address_line_1 || property.address_line_2"]').hide();
                    }
                    if (data.email) {
                        $('[ng-show="property.enquiry_email"] .ng-binding').html(data.email);
                        $('[ng-show="property.enquiry_email"] .ng-binding').attr('href', 'mailto:' + data.email);
                    } else {
                        $('[ng-show="property.enquiry_email"]').hide();
                    }
                    if (data.webpage) {
                        $('[ng-show="property.home_page_link"] .ng-binding').prop('href', 'http://' + data.webpage);
                    } else {
                        $('[ng-show="property.home_page_link"]').hide();
                    }
                    if (data.tax_excluded == 1) {
                        $('.tax_excluded').show();
                        $('.tax_excluded .tax').text(data.tax);
                    } else {
                        $('.tax_included').show();
                    }
                    //logo
                    var imageUrl = 'https://panel.hotelgest.com/files/logo/' + data.logo ;
                    imageExists(imageUrl, function (exists) {
                        if (exists) {
                            $('.page-header h1').html('<img id="logo-img" src="' + imageUrl + '">');
                        }
                    });
                    if (data.gallery) {
                        //create object images
                        $.each(data.gallery, function (index, value) {
                            $gallery.push(value);
                        });
                        //create display gallery
                        accommodations.displayGallery();
                    }
                    if (data.description) {
                        //alert( JSON.stringify( data.description[language] ) );
                        var readmore = accommodations.readmore(data.description[language]);
                        $(".content-results .content-room")
                                .prepend('<div class="col-sm-12 description">' + readmore + '</div></div>');
                    }
                    if (data.payment) {
                        var paymentBookingEngine = accommodations.readmore(data.payment[language]);
                        $(".payment_booking_engine").show().html(paymentBookingEngine);
                    }
                    if (data.additional_information) {
                        var additional_information = accommodations.readmore(data.additional_information[language]);
                        $("#additional_info").html(additional_information);
                    }
                    if (data.legalSignature) {
                        var legalSignature = accommodations.readmore(data.legalSignature[language]);
                        $("#lopd").html(legalSignature);
                    }
                    if (data.products) {
                        accommodations.bindProduct(data.products);
                    }
                    if (data.paymentType) {
                        paymentType = data.paymentType;
                    }
                    if (data.premium == 1) {
                        isPremium = true;
                    } else {
                        isPremium = false;
                    }
                    accommodations.bindPremium();
                    //hidden
                    $('[ng-show="site_setting.show_abn_field & amp; & amp; property.abn"]').hide();
                }
            });
        },
        bindPayment: function () {

            if ($debug) {
                console.log('----------  bindPayment  ----------');
                console.log(paymentType);
                console.log($dataCart);
            }
            //try {
            var payment_in = false;
            var total_tpv = 0;
            $.each($dataCart, function (index, value) {
                pId = value.policyId;
                try {
                  if (paymentType.policyId.indexOf(pId) > -1) {

                      if (!Array.isArray(paymentType.data[pId])) {
                          paymentTypeArry = paymentType.data[pId];
                          paymentType.data[pId][0] = paymentTypeArry;
                      }

                      $.each(paymentType.data[pId], function (i, pay) {
                          if ( parseInt(pay.day) > parseInt(window.untilDays) ) {
                              payment_in = true;
                              var percentageValue = pay.Percentage / 100;
                              var percentage = pay.Percentage;
                              var cleanInclude = (typeof pay.cleanInclude !== 'undefined') ? pay.cleanInclude : 0;
                              var taxInclude = (typeof pay.taxInclude !== 'undefined') ? pay.taxInclude : 0;

                              total_tpv = total_tpv + (value.price * percentageValue);
                              if (cleanInclude == 1) {
                                  total_tpv = total_tpv + (value.roomclear * percentageValue);
                              }
                              if (taxInclude == 1) {
                                  var daytax = (window.totalDays > $dataProperty.tax_max_day) ? $dataProperty.tax_max_day : window.totalDays;
                                  if (daytax) {
                                      var taxprice_adult = ($dataProperty.tax_price_adult * value.occupancy) * daytax;
                                      total_tpv = total_tpv + taxprice_adult;
                                  }
                              }
                              console.log(' payment_in = true; total=' + total_tpv);
                              return false;
                          }
                      });

                      if ($debug) {
                          console.log('paymentType: ' + parseInt(paymentType.data[pId].day) + ' > ' + parseInt(window.untilDays));
                      }
                  }
                  if ($debug) {
                        console.log('----------');
                        console.log(JSON.stringify(paymentType.policyId) + '' + paymentType.policyId.indexOf(pId) + '_' + pId);
                  }
                } catch (err) {
                    console.log('no tpv');
                }
            });


            if (payment_in) {
                $('#noPayment').hide();
                $('#' + paymentType.type + 'Payment').show();
                $('#' + paymentType.type + 'Payment .price').html(accommodations.formatPrice(parseFloat(total_tpv)));

                //$.each(payObj, function (index, pay) {});
                //$('#noPayment').show();
                $('#noPayment input').each(function (index, pay) {
                    $(this).prop("required", false);
                });
                $('#confirmBookingForm').validator('update');
                $('#confirmBookingForm').validator('validate');
            } else {
                accommodations.resetPayment();
            }
            /* } catch (err) {
             accommodations.resetPayment();
             }*/


        },
        resetPayment: function () {

            $('#noPayment input').each(function (index, pay) {
                $(this).prop("required", true);
            });
            $('#confirmBookingForm').validator('update');
            $('#confirmBookingForm').validator('validate');
            $('#tpvPayment').hide();
            $('#noPayment').show();
        },
        bindPremium: function () {
            if (!isPremium) {
                accommodations.alert('This Booking Engine needs to be upgraded to enjoy this feature, comtact your account manager.', 'This account is not premium');
                $('#btn-AddBooking').text('this account is not premium ').attr('disabled', true);
            }

        },
        roomAjax: function ($pcode) {
            accommodations.resetRoom();
            accommodations.resetPack();
            listrcode = [];
            $.ajax({
                type: 'GET',
                url: path + 'property/' + $pcode + '/room',
                dataType: 'json',
                async: true,
                success: function (listroom) {
                    $.each(listroom, function (index, room) {

                        try {
                            room.name = room.name_lang[language];
                        } catch (err) {
                            console.log('no translate: ' + room.rcode);
                        }
                        listrcode.push(room.rcode);
                        $listRoom[room.rcode] = room;
                        //exist rcode url
                        var rgxp = new RegExp(room.rcode, "i");
                        if (typeof $rcode !== "undefined" && $rcode.search( rgxp ) ===  -1   ) {
                            return;
                        }
                        //if disabled room
                        if (room.iframe == 0) {
                            return;
                        }

                        var feacture = feactureReadmore = '';
                        if (room.featuresList) {
                            //alert($('.room-container[data-id="' + rcode + '"]').html()+ JSON.stringify( r.featuresList ) );
                            feacture = '<div class="nd_booking_section nd_booking_height_20"></div>'
                                    + ' <ul id="triple" class="list-inline clearfix">';
                            feactureReadmore = ' <ul id="triple" class="list-inline clearfix">';
                            var i = 0;
                            $.each(room.featuresList, function (index, feature) {
                                if (i < 5) {
                                    feacture += '   <li>' + translator.get(feature['es']) + '</li> ';
                                    //$('.roomitem[data-id="' + room.rcode + '"] .services ul').append('<li>' + translator.get(feature['es']) + '</li>');
                                    //$('.roomitem[data-id="' + room.rcode + '"] .services').show();
                                }
                                feactureReadmore += '   <li>' + translator.get(feature['es']) + '</li> ';
                                i = i + 1;
                            });
                            feactureReadmore += feacture += '</ul>';
                        }

                        if (room.description) {
                            if (room.description[language]) {
                                var readmore = accommodations.readmore(room.description[language], 250, feactureReadmore);
                            } else {
                                var readmore = $DescriptRoom[room.rcode] = '';
                            }
                        }

                        console.log(room);
                        if (room.description) {
                            if (room.description[language]) {
                                //alert( JSON.stringify( room.description[language] ) );
                                var readmore = accommodations.readmore(room.description[language], 250, feactureReadmore);
                                $DescriptRoom[room.rcode] = readmore;
                            }
                        }


                        $baseV3 = '<div class="row roomitem" data-id="' + room.rcode + '" >   '
                                + '     <div class="col-xs-12 col-sm-3 col-md-3 room-gallery">'
                                + '       <div id="myCarousel' + room.rcode + '" class="carousel slide" data-interval="false" >'

                                + '             <div class="carousel-inner" role="listbox"></div>'
                                + '             <a class="left carousel-control" href="#myCarousel' + room.rcode + '" role="button" data-slide="prev">'
                                + '                 <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
                                + '                 <span class="sr-only trn">Previous</span>'
                                + '             </a>'
                                + '             <a class="right carousel-control" href="#myCarousel' + room.rcode + '" role="button" data-slide="next">'
                                + '                 <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
                                + '                 <span class="sr-only trn">Next</span>'
                                + '             </a>'
                                + '         </div>'
                                + '         <a class="buttonGallery buttonGallery' + room.rcode + '" href="#"></a>'
                                + '     </div>'
                                + '     <div class="col-xs-12 col-sm-6 "><div class="rate-room">' + room.name + '</div> <hr>'
                                + '                  ' + room.occupancy + ' x <i class="fa fa-user"></i> ' + translator.get("Max") + ' ' + room.sqft + ' m<sup>2</sup>  <hr>'
                                + '             <div class="room-desc">' + readmore + '</div>'
                                + '             <div class="services">' + feacture + '</div>'
                                + '     </div>'
                                + '     <div class="col-xs-12 col-sm-3 btn-room-collapse">'
                                + '     <div class="col-xs-12 room-prices text-center"> '
                                + '         <span class="fromPrice">' + translator.get("From") + '<br> </span>' + '<div class="room-price ">' + '<br><i class="price-preloader">&nbsp;</i>' + '</div>'
                                + '         <p class="number-of-nights ng-scope hidden-xs"><span>' + translator.get("Price of") + '</span> ' + window.totalDays + ' <span class="trn">' + translator.get("nights") + '</span> </p>'
                                + '     </div> '
                                + '         <button type="button" style="display:none" class="btn btn-primary book-accommodation-select-dates available col-xs-12 mb20" data-toggle="collapse"  data-target="#viewRoomDetails' + room.rcode + '" aria-expanded="false" aria-controls="viewRoomDetails' + room.rcode + '"> ' + translator.get("Details & book") + '</button>'
                                + '         <button type="button" style="display:none" class="btn btn-primary book-accommodation-select-dates not-available trn col-xs-12 mb20" data-toggle="collapse"  data-target="#viewRoomDetails' + room.rcode + '" aria-expanded="false" aria-controls="viewRoomDetails' + room.rcode + '">+ ' + translator.get("Not available") +' '+ translator.get("& More info") + '</button>'
                                + '     </div>'
                                + '</div>'
                                + '<div class="collapse" id="viewRoomDetails' + room.rcode + '"></div>'
                                ;
                        // $('.content-room').appendTo($base);
                        $($baseV3).appendTo('#onlyRoom .content-room');
                        $dataRoom[room.rcode] = $listRoom[room.rcode] = room;
                        accommodations.roomPriceAjax(room.pcode, room.rcode, room.availability);
                        if (room.gallery) {
                            //create object images
                            var imageRoom = [];
                            $.each(room.gallery, function (index, value) {
                                imageRoom.push(value);
                            });
                            $galleryRoom[room.rcode] = imageRoom;
                            //create display gallery
                            accommodations.displayGalleryRoom(room.rcode);
                        }
                        //$dataRoom[room.rcode] = room;
                    });
                },
                complete: function () {
                    accommodations.init();
                    //accommodations.roomPriceAjax($pcode, listrcode.join(), 0);

                    //exist rcode url
                    if (typeof $rcode !== "undefined" && !Array.isArray($rcode) ) {
                        $('.roomitem[data-id=' + $rcode + ']').find('.book-accommodation-select-dates').trigger("click");
                        /*setTimeout(function () {
                         accommodations.bindAddCart();
                         }, 1000);*/
                    }
                }
            });
        },
        roomPriceAjax: function ($pcode, $rtcode, $availability) {
            var $fromDate = window.fromDate;
            var $toDate = window.toDate;
            promoCodeUrl = ( $promoCode )?  '&promoCode=' + $promoCode : ''   ;

            $.ajax({
                type: 'GET',
                url: path + 'price/room?pcode=' + $pcode + '&rcode=' + $rtcode + '&fromDate=' + $fromDate + '&toDate=' + $toDate+ promoCodeUrl, // + $rcode,
                dataType: 'json',
                //async: true,
                success: function (listroom) {

                    $('#tmplviewRoomDetails .room-details-listitem').html('');
                    $('#tmplroom-details-item .occupancy-child-adicional').remove();
                    //reset board
                    $('#tmplroom-details-item .details-board').html('');
                    //$('#tmplviewRoomDetails .room-details-listitem').html('');
                    /*if (listroom[0].availability) {
                     selector = ' <select class="form-control">';
                     for (i = 1; i <= listroom[0].availability; i++) {
                     selector += '<option value="' + i + '">' + i + '</option>';
                     }
                     selector += '</select>';
                     }*/

                    //new
                    console.log('>>>>> listroom' + $rtcode);
                    console.log(listroom);
                    var selector = '';
                    //$dataRoom[$rtcode] = {'is_availability': 0};
                    $dataRoom[$rtcode].is_availability = [$rtcode].is_availability = selector = listroom[0].availability;
                    //minstay and maxstay
                    //alert(selector+'-'+minstay+'-'+maxstay+'-'+window.totalDays);

                    var listRoomByPoliceArry = {};
                    var listRoomByPolice = {};
                    var $minprice = parseFloat(10000000000);
                    listroomTemp = listroom[0];
                    var minpriceKey = $rtcode + '-' + listroom[0].occupancy + '-' + listroom[0].board + '-' + listroom[0].policy;
                    $isExistRoom = false;
                    $.each(listroom, function (index, price) {

                        if (price.availability > 0) {
                            $listRoom[$rtcode].is_availability = selector = price.availability;
                        } else {
                            selector = 0;
                        }
                        //filter um person
                        if (parseInt(price.occupancy) >= parseInt($booking_occupancy) && ((!$isExistRoom) || (price.occupancy == $isExistRoom))) {
                            $isExistRoom = parseInt(price.occupancy);
                            // alert( 'true'+price.occupancy + '=>'+ price.price); alert( price.occupancy >= $booking_occupancy+' &&'+ ( (!$isExistRoom)  || (price.occupancy =  $isExistRoom ))  );
                        } else {
                            return true;
                        }

                        var minstay = price.minstay;
                        var maxstay = price.maxstay;
                        var _rateKey = $rtcode + '-' + price.occupancy + '-' + price.board + '-' + price.policy;
                        price.key = _rateKey;
                        price.price = parseFloat(price.price);
                        if ($minprice > price.price) {
                            $minprice = price.price;
                            minpriceKey = _rateKey
                        }
                        var pol = price.policy;
                        var lang = language;
                        var policytext = "";
                        //alert(JSON.stringify($dataRoom[$rcode]));
                        room = $dataRoom[$rtcode];


                        try {
                            policytextList[$rtcode + '-' + price.policy] = room.policy[pol][lang];
                            price.policytext = policytext = room.policy[pol][lang];
                            console.log('----------- policytextList -----------');
                            console.log(policytextList);
                            //policytext = JSON.stringify(room.policy[pol][lang]).replace(/"/g, "'");
                            ;
                        } catch (error) {
                            console.log('error: policytextList');
                            price.policytext = policytext = " ";
                        }

                        var priceDayText = '';
                        //console.log('----->>>>');console.log( Object.keys(price.ancillary).length );
                        if (Object.keys(price.ancillary).length > 1) {
                            $.each(price.ancillary, function (index, dayPrice) {
                                priceDayText += '<b>' + index + '</b>: ' + accommodations.formatPrice(parseFloat(dayPrice.price)) + '<br>';
                            });
                            price.priceDayInfo = '<button class="btn-link" type="button" data-container="body" data-toggle="popover" data-placement="top" data-content="' + priceDayText + '"><i class="fa fa-info"></i></button>';
                        } else {
                            price.priceDayInfo = '';
                        }
                        var descript = " " + translator.get("board_" + price.board) +
                                "<br> " + translator.get("policy_" + price.policy);
                        //  accommodations.alert('ddddddd', 'titulo');

                        listRoomByBoard = price;
                        listRoomByBoard.descript = translator.get("board_" + price.board);
                        // listRoomByBoard.policytext = policytext;

                        if ($.isEmptyObject(listRoomByPoliceArry[price.policy]))
                        {
                            listRoomByPoliceArry[price.policy] = {};
                        }
                        listRoomByPoliceArry[price.policy][price.board] = listRoomByBoard;
                        $dataRoomItem[_rateKey] = {
                            "key": _rateKey,
                            "title": $listRoom[$rtcode].name,
                            "descript": descript,
                            "roomclear": parseFloat($dataRoom[$rtcode].roomclear),
                            "price": price.price,
                            "policyId": price.policy,
                            "policytext": policytext,
                            "rtcode": $rtcode,
                            'men': price.men,
                            'children': price.children,
                            'occupancy': price.occupancy,
                            'board': price.board
                        };
                    });
//$('#logo-img').parent().html(  JSON.stringify(  listRoomByPoliceArry )  );
//console.log( 'listRoomByPolice'+listRoomByPoliceArry );
                    console.log(listRoomByPoliceArry);
                    var notAvail = true;
                    $.each(listRoomByPoliceArry, function (index, price) {
                        console.log('----------  pTemp  ----------');
                        priceTmp = price[Object.keys(price)[0]];

                        $('#tmplroom-details-item .web-rate-tag').html(translator.get("policy_" + index));
                        $('#tmplroom-details-item .hg-policy-descr-container .txt-more').html(accommodations.readmore(priceTmp.policytext, 250));
                        $.each(price, function (board, boardObj) {
                            console.log('----------  boardObj  ----------');
                            console.log(boardObj);
                            var minstay = boardObj.minstay;
                            var maxstay = boardObj.maxstay;
                            var selectQuantityOption = '';
                            if (boardObj.availability > 0) {
                                $listRoom[$rtcode].is_availability = selector = boardObj.availability;
                                selectQuantityOption = accommodations.quantityOptionHtml( selector );
                            } else {
                                selector = 0;
                            }
                            $('#tmplroom-details-board .nameboard .txt').html(boardObj.descript);
                            var $class = accommodations.icoBoard(board);
                            $('#tmplroom-details-board .nameboard .txt').html(boardObj.descript);
                            $('#tmplroom-details-board .nameboard .ico').addClass($class);
                            $('#tmplroom-details-board .price').html(accommodations.formatPrice(parseFloat(boardObj.price)));
                            $('#tmplroom-details-board .priceDayList').html(boardObj.priceDayInfo);
                            if (boardObj.discount < 0) {
                                $('#tmplroom-details-board .striked-price').html(accommodations.formatPrice(parseFloat(boardObj.price + (-1 * boardObj.discount)))).show();
                            } else {
                                $('#tmplroom-details-board .striked-price').text('').hide();
                            }

                            //buttos reset
                            $('#tmplroom-details-board .addcart').attr('data-id-cart', boardObj.key);
                            $('#tmplroom-details-board .not-available').hide();
                            $('#tmplroom-details-board .avalibility').text(selector);
                            $('#tmplroom-details-board #selectQuantity').hide();
                            $('#tmplroom-details-board #selectQuantity').html( selectQuantityOption );
                            $('#tmplroom-details-board .addcart').hide();
                            $('#tmplroom-details-board .minstay').hide();
                            $('#tmplroom-details-board .maxstay').hide();
                            $('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.available').hide();
                            $('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.not-available').hide();
                            if (selector == '') {
                                notAvail = ( notAvail )? true : false;
                                $('#tmplroom-details-board .not-available').show();
                                //$('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.not-available').show();
                            } else if (minstay > window.totalDays) { //restricciones Alert
                                notAvail = false;
                                //$('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.available').show();
                                $('#tmplroom-details-board .minstay').show();
                                $('#tmplroom-details-board .num-minstay').html(minstay);
                                $listRoom[$rtcode].is_availability = 0;
                                //$('[data-id="' + $rcode + '"] .rate-room').append( '<div class="restriction">'+translator.get("minstay")+' '+minstay+' '+translator.get("nights")+'</div>');
                            } else if (maxstay < window.totalDays) { //restricciones Alert
                                notAvail = false;
                                //$('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.available').show();
                                $('#tmplroom-details-board .maxstay').show();
                                $('#tmplroom-details-board .num-maxstay').html(maxstay);
                                $listRoom[$rtcode].is_availability = 0;
                                //$('[data-id="' + $rcode + '"] .rate-room').append( '<div class="restriction">'+translator.get("minstay")+' '+minstay+' '+translator.get("nights")+'</div>');
                            } else {
                                notAvail = false;
                                if (selector > 1 ) 
                                    $('#tmplroom-details-board #selectQuantity').show();
                                $('#tmplroom-details-board .addcart').show();
                                //$('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.available').show();
                            }

                            //mount board i policy
                            $('#tmplroom-details-item .details-board').append($('#tmplroom-details-board').html());
                            //remove ico
                            $('#tmplroom-details-board .nameboard .ico').removeClass($class);
                        });
                        //mount Policy in price details
                        $('#tmplviewRoomDetails .room-details-listitem').append('<div class="col-xs-12 policyblock">' + $('#tmplroom-details-item').html() + '</div>');
                        //reset board
                        $('#tmplroom-details-item .details-board').html('');
                    });
                    var bookingdiscount = '';
                    bookingdiscount = '<span class="price_comparison"></span>'; //booking.com, expedia.com

                    if( notAvail ){
                        $('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.not-available').show();
                    }else{
                        $('.roomitem[data-id="' + $rtcode + '"] .btn-room-collapse .book-accommodation-select-dates.available').show();
                    }

                    if ($minprice == parseFloat(10000000000)) {
                        noOccupancy = 'No disponible' + '<span class="errorOccupancy"> Para: ' + $booking_occupancy + ' ' + translator.get("Persons") + '</span>';
                        $('#onlyRoom [data-id="' + $rtcode + '"] .fromPrice').hide();
                        $('#onlyRoom [data-id="' + $rtcode + '"] .room-price').html(noOccupancy);
                    } else {
                        $('#onlyRoom [data-id="' + $rtcode + '"] .fromPrice').show();
                        $('#onlyRoom [data-id="' + $rtcode + '"] .room-price').html(accommodations.formatPrice(parseFloat($minprice)) + bookingdiscount);
                        $('#onlyRoom [data-id="' + $rtcode + '"] .room-price').attr('data-originalPrice', parseFloat($minprice));
                        $('#onlyRoom [data-id="' + $rtcode + '"] .room-price').attr('data-originalPriceKey', minpriceKey);
                        //alert($minprice);
                        //alert(minpriceKey);
                        var mpk = minpriceKey.split('-');
                        accommodations.bindchannel($pcode, mpk[0], mpk[1], mpk[2], mpk[3]);
                    }
                },
                complete: function () {

                    //cuando coincide el ultimo resgistro con la clave
                    /* if ($rtcode == $dataRoomItem[Object.keys($dataRoom)[Object.keys($dataRoom).length - 1]].rtcode) {
                     $('#loading-container1').removeClass('loading-container');
                     $('#loading-container2').removeClass('loading');
                     }*/


                    /* if ($DescriptRoom[$rcode]) {
                     $('#tmplviewRoomDetails .roomdetails .description').html($DescriptRoom[$rcode]);
                     } else {
                     $('#tmplviewRoomDetails .roomdetails .description').html('');
                     }*/
                    if ($onlyPack) {
                        $('#tmplviewRoomDetails').find('.roomdetails').hide();
                    }

                    $('#viewRoomDetails' + $rtcode).html($('#tmplviewRoomDetails').html());
                    var $pop = $('[data-toggle="popover"]');
                    $pop.popover({
                        html: 'true',
                        title: '<span class="text-info"><strong>&nbsp;</strong></span>' +
                                '<button type="button"  class="close closepopover" >&times;</button>'
                    }).on('shown.bs.popover', function (e) {
                        //console.log('shown triggered');
                        // 'aria-describedby' is the id of the current popover
                        var current_popover = '#' + $(e.target).attr('aria-describedby');
                        //alert(current_popover);
                        var $cur_pop = $(current_popover);
                        $cur_pop.find('.close').click(function () {
                            //console.log('close triggered');
                            $pop.popover('hide');
                        });
                    });
                    /* arrancamos aqui porque necessitamos el avail que calula roomPrice*/
                    accommodations.packPriceAjax($pcode, $rtcode, $availability);
                    accommodations.readmoreUpdate( );
                    accommodations.bindAddCart();
                }
            });
        },
        bindchannel: function (pcode, rtcode, person, board, policy) {
            var $fromDate = window.fromDate;
            var $toDate = window.toDate;

            var data = {
                'pcode': pcode,
                'rtcode': rtcode,
                'fromDate': $fromDate,
                'toDate': $toDate,
                'person': person,
                'board': board,
                'policy': policy
            };
            $.ajax({
                type: 'Post',
                url: path + 'price/getChannel', // + $rcode,
                method: 'post',
                data: data,
                dataType: 'json',
                success: function (listChannel) {
                    $.each(listChannel, function (index, value) {
                        var keych = person + '-' + board + '-' + policy;

                        //comprovamos que exista la tarifa
                        isExist = false;
                        //console.log('----------  getChannel  ----------');
                        //console.log(value);
                        $.each(value[keych].ancillary[$fromDate].data, function (index, dataplan) {
                            if (dataplan.type == 'planchannel') {
                                isExist = true;
                            }
                        });
                        // if( isExist === true) { continue; }
                        if (isExist) {


                            var keychDiv = rtcode + '-' + person + '-' + board + '-' + policy;
                            var originalprice = $('.room-price[data-originalpricekey="' + keychDiv + '"]').attr('data-originalprice');
                            try {
                                if (originalprice < value[keych].price) {
                                    var html = index + ' <s>' + accommodations.formatPriceOrigin(parseFloat(value[keych].price)) + '</s><br>';
                                    $('.room-price[data-originalpricekey="' + keychDiv + '"] .price_comparison').append(html);
                                }
                            } catch (err) {
                                console.log('ERROR1163 :');
                                console.log(listChannel);
                            }
                        }

                    });
                },
                complete: function () {


                }
            });
        },
        packPriceAjax: function ($pcode, $rtcode) {
            var $fromDate = window.fromDate;
            var $toDate = window.toDate;
            $('#viewRoomPackDetails' + $rtcode).html('');
            var promoCodeUrl = ( $promoCode )?  '&promoCode=' + $promoCode : ''   ;

            $.ajax({
                type: 'GET',
                url: path + 'price/pack?pcode=' + $pcode + '&rcode=' + $rtcode + '&fromDate=' + $fromDate + '&toDate=' + $toDate + promoCodeUrl, // + $rcode,
                dataType: 'json',
                async: false,
                success: function (listPack) {
                    //console.log('----- listPack ------');  console.log(listPack);

                    var $minPricePack = {};
                    var $minPricePackRoom = {};
                    var listPackByPoliceArry = {};
                    var listPackByPolice = {};
                    // recordemos que el avail viene de $listRoom[$rcode].is_availability
                    $.each(listPack, function (index, pack) {
                        
                        if (pack.iframe != 1)
                            return;
                        if ($packSelected > 0) {
                            if ($packSelected != pack.code_pack)
                                return true;
                        }
                        if (pack.occupancy != $booking_occupancy) {
                            return true;
                        }
                        if (typeof $minPricePack[pack.code_pack + '-' + pack.rtcode] == 'undefined') {
                            $minPricePack[pack.code_pack + '-' + pack.rtcode] = pack.price;
                        } else {
                            if ($minPricePack[pack.code_pack + '-' + pack.rtcode] > pack.price) {
                                $minPricePack[pack.code_pack + '-' + pack.rtcode] = pack.price;
                            }
                        }
                        if (typeof $minPricePackRoom[pack.rtcode] == 'undefined') {
                            $minPricePackRoom[pack.rtcode] = pack.price;
                        } else {
                            if ($minPricePackRoom[pack.rtcode] > pack.price) {
                                $minPricePackRoom[pack.rtcode] = pack.price;
                            }
                        }

                        /* price PACK*/
                        var priceDayText = '';
                        if (Object.keys(pack.ancillary).length > 1) {
                            $.each(pack.ancillary, function (index, dayPrice) {
                                priceDayText += '<b>' + index + '</b>: ' + accommodations.formatPrice(parseFloat(dayPrice.price)) + '<br>';
                            });
                            pack.priceDayInfo = '<button class="btn-link" type="button" data-container="body" data-toggle="popover" data-placement="top" data-content="' + priceDayText + '"><i class="fa fa-info"></i></button>';
                        } else {
                            pack.priceDayInfo = '';
                        }
                        /* name PACK*/
                        if (pack.text) {
                            name = pack.name[language];
                            $('#viewRoomDetails' + pack.rtcode + ' .roomhasoffer .policyblock .web-rate-tag .text').html(pack.name[language]);
                        } else {
                            name = 'No traslate';
                        }
                        /* descripcion PACK*/
                        if (pack.text) {
                            descrptPack = pack.text[language];
                            $('#viewRoomDetails' + pack.rtcode + ' .roomhasoffer .policyblock .hg-policy-label').html(accommodations.readmore(pack.text[language], 250));
                        } else {
                            descrptPack = 'No traslate';
                        }


                        pack.ico = accommodations.icoBoard(pack.board);
                        pack.key = pack.rtcode +'-'+ pack.occupancy +'-'+ pack.board+'-'+ pack.policy;
                        listPackByBoard = pack;
                        listPackByBoard.descript = translator.get("board_" + pack.board);
                        // listRoomByBoard.policytext = policytext;

                        try {
                            if ($.isEmptyObject(listPackByPoliceArry[pack.code_pack][pack.policy]))
                            {
                                listPackByPoliceArry[pack.code_pack][pack.policy] = {};
                            }
                        } catch (err) {
                            listPackByPoliceArry[pack.code_pack] = {};
                            listPackByPoliceArry[pack.code_pack][pack.policy] = {};
                            console.log('ERROR936 : create');
                        }

                        listPackByPoliceArry[pack.code_pack][pack.policy][pack.board] = listPackByBoard;
                        listPackObj[pack.id] = {'name': name, 'descrpt': descrptPack, 'descrpt': descrptPack, 'price': pack.price, 'code_pack': pack.code_pack};
                        listPackCodeObj[pack.code_pack] = {'name': name, 'descrpt': descrptPack, 'descrpt': descrptPack, 'price': pack.price, 'code_pack': pack.code_pack};
                    });
                    console.log('----------  pack Temp  ----------');
                    console.log(listPackByPoliceArry);
                    //console.log($dataRoomItem);
                    $.each(listPackByPoliceArry, function (packId, listPackByPolice) {
                        $('#tmplviewRoomOffer .web-rate-tag .text').html(listPackCodeObj[packId].name);
                        $('#tmplviewRoomOffer .web-rate-tag .txt-more ').html(accommodations.readmore(listPackCodeObj[packId].descrpt, 250));
                        $.each(listPackByPolice, function (policyId, listPackByBoard) {
                            if ($debug) {
                                console.log('----------  Police,Obj  ----------');
                                console.log($dataRoom); //  console.log( listPackByBoard );
                            }
                            $('#tmplroom-details-item .web-rate-tag').html(translator.get("policy_" + policyId) + ' ' + accommodations.readmore(policytextList[$rtcode + '-' + policyId], 1));
                            $('#tmplroom-details-item .hg-policy-descr-container .txt-more').html('');
                            //console.log( policytextList );

                            $.each(listPackByBoard, function (board, boardObj) {
                                console.log('----------  boardObj  ----------');
                                console.log(boardObj);
                                var minstay = boardObj.minstay;
                                var maxstay = boardObj.maxstay;
                                if ($dataRoom[$rtcode].is_availability > 0) {
                                    selector = $dataRoom[$rtcode].is_availability;
                                } else {
                                    selector = 0;
                                }

                                var $class = accommodations.icoBoard(board);
                                $('#tmplroom-details-board .nameboard .txt').html(boardObj.descript);
                                $('#tmplroom-details-board .nameboard .ico').addClass($class);
                                $('#tmplroom-details-board .price').html(accommodations.formatPrice(parseFloat(boardObj.price)));
                                $('#tmplroom-details-board .priceDayList').html(boardObj.priceDayInfo);
                                if (boardObj.discount < 0) {
                                    $('#tmplroom-details-board .striked-price').html(accommodations.formatPrice(parseFloat(boardObj.price + (-1 * boardObj.discount)))).show();
                                } else {
                                    $('#tmplroom-details-board .striked-price').text('').hide();
                                }

                                //buttos add
                                $('#tmplroom-details-board .addcart').attr('data-id-cart', boardObj.key).attr('data-id-pack', boardObj.id);
                                $('#tmplroom-details-board .not-available').hide();
                                $('#tmplroom-details-board .addcart').hide();
                                $('#tmplroom-details-board .minstay').hide();
                                $('#tmplroom-details-board .maxstay').hide();
                                $('#tmplroom-details-board .maxoccupancy').hide();

                                if (selector == '') {
                                    $('#tmplroom-details-board .not-available').show();
                                } else if (minstay > window.totalDays) { //restricciones Alert
                                    $('#tmplroom-details-board .minstay').show();
                                    $('#tmplroom-details-board .num-minstay').html(minstay);
                                    //$('[data-id="' + $rcode + '"] .rate-room').append( '<div class="restriction">'+translator.get("minstay")+' '+minstay+' '+translator.get("nights")+'</div>');
                                } else if (maxstay < window.totalDays && maxstay > 0) { //restricciones Alert
                                    $('#tmplroom-details-board .maxstay').show();
                                    $('#tmplroom-details-board .num-maxstay').html(maxstay);
                                    /* } else if ( boardObj.occupancy == $booking_occupancy) { //restricciones Alert
                                     $('#tmplroom-details-board .maxoccupancy').show();
                                     $('#tmplroom-details-board .num-maxoccupancy').html( boardObj.occupancy );*/
                                } else {
                                    $('#tmplroom-details-board .addcart').show();
                                }


                                //mount board i policy
                                $('#tmplroom-details-board .avalibility').html(selector);
                                $('#tmplroom-details-item .details-board').append($('#tmplroom-details-board').html());
                                //remove ico
                                $('#tmplroom-details-board .nameboard .ico').removeClass($class);
                                //remove
                                $('#tmplroom-details-board .addcart').removeAttr('data-id-pack');
                            });
                            //mount Policy in price details
                            //$('#tmplviewRoomPackDetails .room-details-listitem').append('<div class="col-xs-12 policyblock">' + $('#tmplroom-details-item').html() + '</div>');

                            $('#tmplviewRoomOffer .details-pack').append('<div class="col-xs-12 separator"></div>' + $('#tmplroom-details-item').html());
                            //reset board
                            $('#tmplroom-details-item .details-board').html('');
                            //reset board
                            // $('#tmplviewRoomOffer .details-board ').html('');

                        });
                        $('#tmplroom-details-item .details-board').html(''); //details-board
                        $('#viewRoomDetails' + $rtcode + ' .roomhasoffer').append($('#tmplviewRoomOffer').html()).show();
                        //$('.content-roomTMP .roomhasoffer').append($('#tmplviewRoomOffer').html()).show();
                        //$('#viewRoomDetails' + $rcode + ' .roomhasoffer')
                        //reset board
                        $('#tmplviewRoomOffer .details-pack').html('');
                    });
                    /*setTimeout(function () {
                     $('#viewRoomDetails' + pack.rtcode + ' .roomhasoffer').show();
                     $('#viewRoomDetails' + pack.rtcode + ' .roomhasoffer a').attr('data-id', pack.rtcode);
                     }, 2000);*/


                }, complete: function () {
                    var $pop = $('[data-toggle="popover"]');
                    $pop.popover({
                        html: 'true',
                        title: '<span class="text-info"><strong>&nbsp;</strong></span>' +
                                '<button type="button"  class="close closepopover" >&times;</button>'
                    }).on('shown.bs.popover', function (e) {
                        //console.log('shown triggered');
                        // 'aria-describedby' is the id of the current popover
                        var current_popover = '#' + $(e.target).attr('aria-describedby');
                        //alert(current_popover);
                        var $cur_pop = $(current_popover);
                        $cur_pop.find('.close').click(function () {
                            //console.log('close triggered');
                            $pop.popover('hide');
                        });
                    });
                    accommodations.bindAddCart();
                }
            });
        },
        minPricePackPriceAjax: function () {

            if (typeof $minPricePack == 'object') {
                $.each($minPricePack, function (key, value) {
                    //alert(key + ',' + value);
                    key = key.split("-");
                    var rtcode = key[0];
                    var pack = key[1];
                    $('#onlyRoomPack #viewRoomPackDetails' + rtcode + ' .packList[data-id="' + key + '"] .room-price').html(accommodations.formatPrice(parseFloat(value)));
                });
            }
            if (typeof $minPricePackRoom == 'object') {
                $.each($minPricePackRoom, function (key, value) {
                    //alert(  $('#content-room-pack .roomitem[data-id="' + key + '"] .room-price').html() );
                    //alert(key + ',' + value);
                    $('#onlyRoomPack .roomitem[data-id="' + key + '"] .value-number-of-nights').text(window.totalDays);
                    $('#onlyRoomPack .roomitem[data-id="' + key + '"] .room-price').html(accommodations.formatPrice(parseFloat(value)));
                });
            }
            //$('[data-id="' + $rcode + '"] .room-price').html(accommodations.formatPrice(parseFloat($minprice)));
        },
        resetRoom: function ($pcode) {
            $('#onlyRoom .content-room').html('');
            $('#onlyRoom .carousel-inner').html('');
            $('#onlyRoom .carousel-indicators').html('');
            $('#onlyRoom .content-room').html('');
        },
        resetPack: function ($pcode, $rcode, $availability) {
            $('#onlyRoomPack .content-room').html('');
        },
        bindCleanCart: function () {
            $.cookie("dataCart", [], {path: '/'});
            $dataCart = [];
            $('.bodyCart,#tooltip-cart').html('');
            $('#cart,#modal-cart,#header-book-bow').hide();
            accommodations.bindTotalCartEmbed(0);
        },
        bindAddCart: function () {
            /* btn add */
            //$(document).off('click',".addcart");
            //$(".addcart[data-id-cart='"+key+"']").click(function (e) {
            $(".addcart").unbind('click').click(function (e) {

                $("#modal-cart  .dateCart, #cart h4 .dateCart").html(" (" + $("#DateRangHotel").val() + ")");
                var _rateKey = $(this).data('id-cart');
                keyObj = _rateKey.split('-');
                rtcode = keyObj[0];
                occupancy = keyObj[1];
                board = keyObj[2];
                policy = keyObj[3];
                _idPack = ($(this).data('id-pack') > 0) ? $(this).data('id-pack') : false;
                /*if (_rateKey.search("pack") >= 0) {
                 var _rateKeyPack = _rateKey.replace("pack", "");
                 _idPack = $(this).data('id-pack');
                 //$dataRoomItem
                 //alert( _rateKey +JSON.stringify($dataRoomItem[_rateKey]) );
                 var _rateKeyArry = _rateKeyPack.split("-");
                 var rtcode = _rateKeyArry[0];
                 var _rateKeyPolicy = _rateKeyArry[0] + "-" + _rateKeyArry[3];
                 } else {
                 var _rateKeyPolicy = _rateKey;
                 var _rateKeyArry = _rateKey.split("-");
                 var rtcode = _rateKeyArry[0];
                 }*/

                var type = $(this).data('type');
                var mainDivAdd = $('#viewRoomDetails' + rtcode); 
                var mainDivAddThis = $(this).parent().parent();
                var mainDivAddPack = $('#viewRoomPackDetails' + rtcode);
                $('#cart,#modal-cart').show();
                $("#btn-ViewPrice").effect("shake", {times: 4}, 1000);
                //mainDivAdd
                //mainlang["add_booking"]

                // remove quantity
                $divAvalibility = mainDivAddThis.find('.avalibility'); // mainDivAdd.closest(".room-details-listitem").find('.avalibility');
                $divAvalibilityPack = mainDivAddPack.find('.avalibility'); //mainDivAddPack.closest(".itemsPack ").find('.avalibility');

                //$numItem = mainDivAdd.find('.avalibility select option').length;
                quantity = ( mainDivAddThis.find('.selectQuantity').length )? mainDivAddThis.find('.selectQuantity').val() : 1;
                $numItem = parseInt($divAvalibility.html());
                $numItem = $numItem - quantity;
                if ($numItem > 0) {
                    //mainDivAdd.find('.avalibility select option:last-child').attr('disabled', 'disabled');
                    $divAvalibility.html( $numItem );
                    $divAvalibilityPack.html( $numItem );
                    mainDivAdd.find('.selectQuantity').html( accommodations.quantityOptionHtml( $numItem ) );
                    mainDivAddPack.find('.selectQuantity').html( accommodations.quantityOptionHtml( $numItem ) );
                    if( $numItem == 1 ){
                        mainDivAdd.find('.selectQuantity').hide();
                        mainDivAddPack.find('.selectQuantity').hide();
                    }
                } else
                if ($numItem == 0) {
                    $divAvalibility.html(0); // mainDivAdd.closest(".room-details-listitem").find('.avalibility').html(0);
                    //mainDivAdd.closest(".room-details-listitem").find('.avalibility').html(0);
                    mainDivAdd.find('.not-available').show();
                    mainDivAdd.find('.addcart').hide();
                    mainDivAdd.find('.selectQuantity').hide();
                    $divAvalibilityPack.html(0); // mainDivAdd.closest(".room-details-listitem").find('.avalibility').html(0);
                    //mainDivAdd.closest(".room-details-listitem").find('.avalibility').html(0);
                    mainDivAddPack.find('.not-available').show();
                    mainDivAddPack.find('.addcart').hide();
                }



                $('.bodyCart').html('');
                var totalprice = 0;
                $dataRoomItemTMP = {};
                if ($dataRoomItem[_rateKey]) {

                    $dataRoomItemTMP = JSON.parse(JSON.stringify($dataRoomItem[_rateKey]));
                    console.log('----------  $dataRoomItem  ----------' + _rateKey);
                    console.log($dataRoomItemTMP)
                    //alert(rtcode + '>>' + $numItem + '::' + $divAvalibility.html());

                    toastr.success(translator.get("add_booking_success"));
                    //cargamos el modal de confirmacion
                    $('#modalConfirmBooking').modal('show');
                    $('#btn-customerdetails').trigger("click");
                    $('#btn-continueCustomDetails').unbind('click').on('click', function (e) {
                        $('#btn-customerdetails').trigger("click");
                    });
                    //cuando añadimos una reserva recalculamos los Nº procutos x dia x nº personas
                    $dataRoomItemTMP.type = 'booking';
                    $dataRoomItemTMP.quantity = 1;//quantity;
                    $dataRoomItemTMP.descript = ' ' + $dataRoomItemTMP.occupancy + ' ' + translator.get("Pax.") +
                            '<br> <span class="board">' + translator.get("board_" + $dataRoomItemTMP.board) + '</span>' +
                            '<br> <span class="policy">' + translator.get("policy_" + $dataRoomItemTMP.policyId) + '</span><span class="policytex">: ' + accommodations.readmore(policytextList[rtcode + '-' + policy], 150) + '</span>'
                            ;
                    if (_idPack) {
                        //console.log(listPackObj[_idPack].descrpt);
                        $dataRoomItemTMP.idPack = _idPack;
                        $dataRoomItemTMP.price = listPackObj[_idPack].price;
                        $dataRoomItemTMP.key = 'PACK' + _idPack + '-' + $dataRoomItemTMP.key;
                        $dataRoomItemTMP.descript += "<br><b> " + translator.get("Pack") + " " + listPackObj[_idPack].name + ":</b><br>" + accommodations.readmore(listPackObj[_idPack].descrpt, 250);
                    }

                    //$dataRoomItem[_rateKey].policyDesc = policytextList[_rateKey];
                    //$('.shopping-cart h4').html( JSON.stringify($dataRoomItemTMP) );
                    for (i = 1; i <= quantity; i++) { 
                        $dataCart.push($dataRoomItemTMP);
                    }
                    //$dataCart.push($dataRoomItemTMP);
                    //alert( JSON.stringify($dataCart) );
                    //alert( JSON.stringify(policytextList ) );

                    console.log($dataRoomItemTMP);
                    accommodations.bindReloadProduct();
                }

                //check render tpv
                accommodations.bindPayment();
                //Product
                if (type == 'product') {
                    toastr.success(translator.get("add_product_success"));
                    $dataItem[_rateKey].type = 'product';
                    $dataItem[_rateKey].quantity = $(this).closest(".panel-heading").find(".quantity").val();
                    $dataCart.push($dataItem[_rateKey]);
                }


                var countBookingLipiezas = 0;
                $.each($dataCart, function (index, value) {
                    if (value.type == 'booking') {
                        countBookingLipiezas++;
                    }
                });
                console.log('--------- $dataCart -----------');
                console.log($dataCart);
                var adicionalDesc = '';
                var adicionalTax = '';
                $('.payment_booking_engine').html('');
                $.each($dataCart, function (index, value) {
                    //sumamos +1 a la lista que ya tenemos
                    if ($('.cartItem[data-key="' + value.key + '"]').length > 0) {
                        var numquantity = $('.cartItem[data-key="' + value.key + '"] .quantyCart');
                        var totalQuantity = parseInt(numquantity.html()) + 1;
                        numquantity.html( totalQuantity );
                        var numquantity = $('.adicionalTax[data-key="' + value.key + '"] .quantyCart');
                        numquantity.html( totalQuantity );
                        var numquantity = $('.adicionalTax[data-key="' + value.key + '"] .taxpriceAdult');
                        taxprice_adult = numquantity.data('price') ;
                        taxprice_adult = taxprice_adult * totalQuantity;
                        numquantity.text( accommodations.formatPrice(taxprice_adult)  );
                    } else {
                        var adicionalDesc = '';
                        if (countBookingLipiezas && value.roomclear > 0) {
                            totalprice += value.roomclear;
                            adicionalDesc = "<br> " + translator.get("Clean room price") + ": <b>" + accommodations.formatPrice(value.roomclear) + "</b>";
                        }

                        if ($dataProperty.tax_price_adult > 0) {
                            var daytax = (window.totalDays > $dataProperty.tax_max_day) ? $dataProperty.tax_max_day : window.totalDays;
                            if (daytax) {
                                var taxprice_adult = ($dataProperty.tax_price_adult * value.occupancy) * daytax;
                                //var taxprice_child += ( value.tax_price_child * value.childre ) * $daytax;
                                //$taxprice = ( $men + $children ) * (int) $daytax;
                            }

                            var text_tax_adult = $dataProperty.tax_price_adult + ' ' + window.currencySymbol + ' x ' + value.occupancy + ' personas x ' + daytax + ' noche';
                            adicionalTax = '<p class="adicionalTax" data-key="' + value.key + '">'
                                          + '   <span class="quantyCart">'+value.quantity+'</span> x ' + translator.get("Impuesto municipal") + '  (' + text_tax_adult + ')' + translator.get("") + ': <b class="taxpriceAdult" data-price="' + taxprice_adult + '">' + accommodations.formatPrice(taxprice_adult) + '</b>'
                                          + '</p>';
                        }

                        if (value.idPack) {
                            _key = 'PACK' + value.idPack + '-' + value.key;
                        } else {
                            _key = value.key;
                        }
                        accommodations.bindCartEmbed(value, _key, index, value.quantity, value.title, value.descript, value.price * value.quantity, adicionalDesc, adicionalTax);
                    }
                    totalprice += parseFloat(value.price * value.quantity);
                });
                $.cookie("dataCart", JSON.stringify($dataCart), {expires: 7, path: '/'});
                accommodations.bindTotalCartEmbed(totalprice);
                accommodations.bindCancelButton();
                e.preventDefault();
            });
        },
        bindCartEmbed: function (value, $key, $id, $quantity, $title, $descript, $price, $adicionalDesc, adicionalTax) {
            $price = accommodations.formatPrice(parseFloat($price));
            var item = '<div class="cartItem" data-key="' + $key + '" data-id="' + $id + '" > <i class="fa fa-times" aria-hidden="true"></i>'
                    + '<h6><span class="quantyCart">' + $quantity + '</span> x ' + $title + ': <span class="pull-right price">' + $price + '</span> </h6>'
                    + ' <p>' + $descript + ' ' + $adicionalDesc +'</p><hr></div>';
            $(item).appendTo('.bodyCart');
			$('.payment_booking_engine').show().prepend( adicionalTax );
        },
        bindTotalCartEmbed: function ($totalprice) {
            $('#booking-price').val($totalprice);
            $('.footerCart').attr('data-price', $totalprice);
            $totalprice = accommodations.formatPrice(parseFloat($totalprice));
            $('.footerCart h5 span').html($totalprice);
        },
        bindProduct: function ($product) {
            var isarrayproduct = 0;
            $.each($product, function (index, p) {
                isarrayproduct = 1;
                try {
                    name = p.name[language];
                } catch (err) {
                    name = translator.get("no translation");
                }
                try {
                    text = p.text[language];
                } catch (err) {
                    text = translator.get("no translation");
                }
                //name = (p.name[language]) ? p.name[language] : translator.get("no translation");
                //text = (p.text[language]) ? p.text[language] : translator.get("no translation");
                //name = name + ' (' + translator.get("PaymentType_" + p.paymentType) + ')';
                var pprice = p.value * (1 + (p.tax / 100));
                $dataItem['p-' + index] = {"key": 'p' + index, "title": name, "descript": text, "price": pprice};
                $("#tmplroom-extras .title").html(name);
                if (p.text) {//if (p.text[language]) {
                    $("#tmplroom-extras [data-toggle='collapse']").prop('href', '#collapse' + index);
                    $("#tmplroom-extras .title").parent().children('.fa-info').show();
                    $("#tmplroom-extras .description").html(text);
                    $("#tmplroom-extras .panel-collapse").prop('id', 'collapse' + index);
                } else {
                    $("#tmplroom-extras [data-toggle='collapse']").prop('href', '#collapse0000');
                    $("#tmplroom-extras .title").parent().children('.fa-info').hide();
                }
                $("#tmplroom-extras .price").html(accommodations.formatPrice(pprice));
                $("#tmplroom-extras .price-type").html(translator.get("PaymentType_" + p.paymentType));
                $("#tmplroom-extras input.quantity").attr('data-id-cart', 'p-' + index).attr('data-id-type', p.paymentType);
                $("#tmplroom-extras .addProductcart").attr('data-id-cart', 'p-' + index);
                $("#tmplroom-extras .addProductcart").attr('data-type', 'product');
                //alert(JSON.stringify(p));
                $("#itemExtras").append($("#tmplroom-extras").html());
            });
            //bug agregamos item vacio
            $("#itemExtras").append($("#tmplroom-extras").html('<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse1" > </a>'
                    + '<div id="collapse1" class="panel-collapse collapse"></div>'));
            $("[data-toggle='collapse']").collapse();
            if (isarrayproduct == 0) {
                $("#btn-extrasContainer").closest('.panel').hide();
                $("#extras,#extrasContainer").hide();
            }
        },
        bindReloadProduct: function ($product) {
            $("#extras .quantity").each(function (index, p) {
                var numroom = 0;
                $.each($dataCart, function (index, value) {
                    if (value.type = 'booking') {
                        numroom = numroom + parseInt(value.occupancy);
                    }
                });
                switch ($(this).data('id-type')) {
                    case 1:
                        $(this).val(parseInt(window.totalDays));
                        break;
                    case 2:
                        $(this).val(parseInt(window.totalDays) * numroom);
                        break;
                    case 3:
                        $(this).val(1);
                        break;
                    case 4:
                        $(this).val(numroom);
                        break;
                }
            });
        },
        bindRequiredExtraItems: function () {
            if (typeof (window.requiredExtraItems) !== 'undefined' && window.requiredExtraItems.length > 0) {
                $.each(window.requiredExtraItems, function (index, extraItemId) {
                    accommodations.updateExtraItemSelection(extraItemId, 1);
                    $('#extra_item_quantity_' + extraItemId).val('1');
                });
            }
        },
        bindFormControls: function () {

            $('.extra_items_total').html(accommodations.formatPrice(0));
            $('.total_price').html(accommodations.formatPrice(0));
            $('.reservation_total').html(accommodations.formatPrice(0));
            if (window.enableExtraItems) {
                accommodations.bindExtraItemsQuantitySelect();
                accommodations.buildExtraItemsTable();
            }

            accommodations.bindResetButton();
            window.bookingRequest.maxAdults = 0;
            window.bookingRequest.maxChildren = 0;
            window.bookingRequest.minAdults = 0;
            window.bookingRequest.minChildren = 0;
            if (window.bookingRequest.roomTypeId > 0) {
                window.bookingRequest.maxAdults = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .max_adult_count').val());
                window.bookingRequest.maxChildren = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .max_child_count').val());
                if ($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_adult_count').length > 0) {
                    window.bookingRequest.minAdults = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_adult_count').val());
                }
                if ($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_child_count').length > 0) {
                    window.bookingRequest.minChildren = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_child_count').val());
                }
            } else {
                window.bookingRequest.maxAdults = parseInt(window.accommodationMaxAdultCount);
                window.bookingRequest.maxChildren = parseInt(window.accommodationMaxChildCount);
                window.bookingRequest.minAdults = parseInt(window.accommodationMinAdultCount);
                window.bookingRequest.minChildren = parseInt(window.accommodationMinChildCount);
            }

            if (window.bookingRequest.minAdults > window.bookingRequest.maxAdults) {
                window.bookingRequest.minAdults = window.bookingRequest.maxAdults;
            } else if (window.bookingRequest.minAdults <= 0) {
                window.bookingRequest.minAdults = 1;
            }
            if (window.bookingRequest.minChildren > window.bookingRequest.maxChildren) {
                window.bookingRequest.minChildren = window.bookingRequest.maxChildren;
            } else if (window.bookingRequest.minChildren < 0) {
                window.bookingRequest.minChildren = 0;
            }

            window.bookingRequest.adults = parseInt(window.bookingRequest.minAdults);
            window.bookingRequest.children = parseInt(window.bookingRequest.minChildren);
            if ($('#booking_form_adults option').size() === 0) {

                for (var i = window.bookingRequest.minAdults; i <= window.bookingRequest.maxAdults; i++) {
                    $('<option ' + (i == 1 ? 'selected' : '') + '>').val(i).text(i).appendTo('#booking_form_adults');
                }

                if (window.bookingRequest.minAdults > 0) {
                    window.bookingRequest.adults = parseInt(window.bookingRequest.minAdults);
                    var children = 0;
                    if ($('#booking_form_children') && $('#booking_form_children').val()) {
                        children = parseInt($('#booking_form_children').val());
                    }
                    window.bookingRequest.children = children;
                    $('span.adults_text').html(window.bookingRequest.adults);
                    $('span.people_text').html(window.bookingRequest.adults + children);
                }

                $('#booking_form_adults').on('change', function (e) {

                    window.bookingRequest.adults = parseInt($(this).val());
                    var children = 0;
                    if ($('#booking_form_children') && $('#booking_form_children').val()) {
                        children = parseInt($('#booking_form_children').val());
                    }
                    window.bookingRequest.children = children;
                    $('span.adults_text').html(window.bookingRequest.adults);
                    $('span.people_text').html(window.bookingRequest.adults + children);
                    accommodations.buildRatesTable();
                    accommodations.recalculateExtraItemTotals();
                });
                if (window.bookingRequest.maxChildren > 0) {

                    for (var j = window.bookingRequest.minChildren; j <= window.bookingRequest.maxChildren; j++) {
                        $('<option ' + (j == window.bookingRequest.minChildren ? 'selected' : '') + '>').val(j).text(j).appendTo('#booking_form_children');
                    }

                    if (window.bookingRequest.minChildren > 0) {
                        window.bookingRequest.children = parseInt(window.bookingRequest.minChildren);
                        var adults = parseInt($('#booking_form_adults').val());
                        $('span.children_text').html(window.bookingRequest.children + (window.accommodationCountChildrenStayFree > 0 ? " *" : ""));
                        $('span.people_text').html(adults + window.bookingRequest.children);
                    }

                    $('#booking_form_children').on('change', function (e) {
                        window.bookingRequest.children = parseInt($(this).val());
                        var adults = 1;
                        if ($('#booking_form_adults') && $('#booking_form_adults').val()) {
                            adults = parseInt($('#booking_form_adults').val());
                        }
                        $('span.children_text').html(window.bookingRequest.children + (window.accommodationCountChildrenStayFree > 0 ? " *" : ""));
                        $('span.people_text').html(adults + window.bookingRequest.children);
                        accommodations.buildRatesTable();
                        accommodations.recalculateExtraItemTotals();
                    });
                } else {
                    $('.booking_form_children_div').hide();
                    $('.booking_form_adults_div').removeClass('one-half').addClass('full-width');
                }

                $('#booking_form_adults').uniform();
                $('#booking_form_children').uniform();
                $('.extra_item_quantity').uniform();
                if (window.accommodationCountChildrenStayFree > 0 && window.bookingRequest.maxChildren > 0) {
                    $('.adult_count_div').show();
                    $('.children_count_div').show();
                    $('.people_count_div').hide();
                } else {
                    $('.adult_count_div').hide();
                    $('.children_count_div').hide();
                    $('.people_count_div').show();
                }

                $('.toggle_breakdown').unbind('click');
                $('.toggle_breakdown').on('click', function (e) {
                    if ($('.price_breakdown_row').hasClass('hidden')) {
                        $('.price_breakdown_row').removeClass('hidden');
                        if (window.enableExtraItems) {
                            $('.price_breakdown_row').show();
                        } else {
                            $('.price_breakdown_row:not(.extra_items_breakdown_row)').show();
                        }
                        $('.toggle_breakdown').html(window.hidePriceBreakdownLabel);
                    } else {
                        $('.price_breakdown_row').addClass('hidden');
                        $('.price_breakdown_row').hide();
                        $('.toggle_breakdown').html(window.showPriceBreakdownLabel);
                    }

                    e.preventDefault();
                });
            }

        },
        bindSelectDatesButtons: function () {
            $('.book-accommodation-select-dates').unbind('click').on('click', function (e) {
                accommodations.bindAddCart();
                var prevRoomTypeId = 0;
                window.roomTypeId = $(this).attr('aria-controls').replace('viewRoomDetails', '');
                $("#viewRoomDetails" + window.roomTypeId + " .booking_form_controls .datepicker_holder").addClass('vacancy_datepicker');
                accommodations.populateAvailableDays(window.roomTypeId, window.bookingRequest.roomTypeId);
                accommodations.populateAvailableStartDays(window.roomTypeId, window.bookingRequest.roomTypeId, accommodations.bindCalendar);
                e.preventDefault();
            });
        },
        bindExtraItemsQuantitySelect: function () {

            $('select.extra_item_quantity').unbind('change');
            $('select.extra_item_quantity').on('change', function (e) {

                var quantity = parseInt($(this).val());
                var extraItemId = $(this).attr('id').replace('extra_item_quantity_', '');
                $(this).uniform();
                accommodations.updateExtraItemSelection(extraItemId, quantity);
            });
        },
        updateExtraItemSelection: function (extraItemId, quantity) {

            if (extraItemId > 0) {

                var extraItemPrice = parseFloat($('#extra_item_price_' + extraItemId).val());
                var extraItemTitle = $('#extra_item_title_' + extraItemId).html();
                var extraItemPricePerPerson = parseInt($('#extra_item_price_per_person_' + extraItemId).val());
                var extraItemPricePerDay = parseInt($('#extra_item_price_per_day_' + extraItemId).val());
                var oldExtraItem = null;
                var extraItem = {};
                var extraItemRows = '';
                var pricingMethod = '';
                // reduce total by old item summed price.
                if (extraItemId in window.bookingRequest.extraItems) {
                    oldExtraItem = window.bookingRequest.extraItems[extraItemId];
                    window.bookingRequest.totalPrice -= parseFloat(oldExtraItem.summedPrice);
                    window.bookingRequest.extraItemsTotalPrice -= parseFloat(oldExtraItem.summedPrice);
                    delete window.bookingRequest.extraItems[extraItemId];
                }

                $('table.extra_items_price_breakdown tbody').html('');
                if (quantity > 0) {

                    extraItem.quantity = quantity;
                    extraItem.id = extraItemId;
                    extraItem.price = extraItemPrice;
                    extraItem.pricePerPerson = extraItemPricePerPerson;
                    extraItem.pricePerDay = extraItemPricePerDay;
                    if (extraItem.pricePerPerson) {
                        var adjustedChildren = window.bookingRequest.children - window.accommodationCountChildrenStayFree;
                        adjustedChildren = adjustedChildren > 0 ? adjustedChildren : 0;
                        extraItemPrice = (window.bookingRequest.adults * extraItemPrice) + (adjustedChildren * extraItemPrice);
                    }

                    if (extraItem.pricePerDay) {
                        extraItemPrice = extraItemPrice * window.bookingRequest.totalDays;
                    }

                    extraItem.summedPrice = extraItem.quantity * extraItemPrice;
                    extraItem.title = extraItemTitle;
                    window.bookingRequest.totalPrice += extraItem.summedPrice;
                    window.bookingRequest.extraItemsTotalPrice += extraItem.summedPrice;
                    window.bookingRequest.extraItems[extraItemId] = extraItem;
                }

                if (Object.size(window.bookingRequest.extraItems) > 0) {
                    $.each(window.bookingRequest.extraItems, function (index, value) {

                        if (value.pricePerDay && value.pricePerPerson)
                            pricingMethod = '(' + window.pricedPerDayPerPersonLabel + ')';
                        else if (value.pricePerDay)
                            pricingMethod = '(' + window.pricedPerDayLabel + ')';
                        else if (value.pricePerPerson)
                            pricingMethod = '(' + window.pricedPerPersonLabel + ')';
                        extraItemRows += '<tr class="extra_item_row_' + value.Id + '"><td>' + value.quantity + ' x ' + value.title + ' ' + pricingMethod + ' </td><td>' + accommodations.formatPrice(value.summedPrice) + '</td></tr>';
                    });
                }

                $('table.extra_items_price_breakdown tbody').html(extraItemRows);
                $('.extra_items_total').html(accommodations.formatPrice(window.bookingRequest.extraItemsTotalPrice));
                $('.total_price').html(accommodations.formatPrice(window.bookingRequest.totalPrice));
            }
        },
        bindResetButton: function () {

            $('.book-accommodation-reset').unbind('click');
            $('.book-accommodation-reset').on('click', function (e) {

                $('.book-accommodation-select-dates').show();
                accommodations.resetFormValues();
                accommodations.populateAvailableDays(window.accommodationId, window.bookingRequest.roomTypeId);
                accommodations.populateAvailableStartDays(window.accommodationId, window.bookingRequest.roomTypeId, accommodations.refreshCalendar);
                e.preventDefault();
            });
        },
        bindCancelButton: function () {
            accommodations.readmoreUpdate();
            $('.cartItem > i').click(function (e) {
                ;
                //alert( $(this).parent().attr('data-id') );
                var $dataCartTemp = [];
                var int = $(this).parent().attr('data-id');
                var key = $(this).parent().attr('data-key');
                $(this).parent().remove();
                var totalprice = 0;
                $.each($dataCart, function (index, item) {
                    if (typeof item.key !== "undefined") {
                        if (item.key == key) {
                            //$dataCart.splice($dataCart.indexOf(index),1);
                        } else {
                            $dataCartTemp.push(item);
                            totalprice += parseFloat(item.price);
                        }
                    }
                });
                accommodations.bindTotalCartEmbed(totalprice);
                $dataCart = $dataCartTemp;
                //alert(JSON.stringify($dataCart));
                if ($dataCart.length == 0) {
                    $('#cart,#modal-cart').hide();
                    $.removeCookie("dataCart");

                } else {
                    $.cookie("dataCart", JSON.stringify($dataCart), {expires: 7, path: '/'});
                }

                var keyArry = key.split("-");
                var rcode = keyArry[0];
                //restauramos los items
                var mainDivRemove = $('.addcart[data-id-cart="' + key + '"]').parent().parent();
                var mainDivAdd = $('#viewRoomDetails' + rcode); 
                var mainDivAddPack = $('#viewRoomPackDetails' + rcode);
                //$numItem = mainDivAdd.find('.avalibility select option').length;
                $divAvalibility = mainDivAdd.find('.avalibility');
                $numItem = parseInt($divAvalibility.html());
                $addnum = parseInt( $(this).closest('.cartItem').find('.quantyCart').html() );
                alert('$addnum'+$addnum);
                $numItem = $numItem + $addnum;
                alert('$numItem'+$addnum);
                if ($numItem >= 1) {
                    //mainDivAdd.find('.avalibility select option:last-child').attr('disabled', 'disabled');
                    $divAvalibility.html( $numItem );//$numItem + $addnum);
                    mainDivAddPack.find('.avalibility').html( $numItem );
                    mainDivAdd.find('.selectQuantity').html( accommodations.quantityOptionHtml($numItem) ).val(1).show();
                    mainDivAddPack.find('.selectQuantity').html( accommodations.quantityOptionHtml($numItem) ).val(1).show();
                    if( $numItem == 1 ){
                        mainDivAdd.find('.selectQuantity').hide();
                        mainDivAddPack.find('.selectQuantity').hide();
                    }
                } else
                if ($numItem == 0) {
                    //mainDivAdd.closest(".room-details-listitem").find('.avalibility select').show();
                    mainDivAdd.find('.avalibility').html($addnum); //mainDivAdd.closest(".room-details-listitem").find('.avalibility').html($addnum);
                    mainDivAdd.find('.not-available').hide(); //mainDivAdd.closest(".room-details-listitem").find('.not-available').hide();
                    mainDivAdd.find('.addcart').show(); //mainDivAdd.closest(".room-details-listitem").find('.addcart').show();
                    mainDivAddPack.find('.avalibility').html($addnum);
                    mainDivAddPack.find('.not-available').hide();
                    mainDivAddPack.find('.addcart').show();
                }


            });
            /*$('.cancel-accommodation-booking').unbind('click');
             $('.cancel-accommodation-booking').on('click', function (event) {

             event.preventDefault();
             accommodations.hideBookingForm();
             accommodations.showAccommodationScreen();
             $('body,html').animate({
             scrollTop: 0
             }, 800);
             });*/
        },
        bindNextButton: function () {

            $('.book-accommodation-next').unbind('click');
            if (window.accommodationIsReservationOnly || !window.useWoocommerceForCheckout) {
                $('.book-accommodation-next').on('click', function (event) {

                    event.preventDefault();
                    accommodations.hideAccommodationScreen();
                    accommodations.showBookingForm();
                    $('body,html').animate({
                        scrollTop: 0
                    }, 800);
                });
            } else {
                $('.book-accommodation-next').on('click', function (e) {
                    accommodations.addProductToCart();
                    e.preventDefault();
                });
            }
        },
        bindGallery: function () {
            /* gallery ->borrar
             $("#gallery").lightSlider({
             item:1,
             rtl: (window.enableRtl ? true : false),
             slideMargin:0,
             auto:true,
             loop:true,
             speed:900,
             pause:window.pauseBetweenSlides,
             keyPress:true,
             gallery:true,
             thumbItem:8,
             galleryMargin:3,
             onSliderLoad: function() {
             $('#gallery').removeClass('cS-hidden');
             }
             });*/
        },
        bindCalendar: function () {

            $(".price_row").hide();
            /* if (window.accommodationDisabledRoomTypes) {
             $(".booking_form_controls").html($(".booking_form_controls_holder").html());
             $(".booking_form_controls").show();
             $(".booking_form_controls .datepicker_holder").addClass('vacancy_datepicker');
             }*/

            if (typeof ($('#viewRoomDetails' + window.roomTypeId + ' .booking_form_controls .datepicker_holder')) !== 'undefined') {
                var MM = moment(window.fromDate).format("MM");
                var YYYY = moment(window.fromDate).format("YYYY");
                //alert(moment(window.fromDate).format("DD/MM/YYYY"));

                $('#viewRoomDetails' + window.roomTypeId + ' .booking_form_controls .datepicker_holder').html('<div class="calendar' + window.roomTypeId + '"></div>');
                $('.calendar' + window.roomTypeId).datepicker({
                    dateFormat: window.datepickerDateFormat,
                    defaultDate: new Date(window.fromDate),
                    numberOfMonths: 2,
                    hourMin: 6,
                    hourMax: 18,
                    minDate: 0,
                    onSelect: function (dateText, inst) {

                        var selectedTime = Date.UTC(inst.currentYear, inst.currentMonth, inst.currentDay),
                                selectedDate = accommodations.convertLocalToUTC(new Date(selectedTime)),
                                selectedDateFrom = accommodations.getSelectedDateFrom(),
                                selectedDateTo = accommodations.getSelectedDateTo(),
                                dateTest = true,
                                dayOfWeek = selectedDate.getDay();
                        /*var fromday = new Date(selectedTime);
                         fromday.setDate(fromday.getDate());
                         var today = new Date(selectedTime);
                         today.setDate(today.getDate() + 1);
                         window.fromDate = moment(fromday).format("YYYY-MM-DD");
                         window.toDate = moment(today).format("YYYY-MM-DD");
                         alert(window.fromDate+'---'+window.toDate);
                         $('#fromDate').val( moment(fromday).format(formatDate) );
                         $('#toDate').val( moment(today).format(formatDate) );
                         accommodations.bindDate();*/

                        /*  if (!selectedDateFrom || selectedDateTo || (selectedDate < selectedDateFrom) || (selectedDateFrom.toString() === selectedDate.toString())) {
                         $("div.error.step1_error").hide();
                         if (window.accommodationRentType == 2 && selectedDate.getDate() > 1) {
                         // monthly rentals allow only selecting 1st day of month as start date
                         $("div.error.step1_error div p").html(window.checkinMonthlyFirstDayError);
                         $("div.error.step1_error").show();
                         } else if (dayOfWeek > -1 && dayOfWeek != (window.accommodationCheckinWeekday) && window.accommodationCheckinWeekday > -1) {

                         $("div.error.step1_error div p").html(window.checkinWeekDayError);
                         $("div.error.step1_error").show();
                         } else {
                         accommodations.selectDateFrom(selectedTime, dateText);
                         }
                         } else {

                         for (var d = selectedDateFrom; d < selectedDate; d.setDate(d.getDate() + 1)) {
                         var dateToCheck = (d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2));
                         var datesArray = accommodations.getAccommodationVacancyDates();
                         if ($.inArray(dateToCheck, datesArray) == -1) {
                         dateTest = false;
                         break;
                         }
                         }

                         if (!dateTest) {
                         accommodations.selectDateFrom(selectedTime, dateText);
                         } else {

                         var totalDays = accommodations.calculateDifferenceInDays(accommodations.getSelectedDateFrom(), selectedDate);
                         var lastDayOfMonth = accommodations.daysInMonth(selectedDate.getMonth() + 1, selectedDate.getFullYear());
                         $("div.error.step1_error").hide();
                         if (window.accommodationRentType == 2 && selectedDate.getDate() !== lastDayOfMonth) {
                         // monthly rentals allow only selecting 1st day of month as start date
                         $("div.error.step1_error div p").html(window.checkoutMonthlyLastDayError);
                         $("div.error.step1_error").show();
                         } else if (window.accommodationRentType == 1 && totalDays % 7 > 0) {
                         $("div.error.step1_error div p").html(window.checkoutWeeklyDayError);
                         $("div.error.step1_error").show();
                         } else if (totalDays < window.accommodationMinDaysStay) {

                         $("div.error.step1_error div p").html(window.minDaysStayError);
                         $("div.error.step1_error").show();
                         } else if (window.accommodationMaxDaysStay > 0 && totalDays > window.accommodationMaxDaysStay) {

                         $("div.error.step1_error div p").html(window.maxDaysStayError);
                         $("div.error.step1_error").show();
                         } else if (dayOfWeek > -1 && dayOfWeek != (window.accommodationCheckoutWeekday) && window.accommodationCheckoutWeekday > -1) {

                         $("div.error.step1_error div p").html(window.checkoutWeekDayError);
                         $("div.error.step1_error").show();
                         } else {

                         $("div.error.step1_error div p").html('');
                         $("div.error.step1_error").hide();
                         window.bookingRequest.totalDays = totalDays;
                         accommodations.selectDateTo(selectedTime, dateText);
                         accommodations.buildRatesTable();
                         accommodations.recalculateExtraItemTotals();
                         }
                         }
                         }*/
                    },
                    onChangeMonthYear: function (year, month, inst) {

                        window.currentMonth = month;
                        window.currentYear = year;
                        var selectedDateFrom = accommodations.getSelectedDateFrom();
                        accommodations.populateAvailableDays(window.accommodationId, window.bookingRequest.roomTypeId);
                        accommodations.populateAvailableStartDays(window.accommodationId, window.bookingRequest.roomTypeId, accommodations.refreshCalendar);
                        if (selectedDateFrom) {
                            accommodations.populateAvailableEndDates(selectedDateFrom, window.accommodationId, window.bookingRequest.roomTypeId, accommodations.refreshCalendar);
                        }
                    },
                    beforeShowDay: function (d) {

                        var tUtc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()).valueOf();
                        var today = new Date();
                        var todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                        var selectedTimeFrom = accommodations.getSelectedTimeFrom();
                        var selectedTimeTo = accommodations.getSelectedTimeTo();
                        var dateTextForCompare = '';
                        if (!selectedTimeFrom) {
                            if (window.accommodationVacancyStartDays) {

                                dateTextForCompare = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
                                var datesArray = accommodations.getAccommodationVacancyStartDates();
                                if (selectedTimeFrom && tUtc == selectedTimeFrom)
                                    return [false, 'dp-highlight'];
                                else if ($.inArray(dateTextForCompare, datesArray) == -1)
                                    return [false, 'ui-datepicker-unselectable ui-state-disabled'];
                                else if (todayUtc.valueOf() < tUtc && $.inArray(dateTextForCompare, datesArray) > -1)
                                    return [true, 'dp-highlight'];
                            }
                        } else if (!selectedTimeTo) {
                            if (window.accommodationVacancyEndDates) {

                                dateTextForCompare = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
                                if (selectedTimeFrom && tUtc == selectedTimeFrom)
                                    return [false, 'dp-highlight'];
                                else if ($.inArray(dateTextForCompare, window.accommodationVacancyEndDates) == -1)
                                    return [false, 'ui-datepicker-unselectable ui-state-disabled'];
                                else if (todayUtc.valueOf() < tUtc && $.inArray(dateTextForCompare, window.accommodationVacancyEndDates) > -1)
                                    return [true, 'dp-highlight'];
                            }
                        } else if (selectedTimeFrom && selectedTimeTo) {
                            if (selectedTimeFrom && ((tUtc == selectedTimeFrom) || (selectedTimeTo && tUtc >= selectedTimeFrom && tUtc <= selectedTimeTo))) {
                                return [false, 'dp-hightlight dp-highlight-selected'];
                            } else {
                                return [false, ''];
                            }
                        }

                        return [true, selectedTimeFrom && ((tUtc == selectedTimeFrom) || (selectedTimeTo && tUtc >= selectedTimeFrom && tUtc <= selectedTimeTo)) ? "dp-highlight" : ""];
                    }
                });
            }

        },
        refreshCalendar: function () {

            if (typeof $('.vacancy_datepicker') !== 'undefined') {
                $('.vacancy_datepicker').datepicker("refresh");
            }
        },
        resetFormValues: function () {

            $("#date_from_text").html("");
            $("#selected_date_from").val("");
            $("#date_to_text").html("");
            $("#selected_date_to").val("");
            $(".extra_item_quantity").val("0");
            $("span.adults_text").html("1");
            $("span.children_text").html("0" + (window.accommodationCountChildrenStayFree > 0 ? " *" : ""));
            $(".dates_row").hide();
            $(".price_row").hide();
            $(".booking-commands").hide();
            $('.price_breakdown').hide();
            window.bookingRequest = {};
            window.bookingRequest.extraItems = {};
            window.bookingRequest.totalPrice = 0;
            window.bookingRequest.totalAccommodationOnlyPrice = 0;
            window.bookingRequest.totalDays = 0;
            window.bookingRequest.maxAdults = 0;
            window.bookingRequest.maxChildren = 0;
            window.bookingRequest.minAdults = 0;
            window.bookingRequest.minChildren = 0;
            if ($('#room_type_id').length > 0) {
                window.bookingRequest.roomTypeId = $('#room_type_id').val();
            } else {
                window.bookingRequest.roomTypeId = 0;
            }

            if (window.bookingRequest.roomTypeId > 0) {
                window.bookingRequest.maxAdults = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .max_adult_count').val());
                window.bookingRequest.maxChildren = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .max_child_count').val());
                if ($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_adult_count').length > 0) {
                    window.bookingRequest.minAdults = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_adult_count').val());
                }
                if ($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_child_count').length > 0) {
                    window.bookingRequest.minChildren = parseInt($('li#room_type_' + window.bookingRequest.roomTypeId + ' .room-information .min_child_count').val());
                }
            } else {
                window.bookingRequest.maxAdults = parseInt(window.accommodationMaxAdultCount);
                window.bookingRequest.maxChildren = parseInt(window.accommodationMaxChildCount);
                window.bookingRequest.minAdults = parseInt(window.accommodationMinAdultCount);
                window.bookingRequest.minChildren = parseInt(window.accommodationMinChildCount);
            }

            if (window.bookingRequest.minAdults > window.bookingRequest.maxAdults) {
                window.bookingRequest.minAdults = window.bookingRequest.maxAdults;
            } else if (window.bookingRequest.minAdults <= 0) {
                window.bookingRequest.minAdults = 1;
            }
            if (window.bookingRequest.minChildren > window.bookingRequest.maxChildren) {
                window.bookingRequest.minChildren = window.bookingRequest.maxChildren;
            } else if (window.bookingRequest.minChildren < 0) {
                window.bookingRequest.minChildren = 0;
            }

            window.bookingRequest.adults = window.bookingRequest.minAdults;
            window.bookingRequest.children = window.bookingRequest.minChildren;
            $('#booking_form_adults').val(window.bookingRequest.minAdults);
            $('#booking_form_children').val(window.bookingRequest.minChildren);
            $('span.adults_text').html(window.bookingRequest.adults);
            $('span.people_text').html(window.bookingRequest.adults + window.bookingRequest.children);
            $('span.children_text').html(window.bookingRequest.children + (window.accommodationCountChildrenStayFree > 0 ? " *" : ""));
            window.bookingRequest.extraItemsTotalPrice = 0;
            window.bookingRequest.selectedTimeFrom = null;
            window.bookingRequest.selectedDateFrom = null;
            window.bookingRequest.selectedTimeTo = null;
            window.bookingRequest.selectedDateTo = null;
            // window.bookingRequest.roomTypeId = 0;
            // window.bookingRequest.roomTypeTitle = '';

            $('.reservation_total').html(accommodations.formatPrice(window.bookingRequest.totalAccommodationOnlyPrice));
            $('.extra_items_total').html(accommodations.formatPrice(window.bookingRequest.extraItemsTotalPrice));
            $('.total_price').html(accommodations.formatPrice(window.bookingRequest.totalPrice));
            $('.confirm_total_price_p').html(accommodations.formatPrice(window.bookingRequest.totalPrice));
            $('.extra_items_total').html(accommodations.formatPrice(window.bookingRequest.extraItemsTotalPrice));
            $('table.extra_items_price_breakdown tbody').html('');
            $('table.accommodation_price_breakdown tbody').html('');
            $.uniform.update();
        },
        recalculateExtraItemTotals: function () {

            if (Object.size(window.bookingRequest.extraItems) > 0) {

                if (window.bookingRequest.extraItemsTotalPrice > 0) {
                    window.bookingRequest.totalPrice = window.bookingRequest.totalAccommodationOnlyPrice;
                    window.bookingRequest.extraItemsTotalPrice = 0;
                }

                $.each(window.bookingRequest.extraItems, function (id, extraItem) {

                    var extraItemPrice = extraItem.price;
                    if (extraItem.pricePerPerson) {
                        var adjustedChildren = window.bookingRequest.children - window.accommodationCountChildrenStayFree;
                        adjustedChildren = adjustedChildren > 0 ? adjustedChildren : 0;
                        extraItemPrice = (window.bookingRequest.adults * extraItemPrice) + (adjustedChildren * extraItemPrice);
                    }

                    if (extraItem.pricePerDay) {
                        extraItemPrice = extraItemPrice * window.bookingRequest.totalDays;
                    }

                    extraItem.summedPrice = extraItem.quantity * extraItemPrice;
                    window.bookingRequest.totalPrice += extraItem.summedPrice;
                    window.bookingRequest.extraItemsTotalPrice += extraItem.summedPrice;
                });
                $('.extra_items_total').html(accommodations.formatPrice(window.bookingRequest.extraItemsTotalPrice));
                $('.total_price').html(accommodations.formatPrice(window.bookingRequest.totalPrice));
            }
        },
        buildExtraItemsTable: function () {

            $('table.extra_items_price_breakdown thead').html('');
            $('table.extra_items_price_breakdown tfoot').html('');
            $('table.extra_items_price_breakdown tbody').html('');
            var headerRow = '';
            headerRow += '<tr class="rates_head_row">';
            headerRow += '<th>' + window.itemLabel + '</th>';
            headerRow += '<th>' + window.priceLabel + '</th>';
            headerRow += '</tr>';
            $('table.extra_items_price_breakdown thead').append(headerRow);
            var footerRow = '';
            footerRow += '<tr>';
            footerRow += '<th>' + window.priceTotalLabel + '</th>';
            footerRow += '<td class="extra_items_total">' + accommodations.formatPrice(0) + '</td>';
            footerRow += '</tr>';
            $('table.extra_items_price_breakdown tfoot').append(footerRow);
        },
        buildRatesTable: function () {

            var roomCount = window.bookingRequest.roomCount;
            var adults = $('#booking_form_adults').val() !== null ? parseInt($('#booking_form_adults').val(), 10) : 1;
            var children = $('#booking_form_children').val() !== null ? parseInt($('#booking_form_children').val(), 10) : 0;
            var headerRow = '';
            var footerRow = '';
            var colCount = 2;
            var selectedDateFrom = accommodations.getSelectedDateFrom();
            var selectedDateTo = accommodations.getSelectedDateTo();
            var selectedTimeFrom = selectedDateFrom.valueOf();
            var selectedTimeTo = selectedDateTo.valueOf();
            $(".price_row").show();
            $('table.accommodation_price_breakdown thead').html('');
            $('table.accommodation_price_breakdown tfoot').html('');
            $('table.accommodation_price_breakdown tbody').html('');
            headerRow += '<tr class="rates_head_row">';
            headerRow += '<th>' + window.dateLabel + '</th>';
            if (window.accommodationIsPricePerPerson) {

                if (window.bookingRequest.maxChildren > 0) {
                    headerRow += '<th>' + window.pricePerAdultLabel + '</th>';
                    headerRow += '<th>' + window.pricePerChildLabel + '</th>';
                    colCount = 4;
                } else {
                    headerRow += '<th>' + window.pricePerPersonLabel + '</th>';
                    colCount = 3;
                }
            }

            headerRow += '<th>' + window.pricePerDayLabel + '</th>';
            headerRow += '</tr>';
            $('table.accommodation_price_breakdown thead').append(headerRow);
            footerRow += '<tr>';
            if (window.accommodationCountChildrenStayFree > 0 && window.bookingRequest.maxChildren > 0) {
                footerRow += '<th colspan="' + (colCount - 1) + '">' + window.priceTotalChildrenStayFreeLabel + '</th>';
            } else {
                footerRow += '<th colspan="' + (colCount - 1) + '">' + window.priceTotalLabel + '</th>';
            }
            footerRow += '<td class="reservation_total">' + accommodations.formatPrice(0) + '</td>';
            footerRow += '</tr>';
            $('table.accommodation_price_breakdown tfoot').append(footerRow);
            if (selectedDateFrom && selectedDateTo) {

                $('#datepicker_loading').show();
                window.bookingRequest.totalPrice = 0;
                window.bookingRequest.totalAccommodationOnlyPrice = 0;
                window.rateTableRowIndex = 0;
                while (selectedTimeFrom < selectedTimeTo) {
                    accommodations.buildRateRow(selectedTimeFrom, adults, children, colCount);
                    if (window.accommodationRentType == 1) {
                        // weekly
                        selectedTimeFrom += (86400000 * 7);
                    } else if (window.accommodationRentType == 2) {
                        // monthly
                        var lastDayOfMonth = accommodations.daysInMonth(selectedDateFrom.getMonth() + 1, selectedDateFrom.getFullYear());
                        selectedTimeFrom += (86400000 * lastDayOfMonth);
                    } else {
                        // daily
                        selectedTimeFrom += 86400000;
                    }
                }

                $('.reservation_total').html(accommodations.formatPrice(window.bookingRequest.totalAccommodationOnlyPrice));
                $('.total_price').html(accommodations.formatPrice(window.bookingRequest.totalPrice));
                $('.booking-commands .book-accommodation-next').show();
                accommodations.bindNextButton();
                accommodations.bindCancelButton();
                $('#datepicker_loading').hide();
            }
        },
        buildRateRow: function (fromTime, adults, children, colCount) {

            var fromDate = new Date(fromTime);
            var tableRow = '';
            var pricePerDay = 0;
            var pricePerChild = 0;
            var dateToCheck = (fromDate.getFullYear() + '-' + ("0" + (fromDate.getMonth() + 1)).slice(-2) + '-' + ("0" + fromDate.getDate()).slice(-2));
            var datesArray = accommodations.getAccommodationVacancyDates();
            var vacancyStartDayIndex = $.inArray(dateToCheck, datesArray);
            var vacancyDay = null;
            if (vacancyStartDayIndex > -1) {

                vacancyDay = window.accommodationVacancyDays[vacancyStartDayIndex];
                // This outputs the result of the ajax request
                window.rateTableRowIndex++;
                if (vacancyDay.is_weekend && vacancyDay.weekend_price_per_day && vacancyDay.weekend_price_per_day > 0) {
                    pricePerDay = parseFloat(vacancyDay.weekend_price_per_day);
                } else {
                    pricePerDay = parseFloat(vacancyDay.price_per_day);
                }

                pricePerChild = 0;
                tableRow += '<tr>';
                tableRow += '<td>' + $.datepicker.formatDate(window.datepickerDateFormat, fromDate) + '</td>';
                if (window.accommodationIsPricePerPerson) {
                    if (vacancyDay.is_weekend && vacancyDay.weekend_price_per_day_child && vacancyDay.weekend_price_per_day_child > 0) {
                        pricePerChild = parseFloat(vacancyDay.weekend_price_per_day_child);
                    } else {
                        pricePerChild = parseFloat(vacancyDay.price_per_day_child);
                    }
                    tableRow += '<td>' + accommodations.formatPrice(pricePerDay) + '</td>';
                    if (window.bookingRequest.maxChildren > 0) {
                        tableRow += '<td>' + accommodations.formatPrice(pricePerChild) + '</td>';
                    }
                }

                if (window.accommodationIsPricePerPerson) {
                    children = children - window.accommodationCountChildrenStayFree;
                    children = children > 0 ? children : 0;
                    pricePerDay = (pricePerDay * adults) + (pricePerChild * children);
                } else {
                    pricePerDay = pricePerDay;
                }

                window.bookingRequest.totalPrice += pricePerDay;
                window.bookingRequest.totalAccommodationOnlyPrice += pricePerDay;
                tableRow += '<td>' + accommodations.formatPrice(pricePerDay) + '</td>';
                tableRow += '</tr>';
                $('table.accommodation_price_breakdown tbody').append(tableRow);
                if (window.rateTableRowIndex == window.bookingRequest.totalDays) {

                    if ($("table.accommodation_price_breakdown").data('tablesorter') === null || typeof ($("table.accommodation_price_breakdown").data('tablesorter')) == 'undefined') {
                        $("table.accommodation_price_breakdown").tablesorter({
                            debug: false,
                            dateFormat: window.datepickerDateFormat, // 'ddmmyyyy',
                            sortList: [[0, 0]]
                        });
                    }

                    $("table.accommodation_price_breakdown").trigger("update");
                    $("table.accommodation_price_breakdown").trigger("sorton", [[[0, 0]]]);
                    $("table.responsive").trigger('updated');
                }
            }

        },
        addBooking: function () {
            $confirmBookingForm = $('#confirmBookingForm');
            $btnConfirmBooking = $('#btn-AddBooking');
            // guardamos factura
            function confirmBooking() {
                // if (typeof $dataCart == "undefined") {
                // $(this).attr("disabled", "disabled");
                var $fromDate = window.fromDate;
                var $toDate = window.toDate;
                var customer_name = $('#booking-customer-name').val();
                var customer_surname = $('#booking-customer-surname').val();
                var customer_email = $('#booking-customer-email').val();
                var customer_zip = $('#booking-customer-zip').val();
                var customer_notes = $('#booking-customer-notes').val();
                var customer_address = $('#booking-customer-address').val();
                var customer_city = $('#booking-customer-city').val();
                var customer_province = $('#booking-customer-province').val();
                var customer_country = $('#booking-customer-country').val();
                var customer_phone = $('#booking-customer-phone').val();
                var arrival_hour = $('#booking-arrival-hour').val();
                var amount = $('#booking-price').val();
                var orig_amount = $('#booking-price').val();
                var men = parseInt($('.booking-occupancy').val()) || 0;
                var children = parseInt($('#booking-children').val()) || 0;
                var occupancy = parseInt($('.booking-occupancy').val()) + parseInt($('#booking-children').val());
                var price_occupancy = $('#modalBooking-occupancy').val();
                var price_board = $('#modalBooking-board').val();
                var price_policy = $('#modalBooking-policy').val();
                var cc_number = $('#cc_number').val();
                var cc_cvv = $('#cc_cvv').val();
                var cc_owner = $('#cc_owner').val();
                var cc_expiring = $('#cc_expiring').val();
                var item = [];
                $.each($('#listItemInvoice input[type="checkbox"]'), function () {
                    if (this.checked) {
                        item.push($(this).val());
                    }
                });
                var $customer = {
                    'name': customer_name,
                    'surname': customer_surname,
                    'email': customer_email,
                    'city': customer_city,
                    'address': customer_address,
                    'zip': customer_zip,
                    'notes': customer_notes,
                    'country': customer_country,
                    'lang': language.toUpperCase(),
                    'language_iso': language,
                    'language': 32,
                    'phone': customer_phone
                };
                var $rooms = [];
                var $products = [];
                $.each($dataCart, function (index, value) {
                    //var dc = index.split("-");
                    //alert( JSON.stringify(dc) );
                    //alert(JSON.stringify(value));
                    if (value.type == 'booking') {
                        var $room = {};
                        $room.pack = value.idPack;
                        $room.rcode = value.rcode || value.rtcode;
                        $room.pcode = $pcode;
                        $room.occupancy = value.occupancy;
                        $room.men = value.occupancy;
                        $room.board = value.board;
                        $room.policy = value.policyId;
                        $rooms.push($room);
                    }
                    if (value.type == 'product') {
                        var $product = {};
                        $product.id = value.key.replace("p", "");
                        ;
                        $product.quantity = value.quantity;
                        $products.push($product);
                    }
                });
                var $ccard = {
                    'cc_expiring': cc_expiring,
                    'cc_owner': cc_owner,
                    'cc_number': cc_number,
                    'cc_cvv': cc_cvv
                };
                var data = {
                    'pcode': $pcode,
                    'rooms': JSON.stringify($rooms),
                    'products': JSON.stringify($products),
                    'customer': JSON.stringify($customer),
                    'ccard': JSON.stringify($ccard),
                    'amount': amount,
                    'orig_amount': orig_amount,
                    'date_received': moment().format('YYYY-MM-DD'),
                    'date_arrival': $fromDate,
                    'date_departure': $toDate,
                    'arrival_hour': arrival_hour,
                    'rooms_occupancies': 0,
                    'reservation_code': occupancy,
                    'customer_notes': customer_notes,
                    'promoCode': $promoCode,
                    'action': 'hg_frontend_submit',
                    /*'occupancy': price_occupancy,
                     'men': price_occupancy,
                     'board': price_board,*/
                    'reservation_code': price_policy,
                    'item': item
                };
                //alert( JSON.stringify(data) );return;
                confirmBookingUrl = ( typeof hg_params === "undefined" ) ? baseurl + '/ajaxbooking.php' : hg_params.ajaxurl ;
                $.ajax({
                    url: confirmBookingUrl,
                    method: 'post',
                    //contentType: "charset=utf-8",
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {

                            //tpv
                            if (data.tpv) {
                                toastr.success('Vas a ser redirigido a la pasarelo de pago');
                                $form = $('<form id="tpvForm" action="' + data.tpv.path + '" method="post"></form>');
                                $.each(data.tpv.fields, function (index, field) {
                                    $form.append('<input type="hidden" name="' + index + '" value="' + field + '" />');
                                });
                                $('body').append($form);
                                $("#tpvForm").submit();
                            } else {
                                accommodations.payConfirmation(data.data.rscode);
                            }

                        } else {
                            toastr.error($('#i18n-Reasignar').val());
                            $('#btn-AddBooking').prop("disabled", false);
                        }
                    },
                    error: function () {
                        $('#btn-AddBooking').prop("disabled", false);
                        toastr.error($('#i18n-ErrServer').val());
                    },
                    complete: function () {
                        //
                    }
                });
            }


            // Fix submit
            $confirmBookingForm.submit(function (event) {
                event.preventDefault();
                $(this).validator('validate');
                if ($btnConfirmBooking.hasClass("disabled")) {
                    return false;
                } else {
                    //alert($rateForm.prop('class'));
                    confirmBooking();
                    $btnConfirmBooking.attr("disabled", "disabled");
                }
                event.preventDefault();
                return false;
            });
        },
        payConfirmation: function (rscode) {

            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': rscode, // Transaction ID. Required.
                'affiliation': 'booking', // Affiliation or store name.
                'revenue': $('.footerCart').attr('data-price')          // Grand Total.
            });
            $.each($dataCart, function (index, value) {
                ga('ecommerce:addItem', {
                    'id': value.rcode, // Transaction ID. Required.
                    'name': value.title, // Product name. Required.
                    'sku': value.rcode + '' + value.occupancy + '' + value.board + '' + value.policyId, // SKU/code.
                    'category': 'room', // Category or variation.
                    'price': value.price, // Unit price.
                    'quantity': '1'                         // Quantity.
                });
            });
            ga('ecommerce:send');
            ga('clientTracker.require', 'ecommerce');
            ga('clientTracker.ecommerce:addTransaction', {
                'id': rscode, // Transaction ID. Required.
                'affiliation': 'booking', // Affiliation or store name.
                'revenue': $('.footerCart').attr('data-price')          // Grand Total.
            });
            $.each($dataCart, function (index, value) {
                ga('clientTracker.ecommerce:addItem', {
                    'id': value.rcode, // Transaction ID. Required.
                    'name': value.title, // Product name. Required.
                    'sku': value.rcode + '' + value.occupancy + '' + value.board + '' + value.policyId, // SKU/code.
                    'category': 'room', // Category or variation.
                    'price': value.price, // Unit price.
                    'quantity': '1'                         // Quantity.
                });
            });
            ga('clientTracker.ecommerce:send');
            //fb anlictics
            if (typeof query.fbAnalytics !== "undefined") {
                fbq('track', 'Purchase', {currency: "USD", value: $('.footerCart').attr('data-price')});
            }
            toastr.success(translator.get("Your booking is now confirmed"));
            $('#modalFinish .reference').html(rscode);
            $('#modalConfirmBooking').modal('hide');
            $('#modalFinish').modal('show');
            $('#modalFinish').on('hidden.bs.modal', function (e) {
                setTimeout(function () {
                    window.location = window.location.href.replace("&tpv=ok", "");
                }, 20);
            });
        },
        payNotConfirmation: function () {
            toastr.error(translator.get("Your booking is not confirmed"), '', {closeButton: true, timeOut: 15000});
        },
        showBookingForm: function () {

            $('.booking_form_adults_p').html(window.bookingRequest.adults);
            $('.booking_form_children_p').html(window.bookingRequest.children);
            $('.booking_form_room_type_p').html(window.bookingRequest.roomTypeTitle);
            $('.booking_form_date_from_p').html(window.bookingRequest.selectedDateFrom);
            $('.booking_form_date_to_p').html(window.bookingRequest.selectedDateTo);
            $('.booking_form_reservation_total_p').html(accommodations.formatPrice(window.bookingRequest.totalAccommodationOnlyPrice));
            $('.booking_form_extra_items_total_p').html(accommodations.formatPrice(window.bookingRequest.extraItemsTotalPrice));
            $('.booking_form_total_p').html(accommodations.formatPrice(window.bookingRequest.totalPrice));
            $('.accommodation-booking-form').show();
        },
        hideBookingForm: function () {
            $('.accommodation-booking-form').hide();
        },
        showConfirmationForm: function () {
            $('.accommodation-confirmation-form').show();
        },
        showAccommodationScreen: function () {
            $('.lSSlideOuter').show();
            $('.inner-nav').show();
            $('.tab-content:first').show();
        },
        hideAccommodationScreen: function () {
            $('.lSSlideOuter').hide();
            $('.inner-nav').hide();
            $('.tab-content').hide();
        },
        selectDateFrom: function (time, dateText) {

            window.bookingRequest.totalPrice = 0;
            window.bookingRequest.totalAccommodationOnlyPrice = 0;
            window.bookingRequest.totalDays = 0;
            window.bookingRequest.adults = 1;
            window.bookingRequest.children = 0;
            window.bookingRequest.extraItemsTotalPrice = 0;
            window.bookingRequest.selectedTimeFrom = time;
            window.bookingRequest.selectedDateFrom = dateText;
            window.bookingRequest.selectedTimeTo = null;
            window.bookingRequest.selectedDateTo = null;
            $('.price_breakdown').hide();
            $("#selected_date_from").val(time);
            $("#selected_date_to").val(null);
            $(".date_from_text").html(dateText);
            $(".date_to_text").html(window.defaultDateToText);
            $(".booking-commands").show();
            $(".booking-commands .book-accommodation-reset").show();
            $(".booking-commands .book-accommodation-next").hide();
            $(".dates_row").show();
            $(".price_row").hide();
            accommodations.populateAvailableEndDates(accommodations.getSelectedDateFrom(), window.accommodationId, window.bookingRequest.roomTypeId, accommodations.rebindEndDates);
            accommodations.bindFormControls();
        },
        selectDateTo: function (time, dateText) {

            $('.price_breakdown').show();
            $('table.accommodation_price_breakdown thead').html('');
            $('table.accommodation_price_breakdown tbody').html('');
            $('table.accommodation_price_breakdown tfoot').html('');
            $(".date_to_text").html(dateText);
            $("#selected_date_to").val(time);
            window.bookingRequest.selectedTimeTo = time;
            window.bookingRequest.selectedDateTo = dateText;
            accommodations.bindRequiredExtraItems();
        },
        getSelectedDateFrom: function () {
            if ($(".fromDate").val()) {
                return accommodations.convertLocalToUTC(new Date(parseInt($(".fromDate").val())));
            }
            return null;
        },
        getSelectedDateTo: function () {
            if ($(".toDate").val()) {
                return accommodations.convertLocalToUTC(new Date(parseInt($(".toDate").val())));
            }
            return null;
        },
        getSelectedTimeFrom: function () {
            if ($("#selected_date_from").val()) {
                return parseInt($("#selected_date_from").val());
            }
            return null;
        },
        getSelectedTimeTo: function () {
            if ($("#selected_date_to").val()) {
                return parseInt($("#selected_date_to").val());
            }
            return null;
        },
        addProductToCart: function () {

            var selectedDateFrom = accommodations.convertLocalToUTC(new Date(window.bookingRequest.selectedTimeFrom));
            var selectedDateTo = accommodations.convertLocalToUTC(new Date(window.bookingRequest.selectedTimeTo));
            var dateFrom = selectedDateFrom.getFullYear() + "-" + (selectedDateFrom.getMonth() + 1) + "-" + selectedDateFrom.getDate();
            var dateTo = selectedDateTo.getFullYear() + "-" + (selectedDateTo.getMonth() + 1) + "-" + selectedDateTo.getDate();
            if (!window.bookingRequest.roomTypeId)
                window.bookingRequest.roomTypeId = 0;
            var roomCount = window.bookingRequest.roomCount;
            if (!roomCount)
                roomCount = 1;
            var dataObj = {
                'action': 'accommodation_booking_add_to_cart_ajax_request',
                'user_id': window.currentUserId,
                'accommodation_id': window.accommodationId,
                'room_type_id': window.bookingRequest.roomTypeId,
                'room_count': roomCount,
                'extra_items': window.bookingRequest.extraItems,
                'adults': window.bookingRequest.adults,
                'children': window.bookingRequest.children,
                'date_from': dateFrom,
                'date_to': dateTo,
                'nonce': BYTAjax.nonce
            };
            $.each(window.bookingFormFields, function (index, field) {
                if (field.hide !== '1') {
                    dataObj[field.id] = $('#' + field.id).val();
                }
            });
            $.ajax({
                url: BYTAjax.ajaxurl,
                data: dataObj,
                success: function (data) {

                    accommodations.redirectToCart();
                },
                error: function (errorThrown) {
                    //console.log(errorThrown);
                }
            });
        },
        populateAvailableDays: function ($rcode, roomTypeId) {
        },
        redirectToCart: function () {
            top.location.href = window.wooCartPageUri;
        },
        populateAvailableStartDays: function (accommodationId, roomTypeId, callDelegate) {
            if ($debug) {
                console.log('----------  populateAvailableStartDays  ----------');
                console.log($listRoom);
            }

            if ($listRoom[accommodationId].is_availability > 0) {
                return;
            }

            $('.datepicker_loading').show();
            window.accommodationVacancyStartDays = [];
            var dataObj = {
                'action': 'accommodation_available_start_days_ajax_request',
                'rtcode': accommodationId,
                'room_type_id': roomTypeId,
                'month': window.currentMonth,
                'year': window.currentYear,
                'fromDate': window.calendarfromDate,
                'toDate': window.calendartoDate
                        /* 'nonce' : BYTAjax.nonce*/
            };
            $.ajax({
                // url: '/accommodation_available_days_ajax_request.json',
                url: path + 'calendar/availabilityRoom/',
                data: dataObj,
                dataType: 'json',
                success: function (datesJson) {
                    //window.accommodationVacancyStartDays = JSON.parse(datesJson);
                    window.accommodationVacancyStartDays = datesJson;
                    if (typeof (callDelegate) !== 'undefined') {
                        callDelegate();
                    }

                    $('.datepicker_loading').hide();
                },
                error: function (errorThrown) {
                    //console.log(errorThrown);
                }
            });
        },
        displayGallery: function () {
            $('#myCarousel .carousel-inner').html('');
            $('#myCarousel .carousel-indicators').html('');
            $.each($gallery, function (index, value) {
                //alert(value.url);
                $('<div class="item"><img src="' + value.url + '"><div class="carousel-caption"></div></div>').appendTo('.carousel-inner');
                $('<li data-target="#carousel-example-generic" data-slide-to="' + index + '"></li>').appendTo('.carousel-indicators');
            });
            $('#myCarousel .carousel-indicators > li').first().addClass('active');
            $('#myCarousel .carousel').carousel();
            $('#myCarousel .item').removeClass('active');
            $('#myCarousel .item').first().addClass('active');
        },
        displayGalleryRoom: function (room) {
            //console.log('-----------  displayGalleryRoom  --------------')
            //console.log($galleryRoom[room]);
            $('#gallery' + room).remove();
            var $div = $('<div id="gallery' + room + '" class="galleryRoom" style="display: none;" ><div/>').appendTo('body');
            $.each($galleryRoom[room], function (index, value) {
                i = index + 1;
                f = $galleryRoom[room].length;
                thumbsImg = value.url.replace(value.ext, '');
                //alert(  thumbsImg+'_300x225'+value.ext  );
                $('<a title="' + i + '/' + f + '" href="' + value.url + '" data-lightbox-gallery="gallery' + room + '"></a>').appendTo('#gallery' + room);
                // $('<div class="item"><img src="' + value.url + '"><div class="carousel-caption"></div></div>').appendTo('#myCarousell .carousel-inner');
                $('<div class="item"><img class="img-responsive" src="' + thumbsImg + '_400x300' + value.ext + '"></div>').appendTo('#myCarousel' + room + ' .carousel-inner'); //v3
                $('<li data-target="#carousel-example-generic" data-slide-to="' + index + '"></li>').appendTo('#onlyRoom .carousel-indicators');
            });
            $('#gallery-' + room + ' a').trigger("click");
            $('#gallery' + room + ' a').nivoLightbox();
            $('.buttonGallery' + room).on('click', function (e) {
                $('#gallery' + room + ' a:first').trigger("click");
                e.preventDefault();
            });
            $('#myCarousel' + room + ' .item').first().addClass('active');
            $('#myCarousel' + room + ' .carousel-indicators > li').first().addClass('active');
            $('#myCarousel' + room + ' .carousel').carousel();
            //v3
            $('#myCarousel' + room).carousel();
            $('#myCarousel' + room + ' .item').first().addClass('active');
        },
        populateAvailableEndDates: function (startDate, accommodationId, roomTypeId, callDelegate) {

            return;
        },
        getAccommodationVacancyDates: function () {

            var accommodationVacancyDates = [];
            if (window.accommodationVacancyDays) {
                $.each(window.accommodationVacancyDays, function (index, day) {
                    accommodationVacancyDates.push(day.single_date);
                });
            }

            return accommodationVacancyDates;
        },
        getAccommodationVacancyStartDates: function () {
            var accommodationVacancyStartDates = [];
            if (window.accommodationVacancyStartDays) {
                $.each(window.accommodationVacancyStartDays, function (index, day) {
                    accommodationVacancyStartDates.push(day.single_date);
                });
            }

            return accommodationVacancyStartDates;
        },
        getAccommodationIsReservationOnly: function (accommodationId) {

            var isReservationOnly = 0;
            var dataObj = {
                'action': 'accommodation_is_reservation_only_ajax_request',
                'accommodation_id': accommodationId,
                'nonce': BYTAjax.nonce
            };
            $.ajax({
                url: BYTAjax.ajaxurl,
                data: dataObj,
                async: false,
                success: function (data) {
                    // This outputs the result of the ajax request
                    isReservationOnly = parseInt(data);
                },
                error: function (errorThrown) {

                }
            });
            return isReservationOnly;
        },
        icoBoard: function (board) {
            var $class = '';
            switch (board) {
                case 'nb':
                    $class = 'fa-bed';
                    break;
                case 'bb':
                    $class = 'fa-coffee';
                    break; //"\f0f4"
                case 'fb':
                case 'hb':
                case 'ai':
                    $class = 'fa-cutlery';
                    break; //"\f0f5"
                default:
                    ''
            }
            return $class;
        },
        rebindEndDates: function () {

            if (typeof $('.vacancy_datepicker') !== 'undefined') {

                var selectedDateFrom = accommodations.getSelectedDateFrom();
                var year = selectedDateFrom.getFullYear();
                var month = selectedDateFrom.getMonth();
                var daysInMonth = accommodations.daysInMonth(month + 1, year);
                if (daysInMonth < selectedDateFrom.getDate() || window.accommodationVacancyEndDates.length === 0) {

                    $(".date_from_text").html("");
                    $("#selected_date_from").val("");
                    $(".date_to_text").html(window.defaultDateToText);
                    $("#selected_date_to").val("");
                    $(".dates_row").hide();
                    $(".price_row").hide();
                    accommodations.populateAvailableDays(window.accommodationId, window.bookingRequest.roomTypeId);
                    accommodations.populateAvailableStartDays(window.accommodationId, window.bookingRequest.roomTypeId, accommodations.refreshCalendar);
                }

                $('.vacancy_datepicker').datepicker("refresh");
            }
        },
        placeholderTranslate: function () {
            $("#booking-customer-name").attr('placeholder', translator.get("Name"));
            $("#booking-customer-surname").attr('placeholder', translator.get("Surname"));
            $("#booking-customer-phone").attr('placeholder', translator.get("Telephone"));
            $("#booking-customer-email").attr('placeholder', translator.get("E-Mail"));
            $("#booking-customer-city").attr('placeholder', translator.get("City"));
            $("#booking-customer-address").attr('placeholder', translator.get("Address"));
            $("#booking-customer-zipcode").attr('placeholder', translator.get("Zip Code"));
            $("#booking-customer-country").attr('placeholder', translator.get("Country"));
            $("#booking-arrival-hour").attr('placeholder', translator.get("Arrival time"));
            $("#booking-arrival-hour").on('click', function () {
                $("#booking-arrival-hour").attr('type', 'time' );
            });
            $("#cc_number").attr('placeholder', translator.get("Credit Card Number"));
            $("#cc_owner").attr('placeholder', translator.get("Credit Card Placeholder"));
            $("#cc_expiring").attr('placeholder', translator.get("Expiration date"));
            $("#comments,#booking-customer-notes").attr('placeholder', translator.get("Please write any special requirement."));
            return;
        },
        alert: function (message, title) {
            var timestamp = new Date().getUTCMilliseconds();
            $("body").append('<div id="bootstrap-alert-box-modal' + timestamp + '" class="modal fade">\
                <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="modal-header" style="min-height:40px;">\
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                            <h4 class="modal-title"></h4>\
                        </div>\
                        <div class="modal-body"><p></p></div>\
                        <div class="modal-footer">\
                            <a href="#" data-dismiss="modal" class="btn btn-default">Close</a>\
                        </div>\
                    </div>\
                </div>\
            </div>');
            $("#bootstrap-alert-box-modal" + timestamp + " .modal-header h4").html(title || "");
            $("#bootstrap-alert-box-modal" + timestamp + " .modal-body p").html(message || "");
            $("#bootstrap-alert-box-modal" + timestamp).modal('show');
        },
        processBooking: function () {
            return;
        },
        formatPrice: function (price) {
            var discountDiv = '';
            if (!$.isEmptyObject(discountObj)) {
                if (discountObj.type == 1) {
                    discount = discountObj.value;
                } else {
                    discount = ((discountObj.value / 100) * price);
                }

                discountDiv = '<span class="discount-price">- ' + price.toFixed(window.priceDecimalPlaces) + ' ' + window.currencySymbol + '</span>';
                price = price - discount;
            }

            if (window.currencySymbolShowAfter)
                return price.toFixed(window.priceDecimalPlaces) + ' ' + window.currencySymbol + discountDiv;
            else
                return window.currencySymbol + ' ' + price.toFixed(window.priceDecimalPlaces) + discountDiv;
        },
        formatPriceOrigin: function (price) {
            if (window.currencySymbolShowAfter)
                return price.toFixed(window.priceDecimalPlaces) + ' ' + window.currencySymbol;
            else
                return window.currencySymbol + ' ' + price.toFixed(window.priceDecimalPlaces);
        },
        calculateDifferenceInDays: function (date1, date2) {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            firstDate = date1; //new Date(2008,01,12);
            secondDate = date2; //new Date(2008,01,22);

            return diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        },
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        readmore: function (text, limit, addicionaltext) {
            var timestamp = new Date().getUTCMilliseconds();
            addicionaltext = (typeof addicionaltext === "undefined") ? '' : addicionaltext;
            limit = (limit > 0) ? limit : 310;
            text = (typeof text === 'undefined') ? '' : text; //valida undefined
            try{
                textlength = (typeof text === 'undefined') ? 0 : text.length; //valida undefined
            } catch (err) {
               textlength = 0;
               console.log('Error 3023');
            }
            if (limit == 1) {
                $return = '<a class="more" data-id="' + readmoreList.length + '"><i class="fa fa-info"></i></a>';
                readmoreList.push(text + addicionaltext);
            } else if ( textlength > limit) {
                $return = text.replace(/(<([^>]+)>)/ig, "").substring(0, limit) + "..." + '<a class="more" data-id="' + readmoreList.length + '">' + translator.get("more") + '</a>';
                readmoreList.push(text + addicionaltext);
            } else {
                $return = text;
            }
            $('.more').unbind('click').on('click', function () {
                accommodations.alert(readmoreList[$(this).data('id')]);
            });
            return $return;
            //return new Date(year, month, 0).getDate();
        },
        readmoreUpdate: function (text, limit, addicionaltext) {
            $('.more').unbind('click').on('click', function () {
                accommodations.alert(readmoreList[$(this).data('id')]);
            });
        },
        quantityOptionHtml: function (selector) {
            var selectQuantityOption = '';
            for (i = 1; i <= selector; i++) {
                selectQuantityOption +=  '<option value="'+i+'">'+i+'</option>';
            }
            return selectQuantityOption;
        },
        convertLocalToUTC: function (date) {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        },
        trimTrailingComma: function (str) {
            if (str.substr(-1) === ',') {
                return str.substr(0, str.length - 1);
            }
            return str;
        },
        insertParam: function (key, value) {
            key = encodeURI(key);
            value = encodeURI(value);
            var kvp = document.location.search.substr(1).split('&');
            var i = kvp.length;
            var x;
            while (i--)
            {
                x = kvp[i].split('=');
                if (x[0] == key)
                {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }
            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }
            return kvp.join('&');
            //this will reload the page, it's likely better to store this until finished
            //document.location.search = kvp.join('&');
        }
    };

    window.confirm = function (message, title, yes_label, cancel_label, callback) {
        $("#bootstrap-confirm-box-modal").data('confirm-yes', false);
        if ($("#bootstrap-confirm-box-modal").length == 0) {
            $("body").append('<div id="bootstrap-confirm-box-modal" class="modal fade">\
                <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="modal-header" style="min-height:40px; display:none">\
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                            <h4 class="modal-title"></h4>\
                        </div>\
                        <div class="modal-body"><p></p></div>\
                        <div class="modal-footer">\
                            <a href="#" data-dismiss="modal" class="btn btn-default">' + (cancel_label || 'OK') + '</a>\
                            <input value="' + (yes_label || 'OK') + '" class="btn btn-primary" type="button">\
                        </div>\
                    </div>\
                </div>\
            </div>');
            $("#bootstrap-confirm-box-modal .modal-footer .btn-primary").on('click', function () {
                $("#bootstrap-confirm-box-modal").data('confirm-yes', true);
                $("#bootstrap-confirm-box-modal").modal('hide');
                return false;
            });
            $("#bootstrap-confirm-box-modal").on('hide.bs.modal', function () {
                if (callback)
                    callback($("#bootstrap-confirm-box-modal").data('confirm-yes'));
            });
        }
        if (title) {
            $("#bootstrap-confirm-box-modal .modal-header h4").text(title || "");
        }
        $("#bootstrap-confirm-box-modal .modal-body p").text(message || "");
        $("#bootstrap-confirm-box-modal").modal('show');
    };
})(jQuery);
