---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
categories: ["", ""]
archives: {{ dateFormat "2006-01" .Date}}
---

"{{ dateFormat "2006-01" .Date}}"