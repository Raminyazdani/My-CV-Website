# Private CV data and code publication

The repository distributes code and synthetic test logic. Keep real CV JSON, databases, environment files, personal images and upload directories separate and local.

The ignore rules explicitly cover my_cv.json at every depth, SQLite/database extensions, .env variants, private/data/output directories, the two owner-supplied fallback images and frontend public uploads. Synthetic environment examples and dependency manifests remain trackable. Ignore rules do not remove already tracked files or erase historical blobs.

Before adding files, inspect git status and the actual staged diff. A secret-pattern scan is not a privacy review. New source additions were scanned; old remote history was preserved and is not globally certified free of private data. No source-history purge or credential rotation was performed.

The local real CV database and recovered records were not used by the synthetic tests. Deployment with real CV information requires an explicit owner decision about which fields and images may be exposed by the API/site. No such deployment or data publication is part of this code-only update.
