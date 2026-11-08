# xiangyv.me

Personal portfolio built with Next.js and published as a static GitHub Pages site.

## Development

Use Node.js 22.13+ and pnpm 10.11.0.

```sh
pnpm install --frozen-lockfile
pnpm dev:pages
pnpm test
pnpm build:pages
```

The deployable website is `out/`. GitHub Actions publishes that directory after a push to `main`. Project content lives in `app/`; approved images and videos live in `public/`.

## Publication boundary

The build validates internal links and retains only referenced assets plus required font licenses. It rejects private documents, archives, credential files, source maps and detected credentials or local user paths in the export. These checks supplement manual review; they are not a guarantee against all sensitive content.

Do not upload private handoff notes, raw presentations, personal documents, editor state, environment files or unused media. Keep them outside the public repository. When withdrawing an asset, remove it from the tracked source as well as the page. Normal removal does not erase earlier Git history or copies already downloaded.

All content intentionally displayed on the public website can be downloaded. Neither hidden UI nor robots rules provide access control.

Fonts are hosted locally; preserve `public/fonts/LICENSES.txt`.
