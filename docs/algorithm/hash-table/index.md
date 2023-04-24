# Hash Table

Hash Table(哈希表)是一种在数组类型题目非常常见的解题方法。本质是一个数组的数据结构，只不过存放的是键值对。

不同的 key 通过 hash 函数可能得到相同的索引值，这个计算索引的过程被称为 哈希（hash）。

## 哈希表的基本操作

大多数情况下我们使用哈希表的目的是快速查找，由于结构的特殊性，哈希表的查找速度非常快，时间复杂度为 O(1)。

简单实现：

```js
const hash = []
hash[1] = 1
hash[2] = 2
hash[3] = 3
console.log(hash[1]) // 1

// 也可以使用对象，使用对象的好处是可以使用字符串作为 key
const hash = {}
hash[1] = 1
hash[2] = 2
hash[3] = 3
console.log(hash[1]) // 1

// 也可以使用 Map，使用 Map 的好处是可以使用任意类型作为 key
const hash = new Map()
hash.set(1, 1)
hash.set(2, 2)
hash.set(3, 3)
console.log(hash.get(1)) // 1

// 也可以使用 Set，但是需要注意的是，Set 中的元素是唯一的，如果重复添加，会被忽略
const hash = new Set()
hash.add(1)
hash.add(2)
hash.add(3)
console.log(hash.has(1)) // true
```

## 简单应用场景

哪怕知道原理，在不同的问题下，会存在一些细微的差异，这里举几个示例讲讲 Hash Table 的一些基础应用。

- **计算两个有序整型数组的交集**

