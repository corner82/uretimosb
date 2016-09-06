<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */

namespace Custom\Services\Filter;

/**
 * class to get filter service name constants
 */
final class FilterServiceNames {
    
    const TEXT_BASE_FILTER = 'textBaseFilter';
    const TEXT_BASE_FILTER_NOT_TOLOWER_CASE = 'textBaseFilterNotToLowerCase';
    const TEXT_BASE_FILTER_WITH_SQL_RESERVED_WORDS = 'textBaseFilterWithSQLReservedWords';
    const FILTER_SQL_RESERVEDWORDS = 'filterSQLReservedWords';
    const FILTER_HTML_TAGS_ADVANCED = 'filterHTMLTagsAdvanced';
    const FILTER_HEXADECIMAL_BASE = 'filterHexadecimalBase';
    const FILTER_HEXADECIMAL_ADVANCED = 'filterHexadecimalAdvanced';
    
    
}

