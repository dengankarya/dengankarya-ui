# OIDC Trusted Publishing Setup Guide

This guide will help you configure **Trusted Publishing** with OIDC (OpenID Connect) so that your GitHub Actions CI/CD pipeline can publish to npm **without storing any tokens**.

## What is OIDC Trusted Publishing?

Instead of storing a long-lived NPM access token in GitHub Secrets, OIDC lets GitHub issue a short-lived, cryptographically signed token that npm verifies came from **your specific GitHub repository**. This is more secure because:

- ✅ No token stored on GitHub
- ✅ Token expires in minutes
- ✅ npm verifies the token came from your repo (not someone else's)
- ✅ If GitHub is compromised, the token is useless elsewhere

## Prerequisites

- GitHub account with admin access to the `dengankarya-ui` repository
- npm account with access to the `dengankarya-ui` package (you published it)
- This repository is **public** on GitHub (required for OIDC)

> ⚠️ **Important:** OIDC Trusted Publishing requires the GitHub repository to be **public**. If your repo is private, you must use NPM_TOKEN instead.

---

## Step 1: Configure npm to Trust GitHub (One-Time Setup)

This step is done **once per package** on npmjs.com.

### A. Log in to npmjs.com

1. Go to **npmjs.com** and sign in to your account
2. Go to your **Account Settings** → **Access Tokens** section

### B. Add GitHub as a Trusted Publisher

1. In your npm account settings, look for **"Publish Permission"** or **"Trusted Publishing"** section
2. Click **"Add a new trusted publisher"** or similar button
3. Select **"GitHub Actions"** as the publisher type
4. Fill in the details:
   - **Repository Owner:** `dengan-karya` (or your GitHub username)
   - **Repository Name:** `dengankarya-ui`
   - **Repository Access:** `Public`
   - **Workflow File:** `.github/workflows/release.yml`
   - **Workflow Ref:** `main` (the branch that triggers releases)
   - **Environment:** `npm` (matches the `environment: npm` in the workflow)

5. Click **"Add trusted publisher"**

> 💡 **Tip:** You can also use wildcards like `*` for repository name if you have multiple packages.

---

## Step 2: Verify the Workflow Configuration

The workflow is already set up correctly. Verify these settings in `.github/workflows/release.yml`:

```yaml
release:
  environment: npm
  steps:
    - uses: actions/setup-node@v4
      with:
        registry-url: 'https://registry.npmjs.org'
    - env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        NODE_AUTH_TOKEN: ${{ github.token }}
      run: npx semantic-release
```

**Key points:**
- `environment: npm` — matches what you configured on npm
- `registry-url: 'https://registry.npmjs.org'` — tells Node where npm is
- `NODE_AUTH_TOKEN: ${{ github.token }}` — uses GitHub's built-in token (not a stored secret)
- `GITHUB_TOKEN` — needed for creating GitHub releases

---

## Step 3: Create Baseline Git Tag

Before testing, create the baseline tag so semantic-release knows where to start:

```bash
git tag v0.1.0
git push origin v0.1.0
```

---

## Step 4: Commit and Push the Pipeline

```bash
git add -A
git commit -m "chore: set up OIDC Trusted Publishing for npm"
git push origin main
```

This will trigger the GitHub Actions workflow. It will:
1. Run the `ci` job (typecheck + build) — should pass
2. Run the `release` job — should exit cleanly with "no release published" (because this is a `chore:` commit)

✅ If both jobs pass, your OIDC setup is working!

---

## Step 5: Test with a Real Release

Once everything is set up, make a real commit to trigger a release:

```bash
git commit -m "feat: add test feature" --allow-empty
git push origin main
```

This will:
1. Trigger the pipeline
2. `semantic-release` will detect the `feat:` commit
3. Version bumps to `0.2.0` (minor bump)
4. GitHub generates a temporary OIDC token
5. npm verifies the token came from your GitHub repo
6. Package is published as `dengankarya-ui@0.2.0`
7. Git tag `v0.2.0` is created
8. GitHub Release is created automatically

---

## Troubleshooting

### "403 Forbidden" when publishing

**Problem:** The npm registry rejected the OIDC token.

**Solutions:**
1. **Verify Trusted Publisher is configured:** Log in to npm → Account Settings → check that GitHub is listed as a trusted publisher
2. **Check environment name:** Ensure `environment: npm` in the workflow matches what you entered on npm
3. **Check repository is public:** OIDC requires the GitHub repo to be public
4. **Check ownership:** The npm account must own the package

### "Package not found" error

**Problem:** npm doesn't recognize the package.

**Solution:** The package must already exist on npm. Make sure you've published it at least once manually before setting up OIDC.

### Workflow passes but nothing published

**Problem:** This is expected! If the commit is `chore:`, `docs:`, etc., semantic-release correctly skips the release.

**Solution:** Push a `feat:` or `fix:` commit to trigger a real release.

---

## How to Verify OIDC is Working

### Check GitHub Actions Logs

1. Go to your GitHub repo
2. Click **Actions** → **CI / Release** workflow
3. Click the latest run
4. Expand the **Release** job
5. Look for lines like:
   ```
   npm notice Verifying OIDC token...
   npm notice Publishing as @user/package...
   ```

### Check npm Registry

After a release, verify on npmjs.com:

1. Go to `npmjs.com/package/dengankarya-ui`
2. Check the version history — should show the new version with a "Published by GitHub Actions" badge (if npm displays this)

---

## Differences from NPM_TOKEN

| Aspect | NPM_TOKEN | OIDC |
|--------|-----------|------|
| Token Storage | GitHub Secrets | None (temporary) |
| Token Lifetime | Long-lived (months/years) | Minutes |
| Security Risk | High (if leaked) | Minimal |
| Setup Complexity | 2 steps | 4 steps |
| Works with Private Repos | Yes | No (requires public) |
| npm Configuration | None needed | Configure trusted publisher |

---

## Additional Resources

- [npm Trusted Publishing Docs](https://docs.npmjs.com/about-trusted-publishing)
- [GitHub OIDC Token Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [semantic-release npm Plugin](https://github.com/semantic-release/npm)

---

## Next Steps

1. ✅ Configure npm trusted publisher (Step 1)
2. ✅ Create baseline tag (Step 3)
3. ✅ Push the workflow (Step 4)
4. ✅ Test with a real commit (Step 5)
5. ✅ Verify in GitHub Actions logs
6. ✅ Check npmjs.com to see the published version

You're all set! 🚀
