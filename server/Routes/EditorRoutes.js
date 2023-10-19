const express=require("express")
const { submitCode, addprob,  getProblem } = require("../Controller/EditorController")
const router=express.Router()

router.post("/submit",submitCode)
router.post("/add",addprob)

router.post("/getId",getProblem)

module.exports=router


/* two_sum
if num == 0:
        return 0
    elif num % 9 == 0:
        return 9
    else:
        return num % 9 */


/*  buy stock
        max_profit = 0
    
        for i in range(len(prices)):
            for j in range(i+1, len(prices)):
                profit = prices[j] - prices[i]
                if profit > max_profit:
                    max_profit = profit
                    
        return max_profit */



/* fibo
        if n <= 0:
        return 0
    elif n == 1:
        return 1

    prev, current = 0, 1
    for i in range(2, n + 1):
        next_fib = prev + current
        prev, current = current, next_fib

    return current */

/*  missing num
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum */


/* most common
paragraph_filtered = "".join([" " if not char.isalpha() else char for char in paragraph])
        words = [word for word in paragraph_filtered.lower().split(" ") if word not in banned and word != '']
        counts = {}
        for word in words:
            if word in counts:
                counts[word] +=1
            else:
                counts[word] = 1
        return max(counts, key=counts.get) */


/* palindrome
        if x < 0:
        return False

    original_x = x
    reversed_x = 0

    while x > 0:
        reversed_x = reversed_x * 10 + x % 10
        x = x // 10

    return original_x == reversed_x */



/* plus one
    carryOver = 1
        for i in range(len(digits)-1, -1, -1):
            temp = digits[i] + carryOver
            if temp>9:
                digits[i] = 0
            else:
                digits[i] = temp
                carryOver = 0
                break
        if carryOver == 1 and i == 0:
            digits.insert(0, 1)
        return digits */


/* reverse only 
        s = list(s)
        start = 0
        end = len(s) - 1
    
        while start < end:
            if s[start].isalpha() and s[end].isalpha():
                s[start], s[end] = s[end], s[start]
                start += 1
                end -= 1
            elif not s[start].isalpha():
                start += 1
            elif not s[end].isalpha():
                end -= 1
    
        return ''.join(s)
		 */

/* third max

        return max(list(set(nums))) if len(list(set(nums)))<3 else sorted(list(set(nums)))[-3] */

/* two_sum
        numMap = {}
        n = len(nums)

        for i in range(n):
            complement = target - nums[i]
            if complement in numMap:
                return [numMap[complement], i]
            numMap[nums[i]] = i

        return []  # No solution found */