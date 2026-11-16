<?php

namespace BPMP;

if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! class_exists( __NAMESPACE__ . '\APB_PromoBanner' ) ) {

    class APB_PromoBanner {
        const DISMISSED_KEY   = 'apb_promo_banner_dismissed_permanent';
        const EXPIRATION_DATE = '2026-12-05 23:59:59';

        /** Target landing URLs */
        const DASHBOARD_URL    = 'https://bplugins.com/products/audio-player-block/pricing/?utm_source=admin&utm_medium=dashboard&utm_campaign=bfcm2026';
        const PLUGINS_PAGE_URL = 'https://bplugins.com/products/audio-player-block/pricing/?utm_source=admin&utm_medium=plugins&utm_campaign=bfcm2026';

        public function __construct() {
            add_action( 'admin_notices',                     [ $this, 'render' ] );
            add_action( 'admin_head',                        [ $this, 'enqueue_styles' ] );
            add_action( 'admin_footer',                      [ $this, 'enqueue_scripts' ] );
            add_action( 'wp_ajax_apb_dismiss_promo_banner',  [ $this, 'ajax_dismiss' ] );

            // Action links on plugins.php page
            $basename = 'audio-player-block/plugin.php';
            add_filter( 'plugin_action_links_' . $basename,         [ $this, 'add_plugin_action_link' ] );
            add_filter( 'network_admin_plugin_action_links_' . $basename, [ $this, 'add_plugin_action_link' ] );
            add_filter( 'plugin_action_links_audio-player-block-pro/plugin.php', [ $this, 'add_plugin_action_link' ] );
        }

        /* ------------------------------------------------------------------ */
        /*  Screen, Expiration, Dismissal & Pro Helpers                       */
        /* ------------------------------------------------------------------ */

        /**
         * Check if current admin screen belongs to Audio Player Block, excluding block editor
         */
        private function is_plugin_screen(): bool {
            $screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;

            if ( $screen ) {
                // 1. Exclude Block Editor / Post Editor (Add New / Edit Player)
                if ( 'post' === $screen->base || ( method_exists( $screen, 'is_block_editor' ) && $screen->is_block_editor() ) ) {
                    return false;
                }

                // 2. Match audio_player_block post type
                if ( isset( $screen->post_type ) && 'audio_player_block' === $screen->post_type ) {
                    return true;
                }

                $id   = $screen->id ?? '';
                $base = $screen->base ?? '';

                if (
                    strpos( $id, 'audio_player_block' ) !== false ||
                    strpos( $id, 'audio-player-block' ) !== false ||
                    strpos( $id, 'bpmp' ) !== false ||
                    strpos( $base, 'audio_player_block' ) !== false ||
                    strpos( $base, 'audio-player-block' ) !== false
                ) {
                    return true;
                }
            }

            // Fallback for direct query parameters (excluding post edit pages)
            global $pagenow;
            if ( in_array( $pagenow, [ 'post.php', 'post-new.php' ], true ) ) {
                return false;
            }

            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            if ( isset( $_GET['post_type'] ) && 'audio_player_block' === sanitize_key( $_GET['post_type'] ) ) {
                return true;
            }

            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            if ( isset( $_GET['page'] ) ) {
                // phpcs:ignore WordPress.Security.NonceVerification.Recommended
                $page = sanitize_key( $_GET['page'] );
                if ( strpos( $page, 'audio_player_block' ) !== false || strpos( $page, 'bpmp' ) !== false ) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Check if current date is past December 5, 2026
         */
        private function is_expired(): bool {
            $expiry_timestamp = strtotime( self::EXPIRATION_DATE );
            $current_time     = time();
            return ( $current_time > $expiry_timestamp );
        }

        /**
         * Check if current user has permanently dismissed the banner
         */
        private function is_dismissed(): bool {
            return (bool) get_user_meta( get_current_user_id(), self::DISMISSED_KEY, true );
        }

        /**
         * Check if Pro / Premium version is active
         */
        private function is_pro_active(): bool {
            if ( defined( 'BPMP_HAS_FRMS' ) && file_exists( dirname( __DIR__ ) . '/vendor/freemius/start.php' ) ) {
                return true;
            }
            if ( function_exists( 'bpmp_fs' ) && bpmp_fs()->can_use_premium_code() ) {
                return true;
            }
            return false;
        }

        /**
         * Determine if the dashboard banner should be omitted
         */
        private function should_skip(): bool {
            if ( ! $this->is_plugin_screen() ) {
                return true;
            }
            if ( $this->is_expired() ) {
                return true;
            }
            if ( $this->is_dismissed() ) {
                return true;
            }
            if ( $this->is_pro_active() ) {
                return true;
            }
            return false;
        }

        /* ------------------------------------------------------------------ */
        /*  Plugins.php Row Action Link                                       */
        /* ------------------------------------------------------------------ */

        /**
         * Add promotional upgrade link under plugin name in plugins.php
         */
        public function add_plugin_action_link( array $links ): array {
            if ( $this->is_expired() || $this->is_pro_active() ) {
                return $links;
            }

            $campaign_url = esc_url( self::PLUGINS_PAGE_URL );
            $link_text    = esc_html__( 'Black Friday Sale – 45% OFF', 'audio-player-block' );

            $links['apb_bfcm'] = sprintf(
                '<a href="%s" target="_blank" rel="noopener noreferrer" style="color: #d63638; font-weight: 700;">%s</a>',
                $campaign_url,
                $link_text
            );

            return $links;
        }

        /* ------------------------------------------------------------------ */
        /*  Pro CSS Styles (Design 5 - Roboto Typo, Floating Card)            */
        /* ------------------------------------------------------------------ */

        public function enqueue_styles(): void {
            if ( $this->should_skip() ) { return; }
            ?>
            <style id="apb-promo-banner-css">
            #apb-promo-banner,
            #apb-promo-banner * {
                font-family: "Roboto", sans-serif !important;
                box-sizing: border-box !important;
            }

            #apb-promo-banner {
                --bpl-primary:        #1877f2;
                --bpl-primary-hover:  #1464cc;
                --bpl-secondary:      #ff7a00;
                --bpl-dark:           #070127;
                --bpl-text:           #1b2e4b;
                --bpl-muted:          #475569;

                background: #ffffff !important;
                border: 1px solid #cbd5e1 !important;
                border-left: 1px solid #cbd5e1 !important;
                border-radius: 8px !important;
                box-shadow: 0 4px 16px rgba(7, 1, 39, 0.06), 0 1px 3px rgba(7, 1, 39, 0.04) !important;
                display: flex !important;
                align-items: stretch !important;
                min-height: 84px !important;
                overflow: hidden !important;
                position: relative !important;
                top: auto !important;
                left: auto !important;
                width: auto !important;
                max-width: 100% !important;
                height: auto !important;
                opacity: 1 !important;
                visibility: visible !important;
                margin: 16px 20px 20px 20px !important;
                padding: 0 !important;
                animation: apbBannerSlide .3s ease both !important;
                z-index: 10;
            }
            @keyframes apbBannerSlide {
                from { opacity: 0; transform: translateY(-6px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            /* Left Brand Ribbon Block */
            #apb-promo-banner .apb-brand-ribbon {
                width: 140px;
                min-width: 140px;
                background: linear-gradient(135deg, var(--bpl-primary) 0%, var(--bpl-dark) 100%);
                color: #ffffff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 12px 10px;
                gap: 6px;
                flex-shrink: 0;
            }
            #apb-promo-banner .apb-brand-ribbon img {
                width: 38px;
                height: 38px;
                object-fit: contain;
                border-radius: 6px;
                filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.35));
            }
            #apb-promo-banner .apb-brand-ribbon .apb-ribbon-title {
                font-size: 10.5px;
                font-weight: 800;
                letter-spacing: .7px;
                text-transform: uppercase;
                color: #ffffff;
                text-align: center;
                line-height: 1.2;
            }

            /* Main Content Zone */
            #apb-promo-banner .apb-content-zone {
                flex: 1;
                padding: 16px 24px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 10px;
                padding-right: 38px;
            }

            /* Left Text Stack */
            #apb-promo-banner .apb-text-stack {
                display: flex;
                flex-direction: column;
                gap: 6px;
                max-width: 960px;
            }
            #apb-promo-banner .apb-headline {
                font-size: 17.5px;
                font-weight: 700;
                color: var(--bpl-dark);
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0;
                line-height: 1.35;
            }
            #apb-promo-banner .apb-desc {
                font-size: 13.5px;
                color: var(--bpl-muted);
                line-height: 1.55;
                margin: 0;
                max-width: 900px;
            }
            #apb-promo-banner .apb-discount-chip {
                background: #ffedd5;
                color: #c2410c;
                border: 1px solid #fed7aa;
                font-size: 11px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 12px;
                letter-spacing: .2px;
            }

            /* Feature Checklist */
            #apb-promo-banner .apb-feature-chips {
                display: flex;
                align-items: center;
                gap: 16px;
                font-size: 13px;
                color: var(--bpl-muted);
                flex-wrap: wrap;
                margin-top: 2px;
            }
            #apb-promo-banner .apb-feature-chips span {
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            #apb-promo-banner .apb-feature-chips .check-icon {
                color: #10b981;
                font-weight: 800;
                font-size: 13.5px;
            }

            /* CTA Action Button */
            #apb-promo-banner .apb-btn-cta {
                background: var(--bpl-primary) !important;
                color: #ffffff !important;
                padding: 10px 22px !important;
                border-radius: 6px !important;
                font-size: 13.5px !important;
                font-weight: 600 !important;
                text-decoration: none !important;
                box-shadow: 0 2px 8px rgba(24, 119, 242, 0.32) !important;
                transition: background-color .15s ease, transform .15s ease, box-shadow .15s ease !important;
                white-space: nowrap !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 6px !important;
                line-height: 1.2 !important;
                margin-top: 2px !important;
            }
            #apb-promo-banner .apb-btn-cta:hover {
                background: var(--bpl-primary-hover) !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 12px rgba(24, 119, 242, 0.45) !important;
            }

            /* Dismiss Button (×) */
            #apb-promo-banner .apb-banner-dismiss-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                cursor: pointer;
                color: #94a3b8;
                font-size: 20px;
                line-height: 1;
                padding: 6px;
                transition: color .15s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
            }
            #apb-promo-banner .apb-banner-dismiss-btn:hover {
                color: var(--bpl-dark);
            }

            /* Responsive */
            @media (max-width: 960px) {
                #apb-promo-banner .apb-brand-ribbon {
                    width: 110px;
                    min-width: 110px;
                }
            }
            @media (max-width: 900px) {
                #apb-promo-banner .apb-desc-break {
                    display: none;
                }
            }
            @media (max-width: 782px) {
                #apb-promo-banner {
                    margin: 12px 10px 16px 10px !important;
                    flex-direction: column;
                    align-items: stretch;
                }
                #apb-promo-banner .apb-brand-ribbon {
                    width: 100%;
                    flex-direction: row;
                    justify-content: flex-start;
                    padding: 8px 16px;
                }
                #apb-promo-banner .apb-content-zone {
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 14px 16px;
                }
            }
            </style>
            <?php
        }

        /* ------------------------------------------------------------------ */
        /*  Permanent Dismiss Script (AJAX + Animation)                       */
        /* ------------------------------------------------------------------ */

        public function enqueue_scripts(): void {
            if ( $this->should_skip() ) { return; }
            $dismiss_nonce = wp_create_nonce( 'apb_dismiss_promo' );
            $ajax_url      = admin_url( 'admin-ajax.php' );
            ?>
            <script id="apb-promo-banner-js">
            (function () {
                var btn = document.getElementById('apb-banner-close');
                if (!btn) return;
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var banner = document.getElementById('apb-promo-banner');
                    if (banner) {
                        banner.style.transition = 'opacity .25s ease, transform .25s ease';
                        banner.style.opacity    = '0';
                        banner.style.transform  = 'translateY(-6px)';
                        setTimeout(function() { banner.remove(); }, 260);
                    }
                    var fd = new FormData();
                    fd.append('action', 'apb_dismiss_promo_banner');
                    fd.append('nonce',  '<?php echo esc_js( $dismiss_nonce ); ?>');
                    fetch('<?php echo esc_url( $ajax_url ); ?>', {
                        method: 'POST',
                        credentials: 'same-origin',
                        body: fd
                    });
                });
            })();
            </script>
            <?php
        }

        /* ------------------------------------------------------------------ */
        /*  Render Single Banner (Design 5 - Floating Card)                   */
        /* ------------------------------------------------------------------ */

        public function render(): void {
            if ( $this->should_skip() ) { return; }

            $coupon_url = esc_url( self::DASHBOARD_URL );
            $icon_url   = esc_url( plugins_url( 'assets/images/promo-icon.png', dirname( __DIR__ ) . '/plugin.php' ) );
            ?>
            <div id="apb-promo-banner" class="notice">

                <!-- Left Asymmetric Brand Ribbon -->
                <div class="apb-brand-ribbon">
                    <img src="<?php echo esc_url( $icon_url ); ?>" alt="<?php esc_attr_e( 'Audio Player Block', 'audio-player-block' ); ?>" />
                    <span class="apb-ribbon-title"><?php esc_html_e( 'Audio Player Block', 'audio-player-block' ); ?></span>
                </div>

                <!-- Main Content Zone -->
                <div class="apb-content-zone">
                    <div class="apb-text-stack">
                        <div class="apb-headline">
                            <span><?php esc_html_e( "Audio Player Block's Biggest Black Friday Sale is Live – Up to 45% OFF!", 'audio-player-block' ); ?></span>
                        </div>
                        <p class="apb-desc">
                            <?php esc_html_e( 'The biggest deal of the year is here! This is your once-a-year opportunity to upgrade to Audio Player Block Pro at an exclusive price.', 'audio-player-block' ); ?> <br class="apb-desc-break" /><?php esc_html_e( 'Unlock 5 premium themes, waveform visualizer, audio download, and everything you need to showcase your audio playback!', 'audio-player-block' ); ?>
                        </p>
                        <div class="apb-feature-chips">
                            <span><strong class="check-icon">✓</strong> <?php esc_html_e( '5 Premium Player Themes', 'audio-player-block' ); ?></span>
                            <span><strong class="check-icon">✓</strong> <?php esc_html_e( 'Waveform Visualizer', 'audio-player-block' ); ?></span>
                            <span><strong class="check-icon">✓</strong> <?php esc_html_e( 'Audio Download Option', 'audio-player-block' ); ?></span>
                            <span><strong class="check-icon">✓</strong> <?php esc_html_e( 'Playback Speed Control', 'audio-player-block' ); ?></span>
                        </div>
                    </div>

                    <!-- CTA Button -->
                    <a href="<?php echo esc_url( $coupon_url ); ?>" target="_blank" rel="noopener noreferrer" class="apb-btn-cta">
                        <?php esc_html_e( 'Unlock PRO Features →', 'audio-player-block' ); ?>
                    </a>
                </div>

                <!-- Dismiss Button -->
                <button id="apb-banner-close"
                        class="apb-banner-dismiss-btn"
                        title="<?php esc_attr_e( 'Dismiss', 'audio-player-block' ); ?>"
                        aria-label="<?php esc_attr_e( 'Dismiss banner', 'audio-player-block' ); ?>">
                    &times;
                </button>

            </div>
            <?php
        }

        /* ------------------------------------------------------------------ */
        /*  AJAX Handler: Permanent Dismissal                                 */
        /* ------------------------------------------------------------------ */

        public function ajax_dismiss(): void {
            check_ajax_referer( 'apb_dismiss_promo', 'nonce' );
            update_user_meta( get_current_user_id(), self::DISMISSED_KEY, 1 );
            wp_send_json_success();
        }
    }

    new APB_PromoBanner();
}