[两个数组的交集 II](https://leetcode.cn/problems/intersection-of-two-arrays-ii/description/)

处理思路：

顺序遍历两个数组，将数组元素存放到哈希表中，同时对统计的数组元素进行计数。如果某个元素的计数器的值为 2，则该元素为两者的交集元素。

![](https://assets.leetcode-cn.com/solution-static/350/350_fig1.gif)

题解：

::: code-group

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

const intersect = function (nums1, nums2) {
  const hash = {}
  const result = []

  for (const num of nums1)
    hash[num] = hash[num] ? hash[num] + 1 : 1

  for (const num of nums2) {
    if (hash[num]) {
      result.push(num)
      hash[num]--
    }
  }

  return result
}
```

```cpp
class Solution {
public:
  vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
    unordered_map<int, int> hash;
    vector<int> result;
    for (int num : nums1) {
      hash[num]++;
    }
    for (int num : nums2) {
      if (hash[num] > 0) {
        result.push_back(num);
        hash[num]--;
      }
    }
    return result;
  }
};
```

```java
class Solution {
  public int[] intersect(int[] nums1, int[] nums2) {
    Map<Integer, Integer> hash = new HashMap<>();
    List<Integer> result = new ArrayList<>();
    for (int num : nums1) {
      hash.put(num, hash.getOrDefault(num, 0) + 1);
    }
    for (int num : nums2) {
      if (hash.containsKey(num) && hash.get(num) > 0) {
        result.add(num);
        hash.put(num, hash.get(num) - 1);
      }
    }
    return result.stream().mapToInt(Integer::valueOf).toArray();
  }
}
```

```python
class Solution:
  def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
    hash = {}
    result = []
    for num in nums1:
      hash[num] = hash.get(num, 0) + 1
    for num in nums2:
      if hash.get(num):
        result.append(num)
        hash[num] -= 1
    return result
```

:::

- **找出数组中重复次数最多的数**

[剑指 Offer 03. 数组中重复的数字](https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

处理思路：

使用 map 映射表，通过引入 map 表或对象来记录每个元素出现的次数，然后判断每个数出现的次数，进而找出重复次数最多的元素。

题解：

::: code-group

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const findRepeatNumber = function (nums) {
  const hash = new Map()
  for (const num of nums) {
    if (hash.get(num))
      return num

    hash.set(num, true)
  }
}
```

```cpp
class Solution {
public:
  int findRepeatNumber(vector<int>& nums) {
    unordered_map<int, bool> hash;
    for (int num : nums) {
      if (hash[num]) {
        return num;
      }
      hash[num] = true;
    }
    return -1;
  }
};
```

```java
class Solution {
  public int findRepeatNumber(int[] nums) {
    Map<Integer, Boolean> hash = new HashMap<>();
    for (int num : nums) {
      if (hash.containsKey(num)) {
        return num;
      }
      hash.put(num, true);
    }
    return -1;
  }
}
```

```python
class Solution:
  def findRepeatNumber(self, nums: List[int]) -> int:
    hash = {}
    for num in nums:
      if hash.get(num):
        return num
      hash[num] = True
    return -1
```

:::

- **O(n)的时间复杂度内找出数组中出现次数超过了一半的数**

[剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/)

处理思路：

首先创建一个 map 对象，其中，key 为数组元素值，value 为此数出现的次数。遍历一遍数组，用 hash_map 统计每个数出现的次数，并用两个值存储目前出现次数最多的数和对应出现的次数，此时的时间复杂度为 O(n)，空间复杂度为 O(n)，满足题目的要求。

题解：

::: code-group

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = function (nums) {
  const hash = new Map()
  let max = 0
  let result = 0
  for (const num of nums) {
    let count = hash.get(num) || 0
    count++
    hash.set(num, count)
    if (count > max) {
      max = count
      result = num
    }
  }
  return result
}
```

```cpp
class Solution {
public:
  int majorityElement(vector<int>& nums) {
    unordered_map<int, int> hash;
    int max = 0;
    int result = 0;
    for (int num : nums) {
      int count = hash[num] ? hash[num] : 0;
      count++;
      hash[num] = count;
      if (count > max) {
        max = count;
        result = num;
      }
    }
    return result;
  }
};
```

```java
class Solution {
  public int majorityElement(int[] nums) {
    Map<Integer, Integer> hash = new HashMap<>();
    int max = 0;
    int result = 0;
    for (int num : nums) {
      int count = hash.getOrDefault(num, 0);
      count++;
      hash.put(num, count);
      if (count > max) {
        max = count;
        result = num;
      }
    }
    return result;
  }
}
```

```python
class Solution:
  def majorityElement(self, nums: List[int]) -> int:
    hash = {}
    max = 0
    result = 0
    for num in nums:
      count = hash.get(num) or 0
      count += 1
      hash[num] = count
      if count > max:
        max = count
        result = num
    return result
```

:::

- **找出数列中符合条件的数对的个数**

[1394. 找出数组中的幸运数](https://leetcode.cn/problems/find-lucky-integer-in-an-array/)

题目描述：

在整数数组中，如果一个整数的出现频次和它的数值大小相等，我们就称这个整数为「幸运数」。给你一个整数数组 arr，请你从中找出并返回一个幸运数。

解题思路：

使用 map 映射表，通过引入 map 表或对象来记录，元素值与每个元素出现的次数，然后判断每个数出现的次数，进而找出符合条件的数对。

题解：

::: code-group

```js
/**
 * @param {number[]} arr
 * @return {number}
 */
const findLucky = function (arr) {
  const hash = new Map()
  for (const num of arr) {
    let count = hash.get(num) || 0
    count++
    hash.set(num, count)
  }
  let result = -1
  for (const [key, value] of hash) {
    if (key === value)
      result = Math.max(result, key)

  }
  return result
}
```

```cpp
class Solution {
public:
  int findLucky(vector<int>& arr) {
    unordered_map<int, int> hash;
    for (int num : arr) {
      int count = hash[num] ? hash[num] : 0;
      count++;
      hash[num] = count;
    }
    int result = -1;
    for (auto [key, value] : hash) {
      if (key == value) {
        result = max(result, key);
      }
    }
    return result;
  }
};
```

```java
class Solution {
  public int findLucky(int[] arr) {
    Map<Integer, Integer> hash = new HashMap<>();
    for (int num : arr) {
      int count = hash.getOrDefault(num, 0);
      count++;
      hash.put(num, count);
    }
    int result = -1;
    for (Map.Entry<Integer, Integer> entry : hash.entrySet()) {
      if (entry.getKey().equals(entry.getValue())) {
        result = Math.max(result, entry.getKey());
      }
    }
    return result;
  }
}
```

```python
class Solution:
  def findLucky(self, arr: List[int]) -> int:
    hash = {}
    for num in arr:
      count = hash.get(num) or 0
      count += 1
      hash[num] = count
    result = -1
    for key, value in hash.items():
      if key == value:
        result = max(result, key)
    return result
```

:::

## 总结

本章中，我们了解了哈希表的基本概念，以及哈希表的基本操作，和哈希表的简单应用场景。本文中的例题，都是非常基础和经典的题目，如果感觉已经掌握了，可以尝试一下本章的其它题目，加深对哈希表的理解。

- [1. 两数之和](/algorithm/hash-table/1.html) ：非常经典的哈希表应用题目，面试频率极高，可以作为刷题的基础题目。
- [3. 无重复字符的最长子串](/algorithm/hash-table/3.html)：字符串和哈希表的结合应用，面试中经常会遇到。
- [136. 只出现一次的数字](/algorithm/hash-table/136.html)：找出现次数的题型。
- [349. 两个数组的交集](/algorithm/hash-table/349.html)：数组交集的题型。
- [560. 和为 K 的子数组](/algorithm/hash-table/560.html)：找出数列中符合条件的数对个数的题型。
