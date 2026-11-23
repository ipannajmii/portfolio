# Your updated interactive portfolio

Your pond, swimming koi, lily pads, pointer ripples and floating chessboard are still here. This edition adds four project stories, sections that slide into view, project filters, a REGISSION system walkthrough, a toolkit accordion and project image galleries.

The CV in `assets/irfan-nazmi-cv.pdf` is your latest supplied PDF, copied unchanged. LinkedIn is included in the footer and contact popup.

## Preview it first

1. Extract the ZIP on your laptop.
2. Open the extracted folder.
3. Double-click `index.html` to open it in Chrome or Edge. No installation or terminal commands are needed.
4. Try the chess pieces, the project filters and the project popups. Select an image to enlarge it. Previous/Next buttons and the keyboard's left/right keys navigate the gallery. Escape closes the enlarged image, then the popup.

## Update your GitHub website

1. Open `https://github.com/ipannajmii/portfolio`.
2. On the **Code** tab, select **Add file**, then **Upload files**.
3. From the extracted folder, drag these SIX files and the WHOLE `assets` folder into the upload area together:
   - `index.html`
   - `style.css`
   - `creative.css`
   - `script.js`
   - `pond.js`
   - `project-data.js`
   - the `assets` folder, including all its subfolders
4. You may also upload the Markdown guides and `README.md` if you want the instructions kept in the repository.
5. At the bottom, use a commit message such as **Add interactive project stories and galleries**, then select **Commit changes** to the `main` branch.
6. Keep your existing Pages setting: **Deploy from a branch**, **main**, **/(root)**.
7. After the Pages deployment completes, visit `https://ipannajmii.github.io/portfolio/` and refresh with **Ctrl + Shift + R**.

Upload the CONTENTS of the extracted folder so that `index.html` remains at the repository's top level. Uploading only the ZIP or adding an extra enclosing folder will not update the page correctly.

## Put your photos in the popups

See `ADD-YOUR-PHOTOS.md` for a copy-and-paste example. You can include a photo of you presenting the project, a hardware photo and screenshots of the interface in the same gallery.

The included images are labelled concept/workflow illustrations. They are not photographs of you or screenshots of your actual software. Your real photos appear first when you add them.

## Where to edit later

| File | What it controls |
| --- | --- |
| `project-data.js` | Project descriptions, tags, gallery photos and captions |
| `index.html` | Page sections and the visible project summaries |
| `script.js` | Galleries, popups, filters, scroll reveals and walkthrough |
| `pond.js` | Chessboard pieces, fish, pads and water effects |
| `style.css` | Original pond styling |
| `creative.css` | New layouts, transitions and responsive styles |

This is a static site with relative paths, suitable for your existing GitHub Pages project URL. Project photos become public once you upload them to your public repository. There is no visitor upload button, account system or database.
