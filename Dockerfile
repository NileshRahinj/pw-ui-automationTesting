# Base Playwright image with Node and browsers
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set working directory
WORKDIR /app

# Copy package files for caching
COPY package*.json ./

# Install Node dependencies
RUN npm ci

# Only install Chromium (faster than all browsers)
RUN npx playwright install chromium

# Copy the rest of the code (tests, configs)
COPY . .

# Set environment variable for production (optional)
ENV NODE_ENV=production

# Default command to run tests
CMD ["npx", "playwright", "test"]
