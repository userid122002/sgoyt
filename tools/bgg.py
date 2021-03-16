import requests
import os
import time
from datetime import datetime, timezone
import xml.etree.ElementTree as ET
import unicodedata
import decimal
import simplejson as json
import math
from csv import reader

class BggClient():
    base_url = 'https://boardgamegeek.com'
    valid_statis_codes = [200, 202]
    wait_statis_codes = [202]
    wait_increment = 20
    timeout = 1000
    sgoyt_geeklist_xml_output_dir = os.path.join('tools', 'XML', 'geeklists', 'sgoyt')
    game_xml_output_dir = os.path.join('tools', 'XML', 'games')
    guild_xml_output_dir = os.path.join('tools', 'XML', 'guilds')

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
        '169311': {
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
            'Override': False
        },
        '281198': {
            'Year': '2021',
            'Month': '03',
            'Override': True
        }
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
    

    def get_game_data(self, game_id):
        result_file = os.path.join(self.game_xml_output_dir, '{0}.xml'.format(game_id))
        print('Processing game_id {0}...'.format(game_id))
        url = '{0}/{1}/thing?id={2}&stats=1'.format(self.base_url, self.apis['xml2'], game_id)
        response = requests.get(url)
        self._validate_status_code(response)
        with open(result_file, 'wb') as f:
            f.write(response.content)
    

    def get_guild_data(self, guild_id, member_page, xml_path=None):
        if xml_path is None:
            xml_path = self.guild_xml_output_dir
        result_file = os.path.join(xml_path, '{0}_{1}.xml'.format(guild_id, member_page))
        print('Processing guild id {0}, member page {1}...'.format(guild_id, member_page))
        url = '{0}/{1}/guild?id={2}&members=1&sort=date&page={3}'.format(self.base_url, self.apis['xml2'], guild_id, member_page)
        response = requests.get(url)
        self._validate_status_code(response)
        with open(result_file, 'wb') as f:
            f.write(response.content)
    
    
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


class CurrentDate():
    csv_output_dir = os.path.join('tools', 'CSV')

    def __init__(self):
        pass

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


