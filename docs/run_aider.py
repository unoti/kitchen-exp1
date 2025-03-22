"""Run Aider with Azure OpenAI credentials using managed identity.
In our environment, we don't use API keys at all, and rather use Azure Manged Ifentity and Azure AD authentication.
This doesn't work out of the box with aider (yet) so this is the workaround we're using for now.

Invoke this with:
```bash
python -m dana_agent.util.run_aider --help
```

This isn't the exact one I'm using, but I've put it here to help you get started.

PS D:\code\one\COI-DANA-Copilot> .\env\dana\dana-venv\scripts\activate
python -m dana_agent.util.run_aider --help
"""
# pip install azure-identity
import os
import subprocess
import sys

from azure.identity import AzureCliCredential
 

def init_environment():
    cred = AzureCliCredential()
    token = cred.get_token("https://cognitiveservices.azure.com/.default")
    
    # For gpt-4o:
    # os.environ["AZURE_AD_TOKEN"] = token.token
    # os.environ["AZURE_API_VERSION"] = "2024-10-21"
    # os.environ["AZURE_API_BASE"] = "https://worldweaver-test-openai-westus3.openai.azure.com" # 4o

    # For o3-mini:
    #os.environ["AZURE_AD_TOKEN"] = token.token
    os.environ["AZURE_OPENAI_AD_TOKEN"] = token.token # Newly added. Did this fix it?
    os.environ["AZURE_API_VERSION"] = "2024-12-01-preview"
    os.environ["AZURE_API_BASE"] = "https://worldweaver-test-openai-eastus2.openai.azure.com" # o3-mini

def run_aider(optional_args=[]):
    # --no-show-model-warnings because we're using managed identity instead of keys.
    #command = ["aider", "--model", "azure/gpt-4o", '--no-show-model-warnings'] + optional_args
    command = ["aider", "--model", "azure/o3-mini", '--no-show-model-warnings'] + optional_args
    subprocess.run(command)

def main():
    init_environment()
    run_aider(sys.argv[1:])

if __name__ == '__main__':
    main()
