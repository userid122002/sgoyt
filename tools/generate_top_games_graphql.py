import os

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

output_file = os.path.join('tools', 'queries', 'top_games.txt')
output = open(output_file, 'w')
output.write(beginning_text)
output.close()
output = open(output_file, 'a')
sgoyt_geeklist_xml_output_dir = os.path.join('tools', 'XML', 'geeklists', 'sgoyt')
for filename in os.listdir(sgoyt_geeklist_xml_output_dir):
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

