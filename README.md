# WA-audio-stickers (English & Privacy-Hardened Edition)

A Chromium browser extension (Chrome, Edge, Brave) to convert videos, images, or GIFs into **WhatsApp stickers with sound** and send them directly from WhatsApp Web—processed 100% locally in your browser.

> **Credits & Upstream Attribution**
> Forked and adapted from **[Shirtep/WA-audio-stickers](https://github.com/Shirtep/WA-audio-stickers)** (v0.7.2) by **Shirtep**, licensed under the [PolyForm Noncommercial 1.0.0 License](LICENSE.md). All core media conversion (WebCodecs, WebP/Ogg-Opus muxing) and WhatsApp Web integration architecture belong to the original author.

---

## Changes in This Version

1. **Full English Localization**
   - Translated all UI tabs, trim controls, resolution/FPS grid legends, error messages, manifest metadata, and options pages (`manifest.json`, `registro.html`, `registro.js`, `ui.js`, `convert.js`, `wa.js`, `main.js`) from Spanish to English.
2. **Privacy & Network Hardening**
   - Disabled automatic startup module/chat probing (`WAAS.wa.diagnose()` in `main.js`) and local storage logging of chat names and media filenames (`logger.js`, `wa.js`).
   - Removed external links (`ui.js`) so the extension contains zero external URLs outside `https://web.whatsapp.com/*`.
3. **Reliability & Memory Leak Fixes**
   - Added `ImageBitmap` cleanup (`release({ frames })`) when `analyze()` aborts or throws mid-encoding (`convert.js`).
   - Revoked `URL.createObjectURL` Blob URLs on video load error or timeout (`convert.js`).
   - Added read-only chat checks (`chat.isReadOnly || chat.canSend === false`) and explicit server acknowledgment timeout errors before opening the forward modal (`wa.js`).

---

## Installation (Unpacked)

1. Clone or download this repository.
2. Open `chrome://extensions` (or `brave://extensions` / `edge://extensions`) and enable **Developer mode**.
3. Click **Load unpacked** and select the `extension/` folder.
4. Open or reload `https://web.whatsapp.com` and click the extension icon.

## License

Non-commercial use only under **PolyForm Noncommercial 1.0.0** — see [LICENSE.md](LICENSE.md).
