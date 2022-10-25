

class LogParser(object):
    def __init__(self):
        self.test = None
        self.timestamp = []
        self.val0 = []
        self.val1 = []
        self.val2 = []
        self.bigdiff = []
        self.count = []
        # post-process
        self.xy = []
        self.xy_diff = []
        self.xy_max = []
        self.xy_good = []

    def process(self, filename):
        with open(filename, 'r') as f:
            lines = f.readlines()
            print("FOUND ", len(lines), "LINES")
            for i in range(len(lines)):
                fields = lines[i].split()
                self.timestamp.append(int(fields[0]))
                self.val0.append(int(fields[1]))
                self.val1.append(int(fields[2]))
                self.val2.append(int(fields[3]))
                self.bigdiff.append(int(fields[4]))
                self.count.append(int(fields[5]))

    def postprocess(self):
        assert (len(self.timestamp) > 0)
        assert (len(self.timestamp) == len(self.val0))
        assert (len(self.xy) == 0)
        assert (len(self.xy_diff) == 0)
        assert (len(self.xy_max) == 0)
        assert (len(self.xy_good) == 0)
        print("FOUND ", len(self.timestamp), " LINES")
        print("WILL IGNORE LINES WITH count != 0")
        # ignore count > 0 elements
        start = 0
        while self.count[start] != 0:
            start = start+1
        print("IGNORED ", start, " LINES")
        print("BEGIN WITH TIMESTAMP=", self.timestamp[start])
        print("WILL INITIALIZE FIRST WITH val2")
        #
        p = []
        p.append(self.timestamp[start])
        p.append(self.val2[start])
        self.xy.append(p)
        print("FIRST = ", p)
        #
        pmax = []
        pmax.append(self.timestamp[start])
        pmax.append(self.bigdiff[start])
        self.xy_max.append(pmax)
        print("FIRST MAX = ", pmax)
        #
        # Set (unordered) for known nonces
        set_known = {self.val0[start]}
        acc_good = 1
        if not self.val1[start] in set_known:
            set_known.add(self.val1[start])
            acc_good = acc_good+1
        if not self.val2[start] in set_known:
            set_known.add(self.val2[start])
            acc_good = acc_good+1
        #
        pgood = []
        pgood.append(self.timestamp[start])
        pgood.append(acc_good)
        self.xy_good.append(pgood)
        print("FIRST GOOD = ", pgood)
        #
        # calculate xy
        if start+1 < len(self.timestamp)-1:
            print("LOOP")
            for t in range(start+1, len(self.timestamp)-1):
                # guarantee that countdown is equal to ZERO all the time
                assert (self.count[t] == 0)
                # guarantee that timestamp is going up on log
                assert (self.timestamp[t] >= self.timestamp[t-1])
                #
                acc_good = 0
                if not self.val0[t] in set_known:
                    set_known.add(self.val0[t])
                    acc_good = acc_good+1
                if not self.val1[t] in set_known:
                    set_known.add(self.val1[t])
                    acc_good = acc_good+1
                if not self.val2[t] in set_known:
                    set_known.add(self.val2[t])
                    acc_good = acc_good+1
                new_pgood = []
                new_pgood.append(self.timestamp[t])
                new_pgood.append(acc_good)
                self.xy_good.append(new_pgood)
                #
                if self.val2[t] == self.xy[-1][1]:
                    print("WARNING: same value, skipping t=", t)
                    new_p = []
                    new_p.append(self.timestamp[t])
                    new_p.append(self.val2[t])
                    self.xy.append(new_p)
                else:
                    new_p = []
                    new_p.append(self.timestamp[t])
                    new_p.append(self.val2[t])
                    self.xy.append(new_p)
                    new_pmax = []
                    new_pmax.append(self.timestamp[t])
                    new_pmax.append(self.bigdiff[t])
                    self.xy_max.append(new_pmax)
        # compute diffs
        pdiff = []
        pdiff.append(0)
        pdiff.append(0)
        self.xy_diff.append(pdiff)
        for t in range(1, len(self.xy)):
            new_pdiff = []
            # case 1: against first (timestamp)
            new_pdiff.append(self.xy[t][0] - self.xy[0][0])
            # case 2: against previous
            new_pdiff.append(self.xy[t][1] - self.xy[t-1][1])
            self.xy_diff.append(new_pdiff)
            # CUTOFF AT 100 SECONDS
            if new_pdiff[0]/1000 > 100:
                print(" => BREAK AT 100 SECONDS")
                break
        #
        print("FINISHED postprocess()")


        # main
x = 10
print(x)

# FORMAT (example)
# timestamp val0 val1 val2 bigdiff count
# 1666652325584	1	1	1	0	3
#

#f_prefix = "100tx-1000ms-10hz-starlink.txt"
#f_prefix = "100tx-1000ms-10hz.txt"
#f_prefix = "200tx-1000ms-10hz-starlink.txt"
#f_prefix = "200tx-1000ms-10hz.txt"
#f_prefix = "500tx-1000ms-10hz-starlink.txt"
f_prefix = "500tx-1000ms-10hz.txt"
#
f_txt = "vitor-"+f_prefix
#
p = LogParser()
p.process(f_txt)
print("timestamp:", p.timestamp)
print("count:", p.count)

p.postprocess()

print("")
print("XY")
for t in range(len(p.xy)):
    print(p.xy[t][0], " ", p.xy[t][1])

print("")
print("XY_MAX")
for t in range(len(p.xy_max)):
    print(p.xy_max[t][0], " ", p.xy_max[t][1])

print("")
print("XY_DIFF")
for t in range(len(p.xy_diff)):
    print(p.xy_diff[t][0], " ", p.xy_diff[t][1])

#
f_out = "xy-"+f_prefix
print("WRITING ON FILE = '", f_out, "'")
f = open(f_out, "w")
for i in range(len(p.xy_diff)):
    # use timestamp in SECONDS here (divided by 1000)
    str_line = str(p.xy_diff[i][0]/1000) + "\t" + \
        str(p.xy_diff[i][1]) + "\t" + str(3.33*p.xy_good[i][1]) + "\n"
    f.write(str_line)
f.close()
#
#
print("FINISHED!")
