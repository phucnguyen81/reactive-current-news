$apiKey = $env:CURRENT_NEWS_API_KEY

http --verbose GET 'https://api.currentsapi.services/v1/latest-news' `
    language=='en' `
    apiKey==$apiKey
