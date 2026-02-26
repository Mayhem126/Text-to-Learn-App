const { getYoutubeVideo } = require("../services/youtubeService")

const getVideo = async (req, res) => {
    try {
        const { query } = req.query
        const videoId = await getYoutubeVideo(query)
        res.json({ videoId })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch video", details: error.message })
    }
}

module.exports = { getVideo }