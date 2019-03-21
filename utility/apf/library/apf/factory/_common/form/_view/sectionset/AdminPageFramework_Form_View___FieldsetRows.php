<?php 
/**
	Admin Page Framework v3.8.19 by Michael Uno 
	Generated by PHP Class Files Script Generator <https://github.com/michaeluno/PHP-Class-Files-Script-Generator>
	<http://en.michaeluno.jp/admin-page-framework>
	Copyright (c) 2013-2019, Michael Uno; Licensed under MIT <http://opensource.org/licenses/MIT> */
class AdminPageFramework_Form_View___FieldsetRows extends AdminPageFramework_FrameworkUtility {
    public $aFieldsetsPerSection = array();
    public $iSectionIndex = null;
    public $aSavedData = array();
    public $aFieldErrors = array();
    public $aFieldTypeDefinitions = array();
    public $aCallbacks = array();
    public $oMsg;
    public function __construct() {
        $_aParameters = func_get_args() + array($this->aFieldsetsPerSection, $this->iSectionIndex, $this->aSavedData, $this->aFieldErrors, $this->aFieldTypeDefinitions, $this->aCallbacks, $this->oMsg,);
        $this->aFieldsetsPerSection = $_aParameters[0];
        $this->iSectionIndex = $_aParameters[1];
        $this->aSavedData = $_aParameters[2];
        $this->aFieldErrors = $_aParameters[3];
        $this->aFieldTypeDefinitions = $_aParameters[4];
        $this->aCallbacks = $_aParameters[5] + $this->aCallbacks;
        $this->oMsg = $_aParameters[6];
    }
    public function get($bTableRow = true) {
        $_sMethodName = $this->getAOrB($bTableRow, '_getFieldsetRow', '_getFieldset');
        $_sOutput = '';
        foreach ($this->aFieldsetsPerSection as $_aFieldset) {
            $_oFieldsetOutputFormatter = new AdminPageFramework_Form_Model___Format_FieldsetOutput($_aFieldset, $this->iSectionIndex, $this->aFieldTypeDefinitions);
            $_aFieldset = $_oFieldsetOutputFormatter->get();
            if (!$_aFieldset['if']) {
                continue;
            }
            $_sOutput.= call_user_func_array(array($this, $_sMethodName), array($_aFieldset));
        }
        return $_sOutput;
    }
    private function _getFieldsetRow($aFieldset) {
        $_oFieldsetRow = new AdminPageFramework_Form_View___FieldsetTableRow($aFieldset, $this->aSavedData, $this->aFieldErrors, $this->aFieldTypeDefinitions, $this->aCallbacks, $this->oMsg);
        return $_oFieldsetRow->get();
    }
    private function _getFieldset($aFieldset) {
        $_oFieldsetRow = new AdminPageFramework_Form_View___FieldsetRow($aFieldset, $this->aSavedData, $this->aFieldErrors, $this->aFieldTypeDefinitions, $this->aCallbacks, $this->oMsg);
        return $_oFieldsetRow->get();
    }
    }
    