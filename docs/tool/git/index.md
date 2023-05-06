# 版本管理，Git 基础

在学习版本管理之前，我们先认识一下什么是版本管理。那么我们首先需要了解什么是版本吧。

顺着这个思路，我们首先要知道，怎么去定一个版本，以及版本的格式是什么样的，它是不是遵循某种规范等等。这些问题在下面都会有详细的说明。

首先我们要了解语义化版本：

## 语义化版本

语义化版本是一个版本号的规范，他由 npm 的创始人提出，目的是为了解决版本号的混乱问题。其规范我们在下面详细说明。

相信在不少开源项目中，你都会看到这样的版本号：

- 2.6.0
- 2.6.0-beta.1
- 2.0.0-rc.8
- 2.0.0-alpha.8

他们都是符合语义化版本格式规范的版本号。那么不同的版本号又代表了什么呢？我们在下面详细说明。

### 理解版本格式

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

- 主版本号：当你做了不兼容的 API 修改
- 次版本号：当你做了向下兼容的功能性新增
- 修订号：当你做了向下兼容的问题修正先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

对于加在后面的延伸信息，我介绍几个常见的，并且他们之间是有顺序的：

- 1.alpha：内部测试版本，可能会存在很多 bug，除非内部测试人员，否则不要使用。
- 2.beta：公测版本，消除了严重的错误，但还是存在一些缺陷，需要测试人员进一步测试，如果反馈的问题比较多，就需要再次进行 beta 版本的发布，直到基本上不存在问题。
- 3.rc：发行候选版本，基本上不存在问题，除非是重大问题，否则不会对代码进行修改，这个版本就是最终发布的版本。
- 4.release

### 发布版本可能遇到的问题