class CompileData():
    games_json_output_dir = os.path.join('tools', 'JSON', 'games')
    yearmonth_json_output_dir = os.path.join('tools', 'JSON', 'yearmonth')
    guild_json_output_dir = os.path.join('tools', 'JSON', 'guilds')
    user_json_output_dir = os.path.join('tools', 'JSON', 'users')
    queries_output_dir = os.path.join('tools', 'queries')
    data_output_dir = os.path.join('tools', 'data')
    csv_output_dir = os.path.join('tools', 'CSV')
    bg = BggClient()


    def __init__(self):
        pass


    def create_game_data_json(self):
        all_games = {}
        for filename in os.listdir(self.bg.sgoyt_geeklist_xml_output_dir):
            file_path = os.path.join(self.bg.sgoyt_geeklist_xml_output_dir, filename)
            geeklist_id = filename.replace('.xml', '')
            tree = ET.parse(file_path)
            root = tree.getroot()
            year = self.bg.geeklist_month_mapping[geeklist_id]['Year']
            month = self.bg.geeklist_month_mapping[geeklist_id]['Month']
            year_month = '{0}/{1}'.format(year, month)
            geeklist_host = root.find('username').text
            geeklist_sgoyt_count_key = 'sgoyt_count_{0}'.format(geeklist_id)
            for item in root.findall('./item'):
                if item.attrib['subtype'] == 'boardgame':
                    game_id = item.attrib['objectid']
                    if game_id not in all_games:
                        game_name = self._replace_text(item.attrib['objectname'])
                        game_name = unicodedata.normalize('NFD', game_name).encode('ascii', 'ignore').decode()
                        bgg_link = '{0}/boardgame/{1}'.format(self.bg.base_url, game_id)
                        all_games[game_id] = {
                            'game_id': game_id,
                            'game_name': game_name,
                            'bgg_link': bgg_link
                        }
                        all_games[game_id]['sgoyt_entries'] = []
                    if geeklist_sgoyt_count_key not in all_games[game_id]:
                        all_games[game_id][geeklist_sgoyt_count_key] = 0
                    geeklist_item_id = item.attrib['id']
                    geeklist_item_link = '{0}/geeklist/{1}/item/{2}#item{2}'.format(self.bg.base_url, geeklist_id, geeklist_item_id)
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
                    all_games[game_id][geeklist_sgoyt_count_key] += 1
        
        for game_id in all_games:
            for filename in os.listdir(self.bg.sgoyt_geeklist_xml_output_dir):
                geeklist_sgoyt_count_key = 'sgoyt_count_{0}'.format(filename.replace('.xml', ''))
                if geeklist_sgoyt_count_key not in all_games[game_id]:
                    all_games[game_id][geeklist_sgoyt_count_key] = 0
            game_xml_file = os.path.join(self.bg.game_xml_output_dir, '{0}.xml'.format(game_id))
            if os.path.exists(game_xml_file) is False:
                self.bg.get_game_data(game_id)
                time.sleep(15)
            all_games[game_id]['sgoyt_count'] = len(all_games[game_id]['sgoyt_entries'])
            game_xml_file = os.path.join(self.bg.game_xml_output_dir, '{0}.xml'.format(game_id))
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
                        expansion_bgg_link = '{0}/boardgame/{1}'.format(self.bg.base_url, expansion_id)
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
                        exp_for_bgg_link = '{0}/boardgame/{1}'.format(self.bg.base_url, exp_for_id)
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
        
    
    def create_yearmonth_data_json(self):
        year_month_list = []
        for geeklist_id in self.bg.geeklist_month_mapping:
            year_month = '{0}/{1}'.format(self.bg.geeklist_month_mapping[geeklist_id]['Year'], self.bg.geeklist_month_mapping[geeklist_id]['Month'])
            year = self.bg.geeklist_month_mapping[geeklist_id]['Year']
            month = self.bg.geeklist_month_mapping[geeklist_id]['Month']
            geeklist_link = '{0}/geeklist/{1}'.format(self.bg.base_url, geeklist_id)
            file_path = os.path.join(self.bg.sgoyt_geeklist_xml_output_dir, '{0}.xml'.format(geeklist_id))
            tree = ET.parse(file_path)
            root = tree.getroot()
            geeklist_host = root.find('username').text
            sgoyt_entries = []
            for item in root.findall('./item'):
                if item.attrib['subtype'] == 'boardgame':
                    game_id = item.attrib['objectid']
                    game_name = self._replace_text(item.attrib['objectname'])
                    game_name = unicodedata.normalize('NFD', game_name).encode('ascii', 'ignore').decode()
                    game_bgg_link = '{0}/boardgame/{1}'.format(self.bg.base_url, game_id)
                    geeklist_item_id = item.attrib['id']
                    geeklist_item_link = '{0}/geeklist/{1}/item/{2}#item{2}'.format(self.bg.base_url, geeklist_id, geeklist_item_id)
                    contributor = item.attrib['username']
                    sgoyt_entry = {
                        'geeklist_id': geeklist_id,
                        'geeklist_item_id': geeklist_item_id,
                        'year_month': year_month,
                        'year': year,
                        'month': month,
                        'geeklist_item_link': geeklist_item_link,
                        'geeklist_host': geeklist_host,
                        'contributor': contributor,
                        'game_name': game_name,
                        'game_id': game_id,
                        'game_bgg_link': game_bgg_link
                    }
                    sgoyt_entries.append(sgoyt_entry)
            year_month_list.append(
                {
                    'geeklist_id': geeklist_id,
                    'year_month': year_month,
                    'geeklist_link': geeklist_link,
                    'geeklist_host': geeklist_host,
                    'sgoyt_entries': sgoyt_entries
                }
            )
        for item in year_month_list:
            output_file = os.path.join(self.yearmonth_json_output_dir, '{0}.json'.format(item['geeklist_id']))
            with open(output_file, 'w') as write_file:
                json.dump(item, write_file, indent=4)


    def create_top_sgoyt_host_data(self):
        top_host_data = {}
        top_hosts = {'top_hosts': []}
        for filename in os.listdir(self.bg.sgoyt_geeklist_xml_output_dir):
            file_path = os.path.join(self.bg.sgoyt_geeklist_xml_output_dir, filename)
            tree = ET.parse(file_path)
            root = tree.getroot()
            host = root.find('username').text
            if host not in top_host_data:
                top_host_data[host] = 1
            else:
                top_host_data[host] += 1
        for host in top_host_data:
            if top_host_data[host] > 1:
                top_hosts['top_hosts'].append({'username': host, 'count': top_host_data[host]})
        output_file = os.path.join(self.user_json_output_dir, 'top_hosts.json')
        with open(output_file, 'w') as write_file:
            json.dump(top_hosts, write_file, indent=4)
    

    def create_top_sgoyt_contributor_data(self):
        top_contributor_data = {}
        top_contributors = {'top_contributors': []}
        for filename in os.listdir(self.bg.sgoyt_geeklist_xml_output_dir):
            file_path = os.path.join(self.bg.sgoyt_geeklist_xml_output_dir, filename)
            tree = ET.parse(file_path)
            root = tree.getroot()
            for item in root.findall('./item'):
                if item.attrib['subtype'] == 'boardgame':
                    contributor = item.attrib['username']
                    if contributor not in top_contributor_data:
                        top_contributor_data[contributor] = 1
                    else:
                        top_contributor_data[contributor] += 1
        for contributor in top_contributor_data:
            if top_contributor_data[contributor] >= 300:
                top_contributors['top_contributors'].append({'username': contributor, 'count': top_contributor_data[contributor]})
        output_file = os.path.join(self.user_json_output_dir, 'top_contributors.json')
        with open(output_file, 'w') as write_file:
            json.dump(top_contributors, write_file, indent=4)
    

    def create_one_player_guild_user_data(self):        
        self.bg.get_guild_data('1303', '1')
        first_file = os.path.join(self.bg.guild_xml_output_dir, '1303_1.xml')
        tree = ET.parse(first_file)
        root = tree.getroot()
        member_count = int(root.find('members').attrib['count'])
        new_last_user_processed = root.find('members').find('member').attrib['name']
        last_user_file = os.path.join(self.data_output_dir, 'last_guild_user_processed')
        pages = math.ceil(member_count / 25)
        
        for i in range(1, pages + 1):
            self.bg.get_guild_data('1303', str(i))
            time.sleep(15)
        
        guild_data = {}
        guild_data['member_count'] = member_count
        guild_data['user_count_by_date'] = []
        dates = {}

        for filename in os.listdir(self.bg.guild_xml_output_dir):
            file_path = os.path.join(self.bg.guild_xml_output_dir, filename)
            tree = ET.parse(file_path)
            root = tree.getroot()
            for member in root.find('members').findall('./member'):
                date_split = member.attrib['date'][8:16].split(' ')
                date = self._format_member_date(date_split[0], date_split[1])
                if date not in dates:
                    dates[date] = 1
                else:
                    dates[date] += 1
        
        prev_count = 0
        for date in sorted(dates):
            count = dates[date]
            cumulative_count = count + prev_count
            guild_data['user_count_by_date'].append({'date': date, 'count': count, 'cumulative_count': cumulative_count})
            prev_count = cumulative_count
        
        with open(last_user_file, 'w') as f:
            f.write(new_last_user_processed)
        
        output_file = os.path.join(self.guild_json_output_dir, 'guild.json')
        with open(output_file, 'w') as write_file:
            json.dump(guild_data, write_file, indent=4)
    
    
    def update_one_player_guild_user_data(self):
        csv_output_file = os.path.join(self.csv_output_dir, 'guild_members.csv')
        csv_output = open(csv_output_file, 'w')
        csv_output.write('name;date\n')
        csv_output.close()
        csv_output = open(csv_output_file, 'a')
        for filename in os.listdir(self.bg.guild_xml_output_dir):
            file_path = os.path.join(self.bg.guild_xml_output_dir, filename)
            tree = ET.parse(file_path)
            root = tree.getroot()
            for member in root.find('members').findall('./member'):
                name = member.attrib['name']
                date_split = member.attrib['date'][8:16].split(' ')
                date = self._format_member_date(date_split[0], date_split[1])
                csv_output.write('{0};{1}\n'.format(name, date))
        csv_output.close()

        last_user_file = os.path.join(self.data_output_dir, 'last_guild_user_processed')
        with open(last_user_file) as f:
            last_user_processed = f.readline()

        xml_output_dir = os.path.join('tools', 'XML', 'guilds_update')
        self.bg.get_guild_data('1303', 1, xml_output_dir)
        first_file = os.path.join(xml_output_dir, '1303_1.xml')
        tree = ET.parse(first_file)
        root = tree.getroot()
        member_count = int(root.find('members').attrib['count'])
        pages = math.ceil(member_count / 25)
        csv_output = open(csv_output_file, 'a')
        for i in range(1, pages + 1):
            complete = False
            self.bg.get_guild_data('1303', str(i), xml_output_dir)
            current_file = os.path.join(xml_output_dir, '1303_{0}.xml'.format(str(i)))
            current_tree = ET.parse(current_file)
            current_root = current_tree.getroot()
            for member in current_root.find('members').findall('./member'):
                name = member.attrib['name']
                date_split = member.attrib['date'][8:16].split(' ')
                date = self._format_member_date(date_split[0], date_split[1])
                if name == last_user_processed:
                    complete = True
                    break
                else:
                    csv_output.write('{0};{1}\n'.format(name, date))
            if complete:
                csv_output.close()
                break
            time.sleep(15)
        csv_output.close()

        guild_data = {}
        guild_data['member_count'] = member_count
        guild_data['user_count_by_date'] = []
        dates = {}
        
        with open(csv_output_file, 'r') as f:
            csv_reader = reader(f, delimiter=';')
            for row in csv_reader:
                date = row[1]
                if date != 'date':
                    if date not in dates:
                        dates[date] = 1
                    else:
                        dates[date] += 1

        prev_count = 0
        for date in sorted(dates):
            count = dates[date]
            cumulative_count = count + prev_count
            guild_data['user_count_by_date'].append({'date': date, 'count': count, 'cumulative_count': cumulative_count})
            prev_count = cumulative_count
        
        output_file = os.path.join(self.guild_json_output_dir, 'guild.json')
        with open(output_file, 'w') as write_file:
            json.dump(guild_data, write_file, indent=4)
    
    
    def generate_top_games_graphql(self):
        beginning_text = """export const query = graphql`
  query {
    allYearMonthDataJson (sort: {fields: year_month, order: DESC}) {
      nodes {
        geeklist_id
        year_month
        geeklist_host
        geeklist_link
      }
    }
    all_time: allGameDataJson (limit: 25, sort: {fields: sgoyt_count, order: DESC}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count
      }
    }
"""

        ending_text = """  }
`
"""
        output_file = os.path.join(self.queries_output_dir, 'top_games.txt')
        output = open(output_file, 'w')
        output.write(beginning_text)
        output.close()
        output = open(output_file, 'a')
        for filename in os.listdir(self.bg.sgoyt_geeklist_xml_output_dir):
            geeklist_id = filename.replace('.xml', '')
            gl_key = 'gl_{0}'.format(geeklist_id)
            gl_count_key = 'sgoyt_count_{0}'.format(geeklist_id)
            output.write('    {0}: allGameDataJson (limit: 25, sort: {{fields: {1}, order: DESC}}, filter: {{{1}: {{gt: 0}}}}) {{\n'.format(gl_key, gl_count_key))
            output.write('      nodes {\n')
            output.write('        game_id\n')
            output.write('        game_name\n')
            output.write('        bgg_link\n')
            output.write('        {0}\n'.format(gl_count_key))
            output.write('      }\n')
            output.write('    }\n')
        output.write(ending_text)
        output.close()

    
    def generate_game_details_graphql(self):
        beginning_text = """export const query = graphql`
  query {
    allYearMonthDataJson (sort: {fields: year_month, order: ASC}) {
      nodes {
        geeklist_id
        year_month
      }
    }
    allGameDataJson {
      nodes {
        best
        bgg_link
        categories_string
        designers_string
        expansion_for {
          game_bgg_link
          game_id
          game_name
        }
        expansions {
          expansion_bgg_link
          expansion_id
          expansion_name
        }
        game_id
        game_name
        mechanics_string
        not_recommended
        play_time
        rating
        recommended
        sgoyt_entries {
          contributor
          geeklist_host
          geeklist_id
          geeklist_item_id
          geeklist_item_link
          year_month
        }
        thumbnail
        weight
        year_published
"""
        ending_text = """      }
    }
  }
`
"""
        output_file = os.path.join(self.queries_output_dir, 'game_details.txt')
        output = open(output_file, 'w')
        output.write(beginning_text)
        output.close()
        output = open(output_file, 'a')
        for filename in os.listdir(self.bg.sgoyt_geeklist_xml_output_dir):
            geeklist_id = filename.replace('.xml', '')
            gl_count_key = '        sgoyt_count_{0}\n'.format(geeklist_id)
            output.write('{0}'.format(gl_count_key))
        output.write(ending_text)
        output.close()
    
    
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

    
    def _convert_array_to_string(self, array, delimiter=';'):
        return_string = ''
        for item in array:
            return_string += '{0}{1} '.format(item, delimiter)
        if len(return_string) > 2:
            return_string = return_string[:-2]
        return return_string

    
    def _format_member_date(self, month_string, year_string):
        if month_string == 'Jan':
            month = '01'
        elif month_string == 'Feb':
            month = '02'
        elif month_string == 'Mar':
            month = '03'
        elif month_string == 'Apr':
            month = '04'
        elif month_string == 'May':
            month = '05'
        elif month_string == 'Jun':
            month = '06'
        elif month_string == 'Jul':
            month = '07'
        elif month_string == 'Aug':
            month = '08'
        elif month_string == 'Sep':
            month = '09'
        elif month_string == 'Oct':
            month = '10'
        elif month_string == 'Nov':
            month = '11'
        elif month_string == 'Dec':
            month = '12'
        date_string = '{0}/{1}'.format(year_string, month)
        return date_string