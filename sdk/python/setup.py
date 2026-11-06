from setuptools import setup, find_packages

setup(
    name="wrn-sdk",
    version="0.2.0",
    description="Official Python SDK for WRN Cloud, Agent Passports & Step Functions Orchestration",
    author="Frank Van Laarhoven",
    author_email="frank@wrn.network",
    packages=find_packages(),
    install_requires=[
        "requests>=2.28.0",
        "pydantic>=2.0.0"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.9",
)
