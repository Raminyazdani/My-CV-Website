# Recovered CV website — original frontend source restored

The existing Django backend and original React Router frontend are retained. This branch adds 38 genuine source files recovered from the owner's preserved OneDrive originals. It does not replace the frontend with a newly written interface. All 17 originally missing import sites now resolve to 13 recovered modules.

## Run locally with your own separate data

Frontend (Node/npm required):
    npm ci --ignore-scripts
    npm run typecheck --workspace frontend
    npm run build --workspace frontend
    npm run dev --workspace frontend

The root workspace lock is updated within semver ranges to remove known advisories; run npm ci from the repository root because this project uses npm workspaces. The standalone frontend lock is derived from the tested recovery environment, not a recovered historical lock. The only dependency-manifest addition is @radix-ui/react-navigation-menu 1.4.1, required by the recovered navbar.

Backend dependencies are in backend/requirements.txt. Configure CV_WEBSITE_SECRET_KEY and an isolated CV_DATABASE_PATH; optional Python3.12/Windows constraints are in backend/constraints-audited-py312-windows.txt. Original databases and private .env files are deliberately absent. Do not point a test server or migration/import command at your only real CV database. The populate_cv command defaults to no import; --write is a separate explicit operator action.

## Verified behavior and remaining limitations

The recovered frontend passed React Router typegen, TypeScript and production build. A separate diagnostic backend with synthetic data supplied all 11 expected API keys. The original interface rendered with 20 headings, passed five display assertions and had no JavaScript page exception. This is not complete acceptance testing of editing, PDF/export, auth or real CV data.

Two fallback assets, public/cover.jpg and public/profile.jpg, are unavailable in the checked recovery evidence. No replacement photo was fabricated. SectionCustom.tsx is genuinely empty and currently unused; its historical cause is unknown. External font access was intentionally blocked during browser testing.

The prior demo/ is a separate legacy fictional demonstration, not the recovered UI. Its files remain preserved; use frontend/ for the original interface.

## Security, data and history

This code-only publication contains no real SQLite database, my_cv.json, contact records, private .env, browser profile, personal static images or research dataset. Synthetic configuration uses placeholders. Ignore rules do not sanitize files already tracked or historical blobs.

The existing MIT LICENSE.md is preserved. Earlier remote history is preserved and has not been certified free of personal data or secrets; this work does not purge history, change visibility or rotate credentials. Local originals, all recovered versions and the original Git metadata are unchanged.

See RECOVERY_20261102.md for provenance and reproducibility scope.

## Current validation follow-up

The root workspace lock installs and builds successfully after a semver-respecting dependency update. npm reports no high/critical advisory; two moderate nodemon/minimatch development-tool findings remain. No forced downgrade was applied. The obsolete DRF coreapi AutoSchema reference was changed to OpenAPI AutoSchema; schema validation checks actual endpoint paths rather than HTTP200 alone.

Run the isolated backend regression with python backend/tests/test_synthetic_backend.py inside your dependency environment. It forces an in-memory database, uses generated synthetic records in a new temporary folder, and checks system configuration, migrations, sixteen list endpoints, missing-record behavior, eleven JSON selectors and a Swagger schema with actual API paths. It does not read your original database or CV JSON. Generated test artifacts are preserved for inspection.

Fresh updated-dependency frontend smoke: HTTP200, 11/11 synthetic API selectors, five display assertions, no JavaScript page exception. The two missing fallback images still return404; the intentionally blocked external font is not a clean-console claim. Complete real-data CRUD/edit/PDF/export acceptance remains untested.
