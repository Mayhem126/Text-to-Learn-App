const { YOUTUBE_KEY } = require("../config/env")

const getYoutubeVideo = async (query) => {
    const searchTerm = query.trim().replaceAll(" ", "+")
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&videoEmbeddable=true&maxResults=1&key=${YOUTUBE_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    return data.items[0]?.id?.videoId
}

module.exports = { getYoutubeVideo }