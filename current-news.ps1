# curl https://api.currentsapi.services/v1/latest-news `
#     -G -d language=en `
#     -d apiKey=dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-

http --verbose GET 'https://api.currentsapi.services/v1/latest-news' `
    language=='en' `
    apiKey=='dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-'
