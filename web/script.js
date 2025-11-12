$(function() {
    $('#epstein-search').on('keyup', function(e) {
        console.log(e.currentTarget.value)
    })

    $('#search-exec').on('click', async function(e) {
        console.log('sending')

        var query = 'https://epstein-search.onrender.com/search?q=Ghislaine&page=0&show=5';

        $.getJSON(query, 
            function(data) {
                console.log(data)
                var results = data['records']

                for (var i=0; i<results.length; i++) {
                    $('#results-container').append(
                        `
                        <div class="result">
                            <p class="result-name"><b>FILENAME</b></p>
                            <p class="result-header"><span class=flag">DOC HEADER</span> HEADER</p>
                            <p class="result-match"><span class="flag">MATCH</span> MATCH_WINDOW</p>
                        </div>
                        `.replace('FILENAME', results[i]['file'])
                        .replace('HEADER', results[i]['sample'])
                        .replace('MATCH_WINDOW', results[i]['window'])
                    )
                }
            }
        )




    })

})