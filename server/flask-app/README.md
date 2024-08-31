my_flask_app/
│
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   ├── forms.py
│   └── config.py
│
├── venv/ (optional for virtual environment)
│
├── run.py
│
└── requirements.txt


import json
import subprocess

# Load the dependencies from the JSON file
with open('requirements.json', 'r') as f:
    data = json.load(f)

# Install each dependency
for package, version in data['dependencies'].items():
    subprocess.run(["pip", "install", f"{package}=={version}"])

pip install -r requirements.txt