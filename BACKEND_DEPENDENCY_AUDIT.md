# Backend dependency metadata audit

Pip-audit2.10.1 audited the real prepared backend requirements: Django, djangorestframework, django-cors-headers, drf-yasg and python-dotenv. The resolver collected20 dependencies with zero known vulnerability findings and no skips on Python3.12/Windows. Actual public package reports and hashes are retained in the external V3 receipt.

For that baseline, optional installation syntax is `python -m pip install -r backend/requirements.txt -c backend/constraints-audited-py312-windows.txt`. This was not executed against the app. Constraints pin package versions, not artifact hashes; they do not guarantee application compatibility, other Python/platforms, frontend npm security or system tools. No old vulnerable pin was found and no speculative patch upgrade is claimed. Legacy dynamic DRF/coreapi schema references and original frontend missing modules remain unverified.

No real CV input, database, static personal asset, account, server or API was opened/run by this audit. The public repository identity is human-confirmed; the existing MIT license was preserved from the pinned remote parent.
