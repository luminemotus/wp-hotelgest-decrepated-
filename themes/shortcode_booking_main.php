<div class="container-hg">
    <mobile-reservation-summary>
        <div ng-show="!rooms.isEmpty()" id="btn-summary" class="ng-hide">
            <div id="sticky-anchor"></div>
            <div id="sticky">
                <div class="content-shopping-cart  dark">
                    <div class="row bottom-spacer-sml">
                        <div class="col-md-12">
                            <input type="text" id="DateRangHotelMobile" onfocus="blur();"  readonly="true" value="" placeholder="Seleccione fecha" name="fromtoDateMobile" class="fromDate pull-right form-control">
                        </div>
                        <div class="col-xs-6">
                            <input type="date" data-date-format="YYYY-MM-DD" id="fromDateMobile" placeholder="Llegada" value="<?php echo date("Y-m-d") ?>" name="fromDate" class="fromDate col-xs-12 hide form-control">
                        </div>
                        <div class="col-xs-6">
                            <input type="date" data-date-format="YYYY-MM-DD" id="toDateMobile" placeholder="Salida" value="<?php echo date("Y-m-d", strtotime("+1 day", strtotime(date('Y-m-d')))); ?>" name="toDate" class="toDate col-xs-12 hide form-control">
                        </div>
                    </div>
                    <div class="row bottom-spacer-sml">
                        <div class="col-xs-6">
                            <label class="trn">Persons</label>
                        </div>
                        <div class="col-xs-6">
                            <select id="group_adults" aria-label="Número de adultos" name="booking-occupancy" class="form-control m-p booking-occupancy">
                                <?php
                                $min_occumpancy = get_option('hotelgest_occupancy_min', '');
                                $max_occupancy = get_option('hotelgest_occupancy_max', '');

                                for ($i = $min_occumpancy; $i <= $max_occupancy; $i++):
                                    ?>
                                    <option value="<?php echo $i; ?>"><?php echo $i; ?><p> <?php _e('Persons', "hotelgest"); ?> </p></option>
                                <?php endfor; ?>
                            </select>
                        </div>
                        <div class="col-xs-4 hidden">
                            <select id="booking-children" aria-label="Número de child" name="booking-children" class="form-control m-p booking-children">
                                <?php  
                                $min_occumpancy = get_option('hotelgest_occupancy_min', '');
                                $max_occupancy = get_option('hotelgest_occupancy_max', '');

                                for ($i = $min_occumpancy; $i <= $max_occupancy; $i++):
                                    ?>
                                    <option value="<?php echo $i; ?>"><?php echo $i; ?><p> <?php _e('Persons', "hotelgest"); ?> </p></option>
                                <?php endfor; ?>
                            </select>
                        </div>
                    </div>
                    <div class="row bottom-spacer-sml">
                        <div class="col-xs-12">
                            <label class="trn" data-toggle="collapse" data-target="#promoCodeMobile" >Promotional code</label>
                        </div>
                        <div class="col-xs-12">
                            <input type="text" placeholder="Si lo tiene, escríbalo aquí." class="form-control discount-code collapse in" id="promoCodeMobile" name="discount-code" >
                        </div>
                    </div>
                    <button class="btn btn-success col-xs-12 trn" id="btn-search" type="button">Search</button>

                    <button class="btn btn-success col-xs-12 trn" data-toggle="collapse" style="display:none" data-target="#cart-mobile">Ver habitaciones reservadas</button>

                    <div id="cart-mobile" class="collapse">
                        <div id="cart" class="mt20" style="display: none">
                            <h4 class="trn">Booking summary</h4>
                            <div class="bodyCart"></div>
                            <div class="footerCart">
                                <h5 class="trn">Total: <span class="pull-right">-€</span></h5>
                                <p class="trn tax_included" style="display:none">TAX Included</p>
                                <p class="tax_excluded" style="display:none">
                                    <span class="trn">TAX Excluded</span>: <span class="tax"></span>% <span class="trn">taxes</span>.
                                </p>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <button class="btn btn-success col-xs-12 trn" data-toggle="modal" data-target="#modalConfirmBooking" id="btn-ViewPrice" type="button">Confirm booking</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </mobile-reservation-summary>

    <div class="main-content row">

        <div class="col-sm-12" id="right-container">
            <shopping-cart>
                <div ng-show="!rooms.isEmpty()" class="content-summary shopping-cart-menu ng-hide">
                    <div class="content-right-head">
                        <div class="shopping-cart row ">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" id="fromDate" value="<?php echo date("d-m-Y") ?>" name="fromDate" class="fromDate pull-right hide form-control">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="toDate" value="<?php echo date("d-m-Y", strtotime("+1 day", strtotime(date('d-m-Y')))); ?>" name="toDate" class="toDate pull-right hide form-control">
                                </div>
                            </div>
                            <div class="row">
                                
                            </div>

                            <div id="sticky-anchor-desktop"></div>
                            <div id="sticky-desktop">
                                <div id="cart" class="mt20" style="display: none">
                                    <h4 class="trn">Booking summary</h4>
                                    <div class="bodyCart"></div>
                                    <div class="footerCart">
                                        <h5 class="trn">Total: <span class="pull-right">-€</span></h5>
                                        <p class="trn tax_included" style="display:none">TAX Included</p>
                                        <p class="tax_excluded" style="display:none">
                                            <span class="trn">TAX Excluded</span>: <span class="tax"></span>% <span class="trn">taxes</span>.
                                        </p>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <button class="btn btn-success col-xs-12 trn" data-toggle="modal" data-target="#modalConfirmBooking" id="btn-ViewPrice" type="button">Confirm booking</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <label class="trn">Arrival</label> - <label class="trn">Departure</label>
                                    <input type="text" id="DateRangHotel" onfocus="blur();"  readonly="true" value="" placeholder="Seleccione fecha" name="fromDate" class="fromDate pull-right form-control">
                                </div>
                                <div class="col-md-2 col-sm-12">
                                    <label class="trn">Persons</label>
                                    <select id="booking-occupancy" name="booking-occupancy" class="form-control m-p booking-occupancy">
                                        <?php
                                        $list = array('1', '2', '3')
                                        ?>
                                        <?php foreach ($list as $l): ?>
                                            <option <?php // ($reservas->type_vat == $l) ? 'selected' : '';    ?> value="<?php echo $l; ?>"><?php echo $l; ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                    
                                    <div id="children-select" class="children-select" style="display:none">
                                        <label class="trn">children</label>
                                        <select   id="booking-children" placeholder="children" name="booking-children" class="form-control m-p toggleHG booking-occupancy-children">
                                            <?php
                                            $list = array(0, 1, 2, 3)
                                            ?>
                                            <?php foreach ($list as $l): ?>
                                                <option <?php  echo ($l == 0) ? '': 'data-toggle="group-checkin-input-collapse"' ;    ?> value="<?php echo $l; ?>"><?php echo $l; ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                        <div class="collapse" id="group-checkin-input-collapse" >
                                            <label class="trn">Edad</label>
                                            <select  id="booking-children" placeholder="children" name="booking-children" class="form-control m-p toggleHG">
                                                <?php
                                                $list = array('0', '1', '2', '3')
                                                ?>
                                                <?php for ($i=0;18 >= $i;$i++ ): ?>
                                                    <option  class="trn" value="<?php echo $i;; ?>"><?php echo $i; ?> Años </option>
                                                <?php endfor; ?>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <label class="trn">Promotional code</label>
                                    <input type="text" placeholder="Si lo tiene, escríbalo aquí." class="form-control discount-code" id="promoCode" name="discount-code" >
                                </div>
                                <div class="col-md-2 col-sm-12">
                                    <label class="trn" style="visibility:hidden;">Search</label>
                                    <button class="btn btn btn-primary col-xs-12 trn" id="btn-search-main" type="button">Book now</button>
                                </div>
                                <hr>
                                <div class="mt20">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </shopping-cart>
        </div>


    </div>

