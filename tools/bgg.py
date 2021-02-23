import requests
import os
import time
from datetime import datetime, timezone
import xml.etree.ElementTree as ET
import csv
import pandas as pd
import unicodedata
import decimal
import simplejson as json

class BggClient():
    base_url = 'https://boardgamegeek.com'
    valid_statis_codes = [200, 202]
    wait_statis_codes = [202]
    wait_increment = 20
    timeout = 1000
    sgoyt_geeklist_xml_output_dir = os.path.join('tools', 'XML', 'geeklists', 'sgoyt')
    game_xml_output_dir = os.path.join('tools', 'XML', 'games')
    csv_output_dir = os.path.join('tools', 'CSV')
    games_json_output_dir = os.path.join('tools', 'JSON', 'games')
    yearmonth_json_output_dir = os.path.join('tools', 'JSON', 'yearmonth')
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
            result_file = os.path.join(self.sgoyt_geeklist_xml_output_dir, '{0}.xml'.format(geeklist_id))
            if os.path.exists(result_file) is False or self.geeklist_month_mapping[geeklist_id]['Override']:
                url = '{0}{1}'.format(self.geeklist_url, geeklist_id)
                response = requests.get(url)
                self._validate_status_code(response)
                if response.status_code in self.wait_statis_codes:
                    response = self._retry_request_until_timeout(url)
                with open(result_file, 'wb') as f: 
                    f.write(response.content)

            
    def create_current_date_csv(self):
        current_datetime = datetime.now(timezone.utc)
        current_datetime = '{0}/{1}/{2}::{3}:{4} (UTC)'.format(current_datetime.year, current_datetime.month, current_datetime.day, current_datetime.hour, current_datetime.minute)
        output_file = os.path.join(self.csv_output_dir, 'data_refresh_date.csv')
        csv_output = open(output_file, 'w')
        csv_output.write('rownum###datarefreshdate\n')
        csv_output.close()
        csv_output = open(output_file, 'a')
        csv_output.write('{0}###{1}'.format('1', current_datetime))
        csv_output.close()
    

    def create_game_data_json(self):
        all_games = {}
        for filename in os.listdir(self.sgoyt_geeklist_xml_output_dir):
            file_path = os.path.join(self.sgoyt_geeklist_xml_output_dir, filename)
            geeklist_id = filename.replace('.xml', '')
            tree = ET.parse(file_path)
            root = tree.getroot()
            year = self.geeklist_month_mapping[geeklist_id]['Year']
            month = self.geeklist_month_mapping[geeklist_id]['Month']
            year_month = '{0}/{1}'.format(year, month)
            geeklist_host = root.find('username').text
            for item in root.findall('./item'):
                if item.attrib['subtype'] == 'boardgame':
                    game_id = item.attrib['objectid']
                    if game_id not in all_games:
                        game_name = self._replace_text(item.attrib['objectname'])
                        game_name = unicodedata.normalize('NFD', game_name).encode('ascii', 'ignore').decode()
                        bgg_link = '{0}/boardgame/{1}'.format(self.base_url, game_id)
                        all_games[game_id] = {
                            'game_id': game_id,
                            'game_name': game_name,
                            'bgg_link': bgg_link,
                        }
                        all_games[game_id]['sgoyt_entries'] = []
                    geeklist_item_id = item.attrib['id']
                    geeklist_item_link = '{0}/geeklist/{1}/item/{2}#item{2}'.format(self.base_url, geeklist_id, geeklist_item_id)
                    contributor = item.attrib['username']
                    sgoyt_entry = {
                        'geeklist_id': geeklist_id,
                        'geeklist_item_id': geeklist_item_id,
                        'year_month': year_month,
                        'year': year,
                        'month': month,
                        'geeklist_item_link': geeklist_item_link,
                        'geeklist_host': geeklist_host,
                        'contributor': contributor
                    }
                    all_games[game_id]['sgoyt_entries'].append(sgoyt_entry)
        
        for game_id in all_games:
            result_file = os.path.join(self.game_xml_output_dir, '{0}.xml'.format(game_id))
            if os.path.exists(result_file) is False:
                print('Processing game_id {0}...'.format(game_id))
                url = '{0}/{1}/thing?id={2}&stats=1'.format(self.base_url, self.apis['xml2'], game_id)
                response = requests.get(url)
                self._validate_status_code(response)
                with open(result_file, 'wb') as f:
                    f.write(response.content)
                time.sleep(15)
            all_games[game_id]['sgoyt_count'] = len(all_games[game_id]['sgoyt_entries'])
            game_xml_file = os.path.join(self.game_xml_output_dir, '{0}.xml'.format(game_id))
            tree = ET.parse(game_xml_file)
            root = tree.getroot()
            
            thumbnail_elem = root.find('item').find('thumbnail')
            if thumbnail_elem is not None:
                thumbnail = '{0}'.format(thumbnail_elem.text)
            else:
                thumbnail = ''
            
            description = root.find('item').find('description').text
            if description is not None:
                description = self._replace_text(description)
                description = unicodedata.normalize('NFD', description).encode('ascii', 'ignore').decode()
            
            year_published = root.find('item').find('./yearpublished').attrib['value']
            designers = []
            categories = []
            mechanics = []
            expansions = []
            expansion_for = []
            for link in root.find('item').findall('./link'):
                if link.attrib['type'] == 'boardgamedesigner':
                    designer = self._replace_text(link.attrib['value'])
                    designer = unicodedata.normalize('NFD', designer).encode('ascii', 'ignore').decode()
                    designers.append(designer)
                if link.attrib['type'] == 'boardgamecategory':
                    categories.append(link.attrib['value'])
                if link.attrib['type'] == 'boardgamemechanic':
                    mechanics.append(link.attrib['value'])
                if link.attrib['type'] == 'boardgameexpansion':
                    if 'inbound' not in link.attrib:
                        expansion_id = link.attrib['id']
                        expansion_name = link.attrib['value']
                        expansion_name = self._replace_text(expansion_name)
                        expansion_name = unicodedata.normalize('NFD', expansion_name).encode('ascii', 'ignore').decode()
                        expansion_bgg_link = '{0}/boardgame/{1}'.format(self.base_url, expansion_id)
                        expansion_data = {
                            'expansion_id': expansion_id,
                            'expansion_name': expansion_name,
                            'expansion_bgg_link': expansion_bgg_link
                        }
                        expansions.append(expansion_data)
                    if 'inbound' in link.attrib:
                        exp_for_id = link.attrib['id']
                        exp_for_name = link.attrib['value']
                        exp_for_name = self._replace_text(exp_for_name)
                        exp_for_name = unicodedata.normalize('NFD', exp_for_name).encode('ascii', 'ignore').decode()
                        exp_for_bgg_link = '{0}/boardgame/{1}'.format(self.base_url, exp_for_id)
                        expansion_for_data = {
                            'game_id': exp_for_id,
                            'game_name': exp_for_name,
                            'game_bgg_link': exp_for_bgg_link
                        }
                        expansion_for.append(expansion_for_data)
            expansions_string = self._convert_array_to_string(expansions)
            expansion_for_string = self._convert_array_to_string(expansion_for)
            designers_string = self._convert_array_to_string(designers)
            mechanics_string = self._convert_array_to_string(mechanics)
            categories_string = self._convert_array_to_string(categories)
            weight = root.find('item').find('statistics').find('ratings').find('averageweight').attrib['value']
            weight = round(decimal.Decimal(weight), 2)
            rating = root.find('item').find('statistics').find('ratings').find('average').attrib['value']
            rating = round(decimal.Decimal(rating), 2)
            min_playtime = root.find('item').find('minplaytime').attrib['value']
            max_playtime = root.find('item').find('maxplaytime').attrib['value']
            if min_playtime == max_playtime:
                play_time = root.find('item').find('playingtime').attrib['value']
            else:
                play_time = '{0} - {1}'.format(min_playtime, max_playtime)
            for poll in root.find('item').findall('./poll'):
                if poll.attrib['name'] == 'suggested_numplayers':
                    for results in poll.findall('./results'):
                        if results.attrib['numplayers'] == '1':
                            for result in results:
                                if result.attrib['value'] == 'Best':
                                    best = result.attrib['numvotes']
                                if result.attrib['value'] == 'Recommended':
                                    recommended = result.attrib['numvotes']
                                if result.attrib['value'] == 'Not Recommended':
                                    not_recommended = result.attrib['numvotes']
            all_games[game_id]['thumbnail'] = thumbnail
            all_games[game_id]['year_published'] = year_published
            all_games[game_id]['designers'] = designers
            all_games[game_id]['weight'] = weight
            all_games[game_id]['rating'] = rating
            all_games[game_id]['play_time'] = play_time
            all_games[game_id]['best'] = best
            all_games[game_id]['recommended'] = recommended
            all_games[game_id]['not_recommended'] = not_recommended
            all_games[game_id]['categories'] = categories
            all_games[game_id]['mechanics'] = mechanics
            all_games[game_id]['expansions'] = expansions
            all_games[game_id]['expansion_for'] = expansion_for
            all_games[game_id]['designers_string'] = designers_string
            all_games[game_id]['categories_string'] = categories_string
            all_games[game_id]['mechanics_string'] = mechanics_string
            all_games[game_id]['expansions_string'] = expansions_string
            all_games[game_id]['expansions_for_string'] = expansion_for_string

            output_file = os.path.join(self.games_json_output_dir, '{0}.json'.format(game_id))
            with open(output_file, 'w') as write_file:
                json.dump(all_games[game_id], write_file, indent=4)
        
    
    def create_yearmonth_index_json(self):
        year_month_list = []
        for geeklist_id in self.geeklist_month_mapping:
            year_month = '{0}/{1}'.format(self.geeklist_month_mapping[geeklist_id]['Year'], self.geeklist_month_mapping[geeklist_id]['Month'])
            geeklist_link = '{0}/geeklist/{1}'.format(self.base_url, geeklist_id)
            year_month_list.append(
                {
                    'geeklist_id': geeklist_id,
                    'year_month': year_month,
                    'geeklist_link': geeklist_link
                }
            )
        output_file = os.path.join(self.yearmonth_json_output_dir, 'yearmonth_index.json')
        with open(output_file, 'w') as write_file:
            json.dump(year_month_list, write_file, indent=4)
    

    def _convert_array_to_string(self, array, delimiter=';'):
        return_string = ''
        for item in array:
            return_string += '{0}{1} '.format(item, delimiter)
        if len(return_string) > 2:
            return_string = return_string[:-2]
        return return_string
    
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
