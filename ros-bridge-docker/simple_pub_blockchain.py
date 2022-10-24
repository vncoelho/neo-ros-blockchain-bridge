#!/usr/bin/env python3
# license removed for brevity
import rospy
from std_msgs.msg import String
from json import dumps
def talker():
    pub = rospy.Publisher('txt_msg', String, queue_size=10)
    rospy.init_node('talker', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    count = 0
    MAXIMUM_COUNT = 10000000000000000000000
    while not rospy.is_shutdown():
        if (count < MAXIMUM_COUNT):
            rospy.loginfo("The count is: " + str(count))
            strJSON = dumps({"timestamp":int(rospy.get_time()*1000), "value": count})
            pub.publish(strJSON)
            count += 1
        else:
            count = 0
        rate.sleep()

if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException:
        pass
