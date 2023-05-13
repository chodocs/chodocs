# 常用一些 Git 命令

<VideoLink bvId="BV1ZP4y1Q76V">程序员进厂前必知必会 Git 技巧 | commit 提交规范 | rebase、amend 操作 B 站视频传送门</VideoLink>

推荐 mac 用户安装 oh-my-zsh，在这备忘一些常用的命令，以及一些简写方式。

> 以下参考自 [ohmyzsh git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)

| 简写（Alias） |           对应命令           |                                             详情                                             |
| :-----------: | :--------------------------: | :------------------------------------------------------------------------------------------: |
|      gaa      |        git add --all         |                         添加当前项目所有文件修改、增删的文件到缓存区                         |
|      gb       |          git branch          |                                         查看分支列表                                         |
|      gc!      |    git commit -v --amend     | 修正上次提交，像 reabase 一样操作，每次提交执行一次，覆盖上一次提交，即可保证只有一个 commit |
|      gcb      |       git checkout -b        |                                   基于当前分支切换新的分支                                   |
|      gcp      |       git cherry-pick        |                                 根据 commitId 拿某一次的提交                                 |
|      gbD      |        git branch -D         |                                           删除分支                                           |
|     glods     | git log --graph --date=short |                                         查看提交记录                                         |
|      gpf      |       git push --force       |                               强制推送，一般用于 reabase 之后                                |

## 删除其它分支

这个是我经常会用到的，因为本地开发多次之后，使用 `git branch` 之后会发现有很多分支还在，为了保证「干净卫生」，所以就了解一下，可以执行如下命令。

- 增强命令（master）

> 可以删除除开 master 以外的分支，但类似 `mr/master/xxx` 这样的带有 master 的删除不了。

```sh
git stash && git checkout master && git branch | grep -v "master" | xargs git branch -D
```

- 增强命令（main）

> 同上。

```sh
git stash && git checkout main && git branch | grep -v "main" | xargs git branch -D
```

- 增强命令（release）

> 同上。

```sh
git stash && git checkout release && git branch | grep -v "release" | xargs git branch -D
```

## rebase

rebase 命令很强大，`git rebase -i HEAD~[num]` 和 `git pull --rebase` 等。

> 推荐阅读 [彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)

## 查看完整信息

谁用谁知道！

```sh
git reflog
```

## git commit 提交规范

这里以 coding 工作台为例子，其它代码托管平台可能需要修改一下正则。

<CloudinaryImg publicId='memo/git-regex_klbyot' alt='git-regex'/>

```sh
^(feat|fix|docs|style|refactor|perf|test|build|revert|merge|chore)(\(.+\))?:\s+(.*)#[0-9]+\s+|^(Accept Merge Request)\s+#[0-9]+:\s+(\(.+\s+->\s+.+\))
```

### 书写工具辅助

第一种：

全局安装 `commitizen`，即可使用 `git cz` 命令取代 `git commit`，提供交互式选择界面，协助书写。

```sh
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

> 参考阅读 [Commit Message](https://coding.net/help/docs/ci/practice/lint/git-commit.html#install)

第二种：

更花哨一点，使用 [git-cz](https://github.com/streamich/git-cz)

<CloudinaryImg publicId='memo/git-cz_nuarae' alt='git-cz'/>

```sh
npx git-cz

// or

npm install -g commitizen
npm install --save-dev git-cz
```

## git stash

平常需要切换分支，但有时候又不想要立即 commit 上去，于是可以通过 `git stash` 备份一下，主要的一些命令如下：

备份当前改动

```sh
git stash
```

查看备份列表

```sh
git stash list
```

恢复备份的改动

```sh
git stash pop
```

> 更多内容可参考 [git-stash 用法小结](https://www.cnblogs.com/tocy/p/git-stash-reference.html)
