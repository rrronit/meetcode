class Solution:
    def fibonacci_number(self,n): 
        if n <= 0:
            return 0
        elif n == 1:
            return 1
    
        prev, current = 0, 1
        for i in range(2, n + 1):
            next_fib = prev + current
            prev, current = current, next_fib

        return current 