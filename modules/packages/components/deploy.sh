#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

rm -rf .deploy

mkdir .deploy
cp package.json .deploy/
cp -rf lib/ .deploy/lib

cd .deploy


git add -A
git commit -m 'deploy'

git remote add origin git@github.com:NenX/components.git

git push -f -u git@github.com:NenX/components.git


cd -
rm -rf .deploy/