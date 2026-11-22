<?php
// index.php - Website homepage
// Set strict execution time limit
ini_set('max_execution_time', 10); // 10 seconds max
ini_set('default_socket_timeout', 5); // 5 seconds socket timeout

$famous_sites = [
    'google.com',
    'facebook.com',
    'youtube.com',
    't.im',
    'instagram.com',
    'linkedin.com',
    'amazon.com',
    'microsoft.com',
    'apple.com',
    'netflix.com'
];

// Get current domain
$domain = $_SERVER['HTTP_HOST'];
$base_url = "https://$domain";

// Set the cache directory
$cache_dir = __DIR__ . '/favicon_cache';

// Default favicon path
$default_favicon_path = __DIR__ . '/default-favicon.svg';

// Temp failure cache directory for tracking domains that fail to return a favicon
$failure_cache_dir = $cache_dir . '/failures';

// Create cache directories if they don't exist
if (!file_exists($cache_dir)) {
    mkdir($cache_dir, 0755, true);
}

if (!file_exists($failure_cache_dir)) {
    mkdir($failure_cache_dir, 0755, true);
}

// Create default favicon if it doesn't exist
if (!file_exists($default_favicon_path)) {
    $default_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <rect width="16" height="16" rx="3" fill="#f0f0f0" />
  <text x="8" y="12" font-family="Arial" font-size="10" text-anchor="middle" fill="#999">F</text>
</svg>';
    file_put_contents($default_favicon_path, $default_svg);
}

/**
 * Validate if a domain name is potentially valid
 * Domain validation is case-insensitive
 * 
 * @param string $domain Domain to validate
 * @return bool Whether the domain appears valid
 */
function isValidDomain($domain) {
    // Convert to lowercase first
    $domain = strtolower($domain);
    
    // Maximum length for a domain name
    if (strlen($domain) > 253) {
        return false;
    }
    
    // Basic domain name validation (simple regex)
    if (!preg_match('/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i', $domain)) {
        return false;
    }
    
    // Check if there's at least one dot (to ensure there's a TLD)
    if (strpos($domain, '.') === false) {
        return false;
    }
    
    return true;
}

/**
 * Check if the domain is in the failure cache
 * Domain check is case-insensitive
 * 
 * @param string $domain Domain to check
 * @param string $failure_cache_dir Failure cache directory
 * @param int $failure_cache_time How long to consider a failed domain (in seconds)
 * @return bool Whether the domain is in the failure cache
 */
function isInFailureCache($domain, $failure_cache_dir, $failure_cache_time = 3600) {
    // Convert to lowercase first
    $domain = strtolower($domain);
    $filename = $failure_cache_dir . '/' . getSafeCacheFilename($domain);
    
    if (file_exists($filename)) {
        $timestamp = (int)file_get_contents($filename);
        
        // If the failure is recorded less than failure_cache_time ago, consider as failed
        if (time() - $timestamp < $failure_cache_time) {
            return true;
        }
        
        // Otherwise, remove the old failure record
        @unlink($filename);
    }
    
    return false;
}

/**
 * Add domain to failure cache
 * Domain is stored in lowercase
 * 
 * @param string $domain Domain to add
 * @param string $failure_cache_dir Failure cache directory
 */
function addToFailureCache($domain, $failure_cache_dir) {
    // Convert to lowercase first
    $domain = strtolower($domain);
    $filename = $failure_cache_dir . '/' . getSafeCacheFilename($domain);
    file_put_contents($filename, time());
}

/**
 * Clean and extract the domain from a URL or text
 * Makes sure all domain names are lowercase to avoid duplicate caching
 * 
 * @param string $input User input that may contain a domain
 * @return string Cleaned domain
 */
function cleanDomain($input) {
    // Convert to lowercase first
    $input = strtolower(trim($input));
    
    // Remove protocol (http://, https://, ftp://, etc.)
    $input = preg_replace('#^(?:https?://|ftp://|//|www\.)#i', '', $input);
    
    // Remove everything after the first slash or question mark
    $input = preg_replace('#[/\?].*$#', '', $input);
    
    // Remove trailing periods
    $input = rtrim($input, '.');
    
    return $input;
}

/**
 * Generate a safe filename for cache
 * Makes sure all domain names are lowercase to avoid duplicate caching
 * 
 * @param string $domain Domain to create filename for
 * @return string Safe filename
 */
function getSafeCacheFilename($domain) {
    // Convert to lowercase first to ensure case-insensitivity
    $domain = strtolower($domain);
    
    // Remove any protocol and www prefix
    $clean_domain = preg_replace('#^https?://(www\.)?#', '', $domain);
    
    // Replace unsafe characters with underscores
    $safe_name = preg_replace('/[^a-z0-9\-\.]/', '_', $clean_domain);
    
    // Ensure unique name even for very long domains
    if (strlen($safe_name) > 100) {
        $hash = substr(md5($clean_domain), 0, 10);
        $safe_name = substr($safe_name, 0, 89) . '_' . $hash;
    }
    
    return $safe_name;
}

/**
 * Fetch favicon using Google's faviconV2 service
 * Domain handling is case-insensitive
 * 
 * @param string $domain Domain to fetch favicon for
 * @param int $size Size of the favicon to request
 * @return string URL to the favicon
 */
