import unittest
from Solution import Solution
import json
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Test case exceeded time limit")


class test(unittest.TestCase):
    def test(self):
        data=open("palindrome_number.json")
        testCases=json.loads(data.read())
        data.close()

        for test_case in testCases:
            
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:

                n = test_case["num"]
                expected = test_case["expected"]

                c = Solution()
                result=c.palindrome_number(n)
                self.assertEqual((result), (expected),"case=>"+str(test_case["num"])+"expected=>"+ str(expected)+" Output=>"+str(result)+"!!!!!")

            except TimeoutError:
                self.fail("Test case exceeded time limit")
            finally:
                signal.alarm(0)  # Reset the alarm





if __name__ == '__main__':
    unittest.main()
