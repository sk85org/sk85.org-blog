import os
from os import  path
from jinja2 import Environment, FileSystemLoader
import datetime
import random

print(datetime.datetime.now())

env = Environment(loader=FileSystemLoader(path.dirname(__file__), encoding='utf8'))
md_tmpl = env.get_template('template.md')

md_summary_file_path = "content/posts"

today = datetime.datetime.today()

slug_string = str(random.randint(10000, 1000000))


tmpl_title = today.strftime("%Y-%m-%d") + "[draft]"
tmpl_date = today.strftime("%Y-%m-%d") + "T21:00:00+09:00"
tmpl_tag = "diary"
tmpl_archive = today.strftime("%Y-%m")
tmpl_slug = slug_string

filename = today.strftime("%Y%m%d") + "_" + slug_string + ".md"
print(filename)

file_content = md_tmpl.render(title= tmpl_title, date=tmpl_date, tag=tmpl_tag, archive=tmpl_archive, slug=tmpl_slug)

filepath = os.path.join(md_summary_file_path, filename)

f = open(filepath,'w')
f.write(file_content)
f.close()

