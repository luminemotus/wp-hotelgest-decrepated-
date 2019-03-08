(function ($) {

    var i18nRangHotel;
    i18nRangHotel = dictRangHotel[hg_params.language];


    var date_select_input = $('#DateRangHotel, #DateRangHotelMobile');
    var checkin_input = $('#fromDateHg');
    var checkout_input = $('#toDateHg');
//document.getElementById('DateRangHotel')
    var datepickerhg = new HotelDatepicker($('#DateRangHotel')[0], {
        infoFormat: hg_params.datepicker_format,
        i18n: i18nRangHotel,
        startOfWeek: 'monday',
        monthSelect: true,
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
            var checkin_date_formatted = moment(checkin_date, hg_params.datepicker_format);
            var checkout_date_formatted = moment(checkout_date, hg_params.datepicker_format);
            var chckin_d_format = fecha.format(checkin_date, 'DD-MM-YYYY');
            var chckout_d_format = fecha.format(checkout_date, 'DD-MM-YYYY');
            ;
            date_select_input.val(checkin_date_formatted.format("D MMM YYYY") + " - " + checkout_date_formatted.format("D MMM YYYY"));
            // date_select_input.val(checkin_date_formatted + " - " + checkout_date_formatted);
            checkin_input.val(chckin_d_format).attr('hdin', s1);
            checkout_input.val(chckout_d_format).attr('hdout', s2);
        }
    });
    
    
  
    
    
})(jQuery);