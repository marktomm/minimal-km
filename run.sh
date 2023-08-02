#!/bin/bash

# node v20.4.0
# npm 9.7.2

# Create a new directory for the project and navigate into it
mkdir minimal-project
cd minimal-project

# Initialize a new Vite project with a TypeScript and React template
npm init vite . -- --template react-ts

# Install dependencies
npm install

# Install Effector and its React bindings
npm install effector effector-react

# Install React Router DOM
npm install react-router-dom

# Install ESLint, its parser, and its plugins
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react

# Install Prettier, its ESLint config, and its ESLint plugin
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# Install Jest and its TypeScript processor
npm install --save-dev jest ts-jest @types/jest

# Install React Testing Library
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Initialize ESLint configuration
npx eslint --init

# Initialize Jest configuration
npx ts-jest config:init