function getGoogleFaviconUrl($domain, $size = 128) {
    // Convert to lowercase and clean up the domain
    $domain = strtolower(preg_replace('#^https?://#', '', $domain));
    
    // Construct Google favicon URL
    return "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://{$domain}&size={$size}";
}

/**
 * Add a cache control function to allow cache clearing
 * Domain handling is case-insensitive
 */
function clearCacheForDomain($domain, $cache_dir, $failure_cache_dir) {
    // Convert to lowercase first
    $domain = strtolower(preg_replace('#^https?://#', '', $domain));
    $domain = trim($domain, '/');
    
    // Generate cache filenames for both standard and larger mode
    $standard_filename = getSafeCacheFilename($domain);
    $large_filename = $standard_filename . '_large';
    $google_filename = $standard_filename . '_google';
    $google_large_filename = $standard_filename . '_google_large';
    
    $files_to_delete = [
        // Original method caches
        $cache_dir . '/' . $standard_filename,
        $cache_dir . '/' . $standard_filename . '.info',
        $cache_dir . '/' . $large_filename,
        $cache_dir . '/' . $large_filename . '.info',
        
        // Google method caches
        $cache_dir . '/' . $google_filename,
        $cache_dir . '/' . $google_filename . '.info',
        $cache_dir . '/' . $google_large_filename,
        $cache_dir . '/' . $google_large_filename . '.info',
        
        // Failure cache
        $failure_cache_dir . '/' . $standard_filename
    ];
    
    $deleted = 0;
    foreach ($files_to_delete as $file) {
        if (file_exists($file)) {
            @unlink($file);
            $deleted++;
        }
    }
    
    return $deleted;
}

/**
 * Clean old cache files
 * 
 * @param string $cache_dir Path to cache directory
 * @param string $failure_cache_dir Path to failure cache directory
 * @param int $max_age Maximum age in seconds (default: 30 days)
 * @param int $max_size Maximum size of cache directory in bytes (default: 500MB)
 * @param int $failure_max_age Maximum age for failure cache (default: 1 day)
 */
function cleanOldCacheFiles($cache_dir, $failure_cache_dir, $max_age = 2592000, $max_size = 524288000, $failure_max_age = 86400) {
    // First, clean old failure cache entries
    if (file_exists($failure_cache_dir)) {
        $failure_files = glob($failure_cache_dir . '/*');
        $now = time();
        
        foreach ($failure_files as $file) {
            $file_time = filemtime($file);
            if ($now - $file_time > $failure_max_age) {
                @unlink($file);
            }
        }
    }
    
    // Clean main cache directory
    if (file_exists($cache_dir)) {
        // Get all files in cache directory
        $files = glob($cache_dir . '/*');
        
        // Check if we need to clean based on time
        $now = time();
        foreach ($files as $file) {
            if (is_dir($file)) continue; // Skip subdirectories
            
            $file_time = filemtime($file);
            if ($now - $file_time > $max_age) {
                @unlink($file);
            }
        }
        
        // Check if we need to clean based on total size
        $total_size = 0;
        $file_ages = [];
        
        $files = glob($cache_dir . '/*'); // Get files again after time-based cleanup
        
        foreach ($files as $file) {
            if (is_dir($file)) continue; // Skip subdirectories
            
            $size = filesize($file);
            $total_size += $size;
            $file_ages[$file] = filemtime($file);
        }
        
        if ($total_size > $max_size) {
            // Sort files by age, oldest first
            asort($file_ages);
            
            // Delete oldest files until we're under the size limit
            foreach ($file_ages as $file => $time) {
                if ($total_size <= $max_size) {
                    break;
                }
                
                $size = filesize($file);
                @unlink($file);
                $total_size -= $size;
            }
        }
    }
}

// Run cache cleanup occasionally (0.5% chance on each request)
if (mt_rand(1, 200) == 1) {
    cleanOldCacheFiles($cache_dir, $failure_cache_dir);
}

// Check for cache clear request
if (isset($_GET['clear_cache']) && isset($_GET['domain'])) {
    $domain_to_clear = $_GET['domain'];
    $cleared = clearCacheForDomain($domain_to_clear, $cache_dir, $failure_cache_dir);
    
    // Only admin access should be allowed here in production
    if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === $_SERVER['SERVER_ADDR']) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'cleared' => $cleared,
            'domain' => $domain_to_clear
        ]);
        exit;
    }
}

// Force removal of existing cached entries for testing
if (isset($_GET['flush']) && $_GET['flush'] == '1') {
    $domains_to_flush = ['time.is'];
    foreach ($domains_to_flush as $d) {
        clearCacheForDomain($d, $cache_dir, $failure_cache_dir);
    }
}

