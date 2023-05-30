# Gateway Manager

## Installation

- Clone Repo: `git clone https://github.com/marutimuthu/gateway-manager`
- Set Node Version: `nvm use 16`
- Install Packages: `npm i`
- Start Server: `npm start`

## Deploy 
- Install Packages: `npm i`
- Build: `npm run build`
- Serve: `pm2 serve build 3000 --spa`
- Save: `pm2 save`

## Server Setup (Ubuntu)
- Install NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
- Set Node Version: `nvm install 16`
- Install pm2: `npm i pm2 -g`
- Install Serve: `npm i serve -g`

## Nginx Setup
- Install Nginx: `sudo apt install nginx`
- Check Nginx Conf: `sudo nginx -t`
- Step 3: `sudo service nginx restart`
- Step 3: `sudo systemctl status nginx`
- Step 3: `sudo systemctl enable nginx.service && sudo service nginx restart`

## Certbot Setup
- Install Snapd: `sudo apt install snapd`
- Check Snapd: `sudo snap install core; sudo snap refresh core`
- Install Certbot: `sudo snap install --classic certbot`
- Create a symlink: `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
- Install Certbot with nginx: `sudo certbot --nginx`
