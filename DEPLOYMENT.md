# Publish McQuerious on GitHub Pages

The project is ready for a repository-root deployment. Destination: https://github.com/Mcgoldfish/mcquerious. Expected Pages URL: https://mcgoldfish.github.io/mcquerious/. Publication still requires authentication and enabling Pages.

1. Create a GitHub repository, `mcquerious` under `Mcgoldfish`.
2. Put this folder's contents in that repository: `package.json` should be at its top level. Do not upload the enclosing personal workspace, `node_modules`, build output, local logs, screenshots, or `.openai` hosting state.
3. In the repository, open **Settings → Pages**, then select **GitHub Actions** as the source.
4. Push to `main` or `master`, or run **Deploy McQuerious** from the Actions tab.
5. The successful deployment shows the live website URL. GitHub Pages serves the built website; visitors do not run npm commands.

`.github/workflows/deploy.yml` installs locked dependencies, runs tests, builds, and deploys `dist`. Public asset links and the Vite base are relative, so the site supports a repository subfolder as well as a root domain. Hash navigation avoids page-refresh routing errors.

Filing Lens and Subsidizing Competition have standalone pages in the same deployment. Filing Lens has a fixed, clearly labelled 28-company report collection. Saved searches remain browser-local. Updating the website does not automatically collect new reports.

## Local checks

```powershell
npm ci
npm test
npm run build
node scripts/preview-prefix.cjs
```

The final command previews a GitHub-style subpath at `http://127.0.0.1:5181/small-worlds/`. This is a test prefix, not a remote repository selection. Normal local development remains `npm run dev` on port 5180.
