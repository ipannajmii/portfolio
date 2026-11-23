# Add your own popup photos

Yes: a project popup can contain pictures of you and the project together. A useful REGISSION gallery could have you presenting at C2PI, the chessboard and camera, and a screenshot of the web system.

## Example: REGISSION

1. Copy your images into `assets/photos/`. Use short filenames with lowercase letters and hyphens, such as `regission-presentation.jpg` and `regission-chessboard.jpg`.
2. Open `project-data.js` in VS Code.
3. Near the top, find this line inside `photos`:

```js
regission: [],
```

4. Replace it with:

```js
regission: [
  {
    src: 'assets/photos/regission-presentation.jpg',
    alt: 'Irfan presenting REGISSION at the C2PI exhibition',
    caption: 'Presenting REGISSION at C2PI, 2026'
  },
  {
    src: 'assets/photos/regission-chessboard.jpg',
    alt: 'The REGISSION chessboard and camera setup',
    caption: 'The physical chessboard and camera setup'
  }
],
```

5. Save. Refresh the page and open REGISSION. Your photos appear before the two concept illustrations.
6. Upload the changed `project-data.js` and the new photos to the same paths in your `portfolio` repository. A local edit only becomes visible to other people after you upload it.

Use your own accurate captions. The sample filenames above are examples; they are not supplied photo files. Paths and filenames must match exactly, including uppercase/lowercase letters.

## Other projects and your About popup

Use the same structure in these arrays:

| Array | Popup |
| --- | --- |
| `regission` | REGISSION |
| `forensics` | Digital Forensic Log Analysis |
| `mediapipe` | MediaPipe Face & Hand Tracking |
| `blindstick` | Smart IoT Blind Stick |
| `about` | About me, opened by the king chess piece |

For the About popup, you could use `assets/photos/irfan.jpg` and a real portrait caption. An empty array shows no personal photo gallery. You can add several pictures to any project.

## Image tips

- JPG, PNG and WebP are supported. A width around 1600 pixels is usually plenty for portfolio photos.
- Compress very large images for quicker loading.
- Include a useful `alt` description for people using screen readers.
- Galleries do not autoplay; visitors control which image they view.
- Tap **Enlarge image** for the larger view. Use Previous/Next, the left/right keys, or swipe the main gallery on a touchscreen.
- Missing photo files fall back to a labelled project illustration so the rest of the popup stays usable.

To remove the concept illustrations once you have real photos, empty that project's `gallery` array lower down in the file. Keep at least one real photo in its `photos` array if you want a gallery.
