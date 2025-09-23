FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/usr/local/go/bin:/root/.cargo/bin:$PATH"

# Core dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  g++ \
  gcc \
  python3 \
  python3-pip \
  curl \
  php \
  openjdk-17-jdk \
  software-properties-common \
  git \
  ca-certificates \
  wget \
  unzip \
  mysql-server \
  libmysqlclient-dev

# ✅ Install Node.js v18 and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# ✅ Install Go
RUN curl -LO https://golang.org/dl/go1.21.5.linux-amd64.tar.gz && \
  tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz && \
  rm go1.21.5.linux-amd64.tar.gz

# ✅ Set Go environment variables
ENV GOPATH=/go
ENV PATH=$PATH:$GOPATH/bin

# ✅ Install Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

# ✅ Install TypeScript
RUN npm install -g typescript

# ✅ Install R
RUN apt-get update && apt-get install -y r-base r-base-dev

# ✅ Install SQL databases
RUN apt-get install -y sqlite3 postgresql-client mysql-client

# ✅ Install common R packages
RUN R -e "install.packages(c('data.table', 'dplyr', 'ggplot2'), repos='https://cran.rstudio.com/')"

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Install Go dependencies (if needed, for example if you have a `go.mod` file)
# RUN go mod tidy

# Expose MySQL and app ports (3306 for MySQL, 5000 for app)
EXPOSE 3306 5000

# Initialize MySQL database (optional: you could add your own schema/init.sql if needed)
RUN service mysql start && \
    mysql -e "CREATE DATABASE IF NOT EXISTS myapp_db;" && \
    mysql -e "CREATE USER 'root'@'%' IDENTIFIED BY 'root';" && \
    mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';" && \
    mysql -e "FLUSH PRIVILEGES;"

# Command to run MySQL and Node.js server together
CMD service mysql start && node server.js
