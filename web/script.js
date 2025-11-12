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
            }
        )

        let response = await fetch(query, {
            method: 'POST'
        })

        const r = await response.json();
        
        var results = r['records']

        for (var i=0; i<results.length; i++) {
            $('#results-container').append(
                `
                <div class="result">
                    <p><b>FILENAME</b></p>
                    <p>HEADER</p>
                    <p>MATCH_WINDOW</p>
                </div>
                `.replace('FILENAME', results[i]['file'])
            )
        }
    })

})