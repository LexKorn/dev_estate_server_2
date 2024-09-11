const {Message} = require('../models/models');

const _transformMessage = (message) => {
    return {
        id: message.id,
        text: message.text,
        sender: message.sender,
        userId: message.userId
    }
};

const answers = [
    "Ваше обращение очень важно, мы скоро свяжемся с Вами.",
    "Ваш запрос принят. Скоро вернёмся к Вам.",
    "Наши менеджеры уже решают Вашу задачу",
    "Мы свяжемся с Вами в ближайшее время.",
    "Рады будем помочь со всеми вашими вопросами."
];

const rundomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const index = (arr) => rundomNumberInRange(0, arr.length - 1);


class MessagesController {
    async create(req, res) {
        try {
            const {id} = req.user;
            let {text, sender} = req.body;

            const message = await Message.create({text, sender, userId: id});

            setTimeout(() => {
                Message.create({text: `${answers[index(answers)]}`, sender: 'system', userId: id});
            }, 3000);

            return res.json(_transformMessage(message));
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const {id} = req.user;
            const messages = await Message.findAll({where:{userId: id}});
            return res.json(messages.map(message => _transformMessage(message)));
        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async deleteAll(req, res) {
        try {
            await Message.destroy({where: {userId: req.user.id}});
            return res.json('All messages were deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new MessagesController();