以下问题及解答来自[语义化官方](https://semver.org/lang/zh-CN/)：

**在 0.y.z 初始开发阶段，我该如何进行版本控制？**

最简单的做法是以 0.1.0 作为你的初始化开发版本，并在后续的每次发行时递增次版本号。

**对于公共 API，若即使是最小但不向下兼容的改变都需要产生新的主版本号，岂不是很快就达到 42.0.0 版？**

这是开发的责任感和前瞻性的问题。不兼容的改变不应该轻易被加入到有许多依赖代码的软件中。升级所付出的代价可能是巨大的。要递增主版本号来发行不兼容的改版，意味着你必须为这些改变所带来的影响深思熟虑，并且评估所涉及的成本及效益比。

**如果我变更了公共 API 但无意中未遵循版本号的改动怎么办呢？（意即在修订等级的发布中，误将重大且不兼容的改变加到代码之中）**

自行做最佳的判断。如果你有庞大的使用者群在依照公共 API 的意图而变更行为后会大受影响，那么最好做一次主版本的发布，即使严格来说这个修复仅是修订等级的发布。记住， 语义化的版本控制就是透过版本号的改变来传达意义。若这些改变对你的使用者是重要的，那就透过版本号来向他们说明。

**我该如何处理即将弃用的功能？**

弃用现存的功能是软件开发中的家常便饭，也通常是向前发展所必须的。当你弃用部份公共 API 时，你应该做两件事：

（1）更新你的文档让使用者知道这个改变，

（2）在适当的时机将弃用的功能透过新的次版本号发布。

在新的主版本完全移除弃用功能前，至少要有一个次版本包含这个弃用信息，这样使用者才能平顺地转移到新版 API。

**“v1.2.3” 是一个语义化版本号吗？**

“v1.2.3” 并不是的一个语义化的版本号。但是，在语义化版本号之前增加前缀 “v” 是用来表示版本号的常用做法。在版本控制系统中，将 “version” 缩写为 “v” 是很常见的。比如：git tag v1.2.3 -m "Release version 1.2.3" 中，“v1.2.3” 表示标签名称，而 “1.2.3” 是语义化版本号。

## 版本控制工具 Git

版本控制工具涉及到很多内容，我们分为三个部分来讲解：

1、首先要知道一些常用的 Git 平台：

giihub、gitlab、gitee、coding、bitbucket、gitea、gogs、gitcafe、git.oschina、git.

2.然后要了解一些 git 的基础命令等，这个是重点。

3.最后是 gitflow 工作流，管理分支的一种方式。

## git 基础

理解 Git 平台的工作使用流程，以 GitHub 为例:

我们使用 GitHub 创建一个仓库，https://github.com/new , 填写仓库名称，并编辑仓库的描述，选择公开或私有，然后点击创建仓库。我们会进到一个仓库的页面，默认是在 Code tab 下。

### Code tab

初始时是没有任何 code 的，我们需要把本地的代码上传到这个仓库中。默认会提示你有两种方式：

- …or create a new repository on the command line：在命令行中创建一个新的仓库。

- …or push an existing repository from the command line：从命令行中推送一个已经存在的仓库。注意：这个仓库是已经存在的，也就是说你本地已经有了这个仓库，只是还没有上传到远程仓库中。

- …or import code from another repository：从其它仓库导入代码。这种方式是从其它仓库导入代码，例如从 gitlab 中导入代码。相对来说比较少用。

创建提交之后，我们就可以在本地的命令行中使用 git 命令来操作这个仓库了。

### Issues tab

Issues 是用来记录项目的问题的，可以用来记录 bug，或者是一些新的需求等。我们或者仓库中的其它成员都可以点击 New issue 来创建一个新的 issue，填写 issue 的标题和内容，然后点击 Submit new issue 来提交 issue。

### Pull requests tab

当设置了仓库权限，将分支保护设置为需要 review 时，我们在提交代码时，就需要先创建一个 pull request，然后再由仓库的管理员来 review 代码，如果代码没有问题，就可以合并到主分支中。

> 在工作中我们经常将其称为 pr，即 pull request 的缩写。

### Projects tab

Projects 是用来管理项目的，可以创建多个项目，每个项目可以创建多个任务，每个任务可以设置任务的状态，例如 To do、In progress、Done 等。

### Security tab

Security 是用来管理项目的安全的，可以查看项目的安全警告，例如项目中使用的依赖有安全漏洞等。

### Insights tab

Insights 是用来查看项目的统计信息的，例如项目的活跃程度、贡献者、流量等。

### Settings tab

Settings 是用来管理项目的设置的，例如项目的名称、描述、权限、分支保护、Webhooks 等。

这这个面板中，我们比较常关注的是 Setting 中的安全设置，可以设置仓库的访问权限，例如公开或私有，以及分支保护，例如是否需要 review，是否需要签名，是否需要强制检查等。如果不进行这些设置的话，仓库中的任何人都可以直接提交代码到主分支中，这样就会导致代码的质量无法保证。

1、设置仓库的访问权限：

如果仓库是公开的，任何人都可以访问，如果仓库是私有的，只有仓库的成员才能访问。那么怎么成为仓库的成员呢？我们可以在 Collaborations 里的 Manage access 中添加仓库的成员，添加成员时，可以设置成员的权限，例如只读或者是写入等。

2、设置分支保护：

可以在 General 里的 Pull requests 中的 Branch protection rules 中设置分支保护，例如设置主分支的保护，可以设置是否需要 review，是否需要签名，是否需要强制检查等。

## git 基础

这里我们要知道的是 git 的工作区、暂存区和版本库的概念，以及我们在使用一些命令时，要知道这些命令是对哪个区域进行操作的。

![](https://www.runoob.com/wp-content/uploads/2015/02/git-command.jpg)

> 图片来自，菜鸟教程网站

**工作区**

我们在电脑上能看到的目录就是工作区，工作区里有一个隐藏目录 .git，这个不算工作区，而是 git 的版本库。

**版本库**

工作区有一个隐藏目录 .git，这个不算工作区，而是 git 的版本库。在版本库中主要包括 stage（或者叫 index）暂存区，还有 git 自动创建的第一个分支 master 目录树。

暂存区中的内容是通过 git add 命令添加的。并且会在我们使用 git commit 命令后提交到当前分支。

> 注意我们提交后，记录的是快照（文件的变化），而不是整个文件，否则 git 仓库将会非常大

## git 命令（常用）

注意，这里我们只是概况的讲解一下 git 的常用命令，具体的使用我们会结合使用场景在后面一章讲到。

### git clone

克隆一个远程仓库到本地。需要注意的是 windows 下如果使用 git clone 命令，需要先安装 git 客户端，否则会报错。如果是使用的 ssh 方式，需要先配置好 ssh key。

> 安装 git 客户端：https://git-scm.com/downloads

> 配置 ssh key：https://help.github.com/en/articles/connecting-to-github-with-ssh

### git init

初始化一个本地仓库，会在当前目录下生成一个 .git 的隐藏文件夹，这个文件夹是 git 用来跟踪管理版本的。一般只有在创建新仓库的时候才会使用这个命令。

### git add

将文件添加到暂存区，可以使用 git add . 来添加当前目录下的所有文件，也可以使用 git add [file] 来添加指定的文件。如果你使用 VSCode 的话，可以在左侧的源代码管理中看到添加的文件。

```bash
git add .
# 或者
git add README.md
```

> 使用 vscode 可以可视化的看到文件的状态，例如修改的文件、添加的文件、删除的文件等。并且我们也可以在这里提交代码，不需要使用命令行。这个我们会在下一章讲，前提是我们需要了解 git 的命令。

### git remote

查看当前仓库的远程仓库信息，如果没有配置远程仓库，会显示为空。也可以使用 git remote add origin [url] 来添加远程仓库、git remote rm origin 删除远程仓库。详细可通过 git remote --help 查看。

```bash
git remote add origin git@github.com:chovue/vue3-management-system.git
# 或者删除
git remote rm origin
```

### git status

查看当前仓库的状态，例如修改的文件、添加的文件、删除的文件等。

### git commit

提交代码，需要先 git add 添加文件到暂存区，然后再使用 git commit -m [message] 来提交代码。如果你使用 VSCode 的话，可以在左侧的源代码管理中看到提交的记录。

```bash
git commit -m "first commit"
```

### git push

将本地仓库的代码推送到远程仓库，需要先 git add 添加文件到暂存区，然后再使用 git commit -m [message] 来提交代码，最后使用 git push origin [branch] 来推送代码到远程仓库。

> 需要注意的是，如果是第一次推送代码，需要先 git push -u origin [branch]，这样才能将本地仓库的代码推送到远程仓库。

```bash
# 第一次推送master分支,并关联本地和远程分支
git push -u origin master

# 之后可以直接推送master分支
git push

# 强制推送,会覆盖远程分支
git push -f origin master

# 推送所有本地分支
git push --all

# 同时推送标签
git push --tags

# 删除远程dev分支
git push -d origin dev
```

上述列举的是相对常见的一些参数，这里一一解释一下：

- `-u` 或 `--set-upstream` 参数， 是指将本地分支与远程分支关联起来，这样在下次推送代码时，就不需要指定分支了。

- `-f` 或 `--force` 参数，表示强制推送，一般不建议使用，因为这样会覆盖远程仓库的代码。

- `--all`: 推送所有本地分支到远程。

- `--tags` 参数，一并推送本地创建的标签。

- `-d` 或 `--delete`: 删除远程分支。

### git pull

将远程仓库的代码拉取到本地,其实就是 git fetch 和 git merge 的组合。

pull 常用的参数有:

- -r 或 --rebase: rebase 当前分支到服务器上最新的 commit,与其他开发者的 commit 并发展开。这将会修改历史,并在 pull 之后要做 rebase 之前的 commit。
- --autostash: 会在 rebase 期间自动暂存本地改动(stash),完成 rebase 后还原(stash pop),避免冲突。
- --allow-unrelated-histories: 允许在没有任何共同提交的情况下,合并两个不同的提交历史。

```bash
# 拉取远程master并rebase到本地
git pull -r origin master

# 拉取远程master,且在rebase过程中自动stash和pop
git pull --rebase --autostash origin master

# 两个独立仓库,允许合并不同的提交历史
git pull --allow-unrelated-histories origin master
```

### git checkout

切换分支，可以使用 git checkout [branch] 来切换分支，也可以使用 git checkout -b [branch] 来创建并切换分支。

```bash
# 切换到dev分支
git checkout dev

# 创建并切换到dev分支
git checkout -b dev
```

### git brach

查看当前仓库的分支信息，可以使用 git branch -a 来查看所有分支，也可以使用 git branch -r 来查看远程分支，使用 git branch -d [branch] 来删除分支。

```bash
# 查看所有分支
git branch -a

# 查看远程分支
git branch -r

# 删除dev分支
git branch -d dev
```

### git fetch

拉取远程仓库的代码，可以使用 git fetch [remote] [branch] 来拉取远程仓库的代码，例如 git fetch origin master 来拉取远程仓库的 master 分支。

```bash
# 拉取远程master分支
git fetch origin master
```

### git merge

合并分支，可以使用 git merge [branch] 来合并分支，例如合并 dev 分支到 master 分支，需要先切换到 master 分支，然后再使用 git merge dev 来合并分支。

```bash
# 切换到master分支
git checkout master

# 合并dev分支
git merge dev
```

### git rebase

将本地的提交移到另一个分支上，可以使用 git rebase [branch] 来将当前分支的提交移到指定的分支上，例如将当前分支的提交移到 master 分支上，需要先切换到当前分支，然后再使用 git rebase master 来将当前分支的提交移到 master 分支上。

> 注意：如果当前分支和 master 分支都有提交，那么当前分支的提交会移到 master 分支的最后面。并且使用 git rebase 之后，当前分支的提交记录会被修改。

```bash
# 切换到dev分支
git checkout dev

# 将dev分支的提交移到master分支上
git rebase master
```

### git cherry-pick

将指定的提交合并到当前分支，可以使用 git cherry-pick [commit] 来将指定的提交合并到当前分支，例如将 123456 这次提交合并到当前分支，需要先切换到当前分支，然后再使用 git cherry-pick 123456 来将 123456 这次提交合并到当前分支。

```bash
# 切换到dev分支
git checkout dev

# 将123456这次提交合并到当前分支
git cherry-pick 123456
```

### git log

查看提交记录，可以使用 git log 来查看所有的提交记录，也可以使用 git log --oneline 来查看简洁的提交记录。

```bash
# 查看所有提交记录
git log

# 查看简洁的提交记录
git log --oneline
```

### git diff

查看文件的差异，可以使用 git diff [file] 来查看指定文件的差异，也可以使用 git diff [branch1] [branch2] 来查看两个分支的差异。

```bash
# 查看指定文件的差异
git diff README.md

# 查看两个分支的差异
git diff master dev
```

### git reset

回退版本，可以使用 git reset --hard [commit] 来回退到指定的版本。

```bash
# 回退到指定的版本
git reset --hard 3628164

# 回退到上一个版本
git reset --hard HEAD^

# 回退到上上一个版本
git reset --hard HEAD^^

# 回退到前100个版本
git reset --hard HEAD~100
```

### git reflog

查看命令历史，可以使用 git reflog 来查看所有的命令历史，例如回退到指定的版本，但是又不知道版本号，可以通过 git reflog 来查看所有的命令历史，然后再使用 git reset --hard [commit] 来回退到指定的版本。

```bash
# 查看所有的命令历史
git reflog
```

### git tag

打标签，可以使用 git tag [tag] 来打标签，例如 git tag v1.0.0 来打 v1.0.0 的标签，也可以使用 git tag -a [tag] -m [message] 来打带有说明的标签。

```bash
# 打v1.0.0标签
git tag v1.0.0

# 打带有说明的标签
git tag -a v1.0.0 -m "说明"
```

### git show

查看标签信息，可以使用 git show [tag] 来查看标签的信息。

```bash
# 查看v1.0.0标签的信息
git show v1.0.0
```

## 场景应用

### 1. 修复 bug 时的分支管理

```bash
# 创建bug分支
git checkout -b bug-xxx

# 在bug分支上修复bug,并提交
git add . && git commit -m "fix bug xxx"

# 提交修复bug后的代码到远程bug分支
git push origin bug-xxx

# 切换到主分支（主分支受保护则提pr，不进行以下步骤）
git checkout master

# 合并bug分支到主分支
git merge bug-xxx

# 删除bug分支
git branch -d bug-xxx
```

### 2. 合并其他开发者的代码

```bash
# 获取最新代码
git pull

# 解决合并冲突,然后提交
git add . && git commit

# 推送到远程仓库
git push
```

### 3. 暂存未完成的工作

```bash
# 暂存当前文件
git stash 或 git stash save

# 此时工作区清空,可以进行其他工作

# 恢复暂存的工作
git stash pop

# 查看暂存列表
git stash list

# 详细查看某个暂存
git stash show <stash@{n}>

# 删除某个暂存
git stash drop <stash@{n}>
```

### 4. 添加已有仓库作为远程仓库

```bash
# 进入已有本地仓库
cd myproj

# 添加远程仓库
git remote add origin <URL>

# 推送主分支
git push -u origin master
```

### 5. 回退操作

```bash
# 查看提交日志
git log

# 切换版本
git checkout <commit-id>

# 比较修改
git diff <commit-id>

# 回退到某个版本
git reset --hard <commit-id>

# 恢复被回退的版本
git reflog
git checkout <commit-id>
```

### 6.其它意外情况

```bash
# 需要其它分支上的部分代码
git cherry-pick <commit-id>

# 误删分支
git reflog
git checkout <commit-id>
git branch <branch-name>

# 误删文件
git reflog
git checkout <commit-id> <file-name>

# 合并多次提交（git rebase - 变基一个分支上的提交到另一个分支。这会取出提交,然后将其重新放置在另一个分支顶部,从而创造一个直线的项目历史。）
git rebase -i <commit-id>
```

## 使用 Git 图形界面工具

对于 git 基础基本掌握的同学来说，使用命令行操作 git 是最方便的，但是对于刚刚接触 git 的同学来说，命令行操作 git 是一件很痛苦的事情，这一章就来介绍 git 图形界面工具吧。

### VSCode 源代码管理

这是 VSCode 自带的源代码管理工具，可以在左侧的源代码管理面板中看到，也可以使用快捷键 Ctrl + Shift + G 来打开源代码管理面板。

> Git 图形界面工具可以在一定程度上代替 Git 命令行完成部分简单操作,但无法完全替代。

在 VSCode 的 Git 图形界面中,有几个操作起来比命令行更简单易用:

1. 查看文件状态和变更

在 VSCode 中可以很直观地看到工作区中的文件状态(新增、修改、删除),可以大致了解这次提交会被包含的更改内容。这比在命令行使用 git status 查看文件状态更加直观。

2. 可视化地暂存和取消暂存文件

可以在 VSCode 界面中直接勾选要暂存的文件,取消勾选即可取消暂存。这比在命令行使用 git add 和 git reset HEAD 要直观很多。

3. 可视化地浏览提交日志

在 VSCode 中可以以可视化的方式浏览提交历史,看提交摘要和具体的文件变化。这比在命令行使用 git log 查看日志要更加直观。

4. 切换和创建分支

在 VSCode 中可以很直观地看到本地分支和远程分支,可以直接在界面中创建、切换和删除分支。这比在命令行直接操作要更加容易上手。

5. 快速推送和拉取

可以直接在 VSCode 中一键完成推送(push)和拉取(pull)操作。无需输入任何 Git 命令,简单易用。

6. 可视化地处理合并冲突

在 VSCode 中可以直接在编辑器中看到合并冲突的文件,并可视化地编辑文件解决冲突。这比解决命令行的合并冲突文件要直观很多。所以,总体来说,VSCode 的 Git 图形界面在查看文件状态、操作暂存区、浏览提交日志、管理分支和快速推拉等方面使用起来更加简单易用。但是,像 rebase、stash 等较复杂的 Git 操作,在 VSCode 中实现起来就不会如此直观了。

### 分支管理工具 GitLens

在 VSCode 上,一个广受好评的 Git 分支管理插件是 GitLens。下载安装之后，其现在不会默认显示在侧边栏，我们可以在侧边栏右键选择 gitlen 显示在侧边栏中。其默认在源代码管理侧栏上一起显示所有视图，包括：

- COMMITS：显示当前分支的提交历史
- FILE HISTORY：显示当前文件的提交历史
- BRANCHES：显示本地和远程分支
- REMOTES：显示远程仓库
- STASHES：显示暂存列表
- TAGS：显示标签列表
- CONTRIBUTORS：显示贡献者列表
- SEARCH & COMPARE：显示搜索和比较视图

它可以实现:

1. 查看所有本地和远程分支,并直接在 VSCode 中创建、切换和删除分支。在 VSCode 的最下方的状态栏中,可以看到当前所在分支的信息。点击分支名称,即可查看分支信息和切换分支（有冲突则弹框报错）。

2. 查看各个分支最后一次提交信息,方便比较不同分支的进展。点击下方状态栏的 gitlen 图标,可以查看分支的提交历史构成的图谱。点击某个提交,可以查看该提交的详细信息,包括作者、提交时间、提交摘要、变更文件等。点击某个提交的变更文件,可以查看该文件的具体变更内容。

3. 查看文件在不同分支中的最新版本,快速比较不同分支的文件差异。在当前文件（注意需要是有多次提交改动的文件，新增文件无此按钮）右上方的带箭头的小圆球（Open Changes with Previous Revision），以将当前文件修订与先前的提交修订进行比较。

4. 在文件中，我们也可以看到当前文件的提交历史，以及当前文件的作者信息。鼠标悬停在某一行代码上，可以看到该行代码的作者信息。

除此之外，还有一些其它功能，这里就不一一介绍了，详细可以在插件的[官方文档](https://github.com/gitkraken/vscode-gitlens/tree/main)中查看。

## git flow

git flow 是一种 Git 分支管理工作流,它定义了一个围绕项目发布的严格分支模型,旨在帮助管理大型项目的开发和维护。git flow 的核心是围绕项目发布定义的一个严格的分支模型。它提供了一些高级命令,帮助我们完成分支的创建、合并等操作。

其意义在于：

- 多人协作开发，权限控制

- 避免冲突

- 项目版本管理，方便溯源和回退

### 持续集成 flow

团队开发成员经常集成他们的工作,通常每个成员每天至少集成一次,也就是说每天可能会发生多次集成。每次集成都通过自动化的构建（包括编译、发布、自动化测试）来验证,从而尽早地发现集成错误。许多团队发现这种方法可以显著减少集成问题并加快开发速度。

![image](https://user-images.githubusercontent.com/51811652/236365791-edd0e3d5-9ade-4856-a909-749d0cb72de2.png)

优点：

- 适用于持续集成多环境场景，版本相对比较稳定，而且需要小版本的更新迭代的场景。

- 上游分支向下游发展

- Bug=>New Feature=>master=>pre branch=>target branch

自动化流程工具 CI/CD，检测到代码变更，自动触发构建，自动化测试，自动化部署。

### 版本控制 flow

Vue 和 React 都是采用的这种模型，这种模型适用于版本控制的场景，在 master 分支检出，bug 修复在分支：

master -> Stable -> new branch -> bug fix -> version

![image](https://user-images.githubusercontent.com/51811652/236366380-33fe619b-07c6-4370-ab2d-00380a30e70d.png)

## 总结

本篇文章从 Git 的基本概念开始，介绍了 Git 的基本操作，包括 Git 命令 、Git 的 GUI 插件 GitLens、Git 的工作流 Git Flow 这些内容，这些命令和工具都是需要我们在日常开发中熟练掌握的，这样才能更好的使用 Git 来管理我们的项目。

另外，在本篇中也引入了团队的协作开发的概念，这些就不在本篇来讲解了，关于团队协作会再出一篇文章来讲解。
