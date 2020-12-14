import glob
import re
import os
import random

filelist = glob.glob('./posts/*.md', recursive=True)
for path in filelist:
    with open(path) as f:
        l = f.read()
        m = re.match(r'---\n[\s\S]*?---', l)
        string = l[m.start():m.end()]
        #print(string)
        if  not re.search(r'slug', string):
            print("----------------------------------")
            #print(path)
            #print(path)
            #print("slug:" + str(random.randrange(1000000)))
            randomnumber = str(random.randrange(100000,999999))
            slug = l[:m.end()-3] +   "slug: " + randomnumber + "\n" + l[m.end()-3:m.end()]
            
            #print(slug)
            newtext = re.sub(r'---\n[\s\S]*?---', slug, l)
            ftitle, fext = os.path.splitext(path)
            newfilename = ftitle + "_" + randomnumber + fext
            print(newfilename)
            with open(newfilename, mode='w') as f:
                f.write(newtext)