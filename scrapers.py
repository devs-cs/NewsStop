from bs4 import BeautifulSoup
import re
import requests

def extract_CNN(url):
    response = requests.get(url)
    html_content = response.text
    filtered_content = extract_ld_json(html_content)
    start = filtered_content.find("articleBody")
    end = filtered_content.find("articleSection")
    text = filtered_content[start + 14:end-3]
    print(text)

def extract_ld_json(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    script_pattern = re.compile(r'^<script[^>]+type=[\'"]application/ld\+json[\'"]>', re.IGNORECASE)
    content = ''
    for script in soup.find_all('script'):
        if script_pattern.match(str(script)):
            content += script.string.strip()
            break
    return content

def extract_FOX(url):
    response = requests.get(url)
    html_content  = response.text
    start = html_content.find("\"articleBody\":")
    end = html_content.find("\"datePublished\":")
    text = html_content[start +  16:end - 4]
    pattern = r'\b[A-Z]+\b'
    filtered_text = re.sub(pattern, lambda match: '' if len(match.group()) > 1 else match.group(), text)
    return filtered_text

def extract_NBC(url):
    response = requests.get(url)
    html_content  = response.text
    start = html_content.find("\"articleBody\":")
    end = html_content.find("\"dateCreated\":")
    text = html_content[start +  15:end - 4]
    return text.replace("\n",  "")

def extract_BBC(url):
    response = requests.get(url)
    content = response.text
    data = []
    first = content.find("<div class=\"ssrcss-68pt20-Text-TextContributorName e8mq1e96\">")
    content = content[first:]
    while content.find("<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">") != -1:
        start = content.find("<p class=\"ssrcss-1q0x1qg-Paragraph eq5iqo00\">")
        content = content[start + 45:]
        cur_end = content.find("</p></div></div>")
        data.append(content[:cur_end])
        content = content[cur_end:]
    ret = " ".join(data[:-1])
    term = ret.find(">")
    return(ret[term+1: ])

def extract_NPR(url):
    response = requests.get(url)
    content = response.text
    cur_end = content.find("<p>")
    content = content[cur_end + 3:]
    cur_end = content.find("<p>")
    content = content[cur_end-3:]
    data = []
    while content.find("<p>") != -1:
        start = content.find("<p>")
        content = content[start + 3:]
        cur_end = content.find("</p>")
        data.append(content[:cur_end])
        content = content[cur_end:]
    ret = " ".join(data)
    return ret