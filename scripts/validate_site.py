#!/usr/bin/env python3
"""Static quality checks for the Mike Killion Fine Arts portfolio."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

class Audit(HTMLParser):
    def __init__(self):
        super().__init__(); self.images=[]; self.links=[]; self.titles=0; self.descriptions=0; self.canonicals=[]; self.h1=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag == 'img': self.images.append(a)
        if tag == 'a': self.links.append(a)
        if tag == 'title': self.titles += 1
        if tag == 'h1': self.h1 += 1
        if tag == 'meta' and a.get('name','').lower() == 'description': self.descriptions += 1
        if tag == 'link' and a.get('rel','').lower() == 'canonical': self.canonicals.append(a.get('href',''))

for filename in ('index.html','privacy.html'):
    parser=Audit(); parser.feed((ROOT/filename).read_text(encoding='utf-8'))
    assert parser.titles == 1, f'{filename}: expected exactly one title'
    assert parser.descriptions == 1, f'{filename}: expected exactly one meta description'
    assert len(parser.canonicals) == 1 and parser.canonicals[0].startswith('https://'), f'{filename}: missing unique HTTPS canonical'
    assert parser.h1 == 1, f'{filename}: expected exactly one H1'
    for image in parser.images:
        assert image.get('alt') is not None, f'{filename}: image missing alt attribute'
    for link in parser.links:
        href=link.get('href','')
        if link.get('target') == '_blank':
            rel=set(link.get('rel','').lower().split())
            assert {'noopener','noreferrer'} <= rel, f'{filename}: unsafe target=_blank link: {href}'

html=(ROOT/'index.html').read_text(encoding='utf-8')
script=(ROOT/'script.js').read_text(encoding='utf-8')
assert 'id="purchase"' in html and 'href="#purchase"' in html, 'Collector section navigation is missing'
assert 'Request availability & delivery details' in script, 'Artwork-specific delivery inquiry missing'
assert 'RESEND_API_KEY' in (ROOT/'README.md').read_text(encoding='utf-8'), 'Contact configuration guidance missing'
print('Validated page metadata, canonical URLs, headings, image alt attributes, safe external links, collector flow, and deployment guidance.')
