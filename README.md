# Computer Science Department – Static Website with Admin CMS

This is a full HTML + CSS + JavaScript static site **with Decap (Netlify) CMS**.
- Bilingual (Arabic/English) with RTL support.
- Content lives in JSON under `/content` and is editable at `/admin`.
- Frontend auto-loads JSON and falls back to built-in data if JSON isn't found.

## Run locally in VS Code
1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.
4. Open `/admin` to use the CMS.

### Local CMS (no Git)
```bash
# from the project folder
npx decap-server     # or: npm i -g decap-server && decap-server
```
Then refresh `/admin` and choose **Local** login.

### GitHub CMS
1. Push this folder to a GitHub repo.
2. Edit `admin/config.yml` → set your `repo: ORG/REPO` (and branch).
3. Deploy (Netlify/Vercel/GitHub Pages). Visit `/admin` on your site.