</div>


<div class='col-sm-12'>
    <div id='alerts-main-container'></div>
    <div room-type-order=''>

        <div room-type-panel='' photos='room_type.photos' ng-repeat='room_type in room_types| withRoomRates | autoOptimize | onlyAvailable' class='content-results ng-scope row'>

            <div class='room-type-panel content-result'>

                <div class='content-result-image clm-left-fixed '>

                    <!-- Carousel -->
                    <div id='myCarousel' class='carousel slide' data-ride='carousel'>
                        <!-- Indicators -->
                        <ol class='carousel-indicators hidden-xs'>
                            <li data-target='#myCarousel' data-slide-to='0' class='active'></li>
                        </ol>
                        <div class='carousel-inner' role='listbox'></div>
                        <a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>
                            <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>
                            <span class='sr-only trn'>Previous</span>
                        </a>
                        <a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>
                            <span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>
                            <span class='sr-only trn'>Next</span>
                        </a>
                    </div>

                    <!-- thumb navigation carousel -->
                    <div class='col-md-12 hidden-sm hidden-xs' id='slider-thumbs' style='display: none'>
                        <!-- thumb navigation carousel items -->
                        <ul class='list-inline'>
                            <li> <a id='carousel-selector-0' class='selected'>
                                </a>
                            </li>
                            <li> <a id='carousel-selector-1'>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- /.carousel -->
                </div>

            </div>



            <!-- Tab panes -->
            <section >
                <div >
                    <div  class='tab-pane active' id='onlyRoom'>
                        <div class='content-room'>
                            <div class='row header-roomlist'></div>
                            <div class='row roomitem'></div>
                            <div class='collapse' id='viewRoomDetails'></div>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    </div>
</div>
