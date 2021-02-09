import requests
import os
import time
import xml.etree.ElementTree as ET
import csv
import pandas as pd
import unicodedata

class BggClient():
    base_url = 'https://boardgamegeek.com'
    valid_statis_codes = [200, 202]
    wait_statis_codes = [202]
    wait_increment = 20
    timeout = 1000
    xml_output_dir = os.path.join('tools', 'XML')
    csv_output_dir = os.path.join('tools', 'CSV')
    apis = {
        'xml': 'xmlapi',
        'xml2': 'xmlapi2'
    }
    xml_paths = {
        'geeklist': 'geeklist'
    }
    geeklist_month_mapping = {
        '156765': {
            'Year': '2013',
            'Month': '05',
            'Override': False
        },
        '157888': {
            'Year': '2013',
            'Month': '06',
            'Override': False
        },
        '158763': {
            'Year': '2013',
            'Month': '07',
            'Override': False
        },
        '160445': {
            'Year': '2013',
            'Month': '08',
            'Override': False
        },
        '161764': {
            'Year': '2013',
            'Month': '09',
            'Override': False
        },
        '163198': {
            'Year': '2013',
            'Month': '10',
            'Override': False
        },
        '164593': {
            'Year': '2013',
            'Month': '11',
            'Override': False
        },
        '166060': {
            'Year': '2013',
            'Month': '12',
            'Override': False
        },
        '166060': {
            'Year': '2014',
            'Month': '02',
            'Override': False
        },
        '170533': {
            'Year': '2014',
            'Month': '03',
            'Override': False
        },
        '171598': {
            'Year': '2014',
            'Month': '04',
            'Override': False
        },
        '172996': {
            'Year': '2014',
            'Month': '05',
            'Override': False
        },
        '174241': {
            'Year': '2014',
            'Month': '06',
            'Override': False
        },
        '175551': {
            'Year': '2014',
            'Month': '07',
            'Override': False
        },
        '176697': {
            'Year': '2014',
            'Month': '08',
            'Override': False
        },
        '178257': {
            'Year': '2014',
            'Month': '09',
            'Override': False
        },
        '178963': {
            'Year': '2014',
            'Month': '10',
            'Override': False
        },
        '179645': {
            'Year': '2014',
            'Month': '11',
            'Override': False
        },
        '182573': {
            'Year': '2014',
            'Month': '12',
            'Override': False
        },
        '183994': {
            'Year': '2015',
            'Month': '01',
            'Override': False
        },
        '186592': {
            'Year': '2015',
            'Month': '02',
            'Override': False
        },
        '182515': {
            'Year': '2015',
            'Month': '03',
            'Override': False
        },
        '186058': {
            'Year': '2015',
            'Month': '04',
            'Override': False
        },
        '190679': {
            'Year': '2015',
            'Month': '05',
            'Override': False
        },
        '191963': {
            'Year': '2015',
            'Month': '06',
            'Override': False
        },
        '193005': {
            'Year': '2015',
            'Month': '07',
            'Override': False
        },
        '194479': {
            'Year': '2015',
            'Month': '08',
            'Override': False
        },
        '194940': {
            'Year': '2015',
            'Month': '09',
            'Override': False
        },
        '197513': {
            'Year': '2015',
            'Month': '10',
            'Override': False
        },
        '198923': {
            'Year': '2015',
            'Month': '11',
            'Override': False
        },
        '200203': {
            'Year': '2015',
            'Month': '12',
            'Override': False
        },
        '202271': {
            'Year': '2016',
            'Month': '01',
            'Override': False
        },
        '204546': {
            'Year': '2016',
            'Month': '02',
            'Override': False
        },
        '205877': {
            'Year': '2016',
            'Month': '03',
            'Override': False
        },
        '206595': {
            'Year': '2016',
            'Month': '04',
            'Override': False
        },
        '208306': {
            'Year': '2016',
            'Month': '05',
            'Override': False
        },
        '209493': {
            'Year': '2016',
            'Month': '06',
            'Override': False
        },
        '210694': {
            'Year': '2016',
            'Month': '07',
            'Override': False
        },
        '211592': {
            'Year': '2016',
            'Month': '08',
            'Override': False
        },
        '213557': {
            'Year': '2016',
            'Month': '09',
            'Override': False
        },
        '214406': {
            'Year': '2016',
            'Month': '10',
            'Override': False
        },
        '215297': {
            'Year': '2016',
            'Month': '11',
            'Override': False
        },
        '217780': {
            'Year': '2016',
            'Month': '12',
            'Override': False
        },
        '219163': {
            'Year': '2017',
            'Month': '01',
            'Override': False
        },
        '221242': {
            'Year': '2017',
            'Month': '02',
            'Override': False
        },
        '222478': {
            'Year': '2017',
            'Month': '03',
            'Override': False
        },
        '223793': {
            'Year': '2017',
            'Month': '04',
            'Override': False
        },
        '223927': {
            'Year': '2017',
            'Month': '05',
            'Override': False
        },
        '225998': {
            'Year': '2017',
            'Month': '06',
            'Override': False
        },
        '227011': {
            'Year': '2017',
            'Month': '07',
            'Override': False
        },
        '228234': {
            'Year': '2017',
            'Month': '08',
            'Override': False
        },
        '229124': {
            'Year': '2017',
            'Month': '09',
            'Override': False
        },
        '229952': {
            'Year': '2017',
            'Month': '10',
            'Override': False
        },
        '231127': {
            'Year': '2017',
            'Month': '11',
            'Override': False
        },
        '233358': {
            'Year': '2017',
            'Month': '12',
            'Override': False
        },
        '235012': {
            'Year': '2018',
            'Month': '01',
            'Override': False
        },
        '237172': {
            'Year': '2018',
            'Month': '02',
            'Override': False
        },
        '238328': {
            'Year': '2018',
            'Month': '03',
            'Override': False
        },
        '238369': {
            'Year': '2018',
            'Month': '04',
            'Override': False
        },
        '240624': {
            'Year': '2018',
            'Month': '05',
            'Override': False
        },
        '241745': {
            'Year': '2018',
            'Month': '06',
            'Override': False
        },
        '242306': {
            'Year': '2018',
            'Month': '07',
            'Override': False
        },
        '241528': {
            'Year': '2018',
            'Month': '08',
            'Override': False
        },
        '245355': {
            'Year': '2018',
            'Month': '09',
            'Override': False
        },
        '246401': {
            'Year': '2018',
            'Month': '10',
            'Override': False
        },
        '247302': {
            'Year': '2018',
            'Month': '11',
            'Override': False
        },
        '244471': {
            'Year': '2018',
            'Month': '12',
            'Override': False
        },
        '249922': {
            'Year': '2019',
            'Month': '01',
            'Override': False
        },
        '252324': {
            'Year': '2019',
            'Month': '02',
            'Override': False
        },
        '251846': {
            'Year': '2019',
            'Month': '03',
            'Override': False
        },
        '251880': {
            'Year': '2019',
            'Month': '04',
            'Override': False
        },
        '255931': {
            'Year': '2019',
            'Month': '05',
            'Override': False
        },
        '256394': {
            'Year': '2019',
            'Month': '06',
            'Override': False
        },
        '253515': {
            'Year': '2019',
            'Month': '07',
            'Override': False
        },
        '258026': {
            'Year': '2019',
            'Month': '08',
            'Override': False
        },
        '260880': {
            'Year': '2019',
            'Month': '09',
            'Override': False
        },
        '262319': {
            'Year': '2019',
            'Month': '10',
            'Override': False
        },
        '262633': {
            'Year': '2019',
            'Month': '11',
            'Override': False
        },
        '262008': {
            'Year': '2019',
            'Month': '12',
            'Override': False
        },
        '266487': {
            'Year': '2020',
            'Month': '01',
            'Override': False
        },
        '268583': {
            'Year': '2020',
            'Month': '02',
            'Override': False
        },
        '269654': {
            'Year': '2020',
            'Month': '03',
            'Override': False
        },
        '270349': {
            'Year': '2020',
            'Month': '04',
            'Override': False
        },
        '272126': {
            'Year': '2020',
            'Month': '05',
            'Override': False
        },
        '273040': {
            'Year': '2020',
            'Month': '06',
            'Override': False
        },
        '274323': {
            'Year': '2020',
            'Month': '07',
            'Override': False
        },
        '275246': {
            'Year': '2020',
            'Month': '08',
            'Override': False
        },
        '276177': {
            'Year': '2020',
            'Month': '09',
            'Override': False
        },
        '277289': {
            'Year': '2020',
            'Month': '10',
            'Override': False
        },
        '278237': {
            'Year': '2020',
            'Month': '11',
            'Override': False
        },
        '279491': {
            'Year': '2020',
            'Month': '12',
            'Override': False
        },
        '280864': {
            'Year': '2021',
            'Month': '01',
            'Override': False
        },
        '282453': {
            'Year': '2021',
            'Month': '02',
            'Override': True
        },
    }
    
    

    def __init__(self):
        self.geeklist_url = self._url_join(self.base_url, self.apis['xml'], self.xml_paths['geeklist'])

    def get_geeklist_items(self):
        for geeklist_id in self.geeklist_month_mapping:
            print('Processing {0}...'.format(geeklist_id))
            result_file = os.path.join(self.xml_output_dir, '{0}.xml'.format(geeklist_id))
            if os.path.exists(result_file) is False or self.geeklist_month_mapping[geeklist_id]['Override']:
                url = '{0}{1}'.format(self.geeklist_url, geeklist_id)
                response = requests.get(url)
                self._validate_status_code(response)
                if response.status_code in self.wait_statis_codes:
                    response = self._retry_request_until_timeout(url)
        
                with open(result_file, 'wb') as f: 
                    f.write(response.content)
            
    def create_sgoyt_csv(self):
        output_file = os.path.join(self.csv_output_dir, 'sgoyt.csv')
        csv_output = open(output_file, 'w')
        csv_output.write('rownum###yearmonth###game###gameid###geeklistitem###geeklisthost###user###geeklistid\n')
        csv_output.close()
        csv_output = open(output_file, 'a')
        for filename in os.listdir(self.xml_output_dir):
            file_path = os.path.join(self.xml_output_dir, filename)
            geeklist_id = filename.replace('.xml', '')
            tree = ET.parse(file_path)
            root = tree.getroot()
            year = self.geeklist_month_mapping[geeklist_id]['Year']
            month = self.geeklist_month_mapping[geeklist_id]['Month']
            geeklist_host = root.find('username').text
            for item in root.findall('./item'):
                if item.attrib['subtype'] == 'boardgame':
                    geeklist_item_link = '{0}/{1}/{2}/item/{3}#item{3}'.format(self.base_url, 'geeklist', geeklist_id, item.attrib['id'])
                    game = self._replace_text(item.attrib['objectname'])
                    game = unicodedata.normalize('NFD', game).encode('ascii', 'ignore').decode()
                    user = item.attrib['username']
                    csv_output.write('{0}###{1}/{2}###{3}###{4}###{5}###{6}###{7}###{8}\n'.format(item.attrib['id'], year, month, game, item.attrib['objectid'],geeklist_item_link, geeklist_host, user, geeklist_id))
        csv_output.close()
    
    def create_game_index_csv(self):
        games = {}
        csv_file = os.path.join(self.csv_output_dir, 'sgoyt.csv')
        games_output_file = os.path.join(self.csv_output_dir, 'game_index.csv')
        data = pd.read_csv(csv_file, delimiter='###', engine='python')
        for row in data.itertuples(index=False, name='game_item'):
            if row[3] not in games:
                games[row[3]] = row[2]
        games_output = open(games_output_file, 'w')
        games_output.write('gameid###game###bgglink\n')
        games_output.close()
        games_output = open(games_output_file, 'a')
        for game in games:
            game_name = games[game]
            bgg_link = '{0}/boardgame/{1}'.format(self.base_url, game)
            games_output.write('{0}###{1}###{2}\n'.format(game, game_name, bgg_link))
        games_output.close()

    def create_yearmonth_index_csv(self):
        yearmonths_output_file = os.path.join(self.csv_output_dir, 'yearmonth_index.csv')
        year_month_output = open(yearmonths_output_file, 'w')
        year_month_output.write('geeklistid###yearmonth###geeklistlink\n')
        year_month_output.close()
        year_month_output = open(yearmonths_output_file, 'a')
        for geeklistid in self.geeklist_month_mapping:
            yearmonth = '{0}/{1}'.format(self.geeklist_month_mapping[geeklistid]['Year'], self.geeklist_month_mapping[geeklistid]['Month'])
            geeklist_link = '{0}/{1}/{2}'.format(self.base_url, 'geeklist', geeklistid)
            year_month_output.write('{0}###{1}###{2}\n'.format(geeklistid, yearmonth, geeklist_link))
        year_month_output.close()

    
    def _url_join(self, *args):
        url = ''
        for arg in args:
            url += '{0}/'.format(arg)
        return url

    def _validate_status_code(self, request_response):
        if request_response.status_code not in self.valid_statis_codes:
            raise ValueError('Unexpected HTTP return code: {0}\n'
            'Request body: {1}'
            .format(request_response.status_code, request_response.text))
    
    def _replace_text(self, text):
        replaced_text = text
        text_mapping = {
            'Pax Pamir (Second Edition)': 'Pax Pamir: Second Edition',
            'Clever hoch Drei': 'Clever Cubed',
            '★': '*',
            '₂': '2',
        }
        text_mapping_unicode = {
            b'\xe2\x80\x93': b'-'
        }
        for item in text_mapping:
            replaced_text = replaced_text.replace(item, text_mapping[item])
        for item in text_mapping_unicode:
            replaced_text = replaced_text.encode().replace(item, text_mapping_unicode[item]).decode()
        return replaced_text
    
    def _retry_request_until_timeout(self, request_url):
        wait_time = self.wait_increment
        time.sleep(self.wait_increment)
        done = False
        while not done:
            print('Retrying {0}...'.format(request_url))
            response = requests.get(request_url)
            if response.status_code != self.wait_statis_codes:
                done = True
            wait_time += self.wait_increment
            time.sleep(self.wait_increment)
            if wait_time >= self.timeout:
                done = True
            
        if response.status_code in self.wait_statis_codes:
            raise ValueError('Timeout reached: {0}\n'
            'Request body: {1}'
            .format(request_url, response.text))
        return response

