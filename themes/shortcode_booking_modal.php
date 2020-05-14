<div version="2.0">
    <?php //include_once '_confirmbooking.php'; ?>
    <?php /* <script src="<?php echo $baseurl; ?>/js/card.js" type="text/javascript"></script> */ ?>

    <div role="dialog" tabindex="-1" id="modalConfirmBooking" class="modal inmodal fade in">
        <div class="modal-dialog modal-xl">
            <form data-toggle="validator" id="confirmBookingForm" role="form">
                <div class="modal-content">
                    <div class="modal-header">
                        <button id="btn-ConfirmBooking" name="btn-ConfirmBooking" data-dismiss="modal" class="btn btn-primary trn pull-right" type="button">Book more rooms</button>
                        <h2 class="trn">Confirm booking</h2>
                    </div>

                    <div class="modal-body-book row">

                        <!-- bloque extras and customer -->
                        <div class="panel-group col-xs-12 col-sm-6" id="checkoutbook">
                            <div class="panel">
                                <div class="panel-heading">
                                    <h3>
                                        <a id="btn-customerdetails" data-toggle="collapse" data-parent="#checkoutbook" href="#customerdetails">
                                            <span class="trn">Your details</span><i class="fa fa-angle-down rotate-icon"></i>
                                        </a>
                                    </h3>
                                </div>
                                <div id="customerdetails" class="panel-collapse collapse in">
                                    <div class="panel-body">

                                        <div class="row form-group">
                                            <div class="col-xs-12 col-sm-4 form-group">
                                                <div class="input-group col-xs-12">
                                                    <input value="" id="booking-customer-name" placeholder="Name*" type="text" class="form-control customer-name" name="booking-customer-name" required >
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-8 form-group">
                                                <div class="input-group col-xs-12">
                                                    <input value="" id="booking-customer-surname" placeholder="Surname*" type="text" class="form-control customer-surname" name="booking-customer-last-name" required  >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-xs-12 col-sm-4 form-group">
                                                <input value="" id="booking-customer-phone" placeholder="Telephone*" type="tel"  class="form-control customer-phone" name="booking-customer-phone" required >
                                            </div>
                                            <div class="col-xs-12 col-sm-8 form-group">
                                                <input value="" id="booking-customer-email" placeholder="E-Mail*" type="email" class="form-control customer-mail" name="booking-customer-email" required >
                                            </div>
                                        </div>

                                        <div class="row form-group">
                                            <div class="col-xs-12 col-sm-4 form-group">
                                                <input value="" id="booking-customer-city" placeholder="City" class="form-control customer-city" name="booking-customer-city" type="text" >
                                            </div>
                                            <div class="col-xs-12 col-sm-8 form-group">
                                                <input value="" id="booking-customer-address" placeholder="Address" type="text" class="form-control customer-address" name="booking-customer-address" >
                                            </div>
                                        </div>

                                        <div class="row form-group">
                                            <div class="col-xs-12 col-sm-4 form-group">
                                                <input value="" id="booking-customer-zipcode" placeholder="Zip Code" class="form-control customer-zipcode" name="geoname" type="text" >
                                            </div>
                                            <div class="col-xs-12 col-sm-4 form-group">
                                                <input value=""  id="booking-customer-country" placeholder="Country" type="text" class="form-control customer-country" name="customer-address" >
                                            </div>
                                            <div class="col-xs-12 col-sm-4 form-group">
                                                <input value=""  id="booking-customer-address" placeholder="Arrival time" type="time" class="form-control customer-arrival-time" name="customer-arrival-time" >
                                            </div>
                                        </div>
                                        <hr>
                                        <h3><a data-toggle="collapse" data-target="#pago" class="trn">Payment</a></h3>
                                        <div class="row form-group">
                                            <div id="pago" class="collapse"></div>
                                            <div id="noPayment" style="display: none">
                                                <div class="card-wrapper col-xs-12 col-sm-5 hidden-xs" style="transform: scale(0.9);"></div>
                                                <div class="ccard row form-group col-xs-12 col-sm-6 pull-right" style="margin-top: 10px;">
                                                    <div class="col-xs-12 ">
                                                        <input type="text" class="card form-control" id="cc_number" minlength="13" maxlength="19" name="number" placeholder="Número de tarjeta*" required />
                                                    </div>
                                                    <div class="col-xs-12">
                                                        <input type="text" class="card form-control" id="cc_owner" name="first-name" placeholder="Titular*" required />
                                                    </div>
                                                    <div class="col-xs-12">
                                                        <input type="text" class="card form-control" id="cc_expiring" maxlength="9" name="expiry" placeholder="Fecha expiración MM/AAAA*" required />
                                                    </div>
                                                    <?php /*
                                                    <div class="col-xs-12">
                                                        <input type="text" class="card form-control" id="cc_cvv" maxlength="9" name="cvc" placeholder="CVV" required />
                                                    </div>*/?>
                                                </div>
                                            </div>
                                            <div id="tpvPayment" class="alert alert-success" style="display: none">
                                                <span class="trn">You will be redirected to the payment gateway. The total amount to pay to confirm this booking is:</span>
                                                <span class="price"> </span>
                                            </div>
                                        </div>

                                        <script type="text/javascript" >
                                            (function ($) {
                                                $(document).ready(function () {
                                                    $('#checkoutbook .panel-heading a').on('click', function (e) {
                                                        if ($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
                                                            e.stopPropagation();
                                                        }
                                                    });

                                                    var card = new Card({
                                                        // a selector or DOM element for the form where users will
                                                        // be entering their information
                                                        form: 'div.ccard', // *required*
                                                        // a selector or DOM element for the container
                                                        // where you want the card to appear
                                                        container: '.card-wrapper', // *required*
                                                        formSelectors: {
                                                            nameInput: 'input[name="first-name"], input[name="last-name"]'
                                                        },
                                                        width: 100, // optional — default 350px
                                                        formatting: true, // optional - default true

                                                        // Strings for translation - optional
                                                        messages: {
                                                            validDate: 'valid\ndate', // optional - default 'valid\nthru'
                                                            monthYear: 'mm/yyyy', // optional - default 'month/year'
                                                        },
                                                        // Default placeholders for rendered fields - optional
                                                        placeholders: {
                                                            number: '•••• •••• •••• ••••',
                                                            name: 'Full Name',
                                                            expiry: '••/••',
                                                            cvc: '••/••'

                                                        },
                                                        // if true, will log helpful messages for setting up Card
                                                        debug: false // optional - default false
                                                    });
                                                });
                                            })(jQuery);
                                        </script>


                                        <h3><a <?php /* data-toggle="collapse" data-target="#observaciones" */ ?> class="trn">Notes</a></h3>
                                        <div id="observaciones" class="collapse-">
                                            <div class="form-group">
                                                <textarea id="booking-customer-notes" class="form-control" placeholder="Please write any special requirement."></textarea>
                                            </div>
                                        </div>
                                        <hr>

                                        <div class="form-group">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" value="" required> <span class="trn">My e-mail is correct</span> (<span class="email">email@email.com</span>)
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" value="" required> <span class="trn">I accept the </span> <a data-toggle="collapse" data-target="#lopd" style="display: inline;"><span class="trn">privacy data policy</span></a> <a data-toggle="collapse" data-target="#additional_info" style="display: inline;"><span class="trn">cancellation and additional information policy</span></a>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div id="lopd" class="collapse policytext-area">

                                            </div>
                                            <div id="additional_info" class="collapse policytext-area">
                                            </div>

                                        </div>
                                        <!--                                            <div class="form-group">
                                                                                        <button id="btn-ConfirmBooking" name="btn-ConfirmBooking" data-dismiss="modal" class="btn btn-white trn" type="button">Close</button>
                                                                                        <button id="btn-AddBooking" name="btn-AddBooking" class="btn btn-primary trn" type="submit" >Confirm booking</button>
                                                                                    </div>-->
                                    </div>
                                </div>
                            </div>

                            <div class="panel">
                                <div class="panel-heading">
                                    <h3>
                                        <a class="trn " id="btn-extrasContainer" data-toggle="collapse" data-parent="#checkoutbook" href="#extrasContainer">
                                            Extras <i class="fa fa-angle-down rotate-icon"></i>
                                        </a>
                                    </h3>
                                </div>
                                <div id="extrasContainer" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <div id="extras">
                                            <div id="itemExtras" ></div>
                                            <button class="btn btn-primary trn " id="btn-continueCustomDetails" role="button" >Continue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- cart details-->
                        <div class="panel-group col-xs-12 col-sm-6">
                            <div id="tooltip-cart" style="display: none"></div>
                            <div id="modal-cart" style="display: none">
                                <h4><span class="trn">Booking summary</span> <span class="dateCart"></span></h4>
                                <div class="bodyCart"></div>
                                <div class="footerCart">
                                    <h5 class="trn">Total: <span class="pull-right">-€</span></h5>
                                    <p class="trn tax_included" style="display:none">TAX Included</p>
                                    <p class="tax_excluded" style="display:none">
                                        <span class="trn">TAX Excluded</span>: <span class="tax"></span>% <span class="trn">taxes</span>.
                                    </p>
                                    <small class="payment_booking_engine" style="display:none"></small>
                                    <button id="btn-AddBooking" name="btn-AddBooking" class="btn btn-primary trn pull-right" type="submit" >Confirm booking</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btn-ConfirmBooking" name="btn-ConfirmBooking" data-dismiss="modal" class="btn btn-white trn" type="button">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div role="dialog" tabindex="-1" id="modalFinish" class="modal inmodal fade in">
        <div class="modal-dialog ">
            <?php /* <form data-toggle="validator" id="rateMasterForm" role="form"> */ ?>
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span><span class="sr-only trn">Close</span>
                    </button>
                    <h2 class="trn">Your booking is now confirmed</h2>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <span class="trn">This is your booking number </span><span class="reference">{reference}</span>,
                            <span class="trn">we recommend you to save it in case you need to modify or cancel your booking later</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer"></div>
            </div>
            <?php /* </form> */ ?>
        </div>
    </div>

    <div class="modal fade alert-modal-sm" tabindex="-1" role="dialog" aria-labelledby="alertSmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content"></div>
        </div>
    </div>
</div>
