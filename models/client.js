const mongoose = require('../database');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const client = new Schema({
    id: ObjectId,
    name: { 
        type: String,
        required: true
    },
    cpf: { 
        type: String,
        required: true
    },
    phone: { 
        type: String,
        required: true
    },
    schedule: [{
        id: ObjectId,
        time: { 
            type: String,
            required: true
        },
        duration: { 
          type: Number,
          required: true
        },
        description: { 
          type: String,
          required: true
        }
    }]
});

const model_client = mongoose.model('client', client);

module.exports = { 
    get: async function(id) {
        try {
            if (id) return await model_client.findById(id)
            else return await model_client.find({})
        }
        catch (err) {
            console.error(err)
            return false
        }
    },
    save: async function(client) {
        try {
            var created = await model_client.create(client)
            return [true, created]
        }
        catch (err) {
            console.error(JSON.stringify(err.errors))
            return [false, JSON.stringify(err.errors)];
        }
    },
    update: async function(client) {
        try {
            var updated = await client.save();

            return [true, updated]
        }
        catch (err) {
            console.error(JSON.stringify(err.errors))
            return [false, JSON.stringify(err.errors)];
        }
    },
    delete: async function(id) {
        try {
            await model_client.findByIdAndDelete(id)
            return [true]
        }
        catch (err) {
            console.error(JSON.stringify(err.errors))
            return [false, JSON.stringify(err.errors)];
        }
    },
    schedule_insert: async function(client, schedule) {
        try {
            client.schedule.push(schedule)
            var result = await client.save()

            return [true, result]
        }
        catch (err) {
            console.error(JSON.stringify(err.errors))
            return [false, JSON.stringify(err.errors)];
        }
    },
    schedule_remove: async function(client, schedule_id) {
        try {
            for (var i = 0; i < client.schedule.length; i ++) {
              if (client.schedule[i]._id == schedule_id) {
                client.schedule[i].remove()
              }
            }
            var result = await client.save()

            return [true, result]
        }
        catch (err) {
            console.error(JSON.stringify(err.errors))
            return [false, JSON.stringify(err.errors)];
        }
  }
};