# 常用一些 Git 命令

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

```js
git stash && git checkout master && git branch | grep -v "master" | xargs git branch -D
```

- 增强命令（release）

> 同上。

```js
git stash && git checkout release && git branch | grep -v "release" | xargs git branch -D
```

## rebase

rebase 命令很强大，`git rebase -i HEAD~[num]` 和 `git pull --rebase` 等。

## 查看完整信息

谁用谁知道！

```js
git reflog
```

## 借助工具

vscode `GitLens` 插件挺好用的。
