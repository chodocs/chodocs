---
author: "Choi Yang"
date: 2019-06-20
---

# 2019 年 第二届信息科学与工程学院院赛-正式赛(赛后补题)


::: tip
文章编写于 2019 年 06 月 20 日 —— 发表完失败感想之后，想着还是要继续比赛，先补完题再说，跌倒了再爬起来。
:::

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1500：XP 的矩阵</a>

分析：

这道题注意只能向下或者向右移动，令 dp(i,j)表示 XP 学长走到位置为(x,y)时路径和的最小值，因此你可以得到状态转移方程 dp(i,j) = min(dp(i-1,j),dp(i,j-1)) +a(i,j)。

注意初始化的时候让其他地方变为最大值，保证在矩阵内行走，然后 dp[1][0]=dp[0][1]=0 是为了起点的初始化

```c
#include<bits/stdc++.h>
#define mst(a) memset(a,0x3f,sizeof(a))
using namespace std;
const int maxn=1000+8;
map<int,int> mp;
map<int,int>::iterator it;
int g[maxn][maxn];
int dp[maxn][maxn];
int n;

int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        mst(dp);
        int n,m;
        cin>>n>>m;
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=m;j++)
            {
                cin>>g[i][j];
            }
        }
        dp[1][0]=dp[0][1]=0;
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=m;j++)
            {
                dp[i][j]=min(dp[i-1][j],dp[i][j-1])+g[i][j];
            }
        }
        int res=dp[n][m];
        cout<<res<<endl;
    }
    return 0;
}

```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1504: XP 的二进制操作数列</a>

分析:

这道题挺有意思的，看懂了就是一个水题，为了使得数列中所有数字变为零，你需要使得它们先成为相同的某个数字，考虑 or 操作，那么你只需要 or 上一个二进制下位数全为 1 的数 y，即可让一个数 x 变成 y，之后你只需要再 xor 一次 y 即可得到全零的数列，另外题目的坑点在于可能初始时数列就是完全相同的。并且如果数列全为 0 的话要特别考虑 全 0 不需要操作，所以操作次数为 0

那么就很显然了，如果数列完全相同（除开全 0）操作次数为 1 （与自己异或就行了），不完全相同就 2 次 （先 or 一个 2 的 32 次方-1 的数 使自己变为全 1 然后再异或这个全 1 操作次数为 2）

```c
#include<bits/stdc++.h>
using namespace std;
const int maxn=100000+8;
long long a[maxn];
set<long long >st;
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        st.clear();
        int n;
        cin>>n;
        bool flag=false;
        for(int i=0;i<n;i++)
        {
            long long x;
            cin>>x;
            if(x!=0)
            {
                flag=true;
            }
            st.insert(x);
        }
        if(flag)
        {
             int len=st.size();
            if(len!=1)
            {
                cout<<2<<endl;
            }
            else
            {
                cout<<1<<endl;
            }
        }
        else
        {
            cout<<0<<endl;
        }
    }
    return 0;
}

```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1505: XP 的橘子洲</a>

分析：

这个题原本学长是想考我们 xor 异或操作的，但是我用 map 做了，因为那个特别的烟花只有 1 个 所以对所有烟花，相同的就++ 然后如果 value 值为 1 就输出那个就行了

```c
#include<bits/stdc++.h>
#define mst(a) memset(a,0,sizeof(a))
using namespace std;
const int maxn=1000000+8;
int a[maxn];
map<int,int> mp;
map<int,int>::iterator it;
int main()
{
    int n;
    cin>>n;
    for(int i=0;i<n;i++)
    {
        int x;
        cin>>x;
        mp[x]++;
    }
    for(it=mp.begin();it!=mp.end();it++)
    {
        if(it->second==1)
        {
            cout<<it->first<<endl;
        }
    }
    return 0;
}

```
:::info
经过暑假刷题后，明白了异或操作，特来补上简单异或操作！
:::

位异或:
一个数与 0 异或 等于它本身
一个数与自己异或 等于 0