// If the request path is not the root path
if ($_SERVER['REQUEST_URI'] != '/' && $_SERVER['REQUEST_URI'] != '/index.php') {
    // Extract the requested domain part (remove leading slash)
    $requested_uri = ltrim($_SERVER['REQUEST_URI'], '/');
    
    // Handle special case for default favicon
    if (strtolower($requested_uri) === 'default-favicon.svg') {
        header('Content-Type: image/svg+xml');
        header('Cache-Control: public, max-age=86400'); // 缓存一天
        readfile($default_favicon_path);
        exit;
    }
    
    // Check if we have a query string
    $domain = $requested_uri;
    $prefer_larger = false;
    $use_google = true; // Default to using Google's service
    
    // Handle domain with query parameters
    if (strpos($requested_uri, '?') !== false) {
        // Split at the question mark
        list($domain, $query_string) = explode('?', $requested_uri, 2);
        
        // Parse the query string
        parse_str($query_string, $query_params);
        
        // Check if larger parameter is set to true
        if (isset($query_params['larger']) && 
            ($query_params['larger'] === 'true' || $query_params['larger'] === '1')) {
            $prefer_larger = true;
        }
        
        // Check if we should use original method instead of Google
        if (isset($query_params['original']) && 
            ($query_params['original'] === 'true' || $query_params['original'] === '1')) {
            $use_google = false;
        }
    }
    
    // Clean the domain to remove any protocol, trailing path or parameters
    $domain = cleanDomain($domain);
    
    // Validate the domain to prevent abuse
    if (!isValidDomain($domain)) {
        header('Content-Type: image/svg+xml');
        header('Cache-Control: public, max-age=86400'); // Cache for one day
        header('X-Source: default');
        header('X-Reason: invalid-domain');
        readfile($default_favicon_path); // Using readfile is faster
        exit;
    }
    
    // Check if this domain has recently failed
    if (isInFailureCache($domain, $failure_cache_dir)) {
        header('Content-Type: image/svg+xml');
        header('Cache-Control: public, max-age=3600'); // Cache for an hour
        header('X-Source: default');
        header('X-Reason: failure-cache');
        readfile($default_favicon_path);
        exit;
    }
    
    // Redirect to favicon direct return interface
    fetchAndDisplayFavicon($domain, $cache_dir, $failure_cache_dir, $default_favicon_path, $prefer_larger, $use_google);
    exit;
}

/**
 * Check if an image content is valid
 * 
 * @param string $content Image content
 * @param string $content_type Content type
 * @return bool Whether the image content is valid
 */
function isValidImageContent($content, $content_type) {
    // Check if content is empty
    if (empty($content) || strlen($content) < 8) {
        return false;
    }
    
    // Quick size and content validation
    $first_bytes = substr($content, 0, 8);
    
    // SVG validation
    if (strpos($content_type, 'svg') !== false) {
        return (strpos($content, '<svg') !== false && strpos($content, '</svg>') !== false);
    }
    
    // PNG validation - 89 50 4E 47 0D 0A 1A 0A (‰PNG)
    if (strpos($content_type, 'png') !== false && substr($first_bytes, 0, 4) === "\x89PNG") {
        return true;
    }
    
    // ICO validation - typically starts with 00 00 01 00
    if (strpos($content_type, 'ico') !== false && substr($first_bytes, 0, 4) === "\x00\x00\x01\x00") {
        return true;
    }
    
    // JPG validation - starts with FF D8
    if (strpos($content_type, 'jpg') !== false || strpos($content_type, 'jpeg') !== false) {
        return (substr($first_bytes, 0, 2) === "\xFF\xD8");
    }
    
    // GIF validation - starts with GIF8
    if (strpos($content_type, 'gif') !== false) {
        return (substr($first_bytes, 0, 4) === "GIF8");
    }
    
    // For any other type, just check if it's not too small
    return (strlen($content) >= 100);
}

/**
 * Extract favicon links from HTML
 * 
 * @param string $domain Domain
 * @param bool $prefer_larger Whether to prefer larger, high-resolution icons
 * @param int $max_html_size Maximum HTML size to parse in bytes
 * @return array Array of found favicon URLs
 */
