<div id="tmplviewRoomOffer" style="display:none" >
    <div class="col-xs-12 policyblock separator">
        <div class="row">
            <div class="hg-rate-plan-header hg-webrate-header">
                <div class="web-rate-tag has-offer col-sm-12">
                    <span class="trn offer">SPECIAL PACK</span>
                    <span class="text"> - </span>
                    <span class="txt-more"> - </span>
                </div>
                <div class="hg-policy-descr-container col-sm-12" style="display:none" >
                    <div class="txt-more"></div>
                    <div class="hg-policy-label">   <span class="canc-free"> -  </span>  </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="details-pack"></div>
        </div>
    </div>
</div>

<div id="tmplviewRoomDetails" style="display:none" >
    <div class="well row">
        <?php if (get_option('topPack', 0)) { ?>
            <div class="row roomhasoffer ribbon" style="display: none;"> </div>
            <div class="row roomdetails"></div>
            <div class="row roomdetails">
                <div class="room-details">
                    <div class="room-details-listitem"> </div>
                </div>
            </div>
            <div class="row roomdetails">
                <div class="col-lg-12 booking_form_controls ">
                    <div class="h3-hg"> texto </div>
                    <div class="datepicker_holder hasDatepicker"> </div>
                </div>
            </div>
        <?php } else { ?>

            <div class="row roomdetails"></div>
            <div class="row roomdetails">
                <div class="room-details">
                    <div class="room-details-listitem"> </div>
                </div>
            </div>
            <div class="row roomhasoffer ribbon" style="display: none;"> </div>
            <div class="row roomdetails">
                <div class="col-lg-12 booking_form_controls ">
                    <div class="datepicker_holder hasDatepicker"> </div>
                </div>
            </div>             
        <?php } ?>
    </div>
</div>

<div id="tmplroom-details-item" class="roww" style="display:none" >
    <div class="col-xs-12 col-sm-6">
        <div class="hg-rate-plan-header hg-webrate-header">
            <div class="web-rate-tag">WEB RATE<a class="hg-rate-condition-link" href="#"><i class="fa fa-info-circle"></i></a></div>
            <div class="hg-policy-descr-container">
                <div class="txt-more">Best internet rate available</div>
                <div class="hg-policy-label" style="display:none">   <span class="canc-free"> Free cancellation until  Fri, May 04, 2018  </span>  </div>
            </div>
        </div>
    </div>
    <div class="col-xs-12 col-sm-6 ">
        <div class="row details-board"></div>
    </div>
</div>

<div id="tmplroom-details-board"  style="display:none" >
    <div class="col-xs-12 divider">
        <div class="col-xs-5 nameboard hidden-xs">
            <i class="ico fa"></i>
            <span class="txt">-</span>
            <br>
            <small class="avalibility">-</small> <small class="trn">units left</small>
        </div>
        <div class="col-xs-3 hidden-xs nopadding">
            <span class="price price-md">80</span><span class="priceDayList"></span>
            <span class="striked-price">98</span>
        </div>
        <div class="col-xs-12 col-sm-1 no-padding">
            <select id="selectQuantity" class="form-control m-p selectQuantity"> </select>
        </div>
        <div class="col-xs-12 col-sm-3 no-padding">
            <button type="button" class="btn btn-primary addcart col-xs-12" data-id-cart="">
                <span class="price col-xs-3 hidden-sm hidden-lg hidden-md">80</span>
                <div class="col-xs-6 hidden-sm hidden-lg hidden-md nameboard">
                    <i class="ico fa"></i>
                    <span class="txt">-</span>
                    <br>
                </div>
                <i class="fa fa-plus"></i> <span class="trn">Add</span>
            </button>
            <span class="not-available trn hidden-xs">Not available</span>
            <span class="minstay"><span class="trn">minstay</span> <b class="num-minstay"></b></span>
            <span class="maxstay"><span class="trn">maxstay</span> <b class="num-maxstay"></b></span>
        </div>
    </div>

</div>
<!--
<div id="tmplroom-details-itemV1" style="display:none" >
   <div class="col-xs-2 col-sm-1 occupancy">
       <div class="occupancy-main"><span class="number">2</span> <i class="fa fa-male"></i></div>
       <div class="occupancy-child" style="display: none">
           <span class="number-adult" >0</span> <i class="fa fa-male"></i>
           <span class="number-child" >0</span> <i class="fa fa-child"></i><br>
       </div>
   </div>
   <div class="col-xs-4 col-sm-5">
       <span class="name">Estudio Pack Romántico</span>
       <span class="policy hidden-xs">-</span>
   </div>

   <div class="col-xs-2 hidden-xs">
       <span class="price price-md">80</span>
   </div>
   <div class="col-xs-2 hidden-sm hidden-lg hidden-md">
       <span class="policy">-</span>
   </div>
   <div class="col-xs-2 col-sm-2 no-padding danger">
       <small class="avalibility">-</small> <small class="trn">units left</small>
   </div>
   <div class="col-xs-12 col-sm-2 pull-right">

       <button type="button" class="btn btn-primary addcart col-xs-12" data-id-cart="">
           <span class="price col-xs-6 hidden-sm hidden-lg hidden-md">80</span>
           <i class="fa fa-plus"></i> <span class="trn">Add</span>
       </button>
       <span class="not-available trn hidden-xs">Not available</span>
       <span class="minstay"><span class="trn">minstay</span> <b class="num-minstay"></b></span>
       <span class="maxstay"><span class="trn">maxstay</span> <b class="num-maxstay"></b></span>
   </div>
</div>-->



<!-- detalles room -->
<div id="tmplroom-extras" style="display:none" >
    <div class="col-xs-12">
        <div class="row form-group">
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOne">
                    <div class="row">
                        <div class="col-xs-12 col-sm-5 mt9">
                            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse" aria-expanded="true" aria-controls="collapse">
                                <i class="fa fa-info"></i> <span class="title">Parking</span>
                            </a>
                        </div>
                        <div class="col-xs-12 col-sm-3 mt9">
                            <h5>
                                <span class="price"></span>
                                <span class="price-type"></span>
                            </h5>
                        </div>
                        <div class="col-xs-12 col-sm-2">
                            <input class="form-control quantity" name="quantity" min="1" value="1" type="text">
                        </div>
                        <div class="col-xs-12 col-sm-2 pull-right">
                            <button type="button" class="btn btn-primary addProductcart addcart pull-right" data-id-cart="" style="display: inline-block;">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div id="collapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading">
                    <div class="panel-body description">Descriptio</div>
                </div>
            </div>

        </div>

    </div>
</div>