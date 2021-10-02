exports.botText = (req, res) => {
    // dau vao
    console.log(req.body)
    res.status(200).json({
        "bot_responses": [
            {
                "buttons": [],
                "text": "Chào bạn, mình là VN Smartbot rất vui được hỗ trợ bạn",
                "type": "text"
            }
        ]
    });
};

exports.botImage = (req, res) => {
    res.status(200).json({
        "bot_responses": [
            {
                "buttons": [],
                "subtitle": "",
                "title": "Tiêu đề",
                "type": "image",
                "url": "https://ic-storage.vnpt.vn/smartbot/chatbot_images/20200928/4a9a30633f2342d99806de2b99dc9cad.jpg"
            }
        ]
    });
};