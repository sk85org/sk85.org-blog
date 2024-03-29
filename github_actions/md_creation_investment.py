import os
from os import  path
from jinja2 import Environment, FileSystemLoader
import datetime
import random

print(datetime.datetime.now())

env = Environment(loader=FileSystemLoader(path.dirname(__file__), encoding='utf8'))
md_tmpl = env.get_template('template_investment.md')

md_summary_file_path = "content/posts"

today = datetime.datetime.today()

slug_string = str(random.randint(10000, 1000000))


tmpl_title = today.strftime("投資記録%Y年%m月") + "[draft]"
tmpl_date = today.strftime("%Y-%m-%d") + "T00:00:00+09:00"
tmpl_tag = "投資"
tmpl_archive = today.strftime("%Y-%m")
tmpl_nnn = today.strftime("%m%d")
tmpl_slug = slug_string

filename = today.strftime("%Y%m%d") + "_" + slug_string + ".md"
print(filename)

file_content = md_tmpl.render(title= tmpl_title, date=tmpl_date, tag=tmpl_tag, archive=tmpl_archive, nnn=tmpl_nnn, slug=tmpl_slug)

filepath = os.path.join(md_summary_file_path, filename)

f = open(filepath,'w')
f.write(file_content)
f.close()