function getFaviconsFromHTML($domain, $prefer_larger = false, $max_html_size = 102400) {
    $favicon_urls = [];
    $html = '';
    
    // Context for HTTP request
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 3, // Reduced timeout 
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n".
                      "Accept: text/html,application/xhtml+xml\r\n".
                      "Accept-Encoding: identity\r\n", // No compression for faster parsing
        ]
    ]);
    
    // URLs to try
    $urls_to_try = [
        "https://$domain",
        "https://www.$domain",
        "http://$domain",
        "http://www.$domain"
    ];
    
    // Try to get HTML content
    foreach ($urls_to_try as $url) {
        try {
            // Use cURL with strict timeout
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
            curl_setopt($ch, CURLOPT_TIMEOUT, 3);
            curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
            curl_setopt($ch, CURLOPT_MAXREDIRS, 2);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Skip SSL verification for speed
            curl_setopt($ch, CURLOPT_RANGE, "0-$max_html_size"); // Only get the first part of HTML
            
            $html = curl_exec($ch);
            $curl_info = curl_getinfo($ch);
            curl_close($ch);
            
            if ($html !== false && !empty($html) && $curl_info['http_code'] == 200) {
                break; // Found valid HTML, stop trying
            }
        } catch (Exception $e) {
            // Continue to next URL
            continue;
        }
    }
    
    if (!empty($html)) {
        // Quick precheck for favicon-related strings to avoid unnecessary parsing
        if (strpos($html, 'icon') === false && strpos($html, 'Icon') === false && strpos($html, 'ICON') === false) {
            return [];
        }
        
        // Find favicon using optimized approach
        $matches = [];
        $found = [];
        
        // Find link tags with rel attributes related to favicons - more efficient than full DOM parsing
        $pattern = '/<link[^>]+rel=["\']([^"\']+)["\'][^>]+href=["\']([^"\']+)["\'][^>]*>|<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']([^"\']+)["\'][^>]*>/i';
        if (preg_match_all($pattern, $html, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $rel = isset($match[1]) && !empty($match[1]) ? $match[1] : (isset($match[4]) ? $match[4] : '');
                $href = isset($match[2]) && !empty($match[2]) ? $match[2] : (isset($match[3]) ? $match[3] : '');
                
                if (empty($rel) || empty($href)) continue;
                
                // Check if rel attribute contains icon-related keywords
                if (stripos($rel, 'icon') !== false || stripos($rel, 'apple-touch-icon') !== false) {
                    // Process the URL (convert relative to absolute)
                    if (strpos($href, 'http') !== 0) {
                        if (strpos($href, '//') === 0) {
                            // Protocol-relative URL
                            $href = 'https:' . $href;
                        } elseif (strpos($href, '/') === 0) {
                            // Absolute path
                            $href = "https://$domain$href";
                        } else {
                            // Relative path
                            $href = "https://$domain/$href";
                        }
                    }
                    
                    // For larger icons, prioritize apple-touch-icon and larger sizes
                    $priority = 99;
                    if (stripos($rel, 'shortcut icon') !== false) {
                        $priority = $prefer_larger ? 50 : 10;
                    } elseif (stripos($rel, 'icon') !== false) {
                        $priority = $prefer_larger ? 40 : 20;
                    } elseif (stripos($rel, 'apple-touch-icon') !== false) {
                        $priority = $prefer_larger ? 10 : 30;
                    }
                    
                    // Check for size attribute
                    if (preg_match('/sizes=["\']([\d]+)x([\d]+)["\']/i', $match[0], $size_match)) {
                        $size = intval($size_match[1]);
                        
                        // Adjust priority based on size and preference
                        if ($prefer_larger && $size >= 128) {
                            $priority -= 5; // Higher priority for larger icons in larger mode
                        } elseif (!$prefer_larger && $size <= 64) {
                            $priority -= 5; // Higher priority for smaller icons in normal mode
                        }
                    }
                    
                    $found[] = [
                        'url' => $href,
                        'priority' => $priority,
                        'rel' => $rel
                    ];
                }
            }
        }
        
        // Also check for meta tags with msapplication-TileImage
        if (preg_match('/<meta[^>]+name=["\']msapplication-TileImage["\'][^>]+content=["\']([^"\']+)["\']/i', $html, $meta_match) ||
            preg_match('/<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']msapplication-TileImage["\']/i', $html, $meta_match)) {
            
            $href = $meta_match[1];
            
            // Convert relative URL to absolute
            if (strpos($href, 'http') !== 0) {
                if (strpos($href, '//') === 0) {
                    $href = 'https:' . $href;
                } elseif (strpos($href, '/') === 0) {
                    $href = "https://$domain$href";
                } else {
                    $href = "https://$domain/$href";
                }
            }
            
            $found[] = [
                'url' => $href,
                'priority' => $prefer_larger ? 20 : 40,
                'rel' => 'msapplication-TileImage'
            ];
        }
        
        // Sort by priority
        usort($found, function($a, $b) {
            return $a['priority'] - $b['priority'];
        });
        
        // Extract just the URLs, remove duplicates
        $seen = [];
        foreach ($found as $item) {
            if (!isset($seen[$item['url']])) {
                $favicon_urls[] = $item['url'];
                $seen[$item['url']] = true;
            }
        }
    }
    
    return $favicon_urls;
}

/**
 * Fetch and return a website's favicon
 * 
 * @param string $domain Domain to fetch favicon for
 * @param string $cache_dir Directory to store cached favicons
 * @param string $failure_cache_dir Directory to store failure records
 * @param string $default_favicon_path Path to default favicon
 * @param bool $prefer_larger Whether to prefer larger, high-resolution icons
 * @param bool $use_google Whether to use Google's favicon service (default: true)
 */
function fetchAndDisplayFavicon($domain, $cache_dir, $failure_cache_dir, $default_favicon_path, $prefer_larger = false, $use_google = true) {
    // Start timing for performance measurement
    $start_time = microtime(true);
    
    // Clean domain, ensure it doesn't contain any protocol or path
    $domain = preg_replace('#^https?://#', '', $domain);
    $domain = trim($domain, '/');
    
    // Generate cache filenames
    $cache_suffix = $prefer_larger ? '_large' : '';
    $standard_cache_filename = getSafeCacheFilename($domain) . $cache_suffix;
    $google_cache_filename = getSafeCacheFilename($domain) . "_google" . $cache_suffix;
    
    // Full cache paths
    $standard_cache_path = $cache_dir . '/' . $standard_cache_filename;
    $standard_cache_info_path = $standard_cache_path . '.info';
    $google_cache_path = $cache_dir . '/' . $google_cache_filename;
    $google_cache_info_path = $google_cache_path . '.info';
    
    // Check cached versions first (fastest path)
    // Google cache check
    if ($use_google && file_exists($google_cache_path) && file_exists($google_cache_info_path)) {
        $content_type = trim(file_get_contents($google_cache_info_path));
        header('Content-Type: ' . $content_type);
        header('Cache-Control: public, max-age=86400'); // Cache for one day
        header('X-Source: cache-google');
        header('X-Response-Time: ' . round((microtime(true) - $start_time) * 1000) . 'ms');
        readfile($google_cache_path); // Using readfile instead of file_get_contents+echo
        exit;
    }
    
    // Standard cache check
    if (file_exists($standard_cache_path) && file_exists($standard_cache_info_path)) {
        $content_type = trim(file_get_contents($standard_cache_info_path));
        header('Content-Type: ' . $content_type);
        header('Cache-Control: public, max-age=86400'); // Cache for one day
        header('X-Source: cache-standard');
        header('X-Response-Time: ' . round((microtime(true) - $start_time) * 1000) . 'ms');
        readfile($standard_cache_path);
        exit;
    }
    
    // No cache found, need to fetch favicon
    
    // If using Google API (prioritized approach)
    if ($use_google) {
        $size = $prefer_larger ? 256 : 128;
        $google_favicon_url = getGoogleFaviconUrl($domain, $size);
        
        // Try to get from Google with strict timeouts
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $google_favicon_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $favicon_content = curl_exec($ch);
        $curl_info = curl_getinfo($ch);
        curl_close($ch);
        
        if ($favicon_content !== false && $curl_info['http_code'] == 200 && !empty($favicon_content)) {
            $content_type = 'image/png'; // Google API returns PNG
            
            // Validate the image content
            if (isValidImageContent($favicon_content, $content_type)) {
                // Save to cache
                file_put_contents($google_cache_path, $favicon_content);
                file_put_contents($google_cache_info_path, $content_type);
                
                // Return the favicon
                header('Content-Type: ' . $content_type);
                header('Cache-Control: public, max-age=86400'); // Cache for one day
                header('X-Source: google');
                header('X-Response-Time: ' . round((microtime(true) - $start_time) * 1000) . 'ms');
                echo $favicon_content;
                exit;
            }
        }
        
        // If Google request failed or returned invalid content, continue with original method
    }
    
    // Original favicon finding method (fallback)
    // Use a more efficient, targeted approach for finding favicons
    $html_favicons = getFaviconsFromHTML($domain, $prefer_larger);
    
    // Add common locations as fallbacks (reduced list for efficiency)
    $fallback_locations = [
        "https://$domain/favicon.ico",
        "https://www.$domain/favicon.ico",
        "https://$domain/favicon.png"
    ];
    
    // Combine HTML-found favicons with fallbacks
    $favicon_locations = array_merge($html_favicons, $fallback_locations);
    
    // Limit to first 5 locations to prevent excessive requests
    $favicon_locations = array_slice($favicon_locations, 0, 5);
    
    // Try each potential favicon location
    foreach ($favicon_locations as $url) {
        // Use cURL for better control and timeout handling
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $favicon_content = curl_exec($ch);
        $curl_info = curl_getinfo($ch);
        curl_close($ch);
        
        // Check if we got a successful response with content
        if ($favicon_content !== false && $curl_info['http_code'] == 200 && !empty($favicon_content)) {
            // Determine content type
            $content_type = $curl_info['content_type'];
            
            // Default content types based on file extension if not provided by server
            if (empty($content_type) || $content_type == 'application/octet-stream') {
                if (strpos($url, '.ico') !== false) {
                    $content_type = 'image/x-icon';
                } elseif (strpos($url, '.png') !== false) {
                    $content_type = 'image/png';
                } elseif (strpos($url, '.svg') !== false) {
                    $content_type = 'image/svg+xml';
                } else {
                    $content_type = 'image/x-icon'; // Default assumption
                }
            }
            
            // Validate the image content
            if (isValidImageContent($favicon_content, $content_type)) {
                // Save to cache
                file_put_contents($standard_cache_path, $favicon_content);
                file_put_contents($standard_cache_info_path, $content_type);
                
                // Return the favicon
                header('Content-Type: ' . $content_type);
                header('Cache-Control: public, max-age=86400'); // Cache for one day
                header('X-Source: live');
                header('X-Response-Time: ' . round((microtime(true) - $start_time) * 1000) . 'ms');
                echo $favicon_content;
                exit;
            }
        }
        
        // Check if we've exceeded our time limit
        if (microtime(true) - $start_time > 5) {
            break; // Stop trying more URLs if we're taking too long
        }
    }
    
    // If we get here, we couldn't find a valid favicon
    // Add to failure cache to avoid repeated attempts
    addToFailureCache($domain, $failure_cache_dir);
    
    // Return default icon
    header('Content-Type: image/svg+xml');
    header('Cache-Control: public, max-age=3600'); // Cache for one hour
    header('X-Source: default');
    header('X-Reason: not-found');
    header('X-Response-Time: ' . round((microtime(true) - $start_time) * 1000) . 'ms');
    readfile($default_favicon_path);
    exit;
}

// Display the HTML page if we got here (we're on the homepage)
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favicon.is - Fast & Free Favicon API for Developers | Get Website Icons</title>
    <meta name="description" content="Quickly retrieve website favicons with our free API. Simple integration for developers, designers and webmasters to access any website's icon.">
    <meta name="keywords" content="favicon, favicon api, website icons, web development, developer tools">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Favicon.is">
    <link rel="canonical" href="https://favicon.is/">
    
    <meta property="og:title" content="Favicon.is - Free Favicon API">
    <meta property="og:description" content="Instantly get any website's favicon with our simple API. Perfect for developers and designers.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://favicon.is/">
    <meta property="og:image" content="https://favicon.is/favicon.png">
    
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Favicon.is - Free Favicon API">
    <meta name="twitter:description" content="Instantly get any website's favicon with our simple API. Perfect for developers and designers.">
    <meta name="twitter:image" content="https://favicon.is/favicon.png">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="/favicon.png" sizes="any" type="image/png">
    <link rel="preload" href="https://imgc.cc/font/MapleMonoNL-Regular.woff2" as="font" type="font/woff2" crossorigin>
    <script defer data-domain="favicon.is" src="https://stat.re/js/script.js"></script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2109266495918105" crossorigin="anonymous"></script>

    <style>
        @font-face {
          font-family: 'Maple Mono NL';
          src: url('https://imgc.cc/font/MapleMonoNL-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        body {
            font-family: 'Maple Mono NL', monospace;
            font-feature-settings: "cv01", "cv02";
        }
        /* Additional custom styles */
        .faq-item:last-child {
            border-bottom: none;
        }
        .faq-answer {
            transition: all 0.3s ease;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800">
    <div class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center text-blue-600 mb-6">Favicon.is</h1>
        <p class="text-center text-lg mb-8">Quick access to website icons</p>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <div class="mb-6">
                <input type="text" id="domain-input" placeholder="Enter a domain or URL, e.g.: google.com or https://example.com/page" 
                    class="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                
                <button id="search-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                    Get Icon
                </button>
            </div>
            
            <div id="result-container" class="hidden bg-gray-100 rounded-lg p-4">
                <h3 class="font-semibold text-lg mb-2">Icon Preview:</h3>
                <div id="preview" class="flex flex-row justify-center items-center gap-8 p-4 bg-white rounded border border-gray-200 mb-4">
                    <div class="text-center">
                        <div id="standard-preview" class="mb-2"></div>
                        <span class="text-sm text-gray-500">Standard</span>
                    </div>
                    <div class="text-center">
                        <div id="hires-preview" class="mb-2"></div>
                        <span class="text-sm text-gray-500">High Resolution</span>
                    </div>
                </div>
                
                <h3 class="font-semibold text-lg mb-2">HTML Code:</h3>
                <div class="space-y-4">
                    <div>
                        <p class="text-sm font-medium mb-1 text-gray-700">Standard Icon:</p>
                        <pre id="standard-code" class="bg-gray-800 text-white p-4 rounded font-mono text-sm overflow-x-auto"></pre>
                    </div>
                    <div>
                        <p class="text-sm font-medium mb-1 text-gray-700">High Resolution Icon:</p>
                        <pre id="hires-code" class="bg-gray-800 text-white p-4 rounded font-mono text-sm overflow-x-auto"></pre>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="font-semibold text-xl mb-3">How to use:</h3>
            <div class="space-y-2">
                <p>Simply add any domain after the URL: <code class="bg-gray-100 px-2 py-1 rounded">https://favicon.is/hi.com</code></p>
                <p>For larger size, add the larger parameter: <code class="bg-gray-100 px-2 py-1 rounded">https://favicon.is/hi.com?larger=true</code></p>
            </div>
        </div>
        
        <h2 class="text-2xl font-semibold mb-4">Examples of Popular Websites</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
            <?php foreach ($famous_sites as $site): ?>
                <div class="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-200">
                    <img src="<?php echo $base_url; ?>/<?php echo $site; ?>" alt="<?php echo $site; ?> favicon" class="mx-auto mb-2 w-8 h-8">
                    <div class="text-sm text-gray-600"><?php echo $site; ?></div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <h2 class="text-2xl font-semibold mb-4">FAQ</h2>
        <div class="bg-white rounded-lg shadow-md p-6 mb-8 space-y-4">
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>What is Favicon.is?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>Favicon.is is a simple and efficient service that enables you to fetch the favicon (website icon) of any website. Simply provide a domain name, and we'll return the corresponding favicon. It's ideal for developers, designers, or anyone who needs quick access to website icons.</p>
                </div>
            </div>
            
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>What is a favicon?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>A favicon (short for "favorite icon") is a small icon that represents a website. It is typically displayed in the browser's address bar, next to the site's name in bookmarks, and in browser tabs.</p>
                </div>
            </div>
            
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>Why are favicons important?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>Favicons enhance brand recognition, improve user experience by making websites easily identifiable in tabs and bookmarks, and lend a professional appearance to websites.</p>
                </div>
            </div>
            
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>Why not just use example.com/favicon.ico?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>Relying solely on example.com/favicon.ico has several drawbacks:</p>
                    <ul class="list-disc pl-5 mt-2 space-y-1">
                        <li>Traditional favicons are often too small (typically 32x32 pixels) for modern high-resolution displays.</li>
                        <li>Not all websites store their favicon at this default location.</li>
                        <li>There's no fallback option if a favicon isn't found, which can lead to broken images.</li>
                    </ul>
                    <p class="mt-2">Our service searches multiple potential icon locations and selects the best available option, ensuring superior results.</p>
                </div>
            </div>
            
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>What file formats are used for favicons?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>Common favicon formats include ICO, PNG, GIF, and SVG. While ICO has traditionally been the most widely supported format, modern browsers now support PNG and SVG, which offer improved quality and scalability.</p>
                </div>
            </div>
            
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>How does Favicon.is work?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>Favicon.is employs a multi-step process to retrieve a website's favicon:</p>
                    <ol class="list-decimal pl-5 mt-2 space-y-1">
                        <li>It scans the HTML of the specified website for favicon declarations in the &lt;head&gt; section.</li>
                        <li>If a favicon is declared in the HTML, Favicon.is retrieves it from the specified location.</li>
                        <li>If no favicon is found in the HTML, Favicon.is attempts to fetch the favicon from the root directory as 'favicon.ico' (e.g., https://example.com/favicon.ico).</li>
                        <li>If neither method yields a favicon, a default or placeholder image is returned.</li>
                    </ol>
                    <p class="mt-2">This approach ensures that Favicon.is can retrieve icons from most websites, even those that do not explicitly declare a favicon in their HTML.</p>
                </div>
            </div>
            
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>What if a website doesn't have a favicon?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>If a website lacks a favicon, Favicon.is will return a default or placeholder image. This guarantees that your application will always receive an image, even if the target site does not have a favicon.</p>
                </div>
            </div>
            
            <div class="faq-item border-b border-gray-200 pb-4">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>Can I use Favicon.is in my application?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>Absolutely! Favicon.is is designed for easy integration into various applications. You can utilize it to display favicons for links, enhance user interfaces, or in any situation where you need to programmatically fetch website icons.</p>
                </div>
            </div>
            
            <div class="faq-item pb-2">
                <div class="faq-question cursor-pointer w-full py-2">
                    <h3 class="text-lg font-medium flex justify-between items-center">
                        <span>Is there a rate limit for using Favicon.is?</span>
                        <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </h3>
                </div>
                <div class="faq-answer hidden mt-4 mb-2 text-gray-600 pl-2">
                    <p>While we aim to provide a reliable service, we do implement rate limiting to ensure fair usage. For specific information regarding rate limits or if you require high-volume access, please contact us directly.</p>
                </div>
            </div>
        </div>
        
        <!-- 结构化数据标记 -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Favicon.is?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Favicon.is is a simple and efficient service that enables you to fetch the favicon (website icon) of any website. Simply provide a domain name, and we'll return the corresponding favicon. It's ideal for developers, designers, or anyone who needs quick access to website icons."
              }
            },
            {
              "@type": "Question",
              "name": "What is a favicon?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A favicon (short for 'favorite icon') is a small icon that represents a website. It is typically displayed in the browser's address bar, next to the site's name in bookmarks, and in browser tabs."
              }
            },
            {
              "@type": "Question",
              "name": "Why are favicons important?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Favicons enhance brand recognition, improve user experience by making websites easily identifiable in tabs and bookmarks, and lend a professional appearance to websites."
              }
            },
            {
              "@type": "Question",
              "name": "Why not just use example.com/favicon.ico?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Relying solely on example.com/favicon.ico has several drawbacks: Traditional favicons are often too small (typically 32x32 pixels) for modern high-resolution displays. Not all websites store their favicon at this default location. There's no fallback option if a favicon isn't found, which can lead to broken images. Our service searches multiple potential icon locations and selects the best available option, ensuring superior results."
              }
            },
            {
              "@type": "Question",
              "name": "What file formats are used for favicons?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Common favicon formats include ICO, PNG, GIF, and SVG. While ICO has traditionally been the most widely supported format, modern browsers now support PNG and SVG, which offer improved quality and scalability."
              }
            },
            {
              "@type": "Question",
              "name": "How does Favicon.is work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Favicon.is employs a multi-step process to retrieve a website's favicon: It scans the HTML of the specified website for favicon declarations in the <head> section. If a favicon is declared in the HTML, Favicon.is retrieves it from the specified location. If no favicon is found in the HTML, Favicon.is attempts to fetch the favicon from the root directory as 'favicon.ico'. If neither method yields a favicon, a default or placeholder image is returned."
              }
            },
            {
              "@type": "Question",
              "name": "What if a website doesn't have a favicon?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If a website lacks a favicon, Favicon.is will return a default or placeholder image. This guarantees that your application will always receive an image, even if the target site does not have a favicon."
              }
            },
            {
              "@type": "Question",
              "name": "Can I use Favicon.is in my application?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! Favicon.is is designed for easy integration into various applications. You can utilize it to display favicons for links, enhance user interfaces, or in any situation where you need to programmatically fetch website icons."
              }
            },
            {
              "@type": "Question",
              "name": "Is there a rate limit for using Favicon.is?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While we aim to provide a reliable service, we do implement rate limiting to ensure fair usage. For specific information regarding rate limits or if you require high-volume access, please contact us directly."
              }
            }
          ]
        }
        </script>
        
        <footer class="border-t border-gray-200 pt-8">
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">Products</h3>
                <div class="space-y-3">
                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/ip.im" alt="IP.im favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://IP.im" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">IP.im</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Free IP address lookup tool</span>
                    </div>
                    
                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/t.im" alt="T.im favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://t.im" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">T.im</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Shortest URL shortener</span>
                    </div>

                        <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/mr.email" alt="Mr.email favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://mr.email" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">MR.email</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Temporary email service</span>
                    </div>

                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/w.is" alt="W.is favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://w.is" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">W.is</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">WHOIS domain lookup</span>
                    </div>
                    
                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/dns.is" alt="DNS.is favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://dns.is" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">DNS.is</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">DNS lookup tool</span>
                    </div>
                    
                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/pdf.is" alt="PDF.is favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://pdf.is" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">PDF.is</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Free online PDF tools</span>
                    </div>
                    
                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/text.is" alt="Text.is favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://text.is" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">Text.is</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Markdown pastebin</span>
                    </div>
                    
                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/playgame.now" alt="Playgame.now favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://playgame.now" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">Playgame.now</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Free online games</span>
                    </div>

                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/zo.cm" alt="Playgame.now favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://zo.cm" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">Zo.cm</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Free URL shortener</span>
                    </div>

                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/ibase64.com" alt="Playgame.now favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://base64.is" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">Base64.is</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Base64 Decode Encode tool</span>
                    </div>

                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/trueurl.com" alt="Playgame.now favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://trueurl.com" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">Trueurl.com</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">The free URL redirect checker</span>
                    </div>

                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/portcheck.ing" alt="Portcheck.ing favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://portcheck.ing" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">Portcheck.ing</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Free Port checker</span>
                    </div>
                    <div class="bg-white rounded-lg p-4 transition duration-300 hover:shadow-lg flex items-center border border-gray-100">
                        <img src="/tldhub.com" alt="TLDhub.com favicon" class="w-6 h-6 flex-shrink-0">
                        <a href="https://tldhub.com" class="text-blue-600 hover:text-blue-800 font-medium mx-3 flex-shrink-0" target="_blank">TLDhub.com</a>
                        <span class="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">Cheapest Domain checker</span>
                    </div>
                </div>
            </div>
            
            <div class="text-center text-sm text-gray-500 pb-6">
                &copy; <?php echo date('Y'); ?> Favicon.is - All rights reserved. Inspired by Favicon.im
            </div>
        </footer>
    </div>
    
    <script>
        // FAQ accordion functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('svg');
                
                // Toggle answer visibility
                answer.classList.toggle('hidden');
                
                // Rotate the arrow icon
                if (answer.classList.contains('hidden')) {
                    icon.classList.remove('rotate-180');
                } else {
                    icon.classList.add('rotate-180');
                }
            });
        });
        
        document.getElementById('search-btn').addEventListener('click', function() {
            const rawInput = document.getElementById('domain-input').value.trim();
            if (!rawInput) return;
            
            // Clean the domain input
            const domain = cleanDomain(rawInput);
            if (!domain) {
                alert("Please enter a valid domain name.");
                return;
            }
            
            const baseUrl = window.location.origin;
            
            // Standard version URL
            const standardUrl = `${baseUrl}/${domain}`;
            
            // High-resolution version URL
            const hiresUrl = `${baseUrl}/${domain}?larger=true`;
            
            // Update preview with loading indicator
            document.getElementById('standard-preview').innerHTML = `<div class="animate-pulse bg-gray-200 w-8 h-8 mx-auto"></div>`;
            document.getElementById('hires-preview').innerHTML = `<div class="animate-pulse bg-gray-200 w-8 h-8 mx-auto"></div>`;
            
            // Show result container
            document.getElementById('result-container').classList.remove('hidden');
            
            // Update code immediately
            document.getElementById('standard-code').textContent = `<img src="${standardUrl}" alt="${domain} favicon" />`;
            document.getElementById('hires-code').textContent = `<img src="${hiresUrl}" alt="${domain} high-res favicon" />`;
            
            // Load the icons
            const standardImg = new Image();
            standardImg.onload = function() {
                document.getElementById('standard-preview').innerHTML = `<img src="${standardUrl}" alt="${domain} favicon" class="mx-auto max-w-full h-auto">`;
            };
            standardImg.onerror = function() {
                document.getElementById('standard-preview').innerHTML = `<span class="text-red-500">Failed to load</span>`;
            };
            standardImg.src = standardUrl;
            
            const hiresImg = new Image();
            hiresImg.onload = function() {
                document.getElementById('hires-preview').innerHTML = `<img src="${hiresUrl}" alt="${domain} high-res favicon" class="mx-auto max-w-full h-auto">`;
            };
            hiresImg.onerror = function() {
                document.getElementById('hires-preview').innerHTML = `<span class="text-red-500">Failed to load</span>`;
            };
            hiresImg.src = hiresUrl;
        });
        
        // Function to clean and extract domain from input
        function cleanDomain(input) {
            // Remove protocol
            input = input.replace(/^(?:https?:\/\/|ftp:\/\/|\/\/|www\.)/i, '');
            
            // Remove everything after the first slash or question mark
            input = input.replace(/[\/\?].*$/, '');
            
            // Remove trailing periods
            input = input.replace(/\.$/, '');
            
            return input;
        }
        
        // Trigger search when user presses Enter
        document.getElementById('domain-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('search-btn').click();
            }
        });
    </script>
</body>
</html>