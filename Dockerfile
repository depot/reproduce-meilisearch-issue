FROM node:18
RUN corepack enable

WORKDIR /usr/bin
RUN curl -L https://install.meilisearch.com | sh

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV MASTER_KEY master-key
RUN meilisearch --master-key="${MASTER_KEY}" & pnpm tsx src/wait-for-ready.ts
