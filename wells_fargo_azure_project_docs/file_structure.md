# Monorepo File Structure

```plaintext
project-root/
├── README.md
├── frontend/
│   ├── src/
│   ├── components/
│   ├── services/
├── services/
│   ├── accounts-service/
│   │   ├── src/
│   │   ├── tests/
│   ├── payments-service/
│   ├── transactions-service/
│   ├── wellsfargo-integration-service/
│   ├── ai-analytics-service/
├── infra/
│   ├── aks/
│   ├── terraform/
│   ├── scripts/
└── .github/workflows/
    ├── ci-build.yml
    ├── cd-deploy.yml
```
