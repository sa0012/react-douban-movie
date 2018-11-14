#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# npm run build

cd build
rm -rf .git
git init
git add -A
git commit -m 'update'

git push -f git@github.com:sa0012/react-douban-movie.git master:gh-pages

cd -