即对于一个任意一个数 n，它有几个特殊的性质：

1、0^n = n

2、n^n = 0
所以可以通过每次异或运算，最后剩下的值就是出现奇数次的那个数字。

==另外，附上位异或的一些运算法则==

1、a^b = b^a

2、(a ^ b) ^ c = a ^ ( b ^ c )

3、a ^ b ^a = b

```c
#include<iostream>
using namespace std;
const int maxn=1e6+8;
int a[maxn];
int main()
{
    int n;
    cin>>n;
    int res=0;
    for(int i=1;i<=n;i++)
    {
        int x;
        cin>>x;
        res^=x;
    }
    cout<<res<<endl;
    return 0;
}
```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1507: XP 的买卖</a>

分析

树状数组的模板题，但是我们需要注意的是树状数组没有单点替换的操作 只有更新这种做法，所以我们就先把原来的那个值减去，然后再加上我们新输入的值。其他的就是模板了，然后注意这个题 long long 才能过 数据比较大

```c
#include<bits/stdc++.h>
#define mst(a) memset(a,0,sizeof(a))
using namespace std;
const int maxn=100000+8;
map<int,int> mp;
map<int,int>::iterator it;
int a[maxn];
long long c[maxn];
int n,m;
void change(int pos,int v)
{
    for(int i=pos;i<=n;i+=i&(-i))
        c[i]+=v;
}
long long sum(int x)
{
    long long ans=0;
    while(x>0)
    {
        ans+=c[x];
        x-=x&(-x);
    }
    return ans;
}
int main()
{
    int t;
    scanf("%d",&t);
    while(t--)
    {
        mst(c);
        cin>>n>>m;
        for(int i=1;i<=n;i++)
        {
            cin>>a[i];
            change(i,a[i]);
        }
        while(m--)
        {
            int op,x,y;
            cin>>op>>x>>y;
            if(op==1)
            {
                //cout<<sum(y)<<"  "<<sum(x-1)<<endl;
                cout<<sum(y)-sum(x-1)<<endl;
            }
            else
            {
                change(x,y-a[x]);
                a[x]=y;
            }
        }
    }
    return 0;
}

```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1508: XP 的梅溪湖</a>

分析：

Dirac 定理:设一个无向图中有 N 个顶点，若所有顶点的度数大于等于 N/2,则哈密顿回路一定存在。 根据题意你只需要输出 YES 即可。

```c
#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n,m;
    cin>>n>>m;
    for(int i=0;i<m;i++)
    {
        int x,y;
        cin>>x>>y;
    }
    cout<<"Yes"<<endl;
    return 0;
}
```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1513: XP 的数论</a>

分析：

这个题用埃式筛素数法或者用欧拉筛法来求，不会被卡时间，然而我这的解法并没有筛，要是 OJ 用了大数据，那么我这个代码应该过不了了，思路是如果一个数的素因子个数为奇数的话，那么结果减去这个数，如果为偶数的话，那么结果就加上这个数。关于埃式筛法与欧拉筛法，后面弄懂了就再补一下！

```c
#include<bits/stdc++.h>
using namespace std;
set<int> st;
int f(int n)
{
    st.clear();
    if(n==2)
    {
        st.insert(2);
    }
    else if(n<2)
    {
        st.clear();
    }
    else
    {
        for(int i=2;i<=sqrt(n);i++)
        {
            if(n%i==0)
            {
                n/=i;
                st.insert(i);
                i--;
            }
        }
        st.insert(n);
    }
    int k=st.size();
    return k;
}
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        long long sum=0;
        for(int i=1;i<=n;i++)
        {
            int k=f(i);
            if(k%2==0)
            {
                sum+=i;
            }
            else
            {
                sum-=i;
            }
        }
        cout<<sum<<endl;
    }
    return 0;
}

```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1515: XP 的校园漫步</a>

分析：

并查集的模板题，开始我的并查集写错了，请教别人好久才把这个题给 AC 了，解题思路就是看输入的两个端点是否有相同的父节点，如果有的话，那么就会形成一个环，就会出现题目所述现象。

