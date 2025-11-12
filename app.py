from flask import Flask, render_template, request
import os

from flask import Flask, jsonify, request, Response
import math
import itertools
import flask_csv
import pandas as pd
import re
import json

def search_record(record, pattern):
    if re.search(pattern, record['text']) is not None:
        found_match = re.search(pattern, record['text'])
        match_start = found_match.start(0)
        match_end = found_match.end(0)
        return record | {
            'window': record['text'][(match_start-100):(match_end+100)],
            'matched_query': pattern
        }
    else:
        return False

app = Flask(__name__)

# no modification required beyond function name
@app.route('/search')
def search():

    queries = request.args['q'].split(',') if 'q' in request.args and len(request.args['q']) > 0 else []
    page = int(request.args['page']) if 'page' in request.args else 0

    with open('HouseFiles_TextAttachments_All.json', 'r') as in_file:
        records = json.load(in_file)

    results = []

    if len(queries) > 0:
        for query in queries:
            matching_records = [search_record(record, query) for record in records if search_record(record, query) is not False]
            results.extend(matching_records)

    has_more = False
    if 'show' in request.args:
        show = int(request.args['show'])
        has_more = page * show < len(results)
        output_records = results[(show*page):(show*(page+1))]
    else:
        output_records = results

    r = Response(json.dumps({
        'hasMore':has_more,
        'records':results
    }), mimetype='application/json')
    
    r.headers.add('Access-Control-Allow-Origin', '*')
    return r

if __name__ == '__main__':
    app.run(debug=True)