FROM node:24-bookworm-slim

# sharp rasterizes the SVG templates itself (libvips ships with the npm package),
# so all it needs from the system is fontconfig and the fonts.
# ttf-mscorefonts-installer lives in contrib, which is not enabled by default.
RUN echo "deb http://deb.debian.org/debian bookworm contrib" > /etc/apt/sources.list.d/debian-contrib.list \
  && apt-get update \
  && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
  && apt-get install -yq --no-install-recommends \
    ca-certificates dumb-init fontconfig fonts-liberation ttf-mscorefonts-installer unzip wget \
  && rm -rf /var/lib/apt/lists/*

RUN wget --progress=dot:giga https://github.com/google/fonts/archive/main.zip \
  && unzip main.zip \
  && rm main.zip \
  && cd fonts-main && mv apache/* ofl/* ufl/* /usr/local/share/fonts/ \
  && fc-cache -v \
  && cd ../ && rm -Rf fonts-main

WORKDIR /app
ADD package*.json /app/
RUN npm ci

ENV HOST=0.0.0.0
ENV PORT=3000

# Kept below the expensive layers on purpose: RELEASE changes on every commit
# and would otherwise invalidate the font cache above.
ARG RELEASE=dev
ENV RELEASE=$RELEASE

COPY . /app

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "index.js"]
