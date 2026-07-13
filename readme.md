# Audio Player Block — Advanced Block for Embedding Audio Files

![Audio Player Banner](https://ps.w.org/audio-player-block/assets/banner-772x250.png)

[![WordPress Support](https://img.shields.io/badge/WordPress-6.5+-blue.svg?style=flat-square&logo=wordpress)](https://wordpress.org/plugins/audio-player-block/)
[![PHP Support](https://img.shields.io/badge/PHP-7.1+-777bb4.svg?style=flat-square&logo=php)](https://wordpress.org/plugins/audio-player-block/)
[![GPLv3 License](https://img.shields.io/badge/License-GPLv3-green.svg?style=flat-square)](https://wordpress.org/plugins/audio-player-block/)
[![Stable Version](https://img.shields.io/badge/Version-1.6.2-blue.svg?style=flat-square)](https://wordpress.org/plugins/audio-player-block/)

**Audio Player Block** is a lightweight, high-performance, and fully responsive Gutenberg block and shortcode plugin for WordPress. It allows your website visitors to listen to music and customize audio players seamlessly in your posts or pages.

---

## 🚀 Key Features

### 💎 Core Functionality (Free)
Everything you need to add a beautiful audio player to your website:
- **Multiple Audio Management:** Easily add or remove multiple audio tracks from the player with full control over your playlist.
- **Track Details Input:** Configure a custom title and artist name for each audio track to keep your content well organized.
- **Cover Image & Audio File Upload:** Upload audio files along with a cover image to create a more engaging and visually appealing player.
- **Player Customization:** Adjust the player’s width, height, and style with custom colors, backgrounds, hover effects, and other design settings.
- **Smart Audio Play/Pause Control:** Play one audio track at a time while automatically pausing other active players on the same page.
- **Universal Shortcode API:** Embed audio players anywhere on your site using simple shortcodes.

### 👑 Premium Power (Pro)
Unlock advanced styling and layout control:
- **Customize 6 Different Themes:** Toggle between 6 beautiful built-in player layouts/themes (Default, Slider, OneHaash, Wooden, Card, and Lite).
- **Auto Play & Loop Modes:** Automatically start the next track on track completion, or loop the current track continuously.
- **Advanced Navigation & Playback Controls:** Enable or disable prev/next navigation, a custom stop button, forward/backward buttons, and playback speed adjustment options.
- **Time Display & Seek Slider:** Show/hide current and total playback time, and style the seek range slider (height, radius, thumb width, colors, outline, shadow).
- **Download Option:** Allow visitors to download audio files directly from the player.
- **Waveform Customization:** Customize the base and light colors of the audio waveform.
- **Playlist Customization:** Style the playlist layout with custom padding, borders, radius, and active item colors.

---

## 🧩 Gutenberg Blocks Reference

The plugin registers a modern Gutenberg block:

| Block Title | Block Name (Slug) | Description |
| :--- | :--- | :--- |
| **Audio Player** | `bpmp/mp3-player` | Adds a customizable audio player block with playlist and theme controls. |

---

## 🗂 Custom Post Types (CPTs)

To separate configurations cleanly, the plugin registers a custom post type:
1. **`audio_player_block` (Audio Player):** Manages saved block configurations and audio files, allowing them to be loaded anywhere via shortcodes.

---

## 🔌 Developer Shortcodes API

Embed any saved Audio Player configuration anywhere on your site:
```markdown
[audio_player id="123"]
```
*Code Reference:* Defined in [Shortcode.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/ShortCode.php).

---

## 🛠 Technical Stack & Libraries

- **HTML5 Audio API:** Renders high-fidelity audio controls and waveform structures.
- **Frontend JS/React:** React is used to drive the custom Gutenberg block interfaces, custom sidebars, and admin dashboard fields.
- **Build System:** Gulp handles packaging and ZIP compilation, while Webpack via `@wordpress/scripts` handles block transpilation and code splitting.
- **bpl-tools (Shared Utility):** A shared utility library providing admin dashboard components and common Gutenberg editor controls.
  - **Source/GitHub:** [bPlugins/bpl-tools](https://github.com/bPlugins/bpl-tools)
  - **License:** GPL-2.0-or-later
  - **External Services:** Connects to bPlugins and Freemius services for product data and checkout functionality.

---

## 💻 Developer Guide

### Directory Layout

- **`/src`**: Active React components, SCSS styling, and Webpack entry files.
  - **`/Components`**: Gutenberg block edit templates, player layout components, settings panels, and controls.
  - **`/bplugins-admin`**: React components and layouts for the backend plugin settings page.
  - **`/utils`**: Common helper functions and icons.
- **`/includes`**: Core PHP controllers, namespace loaders, and class managers.
  - [core.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/core.php): Main plugin bootstrapper and loader.
  - [Init.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/Init.php): Registers block types and custom post types.
  - [AdminMenu.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/AdminMenu.php): Creates submenu page for Help & Demos and renders the settings dashboard wrapper.
  - [Enqueue.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/Enqueue.php): Enqueues editor blocks scripts, styling, and dashboard assets.
  - [ShortCode.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/ShortCode.php): Handles shortcode rendering.
  - [CustomColumn.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/CustomColumn.php): Appends a quick copy-to-clipboard shortcode column in the Audio Player CPT admin table.
  - [RestAPI.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/includes/RestAPI.php): Processes backend AJAX settings requests securely.
- **`/build`**: Compiled and bundled files (automatically generated via Webpack).
- **`plugin.php`**: The main executable and plugin bootstrapper.

### Development Workflow

1. Install development dependencies:
   ```bash
   npm install
   ```
2. Start development hot-rebuild mode:
   ```bash
   npm start
   ```
3. Compile minified assets for release:
   ```bash
   npm run build
   ```
4. Package plugin into a clean distribution ZIP file:
   ```bash
   npm run make-zip
   ```

### Data Flow & Lifecycle
1. **Editor Side:** Block configurations are configured via React panels in `/src/Components` and stored as serialized block attribute comments in the post content database.
2. **PHP Frontend Rendering:** When a shortcode or block renders, the server parses the attributes and outputs a DOM container with a `data-attributes` JSON string.
3. **JS Initialization:** On DOMContentLoaded, the frontend script [view.js](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/audio-player-block/src/view.js) parses `data-attributes`, mounts the React component, and renders the player using the corresponding theme layout (Default, Slider, OneHaash, Wooden, Card, or Lite) within the container.

---
*Developed with ❤️ by [bPlugins](https://bplugins.com)*
