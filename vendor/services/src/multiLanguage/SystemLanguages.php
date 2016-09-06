<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Custom\Services\MultiLanguage;

/**
 * System language constants and variables to check request
 * parameters are being called in this class
 */
 class SystemLanguages {
    
    /**
     * I18n language codes
     */
    const ENG = 'en';
    const TR = 'tr';
    const AR = 'ar';
    const RU = 'ru';
    const FA  = 'fa';
    const DE = 'de';
    const ZH = 'zh';
    
    /**
     * I18n language locale codes
     */
    const ENG_LOCALE = 'en_EN';
    const TR_LOCALE = 'tr_TR';
    const AR_LOCALE = 'ar_JO';
    const RU_LOCALE = 'ru_RU';
    const FA_LOCALE  = 'fa_FA';
    const DE_LOCALE = 'de_DE';
    const ZH_LOCALE = 'zh_CN';
    
    /**
     * System language data array
     * @var array 
     */
    public static $systemLanguageCodes = array(
                              self::AR, 
                              self::DE,
                              self::ENG,
                              self::FA,
                              self::TR,
                              self::RU,
                              self::ZH,
                              ); 
    
    /**
     * System language locale data array
     * @var array
     */
    Public static $systemLanguageLocaleCodes = array(
                              self::AR_LOCALE,
                              self::DE_LOCALE,
                              self::ENG_LOCALE,    
                              self::FA_LOCALE,
                              self::TR_LOCALE,
                              self::RU_LOCALE,
                              self::ZH_LOCALE,
                              );

    /**
     * get System langugae codes
     * @return array
     * @static
     */
    public static function getSystemLanguageCodes() {
        return self::$systemLanguageCodes;
    }
    
    /**
     * get System language locale codes
     * @return array
     * @static
     */
    public static function getSystemLanguageLocaleCodes() {
        return self::$systemLanguageLocaleCodes;
    }
    
}

