<form action="<?php echo $action; ?>" method="get">
    <div id="hp-calendar-home">
        <div class="col-md-3 col-sm-12">
            <label class="trn">Arrival</label> <label class="trn">Departure</label>
            <input type="text" id="DateRangHotel" onfocus="blur();"  readonly="true" value="" placeholder="Seleccione fecha"  class="" pull-right form-control DateRangHotel">
        </div>
        <div class="col-md-3 col-sm-12">
            <label class="trn">Persons</label>
            <select id="booking-occupancy" name="booking-occupancy" class="form-control m-p booking-occupancy">
                <?php
                $min_occumpancy = get_option('hotelgest_occupancy_min', '');
                $max_occupancy = get_option('hotelgest_occupancy_max', '');

                for ($i = $min_occumpancy; $i <= $max_occupancy; $i++):
                    ?>
                    <option value="<?php echo $i; ?>"><?php echo $i; ?><p> <?php _e('Persons', "hotelgest"); ?> </p></option>
                <?php endfor; ?>
            </select>                                                
        </div>
        <div class="col-md-3 col-sm-12">
            <label class="trn">Promotional code</label>
            <input type="text" placeholder="Si lo tiene, escríbalo aquí." class="form-control discount-code" id="promoCode" name="discount-code" >
        </div>
        <div class="col-md-3 col-sm-12">
            <label class="trn" style="visibility:hidden;">Search</label>
            <button class="btn btn-success col-xs-12 trn" id="btn-hg-search-main" type="submit">Search</button>
        </div>
        <hr>
        <div class="mt20">

        </div>
    </div>

    <input type="text" id="fromDateHg" name="dfrom" >
    <input type="text" id="toDateHg" name="dto" >
    <?php echo $postInput; ?>
</form>