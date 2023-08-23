import unittest
from Solution import Solution
import signal
import json

def timeout_handler(signum, frame):
    raise TimeoutError("Test case exceeded time limit")

class test(unittest.TestCase):
    def test(self):
        data=open("third_maximum_number.json")
        testCases=json.loads(data.read())
        data.close()

        for test_case in testCases:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(3)
            try:
                num = test_case["nums"]
                expected = test_case["expected"]

                c = Solution()
                result=c.third_maximum_number(num)
                self.assertEqual((result), (expected),"case=>"+str(test_case["nums"])+"expected=>"+ str(expected)+" Output=>"+str(result)+"!!!!!")

            except TimeoutError:
                self.fail("Test case exceeded time limit")
            finally:
                signal.alarm(0)  # Reset the alarm



if __name__ == '__main__':
    unittest.main()
