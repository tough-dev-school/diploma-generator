FROM node:16.9.0-bullseye

RUN apt-get update \
  && apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget unzip \
  && rm -rf /var/lib/apt/lists/*

RUN echo deb http://deb.debian.org/debian bullseye contrib non-free > /etc/apt/sources.list.d/debian-contrib.list && apt-get update \
  && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
  && apt-get install -y --no-install-recommends fontconfig ttf-mscorefonts-installer \
  && rm -rfu/var/lib/apt/lists/*

ADD main.zip /
# RUN wget https://github.com/google/fonts/archive/main.zip \

RUN cd / && unzip main.zip \
  && rm main.zip \
  && cd fonts-master && mv apache/* ofl/* ufl/* /usr/local/share/fonts/ \
  && fc-cache -v \
  && cd ../ && rm -Rf fonts-master

WORKDIR /app
ADD package*.json /app
RUN npm ci

ENV HOST 0.0.0.0
