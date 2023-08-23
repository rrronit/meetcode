import unittest
from Solution import Solution
import json
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Test case exceeded time limit")

class TestTwoSum(unittest.TestCase):
    def test(self):
        data=open("two_sum.json")
        testCases=json.loads(data.read())
        data.close()
        for test_case in testCases:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:

                nums = test_case["nums"]
                target = test_case["target"]
                expected = test_case["expected"]

                c = Solution()
                result=c.two_sum(nums, target)
                if (type(result)==list):
                    result=sorted(result)
                self.assertEqual(result, sorted(expected), "case=>"+str(test_case["nums"])+"expected=>"+ str(expected)+" Output=>"+str(result)+"!!!!!")
            except TimeoutError:
                self.fail("Test case exceeded time limit")
            finally:
                signal.alarm(0)  # Reset the alarm


        

if __name__ == '__main__':
    unittest.main()
