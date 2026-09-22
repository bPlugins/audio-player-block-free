<?php

namespace BPMP;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Init {
    function __construct() {
        add_action( 'init', [ $this, 'onInit' ] );
        add_filter( 'content_save_pre', [ $this, 'sanitizeAudioUrlsInContent' ] );
        add_filter( 'render_block', [ $this, 'sanitizeRenderedBlockContent' ], 10, 2 );
    }

    public function sanitizeAudioUrlsInContent( $content ) {
        if ( empty( $content ) || ! is_string( $content ) ) {
            return $content;
        }

        return preg_replace_callback(
            '/"url"\s*:\s*"([^"]+)"/i',
            function( $matches ) {
                $url = $matches[1];
                // Browsers strip tab/newline/CR from anywhere in a URL before parsing
                // its scheme, so check the cleaned value, not just the literal string.
                if ( preg_match( '/^(javascript|data|vbscript):/i', trim( str_replace( array( "\t", "\n", "\r" ), '', $url ) ) ) ) {
                    return '"url":""';
                }
                return '"url":"' . esc_url_raw( $url, array( 'http', 'https' ) ) . '"';
            },
            $content
        );
    }

    public function sanitizeRenderedBlockContent( $block_content, $block ) {
        if ( empty( $block_content ) || ! is_string( $block_content ) ) {
            return $block_content;
        }

        return preg_replace_callback(
            '/href\s*=\s*(["\'])(.*?)\1/i',
            function( $matches ) {
                $quote = $matches[1];
                $url   = trim( str_replace( array( "\t", "\n", "\r" ), '', $matches[2] ) );
                if ( preg_match( '/^(javascript|data|vbscript):/i', $url ) ) {
                    return 'href=' . $quote . '#' . $quote;
                }
                return $matches[0];
            },
            $block_content
        );
    }

    function onInit(){
        register_block_type(BPMP_DIR_PATH . '/build');

        register_post_type('audio_player_block', [
            'label' => __( 'Audio Player', 'audio-player-block' ),
            'labels' => [
                'add_new' => _x( 'Add New', 'audio_player_block', 'audio-player-block' ),
                'add_new_item' => __( 'Add New Player', 'audio-player-block' ),
                'edit_item' => __( 'Edit Player', 'audio-player-block' ),
                'not_found' => __( 'There was no player please add one', 'audio-player-block' )
            ],
            'show_in_rest' => true,
            'public' => true,
            'publicly_queryable' => false,
            'menu_icon' => 'dashicons-format-audio',
            'item_published' => 'Audio Player Block Published',
            'item_updated' => 'Audio Player Block Updated',
            'template' => [['bpmp/mp3-player']],
            'template_lock' => 'all',
        ]);
        
    }

}