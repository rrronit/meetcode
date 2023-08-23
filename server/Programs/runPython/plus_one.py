import unittest
from Solution import Solution
import json
import signal


def timeout_handler(signum, frame):
    raise TimeoutError("Test case exceeded time limit")


class test(unittest.TestCase):
    def test(self):
        data=open("plus_one.json")
        testCases=json.loads(data.read())
        data.close()

        for test_case in testCases:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:

                num = test_case["digits"]
                expected = test_case["expected"]

                c = Solution()
                result=c.plus_one(num)
                self.assertEqual((result), (expected),"case=>"+str(test_case["digits"])+"expected=>"+ str(expected)+" Output=>"+str(result)+"!!!!!")

            except TimeoutError:
                self.fail("Test case exceeded time limit")
            finally:
                signal.alarm(0)  # Reset the alarm




if __name__ == '__main__':
    unittest.main()