```c
#include<bits/stdc++.h>
#define mst(a) memset(a,0,sizeof(a))
using namespace std;
const int maxn=1000000+8;
int pre[maxn];
int find_pre(int x)
{
    if(x!=pre[x])
    {
        pre[x]=find_pre(pre[x]);
    }
    return pre[x];
}
void join(int x,int y)
{
    int a=find_pre(x);
    int b=find_pre(y);
    if(a!=b)
    {
        pre[a]=b;
    }
}
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        int n,m;
        cin>>n>>m;
        for(int i=1;i<=n;i++)
        {
            pre[i]=i;
        }
        bool flag=false;
        for(int i=0;i<m;i++)
        {
            int x,y;
            cin>>x>>y;
            if(find_pre(x)==find_pre(y))
            {
                flag=true;
            }
            else
            {
                join(x,y);
            }
        }
        if(flag)
        {
            cout<<"YES"<<endl;
        }
        else
        {
            cout<<"NO"<<endl;
        }
    }
    return 0;
}

```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1516: XP 的岳麓山</a>

分析：

一道模拟题，我感觉我的方法还是比较复杂！题解：你需要分别遍历 a，b 两次，每次记录 a 前缀的最大值，b 后缀的最大值即可判断

```c
#include<bits/stdc++.h>
#define mst(a) memset(a,0,sizeof(a))
using namespace std;
const int maxn=1000000+8;
map<int,int> mp;
map<int,int>::iterator it;
int a[maxn];
int b[maxn];
int res[maxn];
int main()
{
    int n;
    cin>>n;
    mst(a);
    mst(b);
    for(int i=1;i<=n;i++)
    {
        cin>>a[i];
    }
    for(int i=1;i<=n;i++)
    {
        cin>>b[i];
    }
    int ans1=0;
    for(int i=1;i<=n;i++)
    {
        if(a[i]>=ans1)
        {
            ans1=a[i];
            mp[i]++;
        }
    }
    int ans2=0;
    for(int i=n;i>=1;i--)
    {
        if(b[i]>=ans2)
        {
            ans2=b[i];
            mp[i]++;
        }
    }
    int k=0;
    for(it=mp.begin();it!=mp.end();it++)
    {
        if(it->second==2)
        {
            res[k++]=it->first;
        }
    }
    if(k)
    {
        for(int i=0;i<k;i++)
        {
            if(i!=k-1)
            {
                cout<<res[i]<<" ";
            }
            else
            {
                cout<<res[i]<<endl;
            }
        }
    }
    else
    {
        cout<<"none"<<endl;
    }


    return 0;
}

```

## <a href="http://acm.hnucm.edu.cn/JudgeOnline/problem.php?id=1500">1517: XP 的连续字符串</a>

分析：

遍历字符串，每次判断当前字符与前一个字符是否相同，如果相同即更新当前连续的长度，并判断是否需要更新答案，另外如果当前连续长度和当前记录的最长的长度相同，即判断字典序的大小即可。O(N)

```c
#include<bits/stdc++.h>
#define mst(a) memset(a,0,sizeof(a))
using namespace std;
const int maxn=1000000+8;
map<int,int> mp;
map<int,int>::iterator it;
int a[maxn];
int b[maxn];
int res[maxn];
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        string str;
        cin>>str;
        int curdd=0;
        int dd=0;
        int curcnt=1;
        int cnt=1;
        for(int i=1;i<n;i++)
        {
            if(str[i]==str[curdd])
            {
                curcnt++;
            }
            else
            {
                if(curcnt>cnt)
                {
                    cnt=curcnt;
                    dd=curdd;
                }
                if(curcnt==cnt)
                {
                    if(str[dd]>str[curdd])
                    {
                        dd=curdd;
                    }
                }
                curcnt=1;
                curdd=i;
            }

        }
        cout<<str[dd]<<endl;

    }

    return 0;
}

```

>**未完待续。。。**

```c
学如逆水行舟，不进则退
```